const product =  {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Title",
    },
    {
        name: "article",
        type: "string",
        title: "Article",
    },
    {
      name: "description",
      type: "text",
      title: "Description of Product",
    },
    {
      name: "price",
      type: "number",
      title: "Price of Product",
    },
    {
      name: "images",
      type: "array",
      of: [{ type: "image" }],
      title: "Images of Product",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
      },
    },
    {
        
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{type: 'category'}]
        
      },
    
  ],
};


export default product;