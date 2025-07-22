import { defineField, defineType } from "sanity";

export const faqType = defineType({
     name: "faq",
     title: "FAQ",
     type: "document",
     fields: [
     defineField({
          name: "title",
          type: "string",
     }),
     defineField({
          name: "body",
          type: "blockContent",
     }),
     defineField({
          name: "image",
          type: "image",
          title: "FAQ Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            }
          ]
     }),
     ],
});
