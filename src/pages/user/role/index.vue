<!--<template>-->
<!--<div class="app-container">-->
<!--&lt;!&ndash;表单组件&ndash;&gt;-->
<!--<eForm ref="form" :is-add="isAdd"/>-->
<!--&lt;!&ndash;工具栏&ndash;&gt;-->
<!--<div class="head-container">-->
<!--&lt;!&ndash; 搜索 &ndash;&gt;-->
<!--<el-input v-model="query.value" clearable placeholder="输入名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>-->
<!--<el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>-->
<!--&lt;!&ndash; 新增 &ndash;&gt;-->
<!--<div v-permission="['ADMIN','ROLES_ALL','ROLES_CREATE']" style="display: inline-block;margin: 0px 2px;">-->
<!--<el-button-->
<!--class="filter-item"-->
<!--size="mini"-->
<!--type="primary"-->
<!--icon="el-icon-plus"-->
<!--@click="add">新增</el-button>-->
<!--</div>-->
<!--</div>-->
<!--<el-row :gutter="15">-->
<!--&lt;!&ndash;角色管理&ndash;&gt;-->
<!--<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17">-->
<!--<el-card class="box-card" shadow="never">-->
<!--<div slot="header" class="clearfix">-->
<!--<span class="role-span">角色列表</span>-->
<!--<div id="opt" style="float: right">-->
<!--<el-radio-group v-model="opt" size="mini">-->
<!--<el-radio-button label="菜单分配"/>-->
<!--<el-radio-button label="权限分配"/>-->
<!--</el-radio-group>-->
<!--</div>-->
<!--</div>-->
<!--<el-table v-loading="loading" :data="data" highlight-current-row size="small" style="width: 100%;" @current-change="handleCurrentChange">-->
<!--<el-table-column prop="name" label="名称"/>-->
<!--<el-table-column prop="dataScope" label="数据权限"/>-->
<!--<el-table-column prop="level" label="角色级别"/>-->
<!--<el-table-column :show-overflow-tooltip="true" prop="remark" label="描述"/>-->
<!--<el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">-->
<!--<template slot-scope="scope">-->
<!--<span>{{ parseTime(scope.row.createTime) }}</span>-->
<!--</template>-->
<!--</el-table-column>-->
<!--<el-table-column v-if="checkPermission(['ADMIN','ROLES_ALL','ROLES_EDIT','ROLES_DELETE'])" label="操作" width="130px" align="center">-->
<!--<template slot-scope="scope">-->
<!--<el-button v-permission="['ADMIN','ROLES_ALL','ROLES_EDIT']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>-->
<!--<el-popover-->
<!--v-permission="['ADMIN','ROLES_ALL','ROLES_DELETE']"-->
<!--:ref="scope.row.id"-->
<!--placement="top"-->
<!--width="180">-->
<!--<p>确定删除本条数据吗？</p>-->
<!--<div style="text-align: right; margin: 0">-->
<!--<el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>-->
<!--<el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>-->
<!--</div>-->
<!--<el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>-->
<!--</el-popover>-->
<!--</template>-->
<!--</el-table-column>-->
<!--</el-table>-->
<!--&lt;!&ndash;分页组件&ndash;&gt;-->
<!--<el-pagination-->
<!--:total="total"-->
<!--:current-page="page + 1"-->
<!--style="margin-top: 8px;"-->
<!--layout="total, prev, pager, next, sizes"-->
<!--@size-change="sizeChange"-->
<!--@current-change="pageChange"/>-->
<!--</el-card>-->
<!--</el-col>-->
<!--&lt;!&ndash; 授权 &ndash;&gt;-->
<!--<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">-->
<!--<el-card v-show="opt === '菜单分配'" class="box-card" shadow="never">-->
<!--<div slot="header" class="clearfix">-->
<!--<el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">-->
<!--<span class="role-span">菜单分配</span>-->
<!--</el-tooltip>-->
<!--<el-button-->
<!--v-permission="['ADMIN','ROLES_ALL','ROLES_EDIT']"-->
<!--:disabled="!showButton"-->
<!--:loading="menuLoading"-->
<!--icon="el-icon-check"-->
<!--size="mini"-->
<!--style="float: right; padding: 6px 9px"-->
<!--type="primary"-->
<!--@click="saveMenu">保存</el-button>-->
<!--</div>-->
<!--<el-tree-->
<!--ref="menu"-->
<!--:data="menus"-->
<!--:default-checked-keys="menuIds"-->
<!--:props="defaultProps"-->
<!--accordion-->
<!--show-checkbox-->
<!--node-key="id"/>-->
<!--</el-card>-->
<!--<el-card v-show="opt === '权限分配'" class="box-card" shadow="never">-->
<!--<div slot="header" class="clearfix">-->
<!--<el-tooltip class="item" effect="dark" content="选择指定角色分配权限" placement="top">-->
<!--<span class="role-span">权限分配</span>-->
<!--</el-tooltip>-->
<!--<el-button-->
<!--v-permission="['ADMIN','ROLES_ALL','ROLES_EDIT']"-->
<!--:disabled="!showButton"-->
<!--:loading="permissionLoading"-->
<!--icon="el-icon-check"-->
<!--size="mini"-->
<!--style="float: right; padding: 6px 9px"-->
<!--type="primary"-->
<!--@click="savePermission">保存</el-button>-->
<!--</div>-->
<!--<el-tree-->
<!--ref="permission"-->
<!--:data="permissions"-->
<!--:default-checked-keys="permissionIds"-->
<!--:props="defaultProps"-->
<!--show-checkbox-->
<!--accordion-->
<!--node-key="id"/>-->
<!--</el-card>-->
<!--</el-col>-->
<!--</el-row>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import checkPermission from '@/utils/permission'-->
<!--import initData from '@/mixins/initData'-->
<!--import { del } from '@/api/role'-->
<!--import { getPermissionTree } from '@/api/permission'-->
<!--import { getMenusTree } from '@/api/menu'-->
<!--import { parseTime } from '@/utils/index'-->
<!--import eForm from './form'-->
<!--import { editPermission, editMenu, get } from '@/api/role'-->
<!--export default {-->
<!--components: { eForm },-->
<!--mixins: [initData],-->
<!--data() {-->
<!--return {-->
<!--defaultProps: {-->
<!--children: 'children',-->
<!--label: 'label'-->
<!--},-->
<!--currentId: 0, permissionLoading: false, menuLoading: false, showButton: false, opt: '菜单分配',-->
<!--delLoading: false, permissions: [], permissionIds: [], menus: [], menuIds: []-->
<!--}-->
<!--},-->
<!--created() {-->
<!--this.getPermissions()-->
<!--this.getMenus()-->
<!--this.$nextTick(() => {-->
<!--this.init()-->
<!--})-->
<!--},-->
<!--methods: {-->
<!--parseTime,-->
<!--checkPermission,-->
<!--beforeInit() {-->
<!--this.$refs.permission.setCheckedKeys([])-->
<!--this.$refs.menu.setCheckedKeys([])-->
<!--this.showButton = false-->
<!--this.url = 'api/roles'-->
<!--const sort = 'level,asc'-->
<!--const query = this.query-->
<!--const value = query.value-->
<!--this.params = { page: this.page, size: this.size, sort: sort }-->
<!--if (value) { this.params['name'] = value }-->
<!--return true-->
<!--},-->
<!--subDelete(id) {-->
<!--this.delLoading = true-->
<!--del(id).then(res => {-->
<!--this.delLoading = false-->
<!--this.$refs[id].doClose()-->
<!--this.dleChangePage()-->
<!--this.init()-->
<!--this.$notify({-->
<!--title: '删除成功',-->
<!--type: 'success',-->
<!--duration: 2500-->
<!--})-->
<!--}).catch(err => {-->
<!--this.delLoading = false-->
<!--this.$refs[id].doClose()-->
<!--console.log(err.response.data.message)-->
<!--})-->
<!--},-->
<!--getPermissions() {-->
<!--getPermissionTree().then(res => {-->
<!--this.permissions = res-->
<!--})-->
<!--},-->
<!--getMenus() {-->
<!--getMenusTree().then(res => {-->
<!--this.menus = res-->
<!--})-->
<!--},-->
<!--handleCurrentChange(val) {-->
<!--if (val) {-->
<!--const _this = this-->
<!--// 清空权限与菜单的选中-->
<!--this.$refs.permission.setCheckedKeys([])-->
<!--this.$refs.menu.setCheckedKeys([])-->
<!--// 保存当前的角色id-->
<!--this.currentId = val.id-->
<!--// 点击后显示按钮-->
<!--this.showButton = true-->
<!--// 初始化-->
<!--this.menuIds = []-->
<!--this.permissionIds = []-->
<!--// 菜单数据需要特殊处理-->
<!--val.menus.forEach(function(data, index) {-->
<!--let add = true-->
<!--for (let i = 0; i < val.menus.length; i++) {-->
<!--if (data.id === val.menus[i].pid) {-->
<!--add = false-->
<!--break-->
<!--}-->
<!--}-->
<!--if (add) {-->
<!--_this.menuIds.push(data.id)-->
<!--}-->
<!--})-->
<!--// 处理权限数据-->
<!--val.permissions.forEach(function(data, index) {-->
<!--_this.permissionIds.push(data.id)-->
<!--})-->
<!--}-->
<!--},-->
<!--savePermission() {-->
<!--this.permissionLoading = true-->
<!--const role = { id: this.currentId, permissions: [] }-->
<!--this.$refs.permission.getCheckedKeys().forEach(function(data, index) {-->
<!--const permission = { id: data }-->
<!--role.permissions.push(permission)-->
<!--})-->
<!--editPermission(role).then(res => {-->
<!--this.$notify({-->
<!--title: '保存成功',-->
<!--type: 'success',-->
<!--duration: 2500-->
<!--})-->
<!--this.permissionLoading = false-->
<!--this.update()-->
<!--}).catch(err => {-->
<!--this.permissionLoading = false-->
<!--console.log(err.response.data.message)-->
<!--})-->
<!--},-->
<!--saveMenu() {-->
<!--this.menuLoading = true-->
<!--const role = { id: this.currentId, menus: [] }-->
<!--// 得到半选的父节点数据，保存起来-->
<!--this.$refs.menu.getHalfCheckedNodes().forEach(function(data, index) {-->
<!--const permission = { id: data.id }-->
<!--role.menus.push(permission)-->
<!--})-->
<!--// 得到已选中的 key 值-->
<!--this.$refs.menu.getCheckedKeys().forEach(function(data, index) {-->
<!--const permission = { id: data }-->
<!--role.menus.push(permission)-->
<!--})-->
<!--editMenu(role).then(res => {-->
<!--this.$notify({-->
<!--title: '保存成功',-->
<!--type: 'success',-->
<!--duration: 2500-->
<!--})-->
<!--this.menuLoading = false-->
<!--this.update()-->
<!--}).catch(err => {-->
<!--this.menuLoading = false-->
<!--console.log(err.response.data.message)-->
<!--})-->
<!--},-->
<!--update() {-->
<!--// 无刷新更新 表格数据-->
<!--get(this.currentId).then(res => {-->
<!--for (let i = 0; i < this.data.length; i++) {-->
<!--if (res.id === this.data[i].id) {-->
<!--this.data[i] = res-->
<!--break-->
<!--}-->
<!--}-->
<!--})-->
<!--},-->
<!--add() {-->
<!--this.isAdd = true-->
<!--this.$refs.form.dialog = true-->
<!--},-->
<!--edit(data) {-->
<!--this.isAdd = false-->
<!--const _this = this.$refs.form-->
<!--_this.deptIds = []-->
<!--_this.form = { id: data.id, name: data.name, remark: data.remark, depts: data.depts, dataScope: data.dataScope, level: data.level }-->
<!--if (_this.form.dataScope === '自定义') {-->
<!--_this.getDepts()-->
<!--}-->
<!--for (let i = 0; i < _this.form.depts.length; i++) {-->
<!--_this.deptIds[i] = _this.form.depts[i].id-->
<!--}-->
<!--_this.dialog = true-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style rel="stylesheet/scss" lang="scss">-->
<!--.role-span {-->
<!--font-weight: bold;color: #303133;-->
<!--font-size: 15px;-->
<!--}-->
<!--</style>-->

<template>
    <!-- 角色管理-->
    <div>
        <el-container>
            <el-main>
                <!--新建角色-->
                <el-button style="background-color: #006EFF;color: #fff;float: right; margin-bottom: 15px;" @click="newsRole = true ">新建角色</el-button>
                <!--表格-->
                <el-table :data="tableData" border stripe>
                    <el-table-column prop="Role" label="角色名称" width="900">
                    </el-table-column>
                    <el-table-column prop="operation" label="操作">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="primary" icon="el-icon-edit" @click="edit= true "/>
                            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="del= true " />
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-pagination
                        :total="100"
                        :current-page="page + 1"
                        style="margin-top: 8px;float: right;"
                        layout="total, prev, pager, next, sizes"
                        @size-change="sizeChange"
                        @current-change="pageChange" />

                <!--点击新建角色 -->
                <el-dialog title="新建角色" :visible.sync="newsRole" append-to-body width="25%" center >
                    <el-form  label-width="80px" :model="form" >
                        <el-form-item label="角色名称">
                            <el-input v-model="form.roleName" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>

                    <table border="1" cellpadding="0" cellspacing="0" style="width: 350px;height:200px;">
                        <tr>
                            <td><input type="checkbox" value="产品中心" /><span>产品中心</span></td>
                            <td>
                                <input type="checkbox" value="产品线管理" /><span>产品线管理</span>
                                <input type="checkbox" value="产品线管理" /><span>产品管理</span>
                                <input type="checkbox" value="产品线管理" /><span>模板管理</span>
                            </td>
                        </tr>
                        <tr >
                            <td>
                                <input type="checkbox" value="部件中心" /><span>部件中心</span>
                            </td>
                            <td>
                                <input type="checkbox" value="处理器" /><sapn>barebone</sapn>
                                <input type="checkbox" value="处理器" /><span>处理器</span>
                                <input type="checkbox" value="内存" /><span>内存</span>
                            </td>
                        </tr>
                        <tr >
                            <td>
                                <input type="checkbox" value="用户中心" /><span>用户中心</span>
                            </td>
                            <td>
                                <input type="checkbox" value="终端角色管理" /><span>终端角色管理</span>
                                <input type="checkbox" value="终端用户管理" /><span>终端用户管理</span>
                            </td>
                        </tr>
                        <tr >
                            <td>
                                <input type="checkbox" value="运营中心" /><span>运营中心</span>
                            </td>
                            <td>
                                <input type="checkbox" value="用户反馈" /><span>用户反馈</span>
                            </td>
                        </tr>
                    </table>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="newsRole = false">确 定</el-button>
                        <el-button @click="newsRole = false">取 消</el-button>
                    </div>
                </el-dialog>

                <!--点击编辑角色 -->
                <el-dialog title="编辑角色" :visible.sync="edit" append-to-body width="25%" center >
                    <el-form  label-width="80px" :model="form" >
                        <el-form-item label="角色名称">
                            <el-input v-model="form.roleName" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>

                    <table border="1" cellpadding="0" cellspacing="0" style="width: 350px;height:200px;">
                        <tr>
                            <td><input type="checkbox" value="产品中心" /><span>产品中心</span></td>
                            <td>
                                <input type="checkbox" value="产品线管理" /><span>产品线管理</span>
                                <input type="checkbox" value="产品线管理" /><span>产品管理</span>
                                <input type="checkbox" value="产品线管理" /><span>模板管理</span>
                            </td>
                        </tr>
                        <tr >
                            <td>
                                <input type="checkbox" value="部件中心" /><span>部件中心</span>
                            </td>
                            <td>
                                <input type="checkbox" value="处理器" /><sapn>barebone</sapn>
                                <input type="checkbox" value="处理器" /><span>处理器</span>
                                <input type="checkbox" value="内存" /><span>内存</span>
                            </td>
                        </tr>
                        <tr >
                            <td>
                                <input type="checkbox" value="用户中心" /><span>用户中心</span>
                            </td>
                            <td>
                                <input type="checkbox" value="终端角色管理" /><span>终端角色管理</span>
                                <input type="checkbox" value="终端用户管理" /><span>终端用户管理</span>
                            </td>
                        </tr>
                        <tr >
                            <td>
                                <input type="checkbox" value="运营中心" /><span>运营中心</span>
                            </td>
                            <td>
                                <input type="checkbox" value="用户反馈" /><span>用户反馈</span>
                            </td>
                        </tr>
                    </table>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="edit = false">确 定</el-button>
                        <el-button @click="edit = false">取 消</el-button>
                    </div>
                </el-dialog>

                <!--点击删除角色按钮,弹出删除角色对话框-->
                <el-dialog title="删除角色" :visible.sync="del" :modal-append-to-body="false" width="25%" center >
                    <el-form  label-width="80px" :model="form" >
                        <el-form-item label="角色名称">
                            <el-input v-model="form.roleName" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  label="登录密码">
                            <el-input  v-model="form.loginPass" placeholder="请输入密码"></el-input>
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
        name: "role",
        data() {
            const item =
                {
                    Role: 'Role1',
                }
            return {
                tableData: Array(5).fill(item),
                delLoading: false, permissions: [], permissionIds: [], menus: [], menuIds: [],
                newsRole:false,
                edit:false,//编辑角色
                del:false,//删除角色
                form: {
                    roleName:'',//角色名称
                    loginPass:''//登录密码
                },
            }
        },
        methods:{

            subDelete(id) {
                this.delLoading = true
                del(id).then(res => {
                    this.delLoading = false
                    this.$refs[id].doClose()
                    this.dleChangePage()
                    this.init()
                    this.$notify({
                        title: '删除成功',
                        type: 'success',
                        duration: 2500
                    })
                }).catch(err => {
                    this.delLoading = false
                    this.$refs[id].doClose()
                    console.log(err.response.data.message)
                })
            },
        }
    }
</script>
<style>
    .el-dialog__header{
        border-bottom: solid 1px #EFEFEF;
    }
</style>

