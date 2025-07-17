import { client, sanityFetch } from "@/sanity/lib/client";
// import the client and sanityFetch function
import { Post } from "@/components/Post";
import { notFound } from "next/navigation";
// update your imports
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";

// add this export
export async function generateStaticParams() {
  // False when responses are infrequent and fast responses are not required.
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(POSTS_SLUGS_QUERY);

  return slugs;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    tags: [`post:${slug}`, "author", "category"],
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...post} />
    </main>
  );
}
