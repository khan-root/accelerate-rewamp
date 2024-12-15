import axios from "axios";
import { backLogURL, baseURL } from "./BaseUri";
const jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvbmVpZCI6IjEwNDY0NzE2Iiwib3JnX29uZWlkIjoiMTUiLCJvcmdfbmFtZSI6IlZlZXZvIFRlY2giLCJmdWxsX3VzZXJuYW1lIjoiUmlkYSBNdXN0YWZhIiwidXNlcl9lbWFpbCI6InJpZGFtdXN0YWZhNjY2QGdtYWlsLmNvbSIsImZ1bGxfZHAiOiJodHRwczpcL1wvb25laWQudmVldm90ZWNoLmNvbVwvZHBcL2ZpbGVzXC80ZDU0NDEzMDRlNmE1MTMzNGQ1NDU5M2QtREVGQVVMVC5qcGVnIiwicmVjb3JkX2lkIjoiREVGQVVMVCIsImFjY2Vzc190b2tlbiI6ImE4NTEwMDc4NW00NDg5MzkwOTI4YjFlNWI2Y2FiMjdlYWJjNTFlY2MwM2M5ZDY0ZTIzOTNmNWFiMjFhIiwiYXVkIjoiaHM2ZWF2ZjM0MjFoaCIsInJvbGVfaWQiOiJFbXBsb3llZSIsInJvbGVfZGJfaWQiOiIxNCIsIm90aGVyX3Blcm1pc3Npb25zIjpudWxsLCJhbGxvd2VkX2FwcF90b2tlbiI6IjlhYzAwOWZmM2FhNWI0OGJlYmYwNWE3ODIiLCJpYXQiOjE3MzQyMTgyNjMsImV4cCI6MTczNDMwNDY2Mywib3JnX2RhdGEiOnsiX2lkIjoxNSwidXNlcl9vbmVpZCI6ODgwNjIyNCwib3JnX25hbWUiOiJWZWV2byBUZWNoIiwib3JnX3R5cGUiOjE1OCwibnRuX25vIjoiNzEyMDEyNyIsIm9yZ19icmZfaW50cm8iOiJWVCB0aGUgVGVsZWNvbSBWQVMgJiBEaWdpdGFsIFNlcnZpY2VzIENvbXBhbnkiLCJ1c2VyX2NvbnRhY3QiOiIwMzA0LTExMTgzMzMiLCJlbWFpbCI6ImhyQHZlZXZvdGVjaC5jb20iLCJhZGRyZXNzIjoiVmVldm8gVGVjaCwgT2ZmaWNlIzQsIDR0aCBGbG9vciwgQmxvY2stQSwgSmF3YWQgVG93ZXJzLCBVbmkgUm9hZCIsImNvdW50cnlfaWQiOjE2MiwiY2l0eV9pZCI6ODU5MDksImNvdW50cnlfY29kZSI6IlBLIn0sIm9uZWlkX3JvbGVfcGVybWlzc2lvbnMiOm51bGx9.f2UXhd92tZFEVMmFgMB6kvlebuggO0_kKrlygrhDQbg"

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



