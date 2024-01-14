import axios from "axios";

let request = axios.create({
    baseURL:"http://localhost:8088",
    timeout:30 * 1000,
    responseType:"json",
})

request.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        return res;
    },
    error => {
        console.log('err' + error); // for debug
        return Promise.reject(error)
    }
);


export default request
