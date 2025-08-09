
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
        }),
        updateVideo: builder.mutation<any, any>({
            query: ({ data, id }) => ({
                url: `/videos/${id}`,
                method: "POST",
                body: data
            })
        })
    }),

});

export const { useMyVideoQuery, useMy_videos_detailsQuery, useUpdateVideoMutation } = myvideoSlice;