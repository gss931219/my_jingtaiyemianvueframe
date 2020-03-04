<template>
    <div class="main app">
        <!--<div style="margin: 20px;"></div>-->
        <div class="content">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="账户" >
                    <el-input v-model="formLabelAlign.accountNumber" placeholder="qiuwujie@ips.com"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formLabelAlign.name" placeholder="仇武杰"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formLabelAlign.MobileNumber" placeholder="18810488357"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left: 50px;">保存</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>
<script>
    export default {
        name: "personalCenter",
        data() {
            return {
                labelPosition: 'right',
                formLabelAlign: {
                    accountNumber: '',
                    name: '',
                    MobileNumber: ''
                }
            }
        }
    }
</script>
<style>
    .app{
        margin-top: 20px;
        background-color: #fff;
    }
    .content{
        width: 350px;
        height: 250px;
    }

</style>
