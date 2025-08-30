# Blupi Dog Training Website

A modern dog training website built with **Next.js 15** and **Payload CMS 3.x**, featuring a complete content management system for the trainer and a beautiful client-facing website.

## 🚀 Modern Tech Stack

- **Next.js 15** - Latest React framework with App Router
- **Payload CMS 3.x** - Modern headless CMS with auto-generated admin panel
- **Neon PostgreSQL** - Serverless database (free tier)
- **Mantine UI** - Beautiful, accessible React components
- **AWS Amplify** - Serverless deployment and hosting
- **TypeScript** - Type-safe development

## 🏗️ Architecture

```
Single Next.js App (AWS Amplify) ⟷ Neon PostgreSQL (Cloud)
        ↓
Built-in Admin Panel (/admin)
```

**Benefits:**
- ✅ **$0/month hosting** (Neon free + Amplify)
- ✅ **No server management** required
- ✅ **Automatic SSL** and CDN
- ✅ **Scales automatically** with traffic

## 📱 What Users See

### **Client Website (`blupidogtraining.com`)**
- **Beautiful homepage** with service showcases
- **Enhanced blog** with search and tag filtering
- **Service pages** for booking different training types
- **Contact forms** and testimonials
- **Mobile responsive** design

### **Trainer Admin Panel (`blupidogtraining.com/admin`)**
**🎨 Fully designed - NO coding required!**
- **Rich dashboard** with content overview
- **Blog editor** with WYSIWYG and image uploads
- **Service management** with pricing and descriptions  
- **Testimonial moderation** with client photos
- **Booking management** and client data
- **Media library** with automatic image resizing
- **User management** with role-based access

## 📦 Content Collections

| Collection | Purpose | Fields |
|------------|---------|--------|
| **Posts** | Blog articles | Title, content, images, tags, publish status |
| **Services** | Training offerings | Name, description, price, duration, type |
| **Testimonials** | Client reviews | Name, review, rating, photo, service type |
| **Bookings** | Appointments | Client, service, date/time, payment status |
| **Users** | Authentication | Email, role (admin/trainer/client), profile |
| **Media** | File uploads | Images with auto-generated thumbnails |

## 🚀 Quick Start

### 1. **Clone and Install**
```bash
git clone [your-repo]
cd blupi-dog-training
npm install
```

### 2. **Environment Setup**
```bash
cp .env.local.example .env.local
# Add your Neon database URL and Payload secret
```

### 3. **Development**
```bash
npm run dev
# Visit http://localhost:3000
# Admin: http://localhost:3000/admin
```

### 4. **First Time Setup**
1. Visit `http://localhost:3000/admin`
2. Create your first admin account
3. Start adding blog posts and services!

## 📁 Project Structure

```
app/                      # Next.js App Router
├── (payload)/           # Payload CMS routes (grouped)
│   ├── admin/          # Auto-generated admin panel
│   └── api/           # REST API endpoints  
├── blog/              # Enhanced blog with filtering
├── components/        # Reusable UI components
├── constants/         # Theme and image configs
├── layout.tsx        # Root layout with providers
├── page.tsx         # Homepage
└── providers.tsx    # Mantine and other providers

payload.config.ts     # CMS schema and configuration
next.config.js       # Next.js configuration  
tailwind.config.js   # Tailwind CSS setup
```

## 🌐 Deployment

### **AWS Amplify (Recommended)**

1. **Connect Repository**
   - Link your Git repository to AWS Amplify

2. **Environment Variables**
   ```
   DATABASE_URL=your-neon-connection-string
   PAYLOAD_SECRET=your-secure-random-key
   ```

3. **Deploy**
   - Amplify automatically builds and deploys on Git push
   - SSL certificate and CDN included

## 📊 Database Management

### **Neon Console** (Web-based)
1. Visit [console.neon.tech](https://console.neon.tech)
2. Select your project → SQL Editor
3. Query your data directly

### **TablePlus** (Desktop)
- Connect directly using your Neon connection string
- Visual interface for browsing tables and data

### **Admin Panel** (User-friendly)
- Most content management through `/admin`
- No SQL knowledge required

## 🎯 Key Features

### **Enhanced Blog System**
- **Search functionality** - Find posts by title, content, or tags
- **Tag filtering** - Clickable tag buttons for easy browsing  
- **Rich content** - WYSIWYG editor with image support
- **SEO optimized** - Meta tags and structured data

### **Service Management**
- **Three service types**: Private 1-2-1, Group Classes, Workshops
- **Flexible pricing** with currency support
- **Booking integration** with client management
- **Custom descriptions** with rich text formatting

### **Professional Admin Experience**
- **Auto-generated UI** based on your schema
- **Role-based permissions** (admin, trainer, client)
- **Media management** with automatic image optimization
- **Mobile responsive** admin panel

## 🔧 Customization

### **Adding New Pages**
```bash
# Create app/about/page.tsx for /about route
# Create app/contact/page.tsx for /contact route
```

### **Modifying Content Types**
Edit `payload.config.ts` and restart the dev server. The admin panel updates automatically!

### **Styling Changes**
- Update `app/constants/theme.ts` for colors
- Modify `tailwind.config.js` for Tailwind classes
- Edit component files for specific UI changes

## 🎨 Admin Panel Screenshots

**No screenshots needed - visit `/admin` to see the beautiful, fully-designed interface!**

The admin panel is automatically generated from your content schema and includes:
- Dashboard with analytics
- Rich text editor for blog posts
- Image upload with drag & drop
- User management interface
- Professional dark/light theme

## 🚨 Important Notes

- **Admin Access**: Only the trainer needs to know the `/admin` URL
- **Database**: All system tables (`payload_*`) are normal and required
- **Security**: Payload handles authentication, CSRF protection, and validation
- **Backups**: Neon provides automated backups on paid plans

Your modern dog training website is ready to launch! 🐕✨