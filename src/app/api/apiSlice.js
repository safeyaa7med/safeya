import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    },
    // transformResponse: (response, queryApi, credentials) => {
    //             const { data } = response;
    //             if (data.isLoggedIn) {
    //                 const { sessionUserId } = data;
    //                 const { auth } = queryApi.getState();
    //                 if (auth.sessionUserId === sessionUserId) {
    //                     throw new Error('User is already logged in!');
    //                 }
    //                 console.log("error is : ",Error )
    //             }
    //             return response; 
    //         },
})

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:3001',
//     credentials: 'include',
//     transformResponse: (response, queryApi, credentials) => {
//         const { data } = response;
//         if (data.isLoggedIn) {
//             const { sessionUserId } = data;
//             const { auth } = queryApi.getState();
//             if (auth.sessionUserId === sessionUserId) {
//                 throw new Error('User is already logged in!');
//             }
//             console.log("error is : ",Error )
//         }
//         return response; 
//     },
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.token
//         if (token) {
//             headers.set("authorization", `Bearer ${token}`)
//         }
//         return headers
//     },
    
// })
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 403) {
        console.log('sending refresh token')
        const refreshResult = await baseQuery('/auth/refresh/user', api, extraOptions)
        if (refreshResult?.data) {
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data }))
            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: builder => ({})
})