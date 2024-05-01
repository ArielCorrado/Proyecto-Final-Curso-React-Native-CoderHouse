import { firebaseRealtimeDbUrl } from "../databases/firebase/realtimeDatabase";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const shopApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: firebaseRealtimeDbUrl}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `products.json`
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo="${productId}"`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response);
                if (responseTransformed.length) return responseTransformed[0];
                return null;
            }
        }),
    })
})

export const {useGetProductsQuery, useGetProductByIdQuery} = shopApi

