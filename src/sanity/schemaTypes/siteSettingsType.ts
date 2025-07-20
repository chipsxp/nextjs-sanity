import { defineField, defineType } from "sanity";
import { ControlsIcon } from "@sanity/icons";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: ControlsIcon,
  fields: [
    defineField({
      name: "homePage",
      type: "reference",
      to: [{ type: "page" }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
