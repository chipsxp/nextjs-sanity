import { Author } from "@/components/Author";
import { Categories } from "@/components/Categories";
import { POSTS_QUERYResult } from "@/sanity/types";
import { PublishedAt } from "@/components/PublishedAt";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export function PostCard(props: POSTS_QUERYResult[0]) {
  const { title, author, mainImage, publishedAt, categories } = props;

  return (
    <Link className="group" href={`/posts/${props.slug!.current}`}>
      <article className="flex flex-col-reverse gap-2 md:grid md:grid-cols-12 md:gap-1">
        <div className="md:col-span-8 md:pt-1">
          <div className="flex flex-wrap">
            <Categories categories={categories} />
          </div>
        </div>
        <div className="md:col-span-8 md:max-width-4">
          <h2 className="text-2xl text-pretty font-semibold group-hover:text-foreground-offset transition-colors relative">
            <span className="relative z-[2]">{title}</span>
            <span className="bg-background-offset z-1 absolute inset-0 rounded-lg opacity-0 transition-all group-hover:opacity-100 group-hover:scale-y-110 group-hover:scale-x-100 scale-75" />
          </h2>
          <div className="flex items-center mt-2 md:mt-6 gap-x-2">
            <Author author={author} />
            <PublishedAt publishedAt={publishedAt} />
          </div>
        </div>
        <div className="sm:col-start-9 sm:col-span-4 md:col-start-9 md:col-span-4 rounded-lg ml-2 flex">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(600).height(400).url()}
              width={600}
              height={400}
              alt={mainImage.alt || title || ""}
            />
          ) : null}
        </div>
      </article>
    </Link>
  );
}
