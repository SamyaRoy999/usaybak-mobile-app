
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

    }),

});

export const { useFaqsQuery, useAbout_usQuery } = accountSlice;