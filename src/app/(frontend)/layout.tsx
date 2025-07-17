import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Header } from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;
  
  return (
    <section className="min-h-screen ">
      <Header />
      {children}
      <SanityLive />
      {isDraftMode && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </section>
  );
}

