import { LangApi } from "./client";

export const client = new LangApi({
    secure: true,
    baseURL: 'http://localhost:3000',
    securityWorker: accessToken => accessToken ? { headers: { Authorization: `Bearer ${accessToken}`}} : {}
})

export const ApiClient = client.api;