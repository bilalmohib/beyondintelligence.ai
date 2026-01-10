// redux/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TPlan = {
  name?: string;
  title?: string;
  description?: string | null;
  duration?: string;
  price?: string;
  highlight?: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type PageContent = {
  title: string;
  description: string;
  excerpt?: string;
  updated_at?: string;
};

export type BlogsResponse = {
  blogs: Array<{
    id: number;
    title: string;
    slug: string;
    category_slug: string;
    created: string;
    description?: string;
    excerpt?: string;
    thumbnail?: string;
    image?: string;
    reading_time?: number;
    category?: string;
    category_name?: string;
  }>;
  total: number;
};

export type SiteInfo = {
  site_url?: string;
  demo_link?: string;
  [key: string]: unknown;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // Proxy endpoint
  }),
  endpoints: (builder) => ({
    getSiteInfo: builder.query<SiteInfo, void>({
      query: () => '/',
    }),
    getPlans: builder.query<TPlan[], void>({
      query: () => '/plans', // Appends to '/api/proxy'
    }),
    getTemplates: builder.query<Record<string, unknown>[], void>({
      query: () => '/templates',
    }),
    getTestimonials: builder.query<Record<string, unknown>[], void>({
      query: () => '/testimonials',
    }),
    getBlogs: builder.query<BlogsResponse, { limit?: number; page?: number }>({
      query: ({ limit, page }: { limit?: number; page?: number }) => {
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit.toString());
        if (page) params.append('page', page.toString());
        // Include description and excerpt fields in the response
        params.append('fields', 'id,title,slug,category_slug,created,description,excerpt,thumbnail,image,reading_time,category,category_name');
        return `/blogs?${params.toString()}`;
      },
    }),
    getBlogDetails: builder.query<Record<string, unknown>, { category: string; slug: string }>({
      query: ({ category, slug }: { category: string; slug: string }) => {
        return `/blogs/${category}/${slug}`
      },
    }),
    getCategoriesBlogs: builder.query<BlogsResponse, { category: string }>({
      query: ({category}: {category: string}) => {
        return `/blogs/${category}`
      }
    }),
    getPageContent: builder.query<PageContent, { slug: string }>({
      query: ({slug}:{slug:string}) => {
        return `/pages/${slug}`
      }
    }),
  }),
});

export const {
  useGetSiteInfoQuery,
  useGetPlansQuery,
  useGetTemplatesQuery,
  useGetTestimonialsQuery,
  useGetBlogsQuery,
  useGetBlogDetailsQuery,
  useGetCategoriesBlogsQuery,
  useGetPageContentQuery
} = apiSlice;
