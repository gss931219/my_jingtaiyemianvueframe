import {getClassifyData} from '../../../api/classify';
let modules={
    namespaced:true,
    state:{
        classifys:[]
    },
    mutations:{
        getClassify(state,payload){
            getClassifyData().then(res=>{
                // console.log(res);
                if(res.code==200){
                    state.classifys=res.data;
                }
            })
        }
    },
    actions:{
        getClassify(conText,payload){
            conText.commit("getClassify");
        }
    }
};
export default modules;
