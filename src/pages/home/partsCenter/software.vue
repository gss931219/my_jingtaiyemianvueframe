<template>
     <!--软件页面-->
    <div class="app-container">
        <el-container>
            <el-main>
                <el-select v-model="optionsSoftwareLeftValue" placeholder="机器主型号1" style="float: left;margin-right: 10px;">
                    <el-option
                            v-for="item in optionsSoftwareLeft"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="optionsSoftwareRightValue" placeholder="机器子型号1">
                    <el-option
                            v-for="item in optionsSoftwareRight"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <!--新建软件-->
                <el-button style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;" @click="newOpensoftware = true  ">新建软件</el-button>
                <el-select v-model="batchValue" placeholder="批量操作" style="float: right ;margin-right: 10px;" >
                    <el-option
                            v-for="item in Batch"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <!--表格内容-->
                <el-table :data="tableData" border stripe>
                    <el-table-column prop="pn" label="PN"  align="center">
                    </el-table-column>
                    <el-table-column prop="FC" label="FC"  align="center">
                    </el-table-column>
                    <el-table-column prop="desc" label="描述"  align="center">
                    </el-table-column>
                    <el-table-column prop="issueDate" label="发布日期"  align="center">
                    </el-table-column>
                    <el-table-column prop="supplyDate" label="供货日期"  align="center">
                    </el-table-column>
                    <el-table-column prop="delistingDate" label="退市日期"  align="center">
                    </el-table-column>
                    <!--操作-->
                    <el-table-column prop="operation" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="primary" icon="el-icon-edit" @click="edit=true"/>
                            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="del=true" />
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-pagination
                        :total="100"
                        :current-page.sync="currentPage1"
                        style="margin-top: 8px;float: right;"
                        layout="total, prev, pager, next, sizes"/>
            </el-main>
        </el-container>
        <!--新建软件,打开新建软件对话框-->
        <el-dialog title="新建软件" :visible.sync="newOpensoftware" :modal-append-to-body="false" width="25%" center >
            <el-form  label-width="80px" :model="form" >
                <el-form-item label="FC">
                    <el-input v-model="form.fC" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="中文描述">
                    <el-input type="textarea" v-model="form.chinaDesc" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="英文描述">
                    <el-input type="textarea" v-model="form.englishDesc" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="发布日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 270px;" ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="供货日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 270px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="退市日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date3"  style="width: 270px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item  label="提示信息">
                    <el-input  v-model="form.promptMessage" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="newOpensoftware = false">确 定</el-button>
                <el-button @click="newOpensoftware = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--编辑软件,打开编辑软件对话框-->
        <el-dialog title="编辑软件" :visible.sync="edit" :modal-append-to-body="false" width="25%" center >
            <el-form  label-width="80px" :model="form" >
                <el-form-item label="FC">
                    <el-input v-model="form.fC" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="中文描述">
                    <el-input type="textarea" v-model="form.chinaDesc" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="英文描述">
                    <el-input type="textarea" v-model="form.englishDesc" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="发布日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 270px;" ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="供货日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 270px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="退市日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date3"  style="width: 270px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item  label="提示信息">
                    <el-input  v-model="form.promptMessage" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="edit = false">确 定</el-button>
                <el-button @click=" edit = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--删除软件,打开删除软件对话框-->
        <el-dialog title="删除软件" :visible.sync="del" :modal-append-to-body="false" width="25%" center >
            <el-form  label-width="80px" :model="form" >
                <el-form-item label="FC">
                    <el-input v-model="form.fC" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="描述">
                    <el-input v-model="form.chinaDesc" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="del = false">确 定</el-button>
                <el-button @click="del = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios'
    console.log(axios)
    export default {
        name: "software",
        data() {
            return {
                currentPage1:1,//当前页码
                // tableData:[],
                //表格数据
                // tableData: [
                //   {
                //     pn: 'FUH-9009000-EM61',
                //     FC: 'EM61',
                //     desc:'中文描述1',
                //     issueDate:'2019/9/1',
                //     supplyDate: '2019/9/2',
                //     delistingDate:'2019/9/2',
                //     operation:'删除 修改'
                //   },
                //   {
                //     pn: 'FUH-9009000-EM61',
                //     FC: 'EM61',
                //     desc:'中文描述1',
                //     issueDate:'2019/9/1',
                //     supplyDate: '2019/9/2',
                //     delistingDate:'2019/9/2',
                //     operation:'删除 修改'
                //   },
                //   {
                //     pn: 'FUH-9009000-EM61',
                //     FC: 'EM61',
                //     desc:'中文描述1',
                //     issueDate:'2019/9/1',
                //     supplyDate: '2019/9/2',
                //     delistingDate:'2019/9/2',
                //     operation:'删除 修改'
                //   },
                //   {
                //     pn: 'FUH-9009000-EM61',
                //     FC: 'EM61',
                //     desc:'中文描述1',
                //     issueDate:'2019/9/1',
                //     supplyDate: '2019/9/2',
                //     delistingDate:'2019/9/2',
                //     operation:'删除 修改'
                //   },
                //   {
                //     pn: 'FUH-9009000-EM61',
                //     FC: 'EM61',
                //     desc:'中文描述1',
                //     issueDate:'2019/9/1',
                //     supplyDate: '2019/9/2',
                //     delistingDate:'2019/9/2',
                //     operation:'删除 修改'
                //   },
                //   {
                //     pn: 'FUH-9009000-EM61',
                //     FC: 'EM61',
                //     desc:'中文描述1',
                //     issueDate:'2019/9/1',
                //     supplyDate: '2019/9/2',
                //     delistingDate:'2019/9/2',
                //     operation:'删除 修改'
                //   },
                //   {
                //     pn: 'FUH-9009000-EM61',
                //     FC: 'EM61',
                //     desc:'中文描述1',
                //     issueDate:'2019/9/1',
                //     supplyDate: '2019/9/2',
                //     delistingDate:'2019/9/2',
                //     operation:'删除 修改'
                //   },
                //   {
                //     pn: 'FUH-9009000-EM61',
                //     FC: 'EM61',
                //     desc:'中文描述1',
                //     issueDate:'2019/9/1',
                //     supplyDate: '2019/9/2',
                //     delistingDate:'2019/9/2',
                //     operation:'删除 修改'
                //   },
                //   {
                //     pn: 'FUH-9009000-EM61',
                //     FC: 'EM61',
                //     desc:'中文描述1',
                //     issueDate:'2019/9/1',
                //     supplyDate: '2019/9/2',
                //     delistingDate:'2019/9/2',
                //     operation:'删除 修改'
                //   },
                //   {
                //     pn: 'FUH-9009000-EM61',
                //     FC: 'EM61',
                //     desc:'中文描述1',
                //     issueDate:'2019/9/1',
                //     supplyDate: '2019/9/2',
                //     delistingDate:'2019/9/2',
                //     operation:'删除 修改'
                //   },
                // ],
                optionsSoftwareLeftValue:'',//first机器
                optionsSoftwareRightValue:'', //second机器
                batchValue:'',//批量操作
                optionsSoftwareLeft: [{
                    value: '选项1',
                    label: '机器主型号1'
                }, {
                    value: '选项2',
                    label: '机器主型号2'
                }, {
                    value: '选项3',
                    label: '机器主型号3'
                }, {
                    value: '选项4',
                    label: '机器主型号4'
                }, {
                    value: '选项5',
                    label: '机器主型号5'
                }],
                optionsSoftwareRight: [{
                    value: '选项1',
                    label: '机器主型号1'
                }, {
                    value: '选项2',
                    label: '机器主型号2'
                }, {
                    value: '选项3',
                    label: '机器主型号3'
                }, {
                    value: '选项4',
                    label: '机器主型号4'
                }, {
                    value: '选项5',
                    label: '机器主型号5'
                }],
                Batch:[{
                    value: '选项1',
                    label: '批量导出'
                }, {
                    value: '选项2',
                    label: '批量导入'
                },
                    {
                        value: '选项3',
                        label: '清空数据'
                    },
                ],
                newOpensoftware:false, //点击新建软件，控制新建软件对话框的显示隐蔽
                edit:false,//点击编辑软件，控制编辑软件对话框的显示隐蔽
                del:false,//点击删除软件，控制删除软件对话框的显示隐蔽
                form: {
                    fC:'',//机器主型号
                    chinaDesc:'',  //中文描述
                    englishDesc:'', //英文描述
                    date1: '', //发布时间
                    date2: '', //供货时间
                    date3: '', //退市时间
                    promptMessage:'' //提示信息
                }
            }
        },
        methods:{
            getData(){
                axios.get('/api/mock.json')
                    .then((res)=> {
                        console.log(res)

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

        },
        mounted(){
            console.log(this.axios)
            this.getData()
        }
    }
</script>
<style>
    .el-dialog__header{
        border-bottom: solid 1px #EFEFEF;
    }
    .dialog-footer{
        display: flex;
        justify-content: center;
    }
</style>


<!--<template>
    <div class="content-box">
        <div class="wrapperd">
            &lt;!&ndash; 新增用户的按钮 &ndash;&gt;
            <div slot="title" class="title">
                <div>
                    <Button type="primary" @click="showAddDialog">新增用户</Button>
                </div>
                <div class="title-right">
                    <Form :model="searchParams" :label-width="80" inline >
                        <FormItem label="用户账号">
                            <Input v-model="searchParams.phone" placeholder="请输入用户账号"/>
                        </FormItem>
                        <FormItem label="刊社名称">
                            <Input v-model="searchParams.pressName" placeholder="请输入刊社名称"/>
                        </FormItem>
                    </Form>
                    <div>
                        <Button type="primary" @click="search">查询</Button>
                    </div>
                </div>
            </div>
            &lt;!&ndash; 表格 &ndash;&gt;
            <Table  :loading="tableLoading" :columns="roleColumns" :data="roleData" :size="this.size" :draggable="true">
                <template slot-scope="{ row, index }" slot="operations">
                    <div>
                        <i-switch v-model="row.isForbidden" @click.stop="stop(index,row)" />
                    </div>
                </template>
                <template slot-scope="{ row, index }" slot="operation">
                    <div>
                        <a @click.stop="showupdateDialog(index,row)">修改</a>
                        <span v-if="row.isForbidden">
            <a @click.stop="resetpass(index,row)" >重置密码</a>
            </span>
                        <span v-if="!row.isForbidden">
            <a @click.stop="stop(index,row)" >禁用</a>
            <a @click.stop="del(index,row)" >删除</a>
             </span>
                    </div>
                </template>
            </Table>
            &lt;!&ndash; 分页 &ndash;&gt;
            <Page v-if="roleData.length" :total="pageTotal" :page-size="10"  show-elevator show-total @on-change="pageChange" class="page" />
            &lt;!&ndash; 新增用户的弹框 &ndash;&gt;
            <Modal v-model="modal1" :title="dialogTitle" @on-ok="sure" @on-cancel="cancel">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="85">
                    <FormItem label="刊社名称" prop="pressName">
                        <Input v-model="formValidate.pressName" placeholder="请输入刊社名称"/>
                    </FormItem>
                    <FormItem label="最大期刊量" prop="maxNum">
                        <Input v-model="formValidate.maxNum" placeholder="请输入最大期刊量"/>
                    </FormItem>
                    <FormItem label="联系人" prop="userName">
                        <Input v-model="formValidate.userName" placeholder="请输入联系人"/>
                    </FormItem>
                    <FormItem label="手机号" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入手机号" />
                    </FormItem>
                    <FormItem label="备注" prop="remark">
                        <Input
                                v-model="formValidate.remark"
                                type="textarea"
                                :autosize="{minRows: 2,maxRows: 5}"
                                placeholder="请输入描述"
                        />
                    </FormItem>
                    <FormItem label="账号类型" prop="city">
                        <Select v-model="formValidate.city" placeholder="请输入账号类型">
                            <Option value="beijing">期刊社</Option>
                            <Option value="shanghai">期刊社</Option>
                        </Select>
                    </FormItem>
                </Form>
                &lt;!&ndash; <Alert type="error" show-icon v-if="roleRepeat">{{roleRepeat}}</Alert> &ndash;&gt;
                <div slot="footer">
                    <Button type="text" size="large" @click="cancel(true)">取消</Button>
                    <Button :loading="sureLoading" type="primary" size="large" @click="sure()">确定</Button>
                </div>

            </Modal>
            &lt;!&ndash; 修改用户的弹框 &ndash;&gt;
            <Modal v-model="modal2" :title="updateDialogTitle" @on-ok="sure" @on-cancel="cancel">
                <Form ref="updateformValidate" :model="updateformValidate" :rules="ruleValidate" :label-width="85">
                    <FormItem label="刊社名称" prop="pressNam">
                        <Input v-model="updateformValidate.pressName" placeholder="请输入刊社名称"/>
                    </FormItem>
                    <FormItem label="最大期刊量" prop="maxNum">
                        <Input v-model="updateformValidate.maxNum" placeholder="请输入最大期刊量"/>
                    </FormItem>
                    <FormItem label="创建期刊" prop="creat">
                        <div class="ivu-input ivu-input-default qkbox">
                            <span v-for="(item,index)  in updateformValidate.perList" :key="index" v-text="item.name"></span>
                        </div>
                    </FormItem>
                    <FormItem label="创建日期" prop="date">
                        <DatePicker type="datetime" disabled :value="updateformValidate.createTime"></DatePicker>
                    </FormItem>
                    <FormItem label="联系人" prop="userName">
                        <Input v-model="updateformValidate.userName" placeholder="请输入联系人"/>
                    </FormItem>
                    <FormItem label="手机号" prop="phone">
                        <Input v-model="updateformValidate.phone" placeholder="请输入手机号" />
                    </FormItem>
                    <FormItem label="备注" prop="remark">
                        <Input
                                v-model="updateformValidate.remark"
                                type="textarea"
                                :autosize="{minRows: 2,maxRows: 5}"
                                placeholder="请输入描述"
                        />
                    </FormItem>
                </Form>
                &lt;!&ndash; <Alert type="error" show-icon v-if="roleRepeat">{{roleRepeat}}</Alert> &ndash;&gt;
                <div slot="footer">
                    <Button type="text" size="large" @click="cancel(true)">取消</Button>
                    <Button :loading="sureLoading" type="primary" size="large" @click="updatesure()">确定</Button>
                </div>

            </Modal>
        </div>
    </div>
</template>
<script>
    // import { roleColumns } from "./const.js";
    export default {
        data() {
            return {
                roleColumns, // 表头信息
                tableLoading:false,//table的Loading
                sureLoading:false,//确定的Loading
                size:"default",
                pageTotal:null,
                roleData:[],
                isSelect: true,//开关的状态
                modal1: false, //新增弹框的显示隐藏
                modal2: false, //修改弹框的显示隐藏
                //添加输入框的数据
                addRoleParams: {
                    id: "",
                    name: "",
                    remark: "", //描述
                },
                searchParams:{
                    phone: "",//用户账号
                    pressName: "",//刊社名称
                    pageNo:1,
                    pageSize:10,
                },
                roleRepeat: "", //角色名称重复提示
                dialogTitle: "新增用户",//新增弹框的头部的题目的字的改变
                updateDialogTitle: "修改用户",//修改弹框的头部的题目的字的改变
                //新增用户的数据
                formValidate: {
                    pressName: '',
                    maxNum: '',
                    userName: '',
                    phone: '',
                    remark: '',
                    city: '',
                },
                //修改用户的数据
                perList:[],
                updateformValidate: {
                    pressName: '',
                    userId: '',
                    maxNum: '',
                    userName: '',
                    perList: [],
                    createTime:'',
                    phone: '',
                    remark: '',
                },
                ruleValidate: {
                    pressName: [
                        { required: true, message: '请输入期刊名字', trigger: 'blur' }
                    ],
                    userName: [
                        { required: true, message: '请输入联系人', trigger: 'blur' }
                    ],
                    maxNum: [
                        { required: true, message: '最大期刊量为10', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    phone: [
                        { required: true, message: '请输入正确的手机号', trigger: 'change' }
                    ],

                }
            };
        },
        mounted() {
            this.getRoleList();
        },
        methods: {
            //1.获取角色管理列表
            getRoleList() {
                this.tableLoading=true
                this.$apis.manage.pressUserList(this.searchParams).then(res => {
                    if (res.resultCode == 0) {
                        this.pageTotal=Number(res.content.page.total);
                        this.roleData =res.content.page.list.map((item)=>{
                            item.isForbidden=item.isForbidden==1?true:false;
                            item.createTime=this.$global.transferDate(item.createTime)
                            return item;
                        });
                        console.log( this.roleData)
                        this.tableLoading=false
                    }
                }).finally(() => {
                    this.tableLoading=false
                });
            },

            //  分页
            pageChange(current){
                if(current){
                    this.searchParams.pageNo = current;
                }
                this.getRoleList();
            },
            //修改
            showupdateDialog(index, row){
                this.updateformValidate.userId=row.userId
                this.$apis.manage
                    .selPressUser({userId:row.userId})
                    .then(res => {
                        if (res.resultCode ==0) {
                            console.log(res.content.user)
                            this.updateformValidate.createTime=this.$global.transferDate(res.content.user.createTime)
                            this.updateformValidate.maxNum=res.content.user.maxNum
                            this.updateformValidate.userName=res.content.user.userName
                            this.updateformValidate.pressName=res.content.user.pressName
                            this.updateformValidate.phone=res.content.user.phone
                            this.updateformValidate.remark=res.content.user.remark
                            this.updateformValidate.perList=res.content.user.perList
                            this.updateformValidate.pressId=res.content.user.pressId
                        }
                    });
                this.modal2 = true;
            },
            updatesure() {
                let vm = this;
                this.$apis.manage
                    .updPressUser({
                        pressName: this.updateformValidate.pressName,
                        userId: this.updateformValidate.userId,
                        maxNum: this.updateformValidate.maxNum,
                        userName: this.updateformValidate.userName,
                        phone:this.updateformValidate.phone,
                        remark: this.updateformValidate.remark,
                    })
                    .then(res => {

                        if (res.resultCode ==0) {
                            vm.successTip("修改成功");
                            vm.getRoleList();
                            this.cancel(false)
                        } else {
                            this.$Message.warning(res.msg);
                        }
                        this.modal2 = false;
                    });

            },
            //3.删除
            del(index, row) {
                let vm = this;
                this.$Modal.confirm({
                    title: "提示",
                    content: "确定删除此用户吗？",
                    onOk() {
                        this.$apis.manage
                            .delPressUser({
                                userId:row.userId,
                            })
                            .then(res => {

                                if (res.resultCode ==0) {
                                    vm.successTip("删除成功");
                                    vm.getRoleList();
                                } else {
                                    this.$Message.warning(res.msg);
                                }
                            });
                    }
                });
            },
            //重置密码
            resetpass(){

            },
            //禁用
            stop(index, row){
                let vm = this;
                this.$apis.manage
                    .isForbidden({
                        userId:row.userId,
                        isForbidden:row.isForbidden==true?"1":"0"
                    })
                    .then(res => {

                        if (res.resultCode ==0) {
                            vm.successTip("更改期刊社禁用状态成功");
                            vm.getRoleList();
                        } else {
                            this.$Message.warning(res.msg);
                        }
                    });
            },
            //4.新建角色显示添加角色弹框
            showAddDialog() {

                // 清空编辑内容
                (this.formValidate = {
                    pressName: '',
                    maxNum: '',
                    userName: '',
                    phone: '',
                    remark: '',
                    city: '',
                }),
                    this.modal1 = true;
            },
            //5.确定弹框
            sure() {
                console.log(this.formValidate)
                if (!this.formValidate){
                    this.successTip("请填写完整的信息"); //操作成功
                    console.log("1")
                }else{
                    this.sureLoading=true
                    this.$apis.manage.insertPressUser(this.formValidate).then(res => {
                            if (res.resultCode == 0) {
                                this.successTip("添加角色成功"); //操作成功
                                this.getRoleList();
                                this.cancel(false)
                                this.sureLoading=false
                            }
                        }
                    );
                }

                this.modal1 = false;
            },
            //6.取消弹框
            cancel(status) {

                if (status == true) {
                    this.confirm();
                    return;
                }
                this.modal2 = false;
                this.modal1 = false;
            },
            //10. 成功提示
            successTip(val) {
                this.$Message.success(val);
            },
            //11.是否要关闭弹框
            confirm() {
                var vm = this;
                this.$Modal.confirm({
                    title: "提示",
                    content: "确定关闭吗？",
                    onOk() {
                        vm.modal2 = false;
                        vm.cancel(false);
                    },
                    onCancel() {
                        vm.modal1 = true;
                    }
                });
            },
            //查询
            search(){
                this.getRoleList();
            },


        }
    };
</script>
<style scoped >
    .title{
        display: flex;
        justify-content: space-between;
    }
    .title-right{
        display: flex;
    }
    .tree {
        border: 1px solid #cccccc;
        border-radius: 3px;
    }
    .btn{
        border: none;
        color:#2d8cf0;
    }
    .btn .ivu-btn .ivu-btn-text{
        border:10px solid;

    }
    .qkbox{
        background: #f3f3f3;
        cursor:not-allowed;
        line-height: 24px;

    }
    .qkbox span{
        padding-right:10px;
    }
</style>-->
