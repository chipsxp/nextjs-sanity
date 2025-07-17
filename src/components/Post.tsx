import { Author } from "@/components/Author";
import { RelatedPosts } from "@/components/RelatedPosts";
import { Categories } from "@/components/Categories";
import { components } from "@/sanity/portableTextComponents";
import { PortableText } from "next-sanity";
import { POST_QUERYResult } from "@/sanity/types";
import { PublishedAt } from "@/components/PublishedAt";
import { Title } from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export function Post(props: NonNullable<POST_QUERYResult>) {
  const {
    _id,
    title,
    author,
    mainImage,
    body,
    publishedAt,
    categories,
    relatedPosts,
  } = props;

  return (
    <article className="grid lg:grid-cols-12 gap-y-12">
      <header className="lg:col-span-12 flex flex-col gap-4 items-start">
        <div className="flex gap-4 items-center">
          <Categories categories={categories} />
          <PublishedAt publishedAt={publishedAt} />
        </div>
        <Title>{title}</Title>
        <Author author={author} />
      </header>
      
      {mainImage ? (
        <figure className="lg:col-span-4 flex flex-col gap-2 items-start">
          <Image
            src={urlFor(mainImage).width(400).height(300).url()}
            width={400}
            height={300}
            alt=""
          />
          <Link
            href="/posts"
            className="mt-4 inline-flex items-center px-4 py-2 bg-primary text-foreground rounded-lg hover:bg-primary-offset transition-colors"
          >
            ← Back to Posts
          </Link>
        </figure>
      ) : null}
      {body ? (
        <div className="prose-custom lg:col-span-7 lg:col-start-6 prose lg:prose-lg">
          <PortableText value={body} components={components} />
          <RelatedPosts
            relatedPosts={relatedPosts}
            documentId={_id}
            documentType="post"
          />
        </div>
      ) : null}
    </article>
  );
}
