
import { api } from "../../api/baseApi";

// .........authApiSlices.ts..........//
const accountSlice = api.injectEndpoints({

    endpoints: (builder) => ({

        // .............. History...........//
        historyVideo: builder.query<any, any>({
            query: () => ({
                url: `/watch-history?per_page=5`,
                method: "GET",
            }),
            providesTags: ["account"],
        }),
        // .............. Like...........//
        likeVideo: builder.query<any, any>({
            query: () => ({
                url: `/like_videos?per_page=5`,
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

        // ...setting page for get profile ....//

        profile: builder.query<any, any>({
            query: () => ({
                url: `/profile`,
                method: "GET",
            }),
            providesTags: ["account"],
        }),
        editProfile: builder.mutation<any, any>({
            query: (data) => ({
                url: `/edit-profile`,
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
    useEditProfileMutation,
    useOnsiteAccountRegMutation,
    useHistoryVideoQuery,
    useLikeVideoQuery
    
} = accountSlice;