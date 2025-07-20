import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export const featuresType = defineType({
  name: "features",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "features",
      type: "array",
      of: [
        defineField({
          name: "feature",
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
            }),
            defineField({
              name: "text",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
  icon: StarIcon,
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Features",
      };
    },
  },
});
