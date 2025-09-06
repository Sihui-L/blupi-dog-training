import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function GET() {
  try {
    // Test Payload database connection
    const payload = await getPayload({ config });
    
    // Try a simple database operation
    const userCount = await payload.count({
      collection: 'users',
    });
    
    return NextResponse.json({ 
      status: 'ok', 
      database: 'connected via Payload',
      userCount: userCount.totalDocs,
      envVars: {
        DATABASE_URL: process.env.DATABASE_URL ? 'exists' : 'missing',
        PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? 'exists' : 'missing',
        NODE_ENV: process.env.NODE_ENV,
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        error: 'Database test failed', 
        details: error instanceof Error ? error.message : String(error),
        envVars: {
          DATABASE_URL: process.env.DATABASE_URL ? 'exists' : 'missing',
          PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? 'exists' : 'missing',
          NODE_ENV: process.env.NODE_ENV,
        }
      }, 
      { status: 500 }
    );
  }
}