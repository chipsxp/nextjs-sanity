import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";
import { stegaClean } from "next-sanity";

type SplitImageProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "splitImage" }
>;

export function SplitImage({ title, image, orientation }: SplitImageProps) {
  return (
    <section
      className="container mx-auto flex gap-8 py-16 data-[orientation='imageRight']:flex-row-reverse"
      data-orientation={stegaClean(orientation) || "imageLeft"}
    >
      {image ? (
        <Image
          className="rounded-xl w-2/3 h-auto"
          src={urlFor(image).width(800).height(600).url()}
          width={800}
          height={600}
          alt=""
        />
      ) : null}
      <div className="w-1/3 flex items-center">
        {title ? (
          <h2 className="text-3xl mx-auto md:text-5xl lg:text-8xl font-light text-pink-500 text-pretty max-w-3xl">
            {title}
          </h2>
        ) : null}
      </div>
    </section>
  );
}
