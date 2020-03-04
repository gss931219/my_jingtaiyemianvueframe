<template>
    <div class="main">
        <!--左边内容-->
        <div class="left">
            <el-container style="height: 100vh; border: 1px solid #eee">
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu :default-openeds="['1', '3']">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-message" ></i>
                                产品中心
                            </template>
                            <el-menu-item-group>
                                <template slot="title" class="powercord" ></template>
                                <el-menu-item index="1-1" @click="$router.push('/')">产品线管理</el-menu-item>
                                <el-menu-item index="1-2" @click="$router.push('/productManagement')">产品管理</el-menu-item>
                                <el-menu-item index="1-3" @click="$router.push('/templateManagement')">模板管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-menu"></i>部件中心</template>
                            <el-menu-item-group>
                                <template slot="title"></template>
                                <el-menu-item index="2-1" @click="$router.push('/barebone')">Barebone</el-menu-item>
                                <el-menu-item index="2-2" @click="$router.push('/processor')">处理器</el-menu-item>
                                <el-menu-item index="2-3" @click="$router.push('/memory')">内存</el-menu-item>
                                <el-menu-item index="2-4" @click="$router.push('/hardwareBackplane')">硬件背板</el-menu-item>
                                <el-menu-item index="2-5" @click="$router.push('/hardDisk')">硬盘</el-menu-item>
                                <el-menu-item index="2-6" @click="$router.push('/pCle')">PCle插槽</el-menu-item>
                                <el-menu-item index="2-7" @click="$router.push('/PcleBack')">PCle板卡</el-menu-item>
                                <el-menu-item index="2-8" @click="$router.push('/power')">电源</el-menu-item>
                                <el-menu-item index="2-9" @click="$router.push('/powerLine')">电源线</el-menu-item>
                                <el-menu-item index="2-1-0" @click="$router.push('/parts')">配件</el-menu-item>
                                <el-menu-item index="2-1-1" @click="$router.push('/software')">软件</el-menu-item>
                                <el-menu-item index="2-1-2" @click="$router.push('/price')">价格管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-setting"></i>规则中心</template>
                            <el-menu-item-group>
                                <template slot="title"></template>
                                <el-menu-item index="3-1" @click="$router.push('/accessoriesRules')">配件规则</el-menu-item>
                                <el-menu-item index="3-2" @click="$router.push('/computeRule')">计算节点规则</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title"><i class="el-icon-message"></i>运营中心</template>
                            <el-menu-item-group>
                                <template slot="title" class="powercord" ></template>
                                <el-menu-item index="1-1" @click="$router.push('/userFeedback')">用户反馈</el-menu-item>
                                <el-menu-item index="1-2" @click="$router.push('/email')">邮件列表</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title"><i class="el-icon-menu"></i>用户中心</template>
                            <el-menu-item-group>
                                <template slot="title"></template>
                                <el-menu-item index="2-1" @click="$router.push('/organization')">机构管理</el-menu-item>
                                <el-menu-item index="2-2">终端管理</el-menu-item>
                                <el-menu-item index="2-3">终端用户</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title"><i class="el-icon-setting"></i>管理中心</template>
                            <el-menu-item-group>
                                <template slot="title"></template>
                                <el-menu-item index="3-1" @click="$router.push('/role')">角色管理</el-menu-item>
                                <el-menu-item index="3-2" >用户管理</el-menu-item>
                                <el-menu-item index="3-2" @click="$router.push('/user')">个人管理</el-menu-item>
                                <el-menu-item index="3-2" @click="$router.push('/log')">系统日志</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
            </el-container>
        </div>
        <!--右边内容-->
        <div class="right">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {
                homeActive:true,

            }
        },
        created(){
            // console.log(this.$route);
            this.changeStyle(this.$route.path);
        },
        methods:{
            goPage(url){
                this.$router.replace(url);
                this.changeStyle(url);
            },
            changeStyle(url){
                switch(url){
                    case "/index":
                        this.homeActive=true;
                        break;
                    default:
                        this.homeActive=true;
                }
            }
        },
        //清除keep-alive缓存
        activated(){
            document.title=this.$route.meta.title;
            this.changeStyle(this.$route.path);
        },
        // addSolution() {
        //     this.$router.push({ // 核心语句
        //         path: '/processor', // 跳转的路径
        //         query: { // 路由传参时push和query搭配使用 ，作用时传递参数
        //             id: 1,
        //         },
        //     });
        // },
    }
</script>

<style scoped>
    .main{
        width: 100%;
        height:100vh;
        display: flex;
        margin:auto;
    }
    .left{
        width: 13%;
        height: 100vh;
        margin-left: 5%;
        margin-top: 4%;
    }
    .right{
        width: 80%;
    }
    .el-aside {
        color: #333;
    }
</style>
