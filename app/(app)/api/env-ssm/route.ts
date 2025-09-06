import { NextResponse } from 'next/server';
import { loadEnvFromParameterStore } from '../../../../lib/env';

export async function GET() {
  const startTime = Date.now();
  console.log('[ENV-SSM] Starting Parameter Store test...');
  
  try {
    // Load environment variables from Parameter Store
    const envVars = await loadEnvFromParameterStore();
    const loadTime = Date.now() - startTime;
    
    console.log(`[ENV-SSM] Parameter Store load completed in ${loadTime}ms`);
    console.log('[ENV-SSM] Retrieved keys:', Object.keys(envVars));
    
    const result = {
      status: 'ok',
      source: 'AWS Systems Manager Parameter Store',
      loadTimeMs: loadTime,
      environment: {
        DATABASE_URL: envVars.DATABASE_URL ? 'exists' : 'missing',
        PAYLOAD_SECRET: envVars.PAYLOAD_SECRET ? 'exists' : 'missing', 
        S3_BUCKET: envVars.S3_BUCKET ? 'exists' : 'missing',
        S3_REGION: envVars.S3_REGION ? 'exists' : 'missing',
        S3_ACCESS_KEY_ID: envVars.S3_ACCESS_KEY_ID ? 'exists' : 'missing',
        S3_SECRET_ACCESS_KEY: envVars.S3_SECRET_ACCESS_KEY ? 'exists' : 'missing',
      },
      values: {
        S3_BUCKET: envVars.S3_BUCKET || null, // Safe to show this one
        S3_REGION: envVars.S3_REGION || null,
      },
      debug: {
        totalParametersLoaded: Object.keys(envVars).length,
        awsRegion: process.env.AWS_REGION || 'not-set',
        nodeEnv: process.env.NODE_ENV || 'not-set',
      },
      timestamp: new Date().toISOString()
    };
    
    console.log('[ENV-SSM] Response prepared:', { 
      status: result.status,
      parametersFound: result.debug.totalParametersLoaded 
    });
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[ENV-SSM] Parameter Store test error:', error);
    return NextResponse.json(
      { 
        error: 'Parameter Store test failed', 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        loadTimeMs: Date.now() - startTime,
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}