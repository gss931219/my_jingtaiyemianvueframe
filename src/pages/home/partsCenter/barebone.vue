<!--
<template>
    &lt;!&ndash; barebone页面 &ndash;&gt;
    <div class="app-container">
        <el-container>
            <el-main>
                <el-select v-model="optionsBrareboneLeftValue" placeholder="机器主型号1" style="float: left;margin-right:10px;">
                    <el-option
                            v-for="item in optionsBrareboneLeft"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="optionsBrareboneRightValue" placeholder="机器子型号1">
                    <el-option
                            v-for="item in optionsBrareboneRight"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                &lt;!&ndash;新建barebone&ndash;&gt;
                <el-button style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;" @click="newOpenbarebone= true">新建barebone</el-button>
                <el-select v-model="Batchvalue" placeholder="批量操作" style="float: right;margin-right:10px;" >
                    <el-option
                            v-for="item in Batch"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                &lt;!&ndash;表格内容&ndash;&gt;
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
                    &lt;!&ndash;操作&ndash;&gt;
                    <el-table-column prop="operation" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button  @click="dialogRedactBarebone=true" size="mini" type="primary" icon="el-icon-edit"/>
                            <el-button  @click="dialogDeleteBarebone=true" slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
                        </template>
                    </el-table-column>
                </el-table>
                &lt;!&ndash;分页&ndash;&gt;
                <el-pagination
                        :total="100"
                        :current-page="currentPage"
                        style="margin-top: 8px;float: right;"
                        layout="total, prev, pager, next, sizes"/>
            </el-main>
        </el-container>
        &lt;!&ndash;点击新建barebone,弹出新建点击新建barebone对话框&ndash;&gt;
        <el-dialog title="新建barebone" :visible.sync="newOpenbarebone" class="newOpenbarebone" style="position:absolute;z-index:30000;" append-to-body width="25%" center >
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
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" class="date_input" ></el-date-picker>
                </el-form-item>
                <el-form-item label="供货日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" class="date_input"></el-date-picker>
                </el-form-item>
                <el-form-item label="退市日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date3"  class="date_input"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="newOpenbarebone = false">确 定</el-button>
                <el-button @click="newOpenbarebone = false">取 消</el-button>
            </div>
        </el-dialog>
        &lt;!&ndash;点击编辑barebone,弹出编辑barebone弹框&ndash;&gt;
        <el-dialog title="编辑barebone" :visible.sync="dialogRedactBarebone" class="newOpenbarebone" style="position:absolute;z-index:30000;" append-to-body width="25%" center >
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
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" class="date_input" ></el-date-picker>
                </el-form-item>
                <el-form-item label="供货日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" class="date_input"></el-date-picker>
                </el-form-item>
                <el-form-item label="退市日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date3"  class="date_input"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogRedactBarebone = false">确 定</el-button>
                <el-button @click="dialogRedactBarebone = false">取 消</el-button>
            </div>
        </el-dialog>
        &lt;!&ndash;点击删除barebone,弹出删除barebone弹框&ndash;&gt;
        <el-dialog title="删除Barebone" :visible.sync="dialogDeleteBarebone" class="newOpenbarebone"  append-to-body width="25%" center >
            <el-form :model="ruleFormDelete" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="FC" prop="bareboneFc">
                    <el-input v-model="ruleFormDelete.bareboneFc"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="bareboneDescribe">
                    <el-input v-model="ruleFormDelete.bareboneDescribe"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogDeleteBarebone = false">确 定</el-button>
                <el-button @click="dialogDeleteBarebone = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "barebone",
        data() {
            const item =
                {
                    pn: 'FUH-9009000-EM61',
                    FC: 'EM61',
                    desc:'中文描述1',
                    issueDate:'2019/9/1',
                    supplyDate: '2019/9/2',
                    delistingDate:'2019/9/2',
                    operation:'删除 修改'
                }
            return {
                // 分页
                currentPage:1,
                // 出删除barebone弹框
                ruleFormDelete:{
                    bareboneFc:"",  //FC
                    bareboneDescribe:"",  // 描述
                },
                tableData: Array(8).fill(item),
                // 所选机器 &#45;&#45;&#45;&#45;左边
                optionsBrareboneLeft: [{
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
                optionsBrareboneLeftValue: '',  //当前所选机器
                // 所选机器 &#45;&#45;&#45;&#45;右边
                optionsBrareboneRight: [{
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
                optionsBrareboneRightValue: '',  //当前所选机器
                newOpenbarebone:false,        // 是否展开新建barebone弹框
                dialogRedactBarebone:false,   // 是否展开编辑barebone弹框
                dialogDeleteBarebone:false,   // 是否展开删除barebone弹框
                form: {
                    fC:'',            //机器主型号
                    chinaDesc:'',     //中文描述
                    englishDesc:'',   //英文描述
                    date1: '',        //发布时间
                    date2: '',        //供货时间
                    date3: '',        //退市时间
                }
            }
        }
    }
</script>
<style>
    .el-dialog__header{
        border-bottom: solid 1px #EFEFEF;
    }
    .el-form-item__content .date_input{
        width: 100% !important;
    }
</style>

-->


<template>
    <div>

        <el-table
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                border
                style="width: 80%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="日期"
                    width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>

        <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
            <el-button type="primary" @click="importData">导入</el-button>
            <el-button type="primary" @click="outportData">导出</el-button>
        </div>

        <!-- 导入 -->
        <el-dialog title="导入" :visible.sync="dialogImportVisible" :modal-append-to-body="false" :close-on-click-modal="false" class="dialog-import">
            <div :class="{'import-content': importFlag === 1, 'hide-dialog': importFlag !== 1}">
                <el-upload class="upload-demo"
                           :action="importUrl"
                           :name ="name"
                           :headers="importHeaders"
                           :on-preview="handlePreview"
                           :on-remove="handleRemove"
                           :before-upload="beforeUpload"
                           :on-error="uploadFail"
                           :on-success="uploadSuccess"
                           :file-list="fileList"
                           :with-credentials="withCredentials">
                    <!-- 是否支持发送cookie信息 -->
                    <el-button size="small" type="primary" :disabled="processing">{{uploadTip}}</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
                </el-upload>
                <div class="download-template">
                    <a class="btn-download" @click="download">
                        <i class="icon-download"></i>下载模板</a>
                </div>
            </div>
            <div :class="{'import-failure': importFlag === 2, 'hide-dialog': importFlag !== 2}" >
                <div class="failure-tips">
                    <i class="el-icon-warning"></i>导入失败</div>
                <div class="failure-reason">
                    <h4>失败原因</h4>
                    <ul>
                        <li v-for="(error,index) in errorResults" :key="index">第{{error.rowIdx + 1}}行，错误：{{error.column}},{{error.value}},{{error.errorInfo}}</li>
                    </ul>
                </div>
            </div>
        </el-dialog>

        <!-- 导出 -->
    </div>
</template>

<script>
    // import * as scheduleApi from '@/api/schedule'
    export default {
        data() {
            return {
                tableData3: [
                    {
                        date: "2016-05-03",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    }
                ],
                multipleSelection: [],
                importUrl:'www.baidu.com',//后台接口config.admin_url+'rest/schedule/import/'
                importHeaders:{
                    enctype:'multipart/form-data',
                    cityCode:''
                },
                name: 'import',
                fileList: [],
                withCredentials: true,
                processing: false,
                uploadTip:'点击上传',
                importFlag:1,
                dialogImportVisible:false,
                errorResults:[]
            };
        },

        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                //复选框选择回填函数,val返回一整行的数据
                this.multipleSelection = val;
            },
            importData() {
                this.importFlag = 1
                this.fileList = []
                this.uploadTip = '点击上传'
                this.processing = false
                this.dialogImportVisible = true
            },
            outportData() {
                scheduleApi.downloadTemplate()
            },
            handlePreview(file) {
                //可以通过 file.response 拿到服务端返回数据
            },
            handleRemove(file, fileList) {
                //文件移除
            },
            beforeUpload(file){
                //上传前配置
                this.importHeaders.cityCode='上海'//可以配置请求头
                let excelfileExtend = ".xls,.xlsx"//设置文件格式
                let fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                if (excelfileExtend.indexOf(fileExtend) <= -1) {
                    this.$message.error('文件格式错误')
                    return false
                }
                this.uploadTip = '正在处理中...'
                this.processing = true
            },
            //上传错误
            uploadFail(err, file, fileList) {
                this.uploadTip = '点击上传'
                this.processing = false
                this.$message.error(err)
            },
            //上传成功
            uploadSuccess(response, file, fileList) {
                this.uploadTip = '点击上传'
                this.processing = false
                if (response.status === -1) {
                    this.errorResults = response.data
                    if (this.errorResults) {
                        this.importFlag = 2
                    } else {
                        this.dialogImportVisible = false
                        this.$message.error(response.errorMsg)
                    }
                } else {
                    this.importFlag = 3
                    this.dialogImportVisible = false
                    this.$message.info('导入成功')
                    this.doSearch()
                }
            },
            //下载模板
            download() {
                //调用后台模板方法,和导出类似
                scheduleApi.downloadTemplate()
            },
        }
    };
</script>

<style scoped>
    .hide-dialog{
        display:none;
    }
</style>



import axios from 'axios'

<!--// 下载模板

export const downloadTemplate = function (scheduleType) {
axios.get('/rest/schedule/template', {
params: {
"scheduleType": scheduleType
},
responseType: 'arraybuffer'
}).then((response) => {
//创建一个blob对象,file的一种
let blob = new Blob([response.data], { type: 'application/x-xls' })
let link = document.createElement('a')
link.href = window.URL.createObjectURL(blob)
link.download = fileNames[scheduleType] + '_' + response.headers.datestr + '.xls'
link.click()
})
}-->
