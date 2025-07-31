
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
        watchVideo: builder.mutation<any, { id: any }>({
            query: (id) => ({
                url: `/watch-history`,
                method: "POST",
                body: { video_id: id }
            }),
            invalidatesTags: ["singleVideo"],
        }),
        likeVideo: builder.mutation<any, { action: string; video_id: any }>({
            query: (data) => ({
                url: `/add_like_dislike`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["singleVideo"]
        }),
        // In your API slice
        comments: builder.query<any, any>({
            query: ({ video_id, page = 1, per_page = 10 }) => ({
                url: '/comments',
                params: { video_id, page, per_page },
            }),
            providesTags: ["singleVideo"],
        }),
        commentsPost: builder.mutation<any, { id: any }>({
            query: (id) => ({
                url: `/watch-history`,
                method: "POST",
                body: { video_id: id }
            }),
            invalidatesTags: ["singleVideo"],
        }),

    }),

});

export const { useVideodetailQuery, useLikeVideoMutation, useWatchVideoMutation, useCommentsQuery, useCommentsPostMutation } = videoDetailsSlice;

//    comments: builder.query<any, any>({
//             query: ({ page, per_page = 5, video_id }) => ({
//                 url: `/comments?video_id=${video_id}page=${page}&per_page=${per_page}`,
//                 method: "GET",
//             }),
//             providesTags: ["singleVideo"],
//         }),

