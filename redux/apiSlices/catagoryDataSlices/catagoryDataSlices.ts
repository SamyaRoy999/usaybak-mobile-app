
import { api } from "../../api/baseApi";

// authApiSlices.ts
const homeApiSlices = api.injectEndpoints({
    endpoints: (builder) => ({
        catagoryDetails: builder.query<any, { id: any }>({
            query: ({ id }) => ({
                url: `/get-related-video/${id}`,
                method: "GET",
            }),
            providesTags: ["catagoryDetails"],
        }),
    }),
});

export const { useCatagoryDetailsQuery } = homeApiSlices;