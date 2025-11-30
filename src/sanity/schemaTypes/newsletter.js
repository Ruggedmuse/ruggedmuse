const newsletter = {
  name: "newsletter",
  title: "Newsletter Subscribers",
  type: "document",
  fields: [
    {
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: "subscribedAt",
      type: "datetime",
      title: "Subscribed At",
      initialValue: () => new Date().toISOString(),
    },
  ],
};


export default newsletter;