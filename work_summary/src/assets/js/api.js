import axios from 'axios';
import qs from 'qs';


// 登录
export const login = params => {console.log(params); return axios.get(`api/user/searchUser`,{ params: params }).then(res => res.data);};
