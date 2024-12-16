import axios from "axios";
import { backLogURL, baseURL } from "./BaseUri";
const jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvbmVpZCI6IjEwMzk1NDcyIiwib3JnX29uZWlkIjoiMTAzODE5NDciLCJvcmdfbmFtZSI6IkNUTiIsImZ1bGxfdXNlcm5hbWUiOiJBaG1hZCBBbGkiLCJ1c2VyX2VtYWlsIjoienl4QGdtYWlsLmNvbSIsImZ1bGxfZHAiOiJodHRwczpcL1wvb25laWQudmVldm90ZWNoLmNvbVwvZHBcL2ZpbGVzXC80ZDU0NDE3YTRmNTQ1NTMwNGU3YTQ5M2QtNGU0NDUxMzQ0ZTZhNDkzZC5qcGVnIiwicmVjb3JkX2lkIjoiNGU0NDUxMzQ0ZTZhNDkzZCIsImFjY2Vzc190b2tlbiI6ImE4NTEwMDkyMm0zNDE5Nzk4NTE0NGFhNTE0OGE0YmI1MDc5MWVhMTI5NTEwZGNmNDA3OGI0MzZkYmMxIiwiYXVkIjoiaHM2ZWF2ZjM0MjFoaCIsInJvbGVfaWQiOiJFbXBsb3llZSIsInJvbGVfZGJfaWQiOiIxNCIsIm90aGVyX3Blcm1pc3Npb25zIjpudWxsLCJhbGxvd2VkX2FwcF90b2tlbiI6IjczMjEwN2Q0MjU2ZTg5OGQxMjAxYzI5YWYiLCJpYXQiOjE3MzQyMTgzMzMsImV4cCI6MTczNDMwNDczMywib3JnX2RhdGEiOnsiX2lkIjoxMDM4MTk0NywidXNlcl9vbmVpZCI6MTAzNzk4NDMsIm9yZ19uYW1lIjoiQ1ROIiwib3JnX3R5cGUiOjE1OCwibnRuX25vIjoiMTIzNDU2NyIsIm9yZ19icmZfaW50cm8iOiIxMjM0NSIsInVzZXJfY29udGFjdCI6IjAzMzM3MDQyMTM3IiwiZW1haWwiOiJoazE3NDE2MjhAZ21haWwuY29tIiwiYWRkcmVzcyI6IjEyMyIsImNvdW50cnlfaWQiOjE2MiwiY2l0eV9pZCI6ODU5MDksImNvdW50cnlfY29kZSI6IlBLIn0sIm9uZWlkX3JvbGVfcGVybWlzc2lvbnMiOm51bGx9.H9iHoiZ6OxZZajrl1KEW0UdKhyDAANTO8B9PB3XzQds"

export const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
    }
})
export const axiosInstanceBackLog = axios.create({
    baseURL: backLogURL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
    }
})




export const axiosInstanceFile = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": 'multipart/form-data',
        "Authorization": `Bearer ${jwt}`
    }
})



