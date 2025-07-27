
import { api } from "../../api/baseApi";

// .........authApiSlices.ts..........//
const accountSlice = api.injectEndpoints({

    endpoints: (builder) => ({
        // .............. Dashboard...........//

        analytics: builder.query<any, any>({
            query: () => ({
                url: `/analytics?type=monthly`,
                method: "GET",
            }),
            providesTags: ["account"],
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

    }),

});

export const { useFaqsQuery, useAbout_usQuery, useContact_usQuery, useContact_send_messageMutation, useAnalyticsQuery, useTerms_conditionsQuery } = accountSlice;