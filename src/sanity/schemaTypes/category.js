const category =  {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
  ],
};

export default category;