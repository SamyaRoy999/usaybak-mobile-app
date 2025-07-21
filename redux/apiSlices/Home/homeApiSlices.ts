
import { api } from "../../api/baseApi";

// authApiSlices.ts
const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        banner: builder.query<any, any>({
            query: () => ({
                url: `/banners?per_page=7`,
                method: "GET",
            }),
            providesTags: ["home"],
        }),
        promotedVideo: builder.query<any, any>({
            query: () => ({
                url: `/get-promotional-video?per_page=10`,
                method: "GET",
            }),
            providesTags: ["home"],
        }),
        videodetail: builder.query<any, { id: any }>({
            query: ({ id }) => ({
                url: `/videos/${id}`,
                method: "GET",
            }),
            providesTags: ["home"],
        }),

    }),
    overrideExisting: true
});

export const { useBannerQuery, usePromotedVideoQuery,useVideodetailQuery } = authSlice;