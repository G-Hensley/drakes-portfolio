import { defineField, defineType } from "sanity"

export default defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Certification Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuing Organization",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Issue Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "credentialUrl",
      title: "Credential URL",
      type: "url",
    }),
    defineField({
      name: "logo",
      title: "Organization Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
})
