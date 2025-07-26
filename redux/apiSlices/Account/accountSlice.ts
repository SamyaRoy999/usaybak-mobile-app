
import { api } from "../../api/baseApi";

// .........authApiSlices.ts..........//
const accountSlice = api.injectEndpoints({
    endpoints: (builder) => ({
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

    }),

});

export const { useFaqsQuery, useAbout_usQuery, useContact_usQuery , useContact_send_messageMutation} = accountSlice;