
import { api } from "../../api/baseApi";

// authApiSlices.ts
const homeApiSlices = api.injectEndpoints({
    endpoints: (builder) => ({
        banner: builder.query<any, any>({
            query: () => ({
                url: `/banners?per_page=7`,
                method: "GET",
            }),
            providesTags: ["home"],
        }),
        promotedVideo: builder.query<any, { category_id: any }>({
            query: ({ category_id }) => ({
                url: `/get-promotional-video?category_id=${category_id}`,
                method: "GET",
            }),
            providesTags: ["home"],
        }),
        promotedVideoHome: builder.query<any, any >({
            query: () => ({
                url: `/get-promotional-video?per_page=10`,
                method: "GET",
            }),
            providesTags: ["home"],
        }),

        caragoryVideos: builder.query<any, any>({
            query: () => ({
                url: `/home-video?video_limit=3`,
                method: "GET",
            }),
            providesTags: ["home"],
        }),


    }),

});

export const { useBannerQuery, usePromotedVideoQuery, useCaragoryVideosQuery, usePromotedVideoHomeQuery } = homeApiSlices;