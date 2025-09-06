import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // List environment variables (safely, without exposing secrets)
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      AWS_REGION: process.env.AWS_REGION,
      DATABASE_URL: process.env.DATABASE_URL ? 'exists' : 'missing',
      PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? 'exists' : 'missing',
      S3_BUCKET: process.env.S3_BUCKET ? 'exists' : 'missing',
      S3_REGION: process.env.S3_REGION ? 'exists' : 'missing',
      S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID ? 'exists' : 'missing',
      S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY ? 'exists' : 'missing',
    };
    
    return NextResponse.json({ 
      status: 'ok',
      environment: envVars,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Environment test failed', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
}