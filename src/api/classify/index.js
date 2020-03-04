import {request} from "../../assets/js/libs/request.js";
export function getClassifyData(){
    var url=process.env.VUE_APP_API+"/home/category/menu?token="+process.env.VUE_APP_TOKEN;
    return request(url)
}
