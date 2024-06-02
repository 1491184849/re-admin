import {MockMethod} from "vite-plugin-mock";
import dayjs from "dayjs";

const methods: MockMethod[] = [
    {
        url: "/mock/login",
        method: "post",
        response: ({body}) => {
            if (body.username === "admin" && body.password === "123456") {
                return {
                    code: 200,
                    message: "登录成功",
                    data: {
                        username: body.username,
                        accessToken:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIiLCJ1c2VyX2lkIjoiNzcwMDFlMWEtZjZlOS00M2M2LWE4MWItODM4NGJmZjA4ODY5IiwiZXhwIjoxNzA0OTY2NDIyLCJpc3MiOiJjcmFja2VyIiwiYXVkIjoiaHR0cHM6Ly93d3cuY3JhY2tlci5pbmsifQ.jkiVbgBvz4T_ZXI43KYJ123_WiBoFX41qgcX1zrgHm0",
                        refreshToken:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIiLCJ1c2VyX2lkIjoiNzcwMDFlMWEtZjZlOS00M2M2LWE4MWItODM4NGJmZjA4ODY5IiwicmVmcmVzaF90b2tlbiI6InJlZnJlc2hfdG9rZW4iLCJleHAiOjE3MDQ5ODA4MjIsImlzcyI6ImNyYWNrZXIiLCJhdWQiOiJodHRwczovL3d3dy5jcmFja2VyLmluayJ9.u3ae5RntyjO3iN-WKKnc1Q5URCwH5QSMmBvRotAc_FY",
                        expired: dayjs().add(2, "hour").format("YYYY-MM-DD HH:mm:ss"),
                        roles: ["admin"],
                        resources: ["admin:button"]
                    },
                };
            } else if (body.username === "cracker" && body.password === "123456") {
                return {
                    code: 0,
                    message: "登录成功",
                    data: {
                        username: body.username,
                        accessToken:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIiLCJ1c2VyX2lkIjoiNzcwMDFlMWEtZjZlOS00M2M2LWE4MWItODM4NGJmZjA4ODY5IiwiZXhwIjoxNzA0OTY2NDIyLCJpc3MiOiJjcmFja2VyIiwiYXVkIjoiaHR0cHM6Ly93d3cuY3JhY2tlci5pbmsifQ.jkiVbgBvz4T_ZXI43KYJ123_WiBoFX41qgcX1zrgHm0",
                        refreshToken:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIiLCJ1c2VyX2lkIjoiNzcwMDFlMWEtZjZlOS00M2M2LWE4MWItODM4NGJmZjA4ODY5IiwicmVmcmVzaF90b2tlbiI6InJlZnJlc2hfdG9rZW4iLCJleHAiOjE3MDQ5ODA4MjIsImlzcyI6ImNyYWNrZXIiLCJhdWQiOiJodHRwczovL3d3dy5jcmFja2VyLmluayJ9.u3ae5RntyjO3iN-WKKnc1Q5URCwH5QSMmBvRotAc_FY",
                        expired: dayjs().add(2, "hour").format("YYYY-MM-DD HH:mm:ss"),
                        roles: ["common-user"],
                        resources: []
                    }
                }
            }
            return {
                code: -1,
                message: "账号或密码错误",
                data: null,
            };
        },
    },
];

export default methods;
