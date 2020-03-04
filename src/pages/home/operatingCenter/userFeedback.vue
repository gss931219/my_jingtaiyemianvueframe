<template>
    <!-------------------------------------------用户反馈页面----------------------------------------------------->
    <div class="test">
        <el-table
                :data="tableData"
                border
                stripe
                style="width: 100%;">
            <el-table-column
                    prop="account"
                    label="编号"
                    align="center"
                    min-width="180"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="反馈时间"
                    align="center"
                    min-width="180">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    align="center"
                    min-width="180"
                    label="终端账号">
            </el-table-column>
            <el-table-column
                    prop="district"
                    label="内容摘要"
                    align="center"
                    min-width="180">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="状态"
                    align="center"
                    min-width="180">
            </el-table-column>
            <el-table-column
                    align="center"
                    min-width="180"
                    label="操作">
                <template slot-scope="scope">
                    <!-- 处理用户反馈 -->
                    <div class="icon_btn">
                        <i class="el-icon-refresh" @click="dialoguserDispose=true"></i>
                    </div>
                    <!-- 转发用户反馈 -->
                    <div class="icon_btn">
                        <i class="el-icon-edit" @click="dialoguserTranspond=true"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!--------------------------------- 点击右上角新建用户的弹框 --------------------------------------------->
        <el-dialog title="新建用户" :visible.sync="dialogFormVisible" :modal-append-to-body='false' width="25%" class="new_user">
            <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="new-ruleForm">
                <!-- 账户 -->
                <el-form-item label="账户" prop="userAccount">
                    <el-input type="password" v-model="ruleForm.userAccount" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 姓名 -->
                <el-form-item label="姓名" prop="userName">
                    <el-input type="password" v-model="ruleForm.userName" autocomplete="off"></el-input>
                    <!-- 手机号 -->
                </el-form-item>
                <el-form-item label="手机号" prop="userPhone">
                    <el-input v-model.number="ruleForm.userPhone"></el-input>
                </el-form-item>
                <!-- 角色 -->
                <el-form-item label="角色" prop="age">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!-- 底部确定、取消按钮 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!----------------------------处理用户反馈------------------------>
        <el-dialog title="处理用户反馈" :visible.sync="dialoguserDispose" :modal-append-to-body='false' width="25%" class="new_user" style="text-align:center;">

            <el-form :model="ruleFormDeal" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="反馈时间" prop="dealTime">
                    <el-input  v-model="ruleFormDeal.dealTime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="终端账号" prop="dealAccount">
                    <el-input  v-model="ruleFormDeal.dealAccount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="反馈内容" prop="dealText" >
                    <el-input type="textarea" v-model="ruleFormDeal.dealText" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="dealTime">
                    <el-select v-model="value" placeholder="请选择" style="width: 255px;">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
                <el-button type="primary" @click="dialoguserDispose = false">确 定</el-button>
                <el-button @click="dialoguserDispose = false">取 消</el-button>
            </div>
        </el-dialog>
        <!----------------------------转发用户反馈------------------------>
        <el-dialog title="转发用户反馈" :visible.sync="dialoguserTranspond" :modal-append-to-body='false' width="25%" class="new_user" style="text-align:center;">
            <el-form :model="ruleFormIntransit " status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="发送记录" prop="dealText">
                    <el-input type="textarea" v-model="ruleFormIntransit.dealText" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="转发邮箱" prop="dealTime">
                    <el-select v-model="value" placeholder="请选择" style="width: 255px;">
                        <el-option
                                v-for="item in Intransit"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer" style="text-align:center;">
                <el-button type="primary" @click="dialoguserTranspond = false">确 定</el-button>
                <el-button @click="dialoguserTranspond = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--分页-->
        <el-pagination
                :total="100"
                :current-page="page + 1"
                style="margin-top: 8px;float: right;"
                layout="total, prev, pager, next, sizes"
                @size-change="sizeChange"
                @current-change="pageChange" />
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return{
                // 添加用户数据
                ruleForm: {
                    userAccount: '',
                    userName: '',
                    age: ''
                },
                tableData:[],
                dialogFormVisible: false,   // 判断新建用户组件是否展开
                dialoguserDispose:false,    // 处理用户反馈
                dialoguserTranspond:false,   // 转发用户反馈
                // 处理用护肤反馈
                ruleFormDeal:{
                    dealTime:"",
                    dealAccount:"",
                    dealText:"",
                },
                // 转发用户反馈
                ruleFormIntransit:{
                    dealText:"",    // 发送记录
                },
                // 转发邮箱
                Intransit:[{
                    value:"选项1",
                    label:"yrd@163.com"
                },{
                    value:"选项1",
                    label:"yrd@163.com"
                },{
                    value:"选项1",
                    label:"yrd@163.com"
                }],
                options: [{
                    value: '选项1',
                    label: '未处理'
                },{
                    value: '选项1',
                    label: '已处理'
                }],
                arr:[],
                result:[
                    {
                        "account":"201911110001",
                        "name":"2019/9/18 11:11",
                        "phone":"qiuwujie1@ips.com",
                        "district":"价格显示不出来了1",
                        "state":"未处理"
                    },
                    {
                        "account":"201911110001",
                        "name":"2019/9/18 11:11",
                        "phone":"qiuwujie1@ips.com",
                        "district":"价格显示不出来了1",
                        "state":"未处理"
                    },
                    {
                        "account":"201911110001",
                        "name":"2019/9/18 11:11",
                        "phone":"qiuwujie1@ips.com",
                        "district":"价格显示不出来了1",
                        "state":"未处理"
                    },
                    {
                        "account":"201911110001",
                        "name":"2019/9/18 11:11",
                        "phone":"qiuwujie1@ips.com",
                        "district":"价格显示不出来了1",
                        "state":"未处理"
                    },
                    {
                        "account":"201911110001",
                        "name":"2019/9/18 11:11",
                        "phone":"qiuwujie1@ips.com",
                        "district":"价格显示不出来了1",
                        "state":"未处理"
                    },
                    {
                        "account":"201911110001",
                        "name":"2019/9/18 11:11",
                        "phone":"qiuwujie1@ips.com",
                        "district":"价格显示不出来了1",
                        "state":"未处理"
                    },
                    {
                        "account":"201911110001",
                        "name":"2019/9/18 11:11",
                        "phone":"qiuwujie1@ips.com",
                        "district":"价格显示不出来了1",
                        "state":"未处理"
                    },
                    {
                        "account":"201911110001",
                        "name":"2019/9/18 11:11",
                        "phone":"qiuwujie1@ips.com",
                        "district":"价格显示不出来了1",
                        "state":"未处理"
                    }



                ]
            }
        },
        mounted(){
            this.tableData = this.result;
        },
        methods:{
            // 重置密码
            resetPassword () {
                this.$confirm('确定重置的密码？重置后，请查收用户初始化邮件。', '重置密码', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //调取接口 返回数据
            getData(){
                // var params = {
                //   pageNo:  this.pageNo,
                //   pageSize: this.pageSize,
                //   name: this.form.name,
                //   date: this.form.date,
                //
                // }
                this.$axios.post('',params).then(res=>{
                    if(res.data.code == 0){

                    }S
                }).catch(err=>{

                })
            },
        }
    }
</script>
<style scoped>
    .test_top{
        text-align:right;
        margin:10px;
    }
    .icon_btn{
        display: inline;
        padding:3px;
        border-radius: 50%;
        margin: 0 4px;
    }
    .icon_btn:hover{
        background: #ccc;
    }
    .user_Delete {
        margin:10px 10px 10px 20px;
    }
</style>
