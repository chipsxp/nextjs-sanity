# PageBuilder Extension - Advanced Content Management

> **🚨 ATTENTION**: This branch contains the PageBuilder extension. If you're on the main branch, switch to the `pagebuilder` branch to access these features.

## Overview

The PageBuilder extension transforms the basic Next.js + Sanity blog into a powerful visual page builder system. This addition enables non-technical users to create rich, modular page layouts using a drag-and-drop interface in Sanity Studio.

### Key Capabilities
- **Visual Page Building**: Drag-and-drop content blocks in Sanity Studio
- **Modular Components**: Hero sections, feature lists, image layouts, and FAQs
- **Real-time Preview**: See changes instantly with Sanity's preview mode
- **Responsive Design**: All blocks are mobile-optimized
- **Type Safety**: Full TypeScript support with generated types

## Component Architecture

### Core Components

#### 1. PageBuilder.tsx
**Location**: `src/components/PageBuilder.tsx`
- **Purpose**: Main orchestrator for all page content
- **Features**:
  - Drag-and-drop support via Sanity's presentation mode
  - Real-time optimistic updates
  - Type-safe block rendering
  - Visual editing indicators

#### 2. Block Components

##### Hero Block (`src/components/blocks/Hero.tsx`)
- **Purpose**: Eye-catching hero section with image
- **Fields**:
  - Title (string)
  - Text content (rich text)
  - Background image
- **Schema**: `src/sanity/schemaTypes/blocks/heroType.ts`

##### Features Block (`src/components/blocks/Features.tsx`)
- **Purpose**: Showcase product/service features
- **Fields**:
  - Section title
  - Array of features (title + text)
- **Schema**: `src/sanity/schemaTypes/blocks/featuresType.ts`

##### SplitImage Block (`src/components/blocks/SplitImage.tsx`)
- **Purpose**: Image and text side-by-side layout
- **Fields**:
  - Title
  - Image
  - Orientation (image left/right)
- **Schema**: `src/sanity/schemaTypes/blocks/splitImageType.ts`

##### FAQs Block (`src/components/blocks/Faqs.tsx`)
- **Purpose**: Collapsible FAQ section
- **Fields**:
  - References to FAQ documents
  - Automatic dereferencing
- **Schema**: `src/sanity/schemaTypes/blocks/faqsType.ts`

### Schema Architecture

#### PageBuilder Schema (`src/sanity/schemaTypes/pageBuilderType.ts`)
```typescript
{
  name: "pageBuilder",
  type: "array",
  of: [
    { type: "hero" },
    { type: "splitImage" },
    { type: "features" },
    { type: "faqs" }
  ]
}
```

#### Individual Block Schemas
Each block has its own schema file in `src/sanity/schemaTypes/blocks/` with:
- Type-safe field definitions
- Preview configurations
- Icon assignments
- Validation rules

## How It Works

### 1. Content Creation Flow

#### In Sanity Studio:
1. Navigate to **Pages** in the studio
2. Create a new page or edit existing one
3. Add content blocks using the **+** button
4. Drag blocks to reorder
5. Fill in content for each block
6. Save and publish

#### Available Blocks:
- **Hero**: Large banner with title, text, and image
- **Features**: Grid of feature cards
- **Split Image**: Image with text (left/right layout)
- **FAQs**: Collapsible question/answer pairs

### 2. Data Flow

```mermaid
Sanity CMS → GROQ Query → TypeScript Types → React Components → Rendered Page
```

