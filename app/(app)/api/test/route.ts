import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test basic response
    return NextResponse.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      message: 'API route working'
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { error: 'Test API failed', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
}