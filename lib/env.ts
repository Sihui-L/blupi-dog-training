import { SSMClient, GetParameterCommand, GetParametersCommand } from "@aws-sdk/client-ssm";

// Initialize SSM client with explicit configuration
const ssmClient = new SSMClient({ 
  region: "eu-west-2",
  // Add retry configuration for better reliability
  maxAttempts: 3,
});

// Cache for environment variables to avoid repeated API calls
const envCache = new Map<string, string>();
const cacheTimeout = 5 * 60 * 1000; // 5 minutes
const cacheTimestamps = new Map<string, number>();

async function getParameter(name: string): Promise<string | undefined> {
  const now = Date.now();
  const cacheKey = name;
  
  // Check if cached value is still valid
  if (envCache.has(cacheKey)) {
    const timestamp = cacheTimestamps.get(cacheKey) || 0;
    if (now - timestamp < cacheTimeout) {
      console.log(`[SSM] Using cached value for ${name}`);
      return envCache.get(cacheKey);
    }
  }

  try {
    console.log(`[SSM] Fetching parameter: ${name}`);
    const command = new GetParameterCommand({
      Name: name,
      WithDecryption: true,
    });
    
    const response = await ssmClient.send(command);
    const value = response.Parameter?.Value;
    
    if (value) {
      envCache.set(cacheKey, value);
      cacheTimestamps.set(cacheKey, now);
      console.log(`[SSM] Successfully retrieved ${name}`);
      return value;
    } else {
      console.warn(`[SSM] Parameter ${name} has no value`);
    }
  } catch (error: any) {
    console.error(`[SSM] Failed to get parameter ${name}:`, {
      name: error.name,
      message: error.message,
      code: error.$metadata?.httpStatusCode,
      requestId: error.$metadata?.requestId,
    });
  }
  
  return undefined;
}

async function getMultipleParameters(names: string[]): Promise<Record<string, string>> {
  try {
    console.log(`[SSM] Fetching multiple parameters:`, names);
    const command = new GetParametersCommand({
      Names: names,
      WithDecryption: true,
    });
    
    const response = await ssmClient.send(command);
    const result: Record<string, string> = {};
    const now = Date.now();
    
    console.log(`[SSM] Response received. Parameters: ${response.Parameters?.length || 0}, Invalid: ${response.InvalidParameters?.length || 0}`);
    
    if (response.InvalidParameters && response.InvalidParameters.length > 0) {
      console.warn(`[SSM] Invalid parameters:`, response.InvalidParameters);
    }
    
    response.Parameters?.forEach(param => {
      if (param.Name && param.Value) {
        const key = param.Name.split('/').pop(); // Get parameter name without path
        if (key) {
          result[key] = param.Value;
          envCache.set(param.Name, param.Value);
          cacheTimestamps.set(param.Name, now);
          console.log(`[SSM] Retrieved ${param.Name} -> ${key}`);
        }
      }
    });
    
    console.log(`[SSM] Successfully processed ${Object.keys(result).length} parameters`);
    return result;
  } catch (error: any) {
    console.error('[SSM] Failed to get multiple parameters:', {
      name: error.name,
      message: error.message,
      code: error.$metadata?.httpStatusCode,
      requestId: error.$metadata?.requestId,
    });
    return {};
  }
}

// Load all application environment variables
export async function loadEnvFromParameterStore(): Promise<Record<string, string>> {
  const parameterNames = [
    "/blupi-dog-training/DATABASE_URL",
    "/blupi-dog-training/PAYLOAD_SECRET", 
    "/blupi-dog-training/S3_BUCKET",
    "/blupi-dog-training/S3_ACCESS_KEY_ID",
    "/blupi-dog-training/S3_SECRET_ACCESS_KEY",
    "/blupi-dog-training/S3_REGION"
  ];
  
  return getMultipleParameters(parameterNames);
}

// Individual getters for backwards compatibility
export const getEnv = {
  DATABASE_URL: () => getParameter("/blupi-dog-training/DATABASE_URL"),
  PAYLOAD_SECRET: () => getParameter("/blupi-dog-training/PAYLOAD_SECRET"),
  S3_BUCKET: () => getParameter("/blupi-dog-training/S3_BUCKET"),
  S3_ACCESS_KEY_ID: () => getParameter("/blupi-dog-training/S3_ACCESS_KEY_ID"),
  S3_SECRET_ACCESS_KEY: () => getParameter("/blupi-dog-training/S3_SECRET_ACCESS_KEY"),
  S3_REGION: () => getParameter("/blupi-dog-training/S3_REGION"),
};