
import { api } from "../../api/baseApi";

// .........authApiSlices.ts..........//
export const accountSlice = api.injectEndpoints({

    endpoints: (builder) => ({
        // .............. History...........//
        historyVideo: builder.query<any, any>({
            query: ({ page, per_page = 5 }) => ({
                url: `/watch-history?page=${page}&per_page=${per_page}`,
                method: "GET",
            }),
            providesTags: ["account"],
        }),

        historyVideoDelete: builder.mutation<any, string>({
            query: (videoId) => ({
                url: `/watch-history/${videoId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["account"],
        }),
        // .............. Like...........//
        likeVideos: builder.query<any, any>({
            query: () => ({
                url: `/like_videos?per_page=5`,
                method: "GET",
            }),
            providesTags: ["account"],
        }),
        likeVideosDelete: builder.mutation<any, string>({
            query: (videoId) => ({
                url: `/like_videos/${videoId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["account"],
        }),

        all_delete_watch_history: builder.mutation<any, any>({
            query: () => ({
                url: `/bulk-delete-watch-history`,
                method: "DELETE",
            }),
            invalidatesTags: ["account"],
        }),

        pause_play_watch: builder.query<any, any>({
            query: () => ({
                url: `/pause-play-watch-history`,
                method: "GET",
            }),
            providesTags: ["account"],
        }),

        // .............. Dashboard...........//

        analytics: builder.query<any, any>({
            query: () => ({
                url: `/analytics?type=monthly`,
                method: "GET",
            }),
            providesTags: ["account"],
        }),

        //....setting page for get profile .....//

        profile: builder.query<any, any>({
            query: () => ({
                url: `/profile`,
                method: "GET",
            }),
            providesTags: ["account"],
        }),

        // In your accountSlice.ts
        settingPost: builder.mutation<any, any>({
            query: (data) => ({
                url: "/edit-profile",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }),
            invalidatesTags: ["account"],
        }),

        // .................. faq.................//

        reportVideo: builder.query<any, any>({
            query: () => ({
                url: "/get-reports",
                method: "GET"
            }),
            providesTags: ["report"],
        }),

        reportDetail: builder.query<any, { id: any }>({
            query: ({ id }) => ({
                url: `/get-report-detail/${id}`,
                method: "GET",
            }),
            providesTags: ["blogs"],
        }),

        appealPost: builder.mutation<any, any>({
            query: (data) => ({
                url: `/add-appeal`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        // .................. faq.................//

        faqs: builder.query<any, any>({
            query: () => ({
                url: `/faqs`,
                method: "GET",
            }),
            providesTags: ["account"],
        }),
        about_us: builder.query<any, any>({
            query: () => ({
                url: `/about-us`,
                method: "GET",
            }),
            providesTags: ["account"],
        }),
        contact_us: builder.query<any, any>({
            query: () => ({
                url: `/contact`,
                method: "GET",
            }),
            providesTags: ["account"],
        }),
        contact_send_message: builder.mutation<any, any>({
            query: (data) => ({
                url: `/send-message`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["account"],
        }),
        terms_conditions: builder.query<any, any>({
            query: () => ({
                url: `/page?type=Terms %26 Conditions`,
                method: "GET",
            }),
            providesTags: ["account"],
        }),

        onsiteAccountReg: builder.mutation<any, any>({
            query: (data) => ({
                url: `/auth/register`,
                method: "POST",
                body: data,

            }),
            invalidatesTags: ["user"],
        }),

    }),

});

export const {
    useFaqsQuery,
    useAbout_usQuery,
    useContact_usQuery,
    useContact_send_messageMutation,
    useAnalyticsQuery,
    useTerms_conditionsQuery,
    useProfileQuery,
    useSettingPostMutation,
    useOnsiteAccountRegMutation,
    useLazyHistoryVideoQuery,
    useHistoryVideoQuery,
    useLikeVideosQuery,
    useHistoryVideoDeleteMutation,
    useLikeVideosDeleteMutation,
    useReportVideoQuery,
    useReportDetailQuery,
    useAppealPostMutation,
    useAll_delete_watch_historyMutation,
    usePause_play_watchQuery
} = accountSlice;