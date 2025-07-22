import { POST_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { isImageReady } from "@/sanity/lib/image-validation";
import Image from "next/image";

type AuthorProps = {
  author: NonNullable<POST_QUERYResult>["author"];
};

export function Author({ author }: AuthorProps) {
  return author?.image || author?.name ? (
    <div className="flex items-center gap-2">
      {isImageReady(author?.image) ? (
        <Image
          src={urlFor(author.image).width(80).height(80).url()}
          width={80}
          height={80}
          alt={author.name || ""}
          className="size-10 shadow-inner rounded-full"
        />
      ) : null}
      {author?.name ? (
        <p className="text-base font-sans text-foreground">{author.name}</p>
      ) : null}
    </div>
  ) : null;
}
