
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

    }),

});

export const {useFaqsQuery } = accountSlice;