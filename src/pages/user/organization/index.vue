<!--<template>-->
<!--<div class="app-container">-->
<!--&lt;!&ndash;工具栏&ndash;&gt;-->
<!--<div class="head-container">-->
<!--&lt;!&ndash; 搜索 &ndash;&gt;-->
<!--<el-input v-model="query.value" clearable placeholder="输入部门名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>-->
<!--<el-select v-model="query.enabled" clearable placeholder="状态" class="filter-item" style="width: 90px" @change="toQuery">-->
<!--<el-option v-for="item in enabledTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>-->
<!--</el-select>-->
<!--<el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>-->
<!--&lt;!&ndash; 新增 &ndash;&gt;-->
<!--<div v-permission="['ADMIN','DEPT_ALL','DEPT_CREATE']" style="display: inline-block;margin: 0px 2px;">-->
<!--<el-button-->
<!--class="filter-item"-->
<!--size="mini"-->
<!--type="primary"-->
<!--icon="el-icon-plus"-->
<!--@click="add">新增</el-button>-->
<!--</div>-->
<!--<div style="display: inline-block;">-->
<!--<el-button-->
<!--class="filter-item"-->
<!--size="mini"-->
<!--type="warning"-->
<!--icon="el-icon-more"-->
<!--@click="changeExpand">{{ $parent.expand ? '折叠' : '展开' }}</el-button>-->
<!--<eForm ref="form" :is-add="true" :dicts="dicts"/>-->
<!--</div>-->
<!--</div>-->
<!--&lt;!&ndash;表单组件&ndash;&gt;-->
<!--<eForm ref="form" :is-add="isAdd" :dicts="dicts"/>-->
<!--&lt;!&ndash;表格渲染&ndash;&gt;-->
<!--<tree-table v-loading="loading" :expand-all="expand" :data="data" :columns="columns" size="small">-->
<!--<el-table-column label="状态" align="center">-->
<!--<template slot-scope="scope">-->
<!--<div v-for="item in dicts" :key="item.id">-->
<!--<el-tag v-if="scope.row.enabled.toString() === item.value" :type="scope.row.enabled ? '' : 'info'">{{ item.label }}</el-tag>-->
<!--</div>-->
<!--</template>-->
<!--</el-table-column>-->
<!--<el-table-column prop="createTime" label="创建日期">-->
<!--<template slot-scope="scope">-->
<!--<span>{{ parseTime(scope.row.createTime) }}</span>-->
<!--</template>-->
<!--</el-table-column>-->
<!--<el-table-column v-if="checkPermission(['ADMIN','DEPT_ALL','DEPT_EDIT','DEPT_DELETE'])" label="操作" width="130px" align="center">-->
<!--<template slot-scope="scope">-->
<!--<el-button v-permission="['ADMIN','DEPT_ALL','DEPT_EDIT']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>-->
<!--<el-popover-->
<!--v-permission="['ADMIN','DEPT_ALL','DEPT_DELETE']"-->
<!--:ref="scope.row.id"-->
<!--placement="top"-->
<!--width="180">-->
<!--<p>确定删除本条数据吗？</p>-->
<!--<div style="text-align: right; margin: 0">-->
<!--<el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>-->
<!--<el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>-->
<!--</div>-->
<!--<el-button slot="reference" :disabled="scope.row.id === 1" type="danger" icon="el-icon-delete" size="mini"/>-->
<!--</el-popover>-->
<!--</template>-->
<!--</el-table-column>-->
<!--</tree-table>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import treeTable from '@/components/TreeTable'-->
<!--import checkPermission from '@/utils/permission'-->
<!--import initData from '@/mixins/initData'-->
<!--import initDict from '@/mixins/initDict'-->
<!--import { del } from '@/api/dept'-->
<!--import { parseTime } from '@/utils/index'-->
<!--import eForm from './form'-->
<!--export default {-->
<!--components: { eForm, treeTable },-->
<!--mixins: [initData, initDict],-->
<!--data() {-->
<!--return {-->
<!--columns: [-->
<!--{-->
<!--text: '名称',-->
<!--value: 'name'-->
<!--}-->
<!--],-->
<!--enabledTypeOptions: [-->
<!--{ key: 'true', display_name: '正常' },-->
<!--{ key: 'false', display_name: '禁用' }-->
<!--],-->
<!--delLoading: false, expand: true-->
<!--}-->
<!--},-->
<!--created() {-->
<!--this.$nextTick(() => {-->
<!--this.init()-->
<!--// 加载数据字典-->
<!--this.getDict('dept_status')-->
<!--})-->
<!--},-->
<!--methods: {-->
<!--parseTime,-->
<!--checkPermission,-->
<!--beforeInit() {-->
<!--this.url = 'api/dept'-->
<!--const sort = 'id,desc'-->
<!--this.params = { page: this.page, size: this.size, sort: sort }-->
<!--const query = this.query-->
<!--const value = query.value-->
<!--const enabled = query.enabled-->
<!--if (value) { this.params['name'] = value }-->
<!--if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }-->
<!--return true-->
<!--},-->
<!--subDelete(id) {-->
<!--this.delLoading = true-->
<!--del(id).then(res => {-->
<!--this.delLoading = false-->
<!--this.$refs[id].doClose()-->
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
<!--add() {-->
<!--this.isAdd = true-->
<!--const _this = this.$refs.form-->
<!--_this.getDepts()-->
<!--_this.dialog = true-->
<!--},-->
<!--changeExpand() {-->
<!--this.expand = !this.expand-->
<!--this.init()-->
<!--},-->
<!--edit(data) {-->
<!--this.isAdd = false-->
<!--const _this = this.$refs.form-->
<!--_this.getDepts()-->
<!--_this.form = {-->
<!--id: data.id,-->
<!--name: data.name,-->
<!--pid: data.pid,-->
<!--createTime: data.createTime,-->
<!--enabled: data.enabled.toString()-->
<!--}-->
<!--_this.dialog = true-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->


<!--机构管理-->
<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <!--新建机构-->
        <el-button style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;" @click="newOpenorganization = true  ">新建机构</el-button>
        <!--表格内容-->
        <el-table :data="tableData" border center stripe>
          <el-table-column prop="organizationIdentifying" label="机构标识" align="center">
          </el-table-column>
          <el-table-column prop="organizationName" label="机构名称" align="center">
          </el-table-column>
          <el-table-column prop="state" label="状态" align="center">
          </el-table-column>
          <!--操作-->
          <el-table-column prop="operation" label="操作" align="center">
            <template slot-scope="scope">
              <el-button  size="mini" type="primary" icon="el-icon-edit" @click="edit = true"/>
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="del=true"/>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
                :total="100"
                :current-page="page + 1"
                style="margin-top: 8px;float: right;"
                layout="total, prev, pager, next, sizes"/>
        <!--点击新建机构,打开新建机构对话框-->
        <el-dialog title="新建机构" :visible.sync="newOpenorganization"    :modal-append-to-body="false"  width="25%" center >
          <el-form  label-width="80px" :model="form" >
            <el-form-item label="机构标识">
              <el-input v-model="form.organizationIdentifying" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item  label="机构名称">
              <el-input  v-model="form.organizationName" placeholder="请输入" style="width: 270px;"></el-input>
            </el-form-item>
            <el-form-item label="状态" >
              <el-select v-model="form.state" placeholder="请选择" style="width: 270px;">
                <el-option label="正常" value=""></el-option>
                <el-option label="冻结" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="newOpenorganization = false">确 定</el-button>
            <el-button @click="newOpenorganization = false">取 消</el-button>
          </div>
        </el-dialog>

        <!--点击编辑机构,打开编辑机构对话框-->
        <el-dialog title="编辑机构" :visible.sync="edit"  :modal-append-to-body="false"  width="25%" center >
          <el-form  label-width="80px" :model="form" >
            <el-form-item label="机构标识">
              <el-input v-model="form.organizationIdentifying" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item  label="机构名称">
              <el-input  v-model="form.organizationName" placeholder="请输入" style="width: 270px;"></el-input>
            </el-form-item>
            <el-form-item label="状态" >
              <el-select v-model="form.state" placeholder="请选择" style="width: 270px;">
                <el-option label="正常" value=""></el-option>
                <el-option label="冻结" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="edit = false">确 定</el-button>
            <el-button @click="edit = false">取 消</el-button>
          </div>
        </el-dialog>

        <!--点击删除机构,打开删除机构对话框-->
        <el-dialog title="删除机构" :visible.sync="del" :modal-append-to-body="false" width="25%" center >
          <el-form  label-width="80px" :model="form" >
            <el-form-item label="机构名称">
              <el-input v-model="form.email" placeholder="机构名称1"></el-input>
            </el-form-item>
            <p style="text-align: center;">删除后无法恢复，请谨慎操作!</p>
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
        name: "powerLine",
        data() {
            const item =
                {
                    organizationIdentifying: '500119555',
                    organizationName: '机构名称1',
                    state:'正常'
                }
            return {
                tableData: Array(8).fill(item),
                newOpenorganization:false,
                edit:false,//点击编辑按钮，控制编辑对话框的显示隐藏
                del:false,//点击删除按钮，控制删除对话框的显示隐藏
                form: {
                    organizationIdentifying:'',//机构标识
                    organizationName:'',//机构名称
                    partsType:''
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
