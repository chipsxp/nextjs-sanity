# Incident Report: FAQs Component TypeError

**Date:** July 21, 2025  
**Time:** 5:44 PM - 6:37 PM (EST)  
**Component:** `src/components/blocks/Faqs.tsx`  
**Error:** TypeError: Cannot read of null (reading 'title')  
**Severity:** Medium  
**Status:** Resolved ✅

## Problem Description

The FAQs component was throwing a TypeError when trying to access `faq.title` on line 26. The error occurred during the `.map()` operation on the `faqs` array, specifically when attempting to read the `title` property of individual FAQ items.

**Error Details:**
- **Location:** `src/components/blocks/Faqs.tsx:26:21`
- **Error Type:** TypeError: Cannot read properties of null (reading 'title')
- **Stack Trace:** Array.map operation on faqs array

## Root Cause Analysis

The issue was caused by insufficient null safety in the component's data handling. Specifically:

1. **Broken Sanity References:** The `faqs` array contains references to FAQ documents using Sanity's dereferencing syntax (`faqs[]->`), which can return `null` values when:
   - The referenced FAQ document has been deleted
   - The reference is invalid or corrupted
   - The document exists but required fields are missing

2. **Missing Validation:** The component was directly accessing `faq.title` without checking if `faq` itself was valid

3. **TypeScript Type Safety Gap:** While TypeScript provides compile-time safety, runtime null values from external data sources weren't being handled

## Technical Details

### Affected Code
```typescript
// Before fix - problematic code
{faqs.map((faq) => (
  <details key={faq._id}>
    <summary>{faq.title}</summary> {/* Error here */}
  </details>
))}
```

### Data Flow
1. Sanity CMS stores FAQ references in the `faqs` field
2. GraphQL query dereferences these using `faqs[]->` syntax
3. Broken references result in `null` values in the array
4. Component attempts to access properties on null objects

## Solution Implemented

Added comprehensive null safety checks using defensive programming:

```typescript
// After fix - null-safe code
{faqs
  .filter((faq) => faq && faq._id && faq.title)
  .map((faq) => (
    <details key={faq._id}>
      <summary>{faq.title}</summary>
    </details>
  ))}
```

**Changes Made:**
- Added `.filter()` to remove null/undefined FAQ items
- Added validation for required properties (`_id`, `title`)
- Maintained existing functionality while preventing crashes

## Files Modified

| File | Changes | Lines |
|------|---------|--------|
| `src/components/blocks/Faqs.tsx` | Added null safety filter before map operation | 19-35 |

## Impact Assessment

### Positive Impact
- **Prevents Runtime Crashes:** Component no longer crashes when encountering invalid FAQ data
- **Improves Resilience:** Better handling of broken Sanity references
- **Maintains UX:** Users see valid FAQs while invalid ones are silently filtered
- **Future-Proof:** Pattern can be applied to similar components

### Risk Mitigation
- **Data Integrity:** Gracefully handles data inconsistencies
- **User Experience:** No broken pages due to backend data issues
- **Developer Experience:** Clear pattern for handling similar issues

## Testing Performed

1. **Manual Testing:** Verified component renders correctly with valid FAQ data
2. **Edge Case Testing:** Confirmed component handles null FAQ items gracefully
3. **Regression Testing:** Ensured existing functionality remains intact

## Prevention Strategies

### Immediate Actions
1. **Code Review:** Implement mandatory null safety checks for all array operations on external data
2. **Documentation:** Update component documentation to include null safety requirements

### Long-term Improvements
1. **Type Guards:** Implement TypeScript type guards for Sanity data validation
2. **Error Boundaries:** Add React error boundaries for graceful degradation
3. **Data Validation:** Consider implementing stricter validation at the data layer
4. **Testing:** Add unit tests for null/undefined data scenarios

### Best Practices Established
- Always validate array items before accessing properties in TypeScript/Sanity integrations
- Use defensive programming when dealing with external data sources
- Implement proper error handling for GraphQL dereferencing operations

## Related Issues

- Similar patterns should be reviewed in other components that handle Sanity references
- Consider implementing a shared utility for null-safe array operations

## Lessons Learned

1. **External Data Validation:** Never trust external data sources to provide complete, valid data
2. **Runtime vs Compile-time Safety:** TypeScript's compile-time safety doesn't prevent runtime null issues
3. **Defensive Programming:** Small defensive checks can prevent major user experience issues
4. **Sanity CMS Integration:** Special attention needed when working with referenced documents

## Follow-up Actions

- [ ] Review similar components for null safety issues
- [ ] Create shared utilities for common null-safe operations
- [ ] Add error monitoring for data validation issues
- [ ] Update development guidelines to include null safety requirements
