import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { slateEditor } from "@payloadcms/richtext-slate";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const config = buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // -----------------
  // Database (Neon)
  // -----------------
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // required for Neon
    },
  }),

  // -----------------
  // Collections
  // -----------------
  collections: [
    // Users
    {
      slug: "users",
      auth: true,
      admin: { 
        useAsTitle: "email",
        // Hide from clients - they access via /dashboard
        hidden: ({ user }) => user?.role !== 'admin',
      },
      access: {
        // Admin can manage all users, clients can only read their own profile
        create: ({ req }) => req.user?.role === 'admin',
        read: ({ req }) => {
          if (req.user?.role === 'admin') return true;
          // Clients can only read their own profile
          return {
            id: {
              equals: req.user?.id,
            },
          };
        },
        update: ({ req }) => {
          if (req.user?.role === 'admin') return true;
          // Clients can only update their own profile
          return {
            id: {
              equals: req.user?.id,
            },
          };
        },
        delete: ({ req }) => req.user?.role === 'admin',
      },
      fields: [
        {
          name: "role",
          type: "select",
          options: [
            { label: "Admin", value: "admin" },
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
      access: {
        read: () => true, // Allow public read access to media files
      },
      upload: {
        imageSizes: [
          { name: "thumbnail", width: 400, height: 300, crop: "centre" },
          { name: "card", width: 768, height: 1024, crop: "centre" },
        ],
        mimeTypes: ["image/*"],
      },
      fields: [{ name: "alt", type: "text", required: true }],
    },

    // Posts
    {
      slug: "posts",
      admin: { 
        useAsTitle: "title",
        hidden: ({ user }) => user?.role !== 'admin',
      },
      access: {
        // Only admins can manage posts
        create: ({ req }) => req.user?.role === 'admin',
        read: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
        delete: ({ req }) => req.user?.role === 'admin',
      },
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

    // Inquiries - Private session requests
    {
      slug: "inquiries",
      admin: { 
        useAsTitle: "clientName",
        hidden: ({ user }) => user?.role !== 'admin',
      },
      access: {
        // Only admins can manage inquiries
        create: () => true, // Public contact form can create
        read: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
        delete: ({ req }) => req.user?.role === 'admin',
      },
      fields: [
        { name: "clientName", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "phone", type: "text", required: true },
        { name: "dogName", type: "text", required: true },
        { name: "dogBreed", type: "text" },
        { name: "dogAge", type: "text" },
        { name: "behaviorIssues", type: "textarea" },
        { name: "previousTraining", type: "textarea" },
        { name: "goals", type: "textarea", required: true },
        { name: "preferredDays", type: "text" },
        { name: "preferredTimes", type: "text" },
        { name: "additionalInfo", type: "textarea" },
        {
          name: "status",
          type: "select",
          options: [
            { label: "New", value: "new" },
            { label: "Contacted", value: "contacted" },
            { label: "Scheduled", value: "scheduled" },
            { label: "Completed", value: "completed" },
          ],
          defaultValue: "new",
          required: true,
        },
        { name: "adminNotes", type: "textarea", admin: { description: "Internal notes (not visible to client)" } },
      ],
    },

    // Services
    {
      slug: "services",
      admin: { 
        useAsTitle: "name",
        hidden: ({ user }) => user?.role !== 'admin',
      },
      access: {
        // Only admins can manage services
        create: ({ req }) => req.user?.role === 'admin',
        read: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
        delete: ({ req }) => req.user?.role === 'admin',
      },
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "description",
          type: "richText",
          editor: slateEditor({}),
          required: true,
        },
        { name: "price", type: "number", required: true },
        { name: "currency", type: "text", defaultValue: "GBP", required: true },
        {
          name: "duration",
          type: "number",
          label: "Duration (minutes)",
          required: true,
        },
        {
          name: "type",
          type: "select",
          options: [
            { label: "Private Session", value: "private" },
            { label: "Group Class", value: "group" },
            { label: "Workshop", value: "workshop" },
          ],
          required: true,
        },
        { name: "image", type: "upload", relationTo: "media" },
        { name: "isActive", type: "checkbox", defaultValue: true },
        {
          name: "maxParticipants",
          type: "number",
          admin: {
            condition: (data) =>
              data.type === "group" || data.type === "workshop",
            description: "Maximum number of participants for group classes/workshops",
          },
        },
        {
          name: "scheduledDate",
          type: "date",
          admin: {
            condition: (data) =>
              data.type === "group" || data.type === "workshop",
            date: { pickerAppearance: "dayAndTime" },
            description: "Scheduled date and time for this session",
          },
        },
        {
          name: "location",
          type: "text",
          admin: {
            condition: (data) =>
              data.type === "group" || data.type === "workshop",
            description: "Location where the session will take place",
          },
        },
      ],
    },

    // Bookings
    {
      slug: "bookings",
      admin: { 
        useAsTitle: "id",
        hidden: ({ user }) => user?.role !== 'admin',
      },
      access: {
        // Admin can manage all bookings
        create: ({ req }) => req.user?.role === 'admin',
        read: ({ req }) => {
          if (req.user?.role === 'admin') return true;
          // Clients can only see their own bookings
          return {
            client: {
              equals: req.user?.id,
            },
          };
        },
        update: ({ req }) => req.user?.role === 'admin', // Only admin can update
        delete: ({ req }) => req.user?.role === 'admin', // Only admin can delete
      },
      fields: [
        {
          name: "client",
          type: "relationship",
          relationTo: "users",
          required: true,
        },
        {
          name: "service",
          type: "relationship",
          relationTo: "services",
          required: true,
        },
        {
          name: "scheduledAt",
          type: "date",
          admin: { date: { pickerAppearance: "dayAndTime" } },
          required: true,
        },
        {
          name: "status",
          type: "select",
          options: [
            { label: "Pending", value: "pending" },
            { label: "Confirmed", value: "confirmed" },
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
          ],
          defaultValue: "pending",
          required: true,
        },
        { name: "notes", type: "textarea" },
        {
          name: "paymentStatus",
          type: "select",
          options: [
            { label: "Pending", value: "pending" },
            { label: "Paid", value: "paid" },
            { label: "Refunded", value: "refunded" },
          ],
          defaultValue: "pending",
          required: true,
        },
        { name: "stripePaymentIntentId", type: "text" },
      ],
    },
  ],

  // -----------------
  // S3 Storage plugin
  // -----------------
  plugins: [
    s3Storage({
      collections: { media: true },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION!,
      },
    }),
  ],

  editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET || "your-secret-here",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});

export default config;
