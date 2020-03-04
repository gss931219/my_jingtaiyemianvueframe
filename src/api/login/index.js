import {request} from "../../assets/js/libs/request.js";
export function loginData(data){
    let url=process.env.VUE_APP_API+"/home/user/pwdlogin?token="+process.env.VUE_APP_TOKEN;
    return request(url,"post",data);
}
