import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import type { PAGE_QUERYResult } from "@/sanity/types";

type PageBuilderContent = NonNullable<PAGE_QUERYResult>["content"];

interface HomePageData {
  homePage?: {
    _id: string;
    _type: string;
    content?: PageBuilderContent;
  } | null;
}

export default async function Page() {
  const { data: page } = await sanityFetch({
    query: HOME_PAGE_QUERY,
  });

  const homeData = page as HomePageData;
  
  if (!homeData?.homePage?.content) {
    return null;
  }

  return (
    <PageBuilder
      documentId={homeData.homePage._id}
      documentType={homeData.homePage._type}
      content={homeData.homePage.content}
    />
  );
}
