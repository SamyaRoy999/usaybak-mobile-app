import { api } from "../../api/baseApi";

//................ uploadVideoSices..................//

export const uploadVideoSices = api.injectEndpoints({

    endpoints: (builder) => ({
        upload_video: builder.mutation<any, any>({
            query: (data) => ({
                url: `/videos`,
                method: "POST",
                 headers : {
                    "Content-Type" : "multipart/form-data"
                 },
                body: data,
         
            }),
            invalidatesTags: ["uploadVideo"],
        }),
        categories: builder.query<any, any>({
            query: () => ({
                url: "/categories",
                method: "GET",
            }),
            providesTags: ["uploadVideo"],
        }),
    })
});

export const {
    useUpload_videoMutation,
    useCategoriesQuery
} = uploadVideoSices;