import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authUrl } from "../databases/firebase/auth";
import { FIRABASE_API_KEY } from "../../environment";

export const authApi = createApi({
    reducerPath: "authApi", 
    baseQuery: fetchBaseQuery({ baseUrl: authUrl }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({ ...auth }) => ({
                url: `/accounts:signUp?key=${FIRABASE_API_KEY}`,
                method: "POST",
                body: auth,
            }),
        }),
        signIn: builder.mutation({
            query: ({...auth}) => ({
                url: `/accounts:signInWithPassword?key=${FIRABASE_API_KEY}`,
                method: "POST",
                body: auth
            })
        })
    }),
})

export const { useSignInMutation, useSignUpMutation } = authApi