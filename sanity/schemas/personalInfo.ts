import { defineField, defineType } from "sanity"

export default defineType({
  name: "personalInfo",
  title: "Personal Information",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Professional Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Profile Picture",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "topSkills",
      title: "Top Skills",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "GitHub", value: "github" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "X", value: "x" },
                  { title: "Portfolio", value: "portfolio" },
                ],
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
        },
      ],
    }),
  ],
})
