import { defineField, defineType } from "sanity"

export default defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  fields: [
    defineField({
      name: "experience",
      title: "Work Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Job Title",
              type: "string",
            }),
            defineField({
              name: "company",
              title: "Company",
              type: "string",
            }),
            defineField({
              name: "location",
              title: "Location",
              type: "string",
            }),
            defineField({
              name: "startDate",
              title: "Start Date",
              type: "date",
            }),
            defineField({
              name: "endDate",
              title: "End Date",
              type: "date",
            }),
            defineField({
              name: "current",
              title: "Current Position",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "degree",
              title: "Degree",
              type: "string",
            }),
            defineField({
              name: "institution",
              title: "Institution",
              type: "string",
            }),
            defineField({
              name: "location",
              title: "Location",
              type: "string",
            }),
            defineField({
              name: "startDate",
              title: "Start Date",
              type: "date",
            }),
            defineField({
              name: "endDate",
              title: "End Date",
              type: "date",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Category",
              type: "string",
            }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),
  ],
})
