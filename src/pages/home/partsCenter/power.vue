<template>
    <!-- 电源线页面 -->
    <div class="app-container">
        <el-container>
            <el-main>
                <el-select v-model="optionsPowerLineLeftValue" placeholder="机器主型号1" style="float: left;margin-right: 10px;">
                    <el-option
                            v-for="item in optionsPowerLineLeft"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="optionsPowerLineRightValue" placeholder="机器子型号1">
                    <el-option
                            v-for="item in optionsPowerLineRight"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <!--新建电源-->
                <el-button style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;" @click="newOpenpowerLine = true  ">新建电源</el-button>
                <el-select v-model="BatchValue" placeholder="批量操作" style="float: right ;margin-right: 10px;" >
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
                            <el-button  size="mini" type="primary" icon="el-icon-edit" @click="edit = true" />
                            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="del = true" />
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
               <!-- <el-pagination
                        :total="100"
                        :current-page="page + 1"
                        style="margin-top: 8px;float: right;"
                        layout="total, prev, pager, next, sizes"/>-->
            </el-main>
        </el-container>
        <!--点击新建电源线,弹出新建电源线对话框-->
        <el-dialog title="新建电源线" :visible.sync="newOpenpowerLine" :modal-append-to-body="false" width="25%" center >
            <el-form  label-width="80px"  :rules="rules"   :model="form">
                <el-form-item label="PN" prop="componentPN">
                    <el-input v-model="form.componentPN" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="FC" prop="componentFC">
                    <el-input v-model="form.componentFC" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="中文描述" prop="descriptionCN">
                    <el-input v-model="form.descriptionCN" type="textarea" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="英文描述" prop="descriptionEN">
                    <el-input v-model="form.descriptionEN" type="textarea" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="发布日期" prop="announceDate">
                    <el-date-picker v-model="form.announceDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" class="date_input"/>
                </el-form-item>
                <el-form-item label="供货日期" prop="deliveryDate">
                    <el-date-picker v-model="form.deliveryDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" class="date_input"/>
                </el-form-item>
                <el-form-item label="退市日期" prop="withdrawDate">
                    <el-date-picker v-model="form.withdrawDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" class="date_input"/>
                </el-form-item>
                <el-form-item label="额定功率(W)" prop="ratedPower">
                    <el-input v-model="form.ratedPower" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="提示信息" prop="tips">
                    <el-input v-model="form.tips" placeholder="请输入"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary"   :disabled=" forbidden" @click="newOpenpowerLine = false">确 定</el-button>
                <el-button @click="newOpenpowerLine = false">取 消</el-button>
            </div>
        </el-dialog>

        <!--点击编辑电源线,弹出编辑电源线对话框-->
        <el-dialog title="编辑电源线" :visible.sync="edit" :modal-append-to-body="false" width="25%" center >
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
                <el-button type="primary"    @click="edit = false">确 定</el-button>
                <el-button @click="edit = false">取 消</el-button>
            </div>
        </el-dialog>

        <!--点击删除电源线,弹出删除电源线对话框-->
        <el-dialog title="删除电源线" :visible.sync="del" :modal-append-to-body="false" width="25%" center >
            <el-form  label-width="80px" :model="form" >
                <el-form-item label="FC">
                    <el-input v-model="form.fC" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="描述">
                    <el-input type="textarea" v-model="form.chinaDesc" placeholder="请输入"></el-input>
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
    export default {
        name: "power",
        data() {
            // 校验componentPN
            const validatorcomponentPN = (rule, value, callback) => {
                if(value==="" || !value.trim()){
                    if(value==="" && /^[A-Za-z0-9]{1,32}$/.test(this.form.componentFC)){
                        callback();
                        this.forbidden = false;
                        console.log('PN输入正确');
                        return;
                    }else{
                        this.forbidden = true
                        return callback(new Error('请输入PN或者FC'))
                    }
                    // 长度为1-32的所有字符
                } else if (!/^[A-Za-z0-9]{1,32}$/.test(value)) {
                    this.forbidden = true
                    return callback(new Error('长度为1-32的所有字符,去除首位空格'))
                } else {
                    callback()
                    this.forbidden = false
                    console.log('PN输入正确')
                }
            }

            // 校验componentFC
            const validatorcomponentFC = (rule, value, callback) => {
                console.log('aaaaaaaa',rule, value, callback)
                if(value==="" || !value.trim()){
                    if(value==="" && /^[A-Za-z0-9]{1,32}$/.test(this.form.componentPN)){
                        callback();
                        this.forbidden = false;
                        console.log('fc输入正确');
                        return;
                    }else{
                        this.forbidden = true
                        return callback(new Error('请输入PN或者FC'))
                    }
                } else if (!/^.{1,32}$/.test(value)) {
                    this.forbidden = true
                    return callback(new Error('长度为1-32的所有字符,去除首位空格'))
                } else {
                    callback()
                    this.forbidden = false
                    console.log('FC输入正确')
                }
            }

            // 校验中文描述
            const validatorDesCN = (rule, value, callback) => {
                if (value.trim() === '') {
                    this.forbidden = true
                    return callback(new Error('请输入中文描述'))
                    // 中文、英文、数字但不包括下划线等符号，100以内的字符
                } else if (!/^[\u4E00-\u9FA5A-Za-z0-9]{1,100}$/.test(value)) {
                    this.forbidden = true
                    return callback(new Error('100以内的字符,去除首位空格'))
                } else {
                    callback()
                    this.forbidden = false
                    console.log('中文描述输入正确')
                }
            }

            // 校验英文描述
            const validatorDesEN = (rule, value, callback) => {
                if (value.trim() === '') {
                    this.forbidden = true
                    return callback(new Error('请输入英文描述'))
                    //  英文和数字
                } else if (!/^[A-Za-z0-9]{1,100}$/.test(value)) {
                    this.forbidden = true
                    return callback(new Error('100以内的字符,去除首位空格'))
                } else {
                    callback()
                    this.forbidden = false
                    console.log('英文描述输入正确')
                }
            }

            // 校验发布日期
            const validatorAnnounceDate = (rule, value, callback) => {
                if (value === '') {
                    this.forbidden = true
                    return callback(new Error('请选择发布日期'))
                } else {
                    callback()
                    this.forbidden = false
                    console.log('发布日期选择正确')
                }
            }

            // 校验额定功率
            const validatorRatedPower = (rule, value, callback) => {
                if (value.trim() === '') {
                    this.forbidden = true
                    return callback(new Error('请输入额定功率'))
                } else {
                    callback()
                    this.forbidden = false
                    console.log('额定功率输入正确')
                }
            }
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
                forbidden: true, // 禁用
                tableData: Array(8).fill(item),
                optionsPowerLineLeftValue:'',//当前所选机器主型号左边下拉
                optionsPowerLineRightValue:'',//当前所选机器主型号右边下拉
                BatchValue: '', //批量操作

                optionsPowerLineLeft: [{
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
                optionsPowerLineRight: [{
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
                newOpenpowerLine:false, //是否打开新建电源线对话框
                edit:false, //是否打开编辑电源线对话框
                del:false,//是否打开删除电源线对话框
                // 新建电源
                form: {
                    componentPN: '', // PN
                    componentFC: '', // FC
                    descriptionCN: '', // 中文描述
                    descriptionEN: '', // 英文描述
                    announceDate: '', // 发布时间
                    deliveryDate: '', // 供货时间
                    withdrawDate: '', // 退市时间
                    ratedPower: '', // 额定功率(W)
                    tips: '' // 提示信息
                },
                rules: {
                    componentPN: [
                        { validator: validatorcomponentPN, trigger: 'blur' }
                    ],
                    componentFC: [
                        { validator: validatorcomponentFC, trigger: 'blur' }
                    ],
                    descriptionCN: [
                        { required: true, validator: validatorDesCN, trigger: 'blur' }
                    ],
                    descriptionEN: [
                        { required: true, validator: validatorDesEN, trigger: 'blur' }
                    ],
                    announceDate: [
                        { required: true, validator: validatorAnnounceDate, trigger: 'blur' }
                    ],
                    ratedPower: [
                        { required: true, validator: validatorRatedPower, trigger: 'blur' }
                    ]
                }
            }
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
    .el-pagination{
        float: right;
    }
    .el-form-item__content .date_input{
        width: 100% !important;
    }
    .el-dropdown-link {
        border:solid 1px #dcdfe6;
        padding: 10px 30px;
        border-radius:3px;
        cursor: pointer;
        color: darkgray;
        float: right;
        background-color: #ffffff;
    }
    .el-icon-arrow-down {
        font-size: 12px;
        color: darkgray;
        background-color: #ffffff;
    }
    .el-dropdown-link {
        padding: 12px 40px;
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .content_dropdown {
        float:right;
        padding-right:10px;
    }
</style>
