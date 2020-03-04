<!--系统日志-->
<template>
    <div class="app-container">
        <el-container>
            <el-main>
                <el-input
                        placeholder="请输入用户账号"
                        v-model="input"
                        clearable
                        style="width: 250px;">
                </el-input>
                <el-button style="background-color: #000;color: #fff; margin-bottom: 15px;">搜索</el-button>
                <!--表格内容-->
                <el-table :data="tableData" border stripe>
                    <el-table-column prop="userAccount" label="用户账户" align="center">
                    </el-table-column>
                    <el-table-column prop="timer" label="时间" align="center">
                    </el-table-column>
                    <el-table-column prop="ipAddress" label="IP地址" align="center" >
                    </el-table-column>
                    <el-table-column prop="operation" label="操作" align="center">
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-pagination
                        :total="100"
                        :current-page="page + 1"
                        style="margin-top: 8px;float: right;"
                        layout="total, prev, pager, next, sizes"/>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    export default {
        name: "",
        data() {
            const item =
                {
                    userAccount: 'qiuwujie@wsmtec.com',
                    timer: '2019/10/12 11:11',
                    ipAddress:'192.168.6.66',
                    operation:'登录'
                }
            return {
                input: '',
                tableData: Array(8).fill(item),
            }
        }
    }
</script>
<style>
    .el-dialog__header{
        border-bottom: solid 1px #EFEFEF;
    }
</style>