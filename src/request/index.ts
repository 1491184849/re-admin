import axios, {AxiosInstance, AxiosResponse} from "axios";
import {ElMessage} from "element-plus";

// 创建axios实例
const service: AxiosInstance = axios.create({
    timeout: 3000,
});

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    function (response: AxiosResponse<any, any>) {
        // 响应正确格式：{code:0,message:''}；格式错误或code非0都调用Promise.reject()
        if (response.status === 200) {
            // 存在code属性表示格式正确
            const code = response.data["code"];
            if (code) {
                if (code === 0) return response.data;
                else {
                    if (response.data.message) ElMessage.error(response.data.message);
                    else ElMessage.error("响应失败，状态码：" + response.status);
                }
            } else {
                ElMessage.error("响应数据格式错误");
            }
        }
        return Promise.reject(response);
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        if (error?.response?.status) {
            let msg;
            switch (error.response.status) {
                case 401:
                    msg = "身份信息已过期，请重新登录";
                    break;
                case 403:
                    msg = "您没有访问权限，请联系管理员";
                    break;
                case 404:
                    msg = "访问资源不存在，请联系管理员";
                    break;
                case 500:
                    msg = "服务器内部错误，请联系管理员";
                    break;
                default:
                    msg = "未知错误，状态码：" + error.response.status;
                    break;
            }
            ElMessage.error(msg);
        }
        return Promise.reject(error);
    }
);

export default service;
