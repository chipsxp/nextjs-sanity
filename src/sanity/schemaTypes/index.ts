import { type SchemaTypeDefinition } from "sanity";
// Sanity Studio Basic Blog
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
// Sanity Basic Page and Document builder
import { pageType } from "./pageType";
import { pageBuilderType } from "./pageBuilderType";
import { faqType } from "./faqType";
import { faqsType } from "./blocks/faqsType";
import { featuresType } from "./blocks/featuresType";
import { heroType } from "./blocks/heroType";
import { splitImageType } from "./blocks/splitImageType";
import { siteSettingsType } from "./siteSettingsType";

// Export values from the imports from single file
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, 
        pageType, 
        pageBuilderType, 
        faqType, 
        faqsType, 
        featuresType, 
        heroType, 
        splitImageType, 
        categoryType, 
        postType, 
        authorType, 
        siteSettingsType,
      ],
};
