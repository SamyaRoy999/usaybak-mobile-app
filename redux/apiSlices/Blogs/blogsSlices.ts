
import { api } from "../../api/baseApi";

// authApiSlices.ts
const homeApiSlices = api.injectEndpoints({
    endpoints: (builder) => ({
        blogs: builder.query<any, any>({
            query: () => ({
                url: `/blogs?per_page=10`,
                method: "GET",
            }),
            providesTags: ["blogs"],
        }),
    }),

});

export const { useBlogsQuery } = homeApiSlices;