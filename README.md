# Next.js + Sanity Studio Blog Project

A modern, full-stack blog application built with Next.js 15 and Sanity Studio, featuring embedded content management, responsive design, and optimized performance.

> **📋 IMPORTANT**: If you're on the **pagebuilder** branch, please read [README-PAGEBUILDER.md](./README-PAGEBUILDER.md) for detailed information about the PageBuilder extension, component architecture, and advanced content management features.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Git or GitHub Desktop
- A Sanity.io account (free)

### Clone & Install

#### Option 1: Using Git CLI
```bash
# Clone the repository
git clone https://github.com/chipsxp/nextjs-sanity.git

# Navigate to project directory
cd nextjs-sanity

# Install dependencies
npm install
```

#### Option 2: Using GitHub Desktop
1. Open GitHub Desktop
2. Click **File → Clone Repository**
3. Select **URL** tab
4. Enter: `https://github.com/chipsxp/nextjs-sanity.git`
5. Choose local path and click **Clone**
6. Open terminal in the cloned folder and run: `npm install`

### Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Create environment file
touch .env.local
```

Add your Sanity configuration:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-07

# Sanity API Access
SANITY_API_READ_TOKEN=your_read_token_here
SANITY_REVALIDATE_SECRET=your_revalidate_secret_here
```

#### Getting Your Sanity Keys:

1. **Create Sanity Project**:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Click **Create new project**
   - Choose **Blog** template or start blank

2. **Find Project ID**:
   - In your Sanity dashboard, select your project
   - Project ID is displayed in the URL: `sanity.io/manage/personal/project/YOUR_PROJECT_ID`
   - Or find it in **Settings → API**

3. **Create Dataset**:
   - Default dataset is `production`
   - Create additional datasets in **Settings → Datasets**

4. **Generate API Token** (optional for write access):
   - Go to **Settings → API → Tokens**
   - Click **Add API token**
   - Give it a name and select permissions
   - Copy the token (starts with `sk...`)

5. **Generate Read Token** (`SANITY_API_READ_TOKEN`):
   - Go to **Settings → API → Tokens**
   - Click **Add API token**
   - Name: "Read Token"
   - Permissions: **Viewer** (read-only access)
   - Copy the token (starts with `sk...`)

6. **Create Revalidation Secret** (`SANITY_REVALIDATE_SECRET`):
   - This is a custom secret string for webhook security
   - Generate a random string (32+ characters recommended)
   - Can be generated using: `openssl rand -base64 32` or online password generator
   - Save this securely - it's used for webhook validation

## 🎨 UI Styling Configuration

### TailwindCSS Setup
This project uses **TailwindCSS v4.1.11** with custom configuration:

- **Location**: `src/app/globals.css`
- **Features**: Dark mode support, custom color palette, responsive typography
- **Plugins**: `@tailwindcss/typography` for blog content styling

### Color System
```css
/* Light Mode */
--color-background: #fef3c7 (warm yellow)
--color-foreground: #111827 (dark gray)
--color-primary: #fde68a (soft yellow)

/* Dark Mode */
--dark-color-background: #312e81 (deep indigo)
--dark-color-foreground: #e0e7ff (light indigo)
--dark-color-primary: #818cf8 (soft indigo)
```

### Typography
- **Font**: Inter (Google Fonts)
- **Responsive**: Container queries for dynamic sizing
- **Blog Content**: Prose styling with `prose-custom` class

### Key CSS Features
- Automatic dark/light mode switching
- Custom utility classes (`.text-balance`, `.link-hover`)
- Responsive container queries
- Optimized font loading

## 🌐 Development URLs

### Local Development
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Sanity Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

### Available Scripts
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prebuild     # Generate TypeScript types from Sanity schema
npm run extract      # Extract Sanity schema for type generation
```

## 📋 Past Problems & Solutions

### 1. Image Optimization Issues
**Problem**: Logo images not displaying correctly in production
**Solution**: Use explicit width/height props with Next.js Image component instead of fill prop
```tsx
// ✅ Correct approach
<div className='relative w-8 h-8'>
  <Image
    src='/logo.png'
    alt='logo'
    width={32}
    height={32}
    className='object-contain'
  />
</div>
```

### 2. Environment Variable Validation
**Problem**: Missing environment variables causing runtime errors
**Solution**: Added validation in `src/sanity/env.ts` with helpful error messages
```typescript
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}
```

### 3. TypeScript Integration
**Problem**: TypeScript errors with Sanity schema
**Solution**: Implemented automatic type generation with `sanity typegen`
- Schema extracted to `src/sanity/extract.json`
- Types generated during build process
- Full TypeScript support for queries and mutations

### 4. Dark Mode Implementation
**Problem**: Inconsistent dark mode styling
**Solution**: CSS custom properties with automatic switching
- Uses `prefers-color-scheme` media query
- Custom CSS variables for consistent theming
- Smooth transitions between modes

### 5. Responsive Typography
**Problem**: Typography not scaling properly on different screen sizes
**Solution**: Container queries with Tailwind CSS
```css
@container (width > 528px) {
  h1 {
    font-size: 4em;
  }
}
```

## 🏗️ Project Structure

```
nextjs-sanity/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Public-facing routes
│   │   │   ├── posts/          # Blog post routes
│   │   │   └── page.tsx        # Homepage
│   │   ├── api/                # API routes
│   │   ├── studio/             # Sanity Studio route
│   │   ├── globals.css         # Global styles
│   │   └── layout.tsx          # Root layout
│   ├── components/             # Reusable React components
│   └── sanity/                 # Sanity configuration
│       ├── schemaTypes/        # Content schemas
│       ├── lib/               # Sanity client utilities
│       └── types.ts           # Generated TypeScript types
├── public/                    # Static assets
└── .env.local                 # Environment variables
```

## 🎓 Course Context

This project is part of the **Work-ready Next.js + Sanity Studio Learn Course and Certification** program, covering:

- **Module 1**: Next.js 15 fundamentals with App Router
- **Module 2**: Sanity Studio integration and content modeling
- **Module 3**: Advanced querying with GROQ
- **Module 4**: Real-time preview and visual editing
- **Module 5**: Deployment and performance optimization
- **Module 6**: Advanced features and production considerations

### Current Progress
- ✅ Basic Next.js setup with TypeScript
- ✅ Sanity Studio embedded and configured
- ✅ Responsive design with TailwindCSS
- ✅ Content schemas defined (Posts, Authors, Categories)
- ✅ TypeScript type generation
- 🔄 Next: Advanced querying and preview features

## 🔗 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Course Repository](https://github.com/chipsxp/nextjs-sanity)

## 🐛 Troubleshooting

### Common Issues

1. **"Missing environment variable" error**
   - Ensure `.env.local` exists with all required variables
   - Restart development server after adding variables

2. **Sanity Studio not loading**
   - Check Sanity project ID and dataset name
   - Verify CORS settings in Sanity dashboard

3. **Build failures**
   - Run `npm run prebuild` to generate types
   - Check for TypeScript errors with `npm run lint`

4. **Images not displaying**
   - Ensure images are in `/public` directory
   - Use correct path format: `/image-name.jpg`

For additional support, check the [Issues](https://github.com/chipsxp/nextjs-sanity/issues) page or create a new issue.
