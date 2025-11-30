// All products (just first image)
export const allProductsQuery = `*[_type == "product"]{
  _id,
  name,
  "slug": slug.current,
  price,
  article,
  "imageUrls": images[0].asset->url,
  category->{
    _id,
    title,
    "slug": slug.current
  }
}`;

// Single product with all images
export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  description,
  price,
  article,
  "imageUrls": images[].asset->url,
  category->{
    title,
    "slug": slug.current
  }
}`;

// Products by category
export const productsByCategoryQuery = `*[_type == "product" && category->slug.current == $slug]{
  _id,
  name,
  "slug": slug.current,
  price,
    article,
  "imageUrls": images[0].asset->url
}`;
