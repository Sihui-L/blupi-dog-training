import { NextRequest, NextResponse } from 'next/server'
import { getServiceAvailability } from '../../../../../../lib/booking-utils'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const availability = await getServiceAvailability(id)
    
    return NextResponse.json(availability)
  } catch (error) {
    console.error('Error checking service availability:', error)
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    )
  }
}