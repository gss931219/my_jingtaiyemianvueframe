<template>
    <!--个人管理-->
    <div>
        <el-container>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="个人中心" name="first" >
                        <div class="content">
                            <el-form  :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
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
                                    <!--<el-button style="margin-left: 50px;">保存</el-button>-->
                                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                                </el-form-item>

                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="修改密码" name="second">
                        <div class="content">
                            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="旧密码" prop="pass">
                                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码" prop="checkPass">
                                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                                    <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>
<script>

    export default {
        name:"user",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                activeName: 'second',
                labelPosition: 'right',
                formLabelAlign: {
                    accountNumber: '',
                    name: '',
                    MobileNumber: ''
                },
                ruleForm: {
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                }
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })



            },




        }
    }
</script>

<style>
    .content{
        width: 350px;
        height: 250px;
        margin: auto;
    }

    .el-tabs__content{
        background-color: #ffffff;
        padding: 20px;
    }
</style>
