import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { PostCard } from "@/components/PostCard";
import { Title } from "@/components/Title";

export default async function Page() {
  const posts = await sanityFetch({
    query: POSTS_QUERY,
    tags: ["post", "author", "category"],
  });

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Title>AI Research, Advance, Deployment</Title>
      <div className="flex flex-col gap-12 py-12 font-sans"> 
        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </main>
  );
}
