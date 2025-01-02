// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {LogoutAction} from "../slices/authSlice"

const baseUrl = process.env.REACT_APP_BASE_URL
const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.auth_data?.token; // Assuming you have auth in your state
        console.log("token",token);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
const baseQueryWithAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);    
    if (result.error && result.error.status === 401) {
        api.dispatch(LogoutAction());
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        dynamicQuery: builder.query({
            query: ({ endpoint, params, key, headers }) => {
                const queryParams = new URLSearchParams(params).toString();
                return {
                    url: `${endpoint}?${queryParams}`,
                    method: 'GET',
                    headers: headers || {}, // Use provided headers or an empty object
                };
            },
            providesTags: (result, error, { key }) => [key],
        }),
        dynamicMutation: builder.mutation({
            query: ({ endpoint, method = 'POST', body, headers,key }) => {
                // console.log("key@@@", key);
                 // Default headers
                 headers = headers || {
                    'Content-Type': 'application/json',
                };

                // Remove Content-Type header if body is a FormData object
                if (body instanceof FormData) {
                    delete headers['Content-Type'];
                }
                return {
                    url: endpoint,
                    method: method,
                    body,
                    headers: headers || {},
                }
            },
            invalidatesTags: (result, error, { key }) => {
                console.log("!!", key);
                return key ? [key] : []
            },
        }),
    }),
});

export const { useDynamicQueryQuery, useDynamicMutationMutation } = apiSlice;
