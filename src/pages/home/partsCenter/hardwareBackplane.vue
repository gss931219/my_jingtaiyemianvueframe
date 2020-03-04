<template>
    <!-- 硬件背板 -->
    <div>
        <el-container>
            <el-main>
                <el-select v-model="value" placeholder="机器主型号1" style="float: left;margin-right:10px;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value" placeholder="机器子型号1" style="margin-right:10px;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <!--新建硬件背板-->
                <el-button  @click="dlalogNewHardware=true" style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;">新建硬件背板</el-button>
                <el-select v-model="value" placeholder="批量操作" style="float:right;margin-right:10px;" >
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
                    <el-table-column prop="FC" label="FC" align="center">
                    </el-table-column>
                    <el-table-column prop="desc" label="描述"  align="center">
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
                            <el-button  size="mini" type="primary" icon="el-icon-edit" @click="dlalogeditHard=true"/>
                            <el-button slot="reference" type="danger" icon="el-icon-delete" @click="dlalogeditHardDelete=true" size="mini"/>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-pagination
                        :total="100"
                        :current-page="page + 1"
                        style="margin-top: 8px;float: right;"
                        layout="total, prev, pager, next, sizes" class="margin-buttom:30px;"/>
            </el-main>
        </el-container>
        <!--点击编辑,弹出编辑硬盘背板-->
        <el-dialog title="编辑硬盘背板" :visible.sync="dlalogeditHard" :modal-append-to-body="false" width="25%" center >
            <el-form :model="ruleFormHard" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="FC" prop="hardFc">
                    <el-input v-model="ruleFormHard.hardFc"></el-input>
                </el-form-item>
                <el-form-item label="中文描述" prop="hardChinese">
                    <el-input v-model="ruleFormHard.hardChinese"></el-input>
                </el-form-item>
                <el-form-item label="英文描述" prop="hardEnglish">
                    <el-input v-model="ruleFormHard.hardEnglish"></el-input>
                </el-form-item>
                <el-form-item label="发布日期" prop="hardIssue" >
                    <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期"
                            style="width:245px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="供货日期" prop="hardSupply">
                    <el-date-picker
                            v-model="value2"
                            type="date"
                            placeholder="选择日期"
                            style="width:245px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="退市日期" prop="hardDelist">
                    <el-date-picker
                            v-model="value3"
                            type="date"
                            placeholder="选择日期"
                            style="width:245px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="位置分类" prop="locationage">
                    <el-select v-model="value" placeholder="前置" style="width:245px;">
                        <el-option
                                v-for="item in optionsLocation"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--背板类型-->
                <el-form-item label="背板类型" prop="locationtype">
                    <el-select v-model="value" placeholder="普通" style="width:245px;">
                        <el-option
                                v-for="item in optionsType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--接口类型-->
                <el-form-item label="接口类型" prop="location">
                    <el-select v-model="value" placeholder="SAS" style="width:245px;">
                        <el-option
                                v-for="item in optionsPort"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--硬盘尺寸-->
                <el-form-item label="硬盘尺寸" prop="locationSize">
                    <el-select v-model="value" placeholder="2.5尺寸" style="width:245px;">
                        <el-option
                                v-for="item in optionsSize"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--Power硬盘类型-->
                <el-form-item label="Power硬盘类型" prop="locationHardType">
                    <el-select v-model="value" placeholder="Normal" style="width:245px;">
                        <el-option
                                v-for="item in optionsHardType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--硬盘槽位-->
                <el-form-item label="硬盘槽位" prop="hardGroove">
                    <el-input v-model="ruleFormHard.hardGroove"></el-input>
                </el-form-item>
                <!--功耗（W）-->
                <el-form-item label="功耗(W)" prop="hardPower">
                    <el-input v-model="ruleFormHard.hardPower"></el-input>
                </el-form-item>
                <!--提示信息-->
                <el-form-item label="提示信息" prop="hardHint">
                    <el-input v-model="ruleFormHard.hardHint"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dlalogeditHard = false">确 定</el-button>
                <el-button @click="dlalogeditHard = false">取 消</el-button>
            </div>
        </el-dialog>
        <!----------------------------删除硬盘背板------------------------>
        <el-dialog title="删除硬盘背板" :visible.sync="dlalogeditHardDelete" :modal-append-to-body='false' width="25%" class="new_user" style="text-align:center;">
            <el-form :model="ruleFormHardDel" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="FC" prop="hardDelFc">
                    <el-input v-model="ruleFormHard.hardDelFc"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="hardDelDescribe">
                    <el-input v-model="ruleFormHard.hardDelDescribe"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
                <el-button type="primary" @click="dlalogeditHardDelete = false">确 定</el-button>
                <el-button @click="dlalogeditHardDelete = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--点击新建,弹出编辑硬盘背板-->
        <el-dialog title="新建硬盘背板" :visible.sync="dlalogNewHardware" :modal-append-to-body="false" width="25%" center >
            <el-form :model="ruleFormHard" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="FC" prop="hardFc">
                    <el-input v-model="ruleFormHard.hardFc"></el-input>
                </el-form-item>
                <el-form-item label="中文描述" prop="hardChinese">
                    <el-input v-model="ruleFormHard.hardChinese"></el-input>
                </el-form-item>
                <el-form-item label="英文描述" prop="hardEnglish">
                    <el-input v-model="ruleFormHard.hardEnglish"></el-input>
                </el-form-item>
                <el-form-item label="发布日期" prop="hardIssue" >
                    <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期"
                            style="width:245px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="供货日期" prop="hardSupply">
                    <el-date-picker
                            v-model="value2"
                            type="date"
                            placeholder="选择日期"
                            style="width:245px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="退市日期" prop="hardDelist">
                    <el-date-picker
                            v-model="value3"
                            type="date"
                            placeholder="选择日期"
                            style="width:245px;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="位置分类" prop="locationage">
                    <el-select v-model="value" placeholder="前置" style="width:245px;">
                        <el-option
                                v-for="item in optionsLocation"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--背板类型-->
                <el-form-item label="背板类型" prop="locationtype">
                    <el-select v-model="value" placeholder="普通" style="width:245px;">
                        <el-option
                                v-for="item in optionsType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--接口类型-->
                <el-form-item label="接口类型" prop="location">
                    <el-select v-model="value" placeholder="SAS" style="width:245px;">
                        <el-option
                                v-for="item in optionsPort"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--硬盘尺寸-->
                <el-form-item label="硬盘尺寸" prop="locationSize">
                    <el-select v-model="value" placeholder="2.5尺寸" style="width:245px;">
                        <el-option
                                v-for="item in optionsSize"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--Power硬盘类型-->
                <el-form-item label="Power硬盘类型" prop="locationHardType">
                    <el-select v-model="value" placeholder="Normal" style="width:245px;">
                        <el-option
                                v-for="item in optionsHardType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--硬盘槽位-->
                <el-form-item label="硬盘槽位" prop="hardGroove">
                    <el-input v-model="ruleFormHard.hardGroove"></el-input>
                </el-form-item>
                <!--功耗（W）-->
                <el-form-item label="功耗(W)" prop="hardPower">
                    <el-input v-model="ruleFormHard.hardPower"></el-input>
                </el-form-item>
                <!--提示信息-->
                <el-form-item label="提示信息" prop="hardHint">
                    <el-input v-model="ruleFormHard.hardHint"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dlalogNewHardware = false">确 定</el-button>
                <el-button @click="dlalogNewHardware = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "hardwareBackplane",
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
                dlalogNewHardware:false,  // 新建硬件背板弹框
                dlalogeditHard:false, // 编辑硬盘背板弹框是否展开
                dlalogeditHardDelete:false,  // 删除硬盘弹框是否展开
                tableData: Array(10).fill(item),
                options: [{
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
                value: '',
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
                // 删除硬盘背板
                ruleFormHardDel:{
                    hardDelFc:'',     // FC
                    hardDelDescribe:"", // 描述
                },
                // 编辑硬盘背板表单
                ruleFormHard:{
                    hardFc:"",  // FC
                    hardChinese:"",  // 中文描述
                    hardEnglish:"",  // 英文描述
                    hardIssue:"",   // 发布日期
                    hardSupply:"",  // 供货日期
                    hardDelist:"",  // 退货日期
                    locationage:"",    // 位置分类
                    locationtype:"",    // 背板类型
                    locationSize:"",    // 硬盘尺寸
                    locationHardType:"",  // Power硬盘类型
                    hardGroove:"",        // 硬盘槽位
                    hardPower:"",         //功耗
                    hardHint:"",          // 提示信息
                },
                // 位置分类下拉
                optionsLocation:[{
                    value:"选项1",
                    label:"前置"
                },{
                    value:"选项2",
                    label:"中置"
                },{
                    value:"选项3",
                    label:"后置"
                }],
                // 背板类型下拉
                optionsType:[{
                    value:"选项1",
                    label:"普通"
                },{
                    value:"选项2",
                    label:"RAS背板"
                },{
                    value:"选项3",
                    label:"NAme背板"
                }],
                // 接口类型下拉
                optionsPort:[{
                    value:"选项1",
                    label:"SAS"
                },{
                    value:"选项2",
                    label:"SATA"
                },{
                    value:"选项3",
                    label:"U.2"
                }],
                // 硬盘尺寸下拉
                optionsSize:[{
                    value:"选项1",
                    label:"2.5英寸"
                },{
                    value:"选项2",
                    label:"3.5英寸"
                },{
                    value:"选项3",
                    label:"M.2 2280"
                }],
                // Power硬盘类型
                optionsHardType:[{
                    value:"选项1",
                    label:"SFF-2"
                },{
                    value:"选项2",
                    label:"SFF-3"
                },{
                    value:"选项3",
                    label:"SSF-4"
                }],
                // 发布日期、供货日期、退市日期
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
                value3: '',
                value4: '',
            }
        }
    }
</script>
<style>

</style>

