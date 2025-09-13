import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface Project {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  featured_media: number;
  acf?: {
    tech_stack?: { tech: string }[];
    demo_link?: string;
    github_link?: string;
    project_category?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export const wordpressApi = createApi({
  reducerPath: "wordpressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
  }),
  tagTypes: ["Post", "Project"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], { per_page?: number; page?: number }>({
      query: ({ per_page = 10, page = 1 } = {}) =>
        `posts?per_page=${per_page}&page=${page}&_embed`,
      providesTags: ["Post"],
    }),
    getPostBySlug: builder.query<Post[], string>({
      query: (slug) => `posts?slug=${slug}&_embed`,
      providesTags: ["Post"],
    }),
    getProjects: builder.query<Project[], { per_page?: number; page?: number }>(
      {
        query: ({ per_page = 10, page = 1 } = {}) =>
          `projects?per_page=${per_page}&page=${page}&_embed`,
        providesTags: ["Project"],
      }
    ),
    getProjectBySlug: builder.query<Project[], string>({
      query: (slug) => `projects?slug=${slug}&_embed`,
      providesTags: ["Project"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostBySlugQuery,
  useGetProjectsQuery,
  useGetProjectBySlugQuery,
} = wordpressApi;
