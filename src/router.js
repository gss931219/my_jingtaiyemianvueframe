import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:"hash", //1、hash哈希：有#号。2、history历史：没有#号
    base:process.env.BASE_URL, ////自动获取根目录路径
    routes:[
        {
            path:"/",
            name:"home",
            component:()=>import("./pages/home/main/index"),
            redirect:"/index",
            children:[
                {
                    path:"index",
                    name:"index",
                    component:()=>import("./pages/home/index/index"),
                    meta:{keepAlive:true,title:"首页"}
                },
                {
                    path:"productManagement",
                    name:"productManagement",
                    component:()=>import("./pages/home/productCenter/productManagement"),
                    meta:{keepAlive:true,title:"产品管理"}
                },
                {
                    path:"templateManagement",
                    name:"templateManagement",
                    component:()=>import("./pages/home/productCenter/templateManagement"),
                    meta:{keepAlive:true,title:"模板管理"}
                },
                {
                    path:"barebone", //barebone
                    name:"barebone",
                    component:()=>import("./pages/home/partsCenter/barebone"),
                    meta:{keepAlive:true,title:"barebone"}
                },
                {
                    path:"processor", //处理器
                    name:"processor",
                    component:()=>import("./pages/home/partsCenter/processor"),
                    meta:{keepAlive:true,title:"处理器"}
                },
                {
                    path:"memory", //内存
                    name:"memory",
                    component:()=>import("./pages/home/partsCenter/memory"),
                    meta:{keepAlive:true,title:"内存"}
                },
                {
                    path:"hardwareBackplane", //硬件背板
                    name:"hardwareBackplane",
                    component:()=>import("./pages/home/partsCenter/hardwareBackplane"),
                    meta:{keepAlive:true,title:"硬件背板"}
                },
                {
                    path:"hardDisk", //硬件
                    name:"hardDisk",
                    component:()=>import("./pages/home/partsCenter/hardDisk"),
                    meta:{keepAlive:true,title:"硬件"}
                },
                {
                    path:"pCle", //pCle插槽
                    name:"pCle",
                    component:()=>import("./pages/home/partsCenter/pCle"),
                    meta:{keepAlive:true,title:"pCle插槽"}
                },
                {
                    path:"PcleBack", //pCle背板
                    name:"PcleBack",
                    component:()=>import("./pages/home/partsCenter/PcleBack"),
                    meta:{keepAlive:true,title:"pCle背板"}
                },
                {
                    path:"power", //电源
                    name:"power",
                    component:()=>import("./pages/home/partsCenter/power"),
                    meta:{keepAlive:true,title:"电源"}
                },
                {
                    path:"powerLine", //电源线
                    name:"powerLine",
                    component:()=>import("./pages/home/partsCenter/powerLine"),
                    meta:{keepAlive:true,title:"电源线"}
                },
                {
                    path:"parts", //配件
                    name:"parts",
                    component:()=>import("./pages/home/partsCenter/parts"),
                    meta:{keepAlive:true,title:"配件"}
                },
                {
                    path:"software", //软件
                    name:"software",
                    component:()=>import("./pages/home/partsCenter/software"),
                    meta:{keepAlive:true,title:"软件"}
                },
                {
                    path:"price", //价格管理
                    name:"price",
                    component:()=>import("./pages/home/partsCenter/price"),
                    meta:{keepAlive:true,title:"价格管理"}
                },
                {
                    path:"accessoriesRules",   //配件规则
                    name:"accessoriesRules",
                    component:()=>import("./pages/home/RulesCenter/accessoriesRules"),
                    meta:{keepAlive:true,title:"配件规则"}
                },
                {
                    path:"computeRule",   //计算节点规则
                    name:"computeRule",
                    component:()=>import("./pages/home/RulesCenter/computeRule"),
                    meta:{keepAlive:true,title:"计算节点规则"}
                },
                {
                    path:"organization",   //机构管理
                    name:"organization",
                    component:()=>import("./pages/user/organization/index"),
                    meta:{keepAlive:true,title:"机构管理"}
                },
                {
                    path:"email",   //邮件管理
                    name:"email",
                    component:()=>import("./pages/home/operatingCenter/email"),
                    meta:{keepAlive:true,title:"邮件管理"}
                },
                {
                    path:"userFeedback",   //用户反馈
                    name:"userFeedback",
                    component:()=>import("./pages/home/operatingCenter/userFeedback"),
                    meta:{keepAlive:true,title:"用户反馈"}
                },
                {
                    path:"role",   //角色管理
                    name:"role",
                    component:()=>import("./pages/user/role/index"),
                    meta:{keepAlive:true,title:"角色管理"}
                },
                {
                    path:"user",   //个人管理
                    name:"user",
                    component:()=>import("./pages/user/user/index"),
                    meta:{keepAlive:true,title:"个人管理"}
                },
                {
                    path:"log",   //系统日志
                    name:"log",
                    component:()=>import("./pages/user/log/index"),
                    meta:{keepAlive:true,title:"系统日志"}
                },

            ]
        }
        // {
        //     path:"/login",
        //     name:"login",
        //     component:()=>import("./pages/home/login/index"),
        //     meta:{keepAlive:true}
        // },
        // {
        //     path:"/reg",
        //     name:"reg",
        //     component:()=>import("./pages/home/reg/index"),
        //     meta:{keepAlive:false}
        // }
    ]
})
