import Link from "next/link";
import { Title } from "@/components/Title";
import { metadata } from "@/app/layout";

export default async function Page() {
  // Extract title and description with proper type handling
  const title = typeof metadata.title === 'string' 
    ? metadata.title 
    : (metadata.title as { default?: string })?.default || "ChipsXP Research";
  
  const description = metadata.description as string || 
    "Research and development information";

  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12 ">
      <Title>{title}</Title>
      <p className="lg:text-2xl sm:text-sm">{description}</p>
      <hr />
      
      <Link className="link-hover" href="/posts">Posts index &rarr;</Link>
    </section>
  );
}


