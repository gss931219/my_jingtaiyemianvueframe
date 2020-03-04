<!--运营中心-邮件管理 -->
<template>
    <!-- 邮件管理页面 -->
    <div class="app-container">
        <el-container>
            <el-main>
                <!--添加邮件-->
                <el-button style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;" @click="newOpenemail = true">添加邮件</el-button>
                <!--表格内容-->
                <el-table :data="tableData" border stripe>
                    <el-table-column prop="email" label="电子邮件" align="center">
                    </el-table-column>
                    <!--操作-->
                    <el-table-column prop="operation" label="操作"  align="center">
                        <template slot-scope="scope">
                            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="del =true"/>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-pagination
                        :total="100"
                        :current-page="page + 1"
                        style="margin-top: 8px;float: right;"
                        layout="total, prev, pager, next, sizes"/>
                <!--点击添加邮件,打开添加邮件对话框-->
                <el-dialog title="添加邮箱" :visible.sync="newOpenemail" :modal-append-to-body="false" width="25%" center >
                    <el-form  label-width="80px" :model="form" >
                        <el-form-item label="电子邮箱">
                            <el-input v-model="form.email" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="newOpenemail = false">确 定</el-button>
                        <el-button @click="newOpenemail = false">取 消</el-button>
                    </div>
                </el-dialog>

                <!--点击删除邮件,打开删除邮件对话框-->
                <el-dialog title="删除邮箱" :visible.sync="del" :modal-append-to-body="false" width="25%" center >
                    <el-form  label-width="80px" :model="form" >
                        <el-form-item label="电子邮箱">
                            <el-input v-model="form.email" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="del = false">确 定</el-button>
                        <el-button @click="del = false">取 消</el-button>
                    </div>
                </el-dialog>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    export default {
        name: "email",
        data() {
            const item =
                {
                    email: 'email14@ips.com'
                }
            return {
                tableData: Array(8).fill(item),
                newOpenemail:false,
                del:false,
                form: {
                    email:'',//电子邮箱
                }
            }
        }
    }
</script>
<style>
    .el-dialog__header{
        border-bottom: solid 1px #EFEFEF;
    }
</style>