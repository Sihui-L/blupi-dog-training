import { NextRequest, NextResponse } from 'next/server'
import { createBooking, getUserBookings } from '../../../../lib/booking-utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceId, clientId, paymentIntentId } = body
    
    if (!serviceId || !clientId) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceId and clientId' },
        { status: 400 }
      )
    }

    const result = await createBooking({
      serviceId,
      clientId,
      paymentIntentId,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      booking: result.booking,
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId parameter' },
        { status: 400 }
      )
    }

    const result = await getUserBookings(userId)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      bookings: result.bookings,
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}