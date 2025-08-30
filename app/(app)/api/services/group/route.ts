import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function GET() {
  try {
    const payload = await getPayload({
      config,
    });

    const services = await payload.find({
      collection: 'services',
      where: {
        and: [
          {
            isActive: {
              equals: true,
            },
          },
          {
            type: {
              equals: 'group',
            },
          },
        ],
      },
      limit: 20,
      sort: '-createdAt',
    });

    return NextResponse.json({ services: services.docs });
  } catch (error) {
    console.error('Error fetching group services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch group services' },
      { status: 500 }
    );
  }
}