import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { slateEditor } from "@payloadcms/richtext-slate";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnvFromParameterStore } from "./env";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Global variable to cache loaded environment variables
let envVarsCache: Record<string, string> | null = null;

async function getEnvVars(): Promise<Record<string, string>> {
  if (envVarsCache) {
    return envVarsCache;
  }

  console.log('[PAYLOAD] Loading environment variables...');
  
  // Try regular environment variables first
  if (process.env.DATABASE_URL && process.env.PAYLOAD_SECRET) {
    console.log('[PAYLOAD] Using regular environment variables');
    envVarsCache = {
      DATABASE_URL: process.env.DATABASE_URL,
      PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
      S3_BUCKET: process.env.S3_BUCKET || '',
      S3_REGION: process.env.S3_REGION || 'eu-west-2',
      S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || '',
      S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY || '',
    };
    return envVarsCache;
  }

  // Fall back to Parameter Store
  console.log('[PAYLOAD] Regular env vars not available, trying Parameter Store...');
  try {
    envVarsCache = await loadEnvFromParameterStore();
    console.log(`[PAYLOAD] Loaded ${Object.keys(envVarsCache).length} parameters from Parameter Store`);
    return envVarsCache;
  } catch (error) {
    console.error('[PAYLOAD] Failed to load from Parameter Store:', error);
    throw new Error('Could not load environment variables from Parameter Store or environment');
  }
}

export async function createPayloadConfig() {
  const envVars = await getEnvVars();
  
  if (!envVars.DATABASE_URL || !envVars.PAYLOAD_SECRET) {
    throw new Error('DATABASE_URL and PAYLOAD_SECRET are required');
  }

  console.log('[PAYLOAD] Creating Payload configuration with loaded environment variables');

  return buildConfig({
    admin: {
      importMap: {
        baseDir: path.resolve(dirname, '..'),
      },
    },

    // Database (Neon)
    db: postgresAdapter({
      pool: {
        connectionString: envVars.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      },
    }),

    // Collections (same as before)
    collections: [
      // Users
      {
        slug: "users",
        auth: true,
        admin: { useAsTitle: "email" },
        fields: [
          {
            name: "role",
            type: "select",
            options: [
              { label: "Admin", value: "admin" },
              { label: "Trainer", value: "trainer" },
              { label: "Client", value: "client" },
            ],
            defaultValue: "client",
            required: true,
          },
          { name: "firstName", type: "text", required: true },
          { name: "lastName", type: "text", required: true },
          { name: "phone", type: "text" },
        ],
      },

      // Media (S3-only)
      {
        slug: "media",
        upload: {
          imageSizes: [
            { name: "thumbnail", width: 400, height: 300, crop: "centre" },
            { name: "card", width: 768, height: 1024, crop: "centre" },
          ],
          mimeTypes: ["image/*"],
        },
        fields: [{ name: "alt", type: "text", required: true }],
      },

      // Posts, Services, Testimonials, Bookings (same as original config)
      {
        slug: "posts",
        admin: { useAsTitle: "title" },
        fields: [
          { name: "title", type: "text", required: true },
          { name: "description", type: "textarea", required: true },
          {
            name: "content",
            type: "richText",
            editor: slateEditor({}),
            required: true,
          },
          { name: "featuredImage", type: "upload", relationTo: "media" },
          {
            name: "tags",
            type: "array",
            fields: [{ name: "tag", type: "text" }],
          },
          {
            name: "publishedAt",
            type: "date",
            admin: { date: { pickerAppearance: "dayAndTime" } },
          },
          {
            name: "status",
            type: "select",
            options: [
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
            ],
            defaultValue: "draft",
            required: true,
          },
        ],
      },
    ],

    // S3 Storage plugin
    plugins: envVars.S3_BUCKET ? [
      s3Storage({
        collections: { media: true },
        bucket: envVars.S3_BUCKET,
        config: {
          credentials: {
            accessKeyId: envVars.S3_ACCESS_KEY_ID,
            secretAccessKey: envVars.S3_SECRET_ACCESS_KEY,
          },
          region: envVars.S3_REGION,
        },
      }),
    ] : [],

    editor: slateEditor({}),
    secret: envVars.PAYLOAD_SECRET,

    typescript: {
      outputFile: path.resolve(dirname, "..", "payload-types.ts"),
    },
  });
}