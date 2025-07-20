import { defineQuery } from "next-sanity";

// Multiple Short Title Queries
export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`);

export const POSTS_SLUGS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]{ 
  "slug": slug.current
}`);

// Single Post Queries
export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  },
  relatedPosts[]{
    _key, // required for drag and drop
    ...@->{_id, title, slug} // get fields from the referenced post
  },
}`);

// Page Queries
export const PAGE_QUERY =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ...,
  content[]{
    ...,
    _type == "hero" => {
      ...,
      title,
      text,
      image
    },
    _type == "splitImage" => {
      ...,
      title,
      image,
      orientation
    },
    _type == "faqs" => {
      ...,
      faqs[]->
    },
    _type == "features" => {
      ...,
      features[]{
        _key,
        title,
        text
      }
    }
  }
}`);

// Home Page Queries
export const HOME_PAGE_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
    homePage->{
      ...,
      content[]{
        ...,
        _type == "faqs" => {
          ...,
          faqs[]->
        }
      }      
    }
  }`);
