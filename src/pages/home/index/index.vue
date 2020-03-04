<template>
    <div class="main">
            <el-container>
                <el-header style="text-align: right; font-size: 12px;background-color: black; ">
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px;color: #fff;"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span style="color: #fff;">qiuwujie@ips.com</span>
                </el-header>
                <el-main>
                    <el-button @click="openproductline = true"  style="background-color: #000;color: #fff;float: right ; margin-bottom: 15px;" >新建产品线</el-button>
                    <el-table :data="tableData">
                        <el-table-column prop="serialNumber" label="编号" width="250">
                        </el-table-column>
                        <el-table-column prop="chinaName" label="中文名称" width="250">
                        </el-table-column>
                        <el-table-column prop="englishName" label="英文名称" width="250">
                        </el-table-column>
                        <el-table-column prop="operation" label="操作" width="250">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="100"
                    style="float: right">
                    </el-pagination>
                    <!--点击新建产品线，展开新建产品线页面-->
                    <el-dialog title="新建产品线" :visible.sync="openproductline" class="new-form" style="text-align: center;">
                        <el-form :model="form">
                            <el-form-item label="中文名称" :label-width="formLabelWidth">
                                <el-input v-model="form.ChinaName1" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="英文名称" :label-width="formLabelWidth">
                                <el-input v-model="form.EnglishName" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="openproductline = false">确 定</el-button>
                            <el-button @click="openproductline = false">取 消</el-button>
                        </div>
                    </el-dialog>

                </el-main>
        </el-container>
        <!--首页-->
        <!--<br/>-->
        <!--<span @click="$router.push('/login')">会员登录</span>-->
        <!--<br/>-->
        <!--<span @click="$router.push('/reg')">会员注册</span>-->
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            const item =
                {
                    serialNumber: '00000001',
                    chinaName: '产品线1',
                    englishName: 'PL1',
                    operation:'修改 删除'
               };
            return {
                tableData: Array(10).fill(item),
                openproductline: false,  // 判断新建产品线组件是否展开
                form: {
                    ChinaName1: '',
                    EnglishName: '',
                },
                formLabelWidth: '120px'
            }
        },
        mounted(){
            document.title=this.$route.meta.title
        },
    }
</script>

<style scoped >
    .main{
        width: 100%;
        height: 100%;
    }
    .dialog-footer{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .new-form {
        width: 60%;
        margin: 0 auto;
    }
</style>
