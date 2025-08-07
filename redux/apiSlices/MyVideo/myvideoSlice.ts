
import { api } from "../../api/baseApi";

// authApiSlices.ts
export const myvideoSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        myVideo: builder.query<any, any>({
            query: () => ({
                url: `/videos`,
                method: "GET",
            }),
            providesTags: ["home"],
        }),
        my_videos_details: builder.query<any, { id: any }>({
            query: ({ id }) => ({
                url: `/videos/${id}`,
                method: "GET",
            }),
            providesTags: ["home"],
        })
        // promotedVideoHome: builder.query<any, any >({
        //     query: () => ({
        //         url: `/get-promotional-video?per_page=10`,
        //         method: "GET",
        //     }),
        //     providesTags: ["home"],
        // }),

        // caragoryVideos: builder.query<any, any>({
        //     query: () => ({
        //         url: `/home-video?video_limit=3`,
        //         method: "GET",
        //     }),
        //     providesTags: ["home"],
        // }),

        // //  shear price

        //  priceGetAll: builder.query<any, any>({
        //     query: () => ({
        //         url: `/get-price`,
        //         method: "GET",
        //     }),
        //     providesTags: ["uploadVideo"],
        // }),

    }),

});

export const { useMyVideoQuery, useMy_videos_detailsQuery } = myvideoSlice;