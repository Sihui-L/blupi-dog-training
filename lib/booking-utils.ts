import { getPayload } from 'payload'
import config from '../payload.config'

export async function getServiceAvailability(serviceId: string) {
  const payload = await getPayload({ config })
  
  try {
    // Get the service details
    const service = await payload.findByID({
      collection: 'services',
      id: serviceId,
    })

    if (!service) {
      return {
        available: false,
        reason: 'Service not found',
        spotsLeft: 0,
        maxParticipants: 0,
      }
    }

    // If it's a private session, it's not bookable online
    if (service.type === 'private') {
      return {
        available: false,
        reason: 'Private sessions require direct contact',
        spotsLeft: 0,
        maxParticipants: 0,
      }
    }

    // Count current bookings for this service
    const bookings = await payload.find({
      collection: 'bookings',
      where: {
        and: [
          {
            service: {
              equals: serviceId,
            },
          },
          {
            status: {
              in: ['pending', 'confirmed'], // Don't count cancelled bookings
            },
          },
        ],
      },
      limit: 1000, // Should be plenty for any single session
    })

    const currentBookings = bookings.totalDocs
    const maxParticipants = service.maxParticipants || 0
    const spotsLeft = Math.max(0, maxParticipants - currentBookings)

    return {
      available: spotsLeft > 0,
      reason: spotsLeft === 0 ? 'Fully booked' : 'Available',
      spotsLeft,
      maxParticipants,
      currentBookings,
      serviceDetails: {
        name: service.name,
        type: service.type,
        scheduledDate: service.scheduledDate,
        location: service.location,
        price: service.price,
      }
    }
  } catch (error) {
    console.error('Error checking service availability:', error)
    return {
      available: false,
      reason: 'Error checking availability',
      spotsLeft: 0,
      maxParticipants: 0,
    }
  }
}

export async function createBooking(data: {
  serviceId: string
  clientId: string
  paymentIntentId?: string
}) {
  const payload = await getPayload({ config })
  
  try {
    // Check availability first
    const availability = await getServiceAvailability(data.serviceId)
    
    if (!availability.available) {
      throw new Error(`Cannot book: ${availability.reason}`)
    }

    // Create the booking
    const booking = await payload.create({
      collection: 'bookings',
      data: {
        client: parseInt(data.clientId),
        service: parseInt(data.serviceId),
        scheduledAt: availability.serviceDetails?.scheduledDate || new Date().toISOString(),
        status: 'confirmed', // Immediately confirmed since payment is processed
        paymentStatus: 'paid',
        stripePaymentIntentId: data.paymentIntentId,
      },
    })

    return {
      success: true,
      booking,
    }
  } catch (error) {
    console.error('Error creating booking:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Utility to get user's bookings
export async function getUserBookings(userId: string) {
  const payload = await getPayload({ config })
  
  try {
    const bookings = await payload.find({
      collection: 'bookings',
      where: {
        client: {
          equals: userId,
        },
      },
      depth: 2, // Populate service and client details
      sort: '-scheduledAt', // Most recent first
    })

    return {
      success: true,
      bookings: bookings.docs,
    }
  } catch (error) {
    console.error('Error fetching user bookings:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      bookings: [],
    }
  }
}