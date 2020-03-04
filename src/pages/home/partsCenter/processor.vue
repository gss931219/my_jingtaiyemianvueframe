<template>
    <!-- 处理器 -->
    <div>
        <el-container>
            <el-main>
                <el-select v-model="apparatusLeftValue" placeholder="机器主型号1" style="float: left;margin-right:10px;">
                    <el-option
                            v-for="item in optionsapparatusLeft"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="apparatusRightValue" placeholder="机器子型号1">
                    <el-option
                            v-for="item in optionsapparatusRight"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <!--新建处理器-->
                <el-button style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;"  @click="newOpencpu = true">新建处理器</el-button>
                <el-select v-model="BatchValue" placeholder="批量操作" style="float: right ;margin-right:10px;" >
                    <el-option
                            v-for="item in optionBatch"
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
                    <el-table-column prop="desc" label="描述" align="center" >
                    </el-table-column>
                    <el-table-column prop="issueDate" label="发布日期" align="center">
                    </el-table-column>
                    <el-table-column prop="supplyDate" label="供货日期" align="center">
                    </el-table-column>
                    <el-table-column prop="delistingDate" label="退市日期" align="center">
                    </el-table-column>
                    <!--操作-->
                    <el-table-column prop="operation" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="primary" icon="el-icon-edit" @click="dialogCPURedact=true"/>
                            <el-button  type="danger" icon="el-icon-delete" size="mini" @click="dialogDeleteCPU=true"/>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-pagination
                        :total="100"
                        :current-page="currentPage"
                        style="margin-top: 8px;float: right;"
                        layout="total, prev, pager, next, sizes"/>
            </el-main>
        </el-container>
        <!--点击新建处理器,弹出新建处理器对话框-->
        <el-dialog title="新建处理器" :visible.sync="newOpencpu" class="newOpencpu" style="position:absolute;z-index:30000;" append-to-body width="25%" center >
            <el-form  label-width="80px" :model="form" >
                <el-form-item label="FC">
                    <el-input v-model="form.fC" placeholder="请输入" ></el-input>
                </el-form-item>
                <el-form-item  label="中文描述">
                    <el-input type="textarea" v-model="form.chinaDesc" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="英文描述">
                    <el-input type="textarea" v-model="form.englishDesc" placeholder="请输入" ></el-input>
                </el-form-item>
                <el-form-item label="发布日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"  class="date_input"></el-date-picker>
                </el-form-item>
                <el-form-item label="供货日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" class="date_input"></el-date-picker>
                </el-form-item>
                <el-form-item label="退市日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date3" class="date_input"></el-date-picker>
                </el-form-item>
                <el-form-item label="代数" >
                    <el-input  v-model="form.algebra" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="内部编码">
                    <el-input  v-model="form.code" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="主频(GHz)">
                    <el-input  v-model="form.dominantFrequency" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="核心数">
                    <el-input  v-model="form.coreNumber" placeholder="请输入" ></el-input>
                </el-form-item>
                <el-form-item  label="线程数">
                    <el-input  v-model="form.threadCount" placeholder="请输入" ></el-input>
                </el-form-item>
                <el-form-item  label="功耗(W)">
                    <el-input  v-model="form.power" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="提示信息">
                    <el-input  v-model="form.promptMessage" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="newOpencpu = false">确 定</el-button>
                <el-button @click="newOpencpu = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--点击编辑处理器,弹出编辑处理器弹框-->
        <el-dialog title="编辑处理器" :visible.sync="dialogCPURedact" class="newOpencpu" style="position:absolute;z-index:30000;" append-to-body width="25%" center >
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
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"  class="date_input"></el-date-picker>
                </el-form-item>
                <el-form-item label="供货日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" class="date_input"></el-date-picker>
                </el-form-item>
                <el-form-item label="退市日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date3"  class="date_input"></el-date-picker>
                </el-form-item>
                <el-form-item label="代数" >
                    <el-input  v-model="form.algebra" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="内部编码">
                    <el-input  v-model="form.code" placeholder="请输入" ></el-input>
                </el-form-item>
                <el-form-item  label="主频(GHz)">
                    <el-input  v-model="form.dominantFrequency" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="核心数">
                    <el-input  v-model="form.coreNumber" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="线程数">
                    <el-input  v-model="form.threadCount" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="功耗(W)">
                    <el-input  v-model="form.power" placeholder="请输入" ></el-input>
                </el-form-item>
                <el-form-item  label="提示信息">
                    <el-input  v-model="form.promptMessage" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogCPURedact = false">确 定</el-button>
                <el-button @click="dialogCPURedact = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--点击删除,弹出删除处理器弹框-->
        <el-dialog title="删除处理器" :visible.sync="dialogDeleteCPU" class="newOpenbarebone"  append-to-body width="25%" center >
            <el-form :model="ruleFormDelete" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="FC" prop="bareboneFc">
                    <el-input v-model="ruleFormDelete.bareboneFc"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="bareboneDescribe">
                    <el-input v-model="ruleFormDelete.bareboneDescribe"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogDeleteCPU = false">确 定</el-button>
                <el-button @click="dialogDeleteCPU = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "processor",
        data() {
            const item =
                {
                    pn: 'FUH-9009000-EM61',
                    FC: 'EM61',
                    desc:'中文描述1',
                    issueDate:'2019/9/1',
                    supplyDate: '2019/9/2',
                    delistingDate:'2019/9/2',
                }
            return {
                currentPage:1,  // 分页当前页
                tableData: Array(8).fill(item),
                apparatusLeftValue:"",    // 当前所属机器左边
                optionsapparatusLeft: [{
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
                apparatusRightValue:"",    // 当前所属机器右边
                optionsapparatusRight: [{
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
                BatchValue:"",  // 当前所选批量操作
                optionBatch:[{
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
                newOpencpu:false, //新建处理器弹框是否展开
                dialogCPURedact:false,  // 是否展开编辑处理器弹框
                dialogDeleteCPU:false,    // 是否展开删除处理器弹框
                // 删除处理器
                // 出删除处理器弹框
                ruleFormDelete:{
                    bareboneFc:"",  //FC
                    bareboneDescribe:"",  // 描述
                },
                //------------新建处理器form表单数据，目前新建和编辑所绑定的变量都是一样的----------
                form: {
                    fC:'',//机器主型号
                    chinaDesc:'',  //中文描述
                    englishDesc:'', //英文描述
                    date1: '', //发布时间
                    date2: '', //供货时间
                    date3: '', //退市时间
                    algebra: '', //代数
                    code:'',//内部编码
                    dominantFrequency:'',//主频
                    coreNumber:'',//核心数
                    threadCount :'',//线程数
                    power:'',//功耗
                    promptMessage:'' //提示信息
                },
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


