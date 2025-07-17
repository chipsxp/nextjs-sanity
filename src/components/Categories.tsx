import { POST_QUERYResult } from "@/sanity/types";

type CategoriesProps = {
  categories: NonNullable<POST_QUERYResult>["categories"];
};

export function Categories({ categories }: CategoriesProps) {
  return categories.map((category) => (
    <span
      key={category._id}
      className="bg-primary-offset font-sans rounded-full px-2 py-1 leading-none whitespace-nowrap text-sm font-semibold text-foreground inline-block mb-1 mr-1"
    >
      {category.title}
    </span>
  ));
}
