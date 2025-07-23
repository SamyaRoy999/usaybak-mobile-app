
import { api } from "../../api/baseApi";

// authApiSlices.ts
const videoDetailsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        videodetail: builder.query<any, { id: any }>({
            query: ({ id }) => ({
                url: `/videos/${id}`,
                method: "GET",
            }),
            providesTags: ["singleVideo"],
        }),
        likeVideo: builder.mutation<any, { action: string; video_id: any }>({
            query: (data) => ({
                url: `/add_like_dislike`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["singleVideo"]
        }
        )

    }),

});

export const { useVideodetailQuery, useLikeVideoMutation } = videoDetailsSlice;