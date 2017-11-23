import axios from 'axios';
import qs from 'qs';
let headers = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}};

// 检查登录态
export const isLogin = params => {console.log(params); return axios.get(`api/user/isLogin`,{ params: params }).then(res => res.data);};
// 登录
export const login = params => {console.log(params); return axios.get(`api/user/searchUser`,{ params: params }).then(res => res.data);};
//注册
export const register = params => { return axios.post(`api/user/register`, qs.stringify(params)).then(res => res.data); };

//退出
export const loginOut = params => { return axios.post(`api/user/loginOut`, qs.stringify(params)).then(res => res.data); };
