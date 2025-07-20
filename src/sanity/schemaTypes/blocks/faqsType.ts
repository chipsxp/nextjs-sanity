import { defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export const faqsType = defineType({
  name: "faqs",
  title: "FAQs",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
  ],
  icon: HelpCircleIcon,
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "FAQs",
      };
    },
  },
});