#### GROQ Queries (`src/sanity/lib/queries.ts`)
```typescript
export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ...,
  content[]{
    ...,
    _type == "hero" => {
      ...,
      title,
      text,
      image
    },
    _type == "splitImage" => {
      ...,
      title,
      image,
      orientation
    },
    _type == "faqs" => {
      ...,
      faqs[]->{
        _id,
        title,
        body,
        image
      }
    },
    _type == "features" => {
      ...,
      features[]{
        _key,
        title,
        text
      }
    }
  }
}`);
```

### 3. Type Safety

#### Generated Types
Run `npm run prebuild` to generate TypeScript types from Sanity schema:
- `src/sanity/types.ts` - Complete type definitions
- Type-safe component props
- Compile-time error checking

#### Component Props Example
```typescript
type PageBuilderProps = {
  content: NonNullable<PAGE_QUERYResult>["content"];
  documentId: string;
  documentType: string;
};
```

## Incident Reports & Solutions

### 1. TypeScript Compilation Issues
**Date**: July 20, 2025  
**Problem**: Property 'content' does not exist on type 'never'  
**Root Cause**: Incomplete GROQ query structure  
**Solution**: Added proper type definitions and null checks

### 2. PageBuilder Type Errors
**Date**: July 20, 2025  
**Problem**: Property '_key' does not exist on type 'never'  
**Root Cause**: Missing query expansions for hero and splitImage blocks  
**Solution**: Updated PAGE_QUERY with complete block expansions

### 3. Features Component Errors
**Date**: July 20, 2025  
**Problem**: Property 'map' does not exist on type 'never'  
**Root Cause**: Incomplete GROQ query for features array  
**Solution**: Added proper features array expansion with _key field

### 4. FAQs Null Safety Issues
**Date**: July 21, 2025  
**Problem**: TypeError when accessing faq.title on null references  
**Root Cause**: Broken Sanity references returning null values  
**Solution**: Added defensive programming with null filtering

### 5. Image URL Resolution Errors
**Date**: July 21, 2025  
**Problem**: Dev server interruptions during image uploads  
**Root Cause**: Sanity upload state objects not handled properly  
**Solution**: Created image validation utility (`src/sanity/lib/image-validation.ts`)

## Usage Instructions

### Environment Setup
1. **Switch to pagebuilder branch**:
   ```bash
   git checkout pagebuilder
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Generate TypeScript types**:
   ```bash
   npm run prebuild
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

### Sanity Studio Configuration
1. **Access Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)
2. **Create Page Structure**:
   - Go to **Structure** → **Pages**
   - Add new page with slug
   - Add content blocks as needed

### Content Creation Workflow
1. **Create FAQ Documents** (if using FAQs block):
   - Go to **FAQs** section
   - Create individual FAQ items
   - Reference them in FAQs blocks

2. **Upload Images**:
   - Use Sanity's built-in image upload
   - Images are automatically optimized
   - Upload state is handled gracefully

3. **Preview Changes**:
   - Use Sanity's preview mode
   - See changes in real-time
   - Test on different screen sizes

## Advanced Features

### Visual Editing
- **Drag-and-drop**: Reorder blocks visually
- **Inline editing**: Click to edit content directly
- **Preview mode**: See changes before publishing

### Responsive Design
- **Mobile-first**: All blocks optimized for mobile
- **Container queries**: Dynamic sizing based on container
- **Flexible layouts**: Adapts to different screen sizes

### Performance Optimizations
- **Image optimization**: Automatic Next.js Image component usage
- **Lazy loading**: Images load as needed
- **Type generation**: Compile-time type checking

## Troubleshooting

### Common Issues

#### "Property does not exist" TypeScript errors
**Solution**: Run `npm run prebuild` to regenerate types after schema changes

#### Images not displaying
**Solution**: Check image validation in `src/sanity/lib/image-validation.ts`

#### Broken references in FAQs
**Solution**: Ensure FAQ documents exist and are published

#### Dev server crashes on image upload
**Solution**: Image validation utility handles upload states automatically

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run prebuild     # Generate TypeScript types
npm run extract      # Extract Sanity schema
npm run lint         # Run ESLint
```

## File Structure

```
src/
├── components/
│   ├── PageBuilder.tsx          # Main page builder component
│   └── blocks/                  # Individual block components
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── SplitImage.tsx
│       └── Faqs.tsx
├── sanity/
│   ├── schemaTypes/
│   │   ├── pageBuilderType.ts   # Page builder schema
│   │   └── blocks/              # Individual block schemas
│   │       ├── heroType.ts
│   │       ├── featuresType.ts
│   │       ├── splitImageType.ts
│   │       └── faqsType.ts
│   ├── lib/
│   │   ├── queries.ts
