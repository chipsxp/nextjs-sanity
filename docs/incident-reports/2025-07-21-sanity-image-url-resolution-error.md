# Incident Report: Sanity Image URL Resolution Error

**Date:** July 21, 2025  
**Severity:** High - Dev Server Interruption  
**Status:** Resolved  
**Reporter:** Development Team  
**Assignee:** Cline (AI Assistant)

## Summary
A critical TypeScript error occurred when adding SplitImage components with images in Sanity Studio, causing dev server interruptions. The error manifested as "Unable to resolve image URL from source" when images were in upload state.

## Error Details

### Primary Error Message
```
Unable to resolve image URL from source ({"_type":"image","_upload":{"createdAt":"2025-07-21T19:30:53.722Z","file":{"name":"7XP5ZGxWpaICV6OvSwCk--2--ranrz.jpg​​​​‌﻿‍﻿​‍​‍‌‍﻿﻿‌﻿​‍‌‍‍‌‌‍‌﻿‌‍‍‌‌‍﻿‍​‍​‍​﻿‍‍​‍​‍‌﻿​﻿‌‍​‌‌‍﻿‍‌‍‍‌‌﻿‌​‌﻿‍‌​‍﻿‍‌‍‍‌‌‍﻿﻿​‍​‍​‍﻿​​‍​‍‌‍‍​‌﻿​‍‌‍‌‌‌‍‌‍​‍​‍​﻿‍‍​‍​‍​‍﻿﻿‌﻿​﻿‌﻿‌​‌﻿‌‌‌‍‌​‌‍‍‌‌‍﻿﻿​‍﻿﻿‌‍‍‌‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍﻿﻿‌‍‌‌‌‍‌​‌‍‍‌‌﻿‌​​‍﻿﻿‌‍﻿‌‌‍﻿﻿‌‍‌​‌‍‌‌​﻿﻿‌‌﻿​​‌﻿​‍‌‍‌‌‌﻿​﻿‌‍‌‌‌‍﻿‍‌﻿‌​‌‍​‌‌﻿‌​‌‍‍‌‌‍﻿﻿‌‍﻿‍​﻿‍﻿‌‍‍‌‌‍‌​​﻿﻿‌​﻿​﻿‌‍‌‌​﻿‌‍‌‍​‌​﻿‌‌​﻿‌​​﻿‌﻿‌‍​‍​‍﻿‌​﻿​‌‌‍‌‍‌‍‌​​﻿​‌​‍﻿‌​﻿‌​‌‍‌‌‌‍​﻿​﻿‍‌​‍﻿‌​﻿‍​​﻿‌﻿​﻿‌‌‌‍​‌​‍﻿‌​﻿‌​​﻿​‍​﻿‌﻿​﻿​‍​﻿‍​​﻿‌​​﻿‍​‌‍‌‍​﻿​‍‌‍‌‍‌‍​‍​﻿​‍​‍‌‍‌﻿‌​‌﻿‍‌‌﻿​​‌‍‌‌​﻿﻿‌‌﻿​​‌‍​‌‌‍‌﻿‌‍‌‌​﻿‍﻿‌﻿​​‌‍​‌‌﻿‌​‌‍‍​​﻿﻿‌‌‍​﻿‌‍﻿﻿‌‍﻿‍‌﻿‌​‌‍‌‌‌‍﻿‍‌﻿‌​​‍‌‌​﻿‌‌‌​​‍‌‌﻿﻿‌‍‍﻿‌‍‌‌‌﻿‍‌​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​﻿‌​‌​​‍‌‌​﻿​‍​﻿​‍‌‍​‌​﻿‍‌​﻿​﻿​﻿‌‌‌‍‌‍​﻿​​​﻿‌﻿​﻿​​​﻿‌‍‌‍​‍​﻿‌‍‌‍‌‍​‍‌‌​﻿​‍​﻿​‍​‍‌‌​﻿‌‌‌​‌​​‍﻿‍‌‍‍‌‌‍﻿‌‌‍​‌‌‍‌﻿‌‍‌‌​‍﻿‍‌‌﻿﻿‌﻿‌‌‌﻿​​‌‍﻿​‌‍﻿﻿‌‍​‌‌‍‌​​‍﻿‍‌‍‌‍‌‍‍‌‌‍﻿​‌‍‌‌​‍﻿‍‌‍﻿‍‌‍​‌‌‍﻿‌‌‍‌‌​‍​‍‌﻿﻿‌","type":"image/jpeg"},"progress":2,"updatedAt":"2025-07-21T19:30:53.722Z"}})
```

### Root Cause Analysis
The error occurred because Sanity temporarily stores images with an `_upload` property during the upload process, but the `urlFor()` function from `@sanity/image-url` expects a proper image asset reference with `_ref` property.

### Affected Components
- `SplitImage.tsx` - Primary component where issue was reported
- `Hero.tsx` - Similar image handling pattern
- `PostCard.tsx` - Post listing images
- `Post.tsx` - Individual post images
- `Author.tsx` - Author profile images

## Technical Details

### Image Object States
1. **Upload State**: `{"_type":"image","_upload":{...}}`
2. **Ready State**: `{"_type":"image","asset":{"_ref":"...", "_type":"reference"}}`

### TypeScript Issues
- Type mismatch between `SanityImageSource` and upload-state objects
- Missing null checks for optional image fields
- No validation for asset reference existence

## Solution Implementation

### 1. Created Image Validation Utility
**File:** `src/sanity/lib/image-validation.ts`

```typescript
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export function hasValidImageAsset(image: unknown): image is SanityImageSource {
  return Boolean(
    image && 
    typeof image === 'object' && 
    'asset' in image && 
    image.asset && 
    typeof image.asset === 'object' && 
    '_ref' in image.asset && 
    (image.asset as { _ref?: string })._ref
  );
}

export function isImageReady(image: unknown): image is SanityImageSource {
  if (!hasValidImageAsset(image)) {
    return false;
  }
  if (image && typeof image === 'object' && '_upload' in image) {
    return false;
  }
  return true;
}
```

### 2. Updated All Image Components
**Pattern Applied:** Replace `image ? (...)` with `isImageReady(image) ? (...)`

**Components Updated:**
- `src/components/blocks/SplitImage.tsx`
- `src/components/blocks/Hero.tsx`
- `src/components/PostCard.tsx`
- `src/components/Post.tsx`
- `src/components/Author.tsx`

### 3. Type Safety Improvements
- Added proper TypeScript type predicates
- Eliminated `any` type usage
- Improved null safety with optional chaining

## Testing Results
- ✅ No more dev server interruptions during image uploads
- ✅ Images render correctly when upload completes
- ✅ Graceful handling of missing/invalid images
- ✅ TypeScript compilation passes without errors

## Lessons Learned
1. **Always validate image state** before URL generation
2. **Handle upload states explicitly** in image components
3. **Centralize validation logic** for maintainability
4. **Use type predicates** for better TypeScript integration

## Future Recommendations
1. Consider adding loading states for images during upload
2. Implement retry mechanisms for failed uploads
3. Add visual indicators for upload progress
4. Consider using Sanity's real-time listeners for upload state updates

## Related Files
- `src/sanity/lib/image-validation.ts` - New validation utility
- `src/components/blocks/SplitImage.tsx` - Primary affected component
- `src/components/blocks/Hero.tsx` - Secondary component
- All other image-handling components updated for consistency

## Resolution Time
- **Detection:** July 21, 2024, 4:12 PM
- **Resolution:** July 21, 2024, 4:44 PM
- **Total Time:** 32 minutes
