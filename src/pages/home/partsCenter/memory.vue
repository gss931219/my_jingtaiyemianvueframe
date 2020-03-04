<template>
    <!-- 内存 -->
    <div>
        <el-container>
            <el-main>
                <el-select v-model="optionsCPUmachineValue" placeholder="机器主型号1" style="float: left;margin-right:10px;">
                    <el-option
                            v-for="item in optionsCPUmachineleft"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="optionsCPUmachineRightValue" placeholder="机器子型号1">
                    <el-option
                            v-for="item in optionsCPUmachineright"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <!--新建内存-->
                <el-button style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;"   @click="newOpenmemory = true">新建内存</el-button>
                <el-select v-model="Batchvalue" placeholder="批量操作" style="float: right;margin-right:10px;" >
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
                    <el-table-column prop="desc" label="描述"  align="center" >
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
                            <el-button  size="mini" type="primary" icon="el-icon-edit" @click="dialogRedactMemory=true"/>
                            <el-button  type="danger" icon="el-icon-delete" size="mini" @click="dealogRedactDelete=true"/>
                        </template>
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
        <!--点击新建内存,弹出新建内存对话框-->
        <el-dialog title="新建内存" :visible.sync="newOpenmemory" class="newOpenmemory" style="position:absolute;z-index:30000;" append-to-body width="25%" center >
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
                <el-form-item label="发布日期" prop="starttime">
                    <!--value-format="yyyy-MM-dd"-->
                    <el-date-picker v-model="model.starttime" :editable="false" :picker-options="startTime" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="供货日期" prop="endtime">
                    <el-date-picker v-model="model.endtime"  :editable="false" :picker-options="endTime" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="退市日期" prop="date3">
                    <el-date-picker v-model="model.date3"  :editable="false" :picker-options="date3" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>

                <!--<el-form-item label="发布日期" prop="date1">
                    <el-col :span="11">
                        <el-date-picker type="date"   :editable="false" placeholder="选择日期" start-placeholder="form.date1"   end-placeholder="结束日期"  v-model="form.date1" style="width: 270px;" ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="供货日期">
                    <el-col :span="11">
                        <el-date-picker type="date" :editable="false" :start-placeholder="form.date1"   end-placeholder="结束日期" placeholder="选择日期" v-model="form.date2" style="width: 270px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="退市日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date3"  style="width: 270px;"></el-date-picker>
                    </el-col>
                </el-form-item>-->


                <el-form-item label="代数" >
                    <el-select v-model="form.algebra" placeholder="请选择" style="width: 270px;">
                        <el-option label="请选择" value="请选择"></el-option>
                        <el-option label="DDR4" value=""></el-option>
                        <el-option label="DDR5" value=""></el-option>
                        <el-option label="CDIMM" value=""></el-option>
                        <el-option label="DDIMM" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="容量(GB)">
                    <el-input  v-model="form.capacity" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
                <el-form-item  label="外频(MHz)">
                    <el-input  v-model="form.externalFrequency" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
                <el-form-item  label="功耗(W)">
                    <el-input  v-model="form.power" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
                <el-form-item  label="提示信息">
                    <el-input  v-model="form.promptMessage" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="newOpenmemory = false">确 定</el-button>
                <el-button @click="newOpenmemory = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--点击编辑内存,弹出编辑内存弹框-->
        <el-dialog title="编辑内存" :visible.sync="dialogRedactMemory" class="newOpenmemory" style="position:absolute;z-index:30000;" append-to-body width="25%" center >
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
                <el-form-item label="代数" >
                    <el-select v-model="form.algebra" placeholder="请选择" style="width: 270px;">
                        <el-option label="请选择" value="请选择"></el-option>
                        <el-option label="DDR4" value=""></el-option>
                        <el-option label="DDR5" value=""></el-option>
                        <el-option label="CDIMM" value=""></el-option>
                        <el-option label="DDIMM" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="容量(GB)">
                    <el-input  v-model="form.capacity" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
                <el-form-item  label="外频(MHz)">
                    <el-input  v-model="form.externalFrequency" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
                <el-form-item  label="功耗(W)">
                    <el-input  v-model="form.power" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
                <el-form-item  label="提示信息">
                    <el-input  v-model="form.promptMessage" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogRedactMemory = false">确 定</el-button>
                <el-button @click="dialogRedactMemory = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--点击删除,弹出删除处内存弹框-->
        <el-dialog title="删除内存" :visible.sync="dealogRedactDelete" class="newOpenbarebone"  append-to-body width="25%" center >
            <el-form :model="ruleFormDelete" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="FC" prop="bareboneFc">
                    <el-input v-model="ruleFormDelete.bareboneFc"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="bareboneDescribe">
                    <el-input v-model="ruleFormDelete.bareboneDescribe"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dealogRedactDelete = false">确 定</el-button>
                <el-button @click="dealogRedactDelete = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "memory",
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
                model:{
                    starttime:"",
                    endtime:"",
                    date3:"",
                },
                /* start 开始时间小于今天,结束时间不能大于开始时间 */
                startTime: {
                    disabledDate: time => {
                        if (this.endtime) {
                            return (
                                time.getTime() > new Date(this.endtime).getTime()
                            );
                        } else if(this.date3) {
                            time.getTime() > new Date(this.date3).getTime()
                        }else{
                            // return time.getTime() > Date.now();
                        }
                    }
                },
                endTime: {
                    disabledDate: time => {
                        if (this.model.starttime) {
                            return (
                                // time.getTime() > Date.now() ||
                                time.getTime() < new Date(this.model.starttime).getTime()
                            );
                        } else {
                            // return time.getTime() > Date.now();
                        }
                    }
                },
                /* end*/
                date3: {
                    disabledDate: time => {
                        if (this.model.starttime) {
                            return (
                                // time.getTime() > Date.now() ||
                                time.getTime() < new Date(this.model.starttime).getTime()
                            );
                        } else {
                            // return time.getTime() > Date.now();
                        }
                    }
                },
                tableData: Array(10).fill(item),
                optionsCPUmachineValue:"",  // 当前所选机型左边
                optionsCPUmachineleft: [{
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
                optionsCPUmachineRightValue:"",  // 当前所选机型右边
                optionsCPUmachineright: [{
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
                Batchvalue:'',      // 批量导入导出
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
                newOpenmemory:false,        // 是否展示新建内存弹框
                dialogRedactMemory:false,  // 是否展开编辑内存弹框
                dealogRedactDelete:false,  // 是否展开删除内存弹框
                // 删除内存弹框
                ruleFormDelete:{
                    bareboneFc:"",  //FC
                    bareboneDescribe:"",  // 描述
                },
                form: {
                    fC:'',//机器主型号
                    chinaDesc:'',  //中文描述
                    englishDesc:'', //英文描述
                    date1: '', //发布时间
                    date2: '', //供货时间
                    date3: '', //退市时间
                    algebra: '', //代数
                    capacity:'',//容量(MHz)
                    externalFrequency:'',//外频
                    power:'',//功耗
                    ratedPower:'',//额定功率
                    promptMessage:'' //提示信息
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

