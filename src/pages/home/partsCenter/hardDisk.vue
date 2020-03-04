<template>
    <!-- 硬盘 -->
    <div>
        <el-container>
            <el-main>
                <el-select v-model="optionsPciediskLeftValue" placeholder="机器主型号1" style="float: left;margin-right: 10px;">
                    <el-option
                            v-for="item in optionsPciediskLeft"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="optionsPciediskLRightValue" placeholder="机器子型号1">
                    <el-option
                            v-for="item in optionsPciediskRight"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <!--新建硬盘-->
                <el-button style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;" @click="newOpendisk=true">新建硬盘</el-button>
                <el-select v-model="batchvalue" placeholder="批量操作" style="float: right ;margin-right: 10px;" >
                    <el-option
                            v-for="item in Batch"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <!--表格内容-->
                <el-table :data="tableData"  border stripe>
                    <el-table-column prop="pn" label="PN"  align="center">
                    </el-table-column>
                    <el-table-column prop="FC" label="FC"  align="center">
                    </el-table-column>
                    <el-table-column prop="desc" label="描述"  align="center">
                    </el-table-column>
                    <el-table-column prop="issueDate" label="发布日期" align="center">
                    </el-table-column>
                    <el-table-column prop="supplyDate" label="供货日期"  align="center">
                    </el-table-column>
                    <el-table-column prop="delistingDate" label="退市日期"  align="center">
                    </el-table-column>
                    <!--操作-->
                    <el-table-column prop="operation" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="primary" icon="el-icon-edit" @click="editOpendisk=true"/>
                            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="dialogDeleteDisk=true"/>
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

        <!--点击新建硬盘,弹出新建点击新建硬盘对话框-->
        <el-dialog title="新建硬盘" :visible.sync="newOpendisk" class="newOpenbarebone" style="position:absolute;z-index:30000;" append-to-body width="30%" center >
            <el-form  label-width="110px" :model="form" >
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
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 315px;" ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="供货日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 315px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="退市日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date3"  style="width: 315px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="接口类型" >
                    <el-select v-model="form.portType" placeholder="请选择" style="width: 315px;">
                        <el-option label="SAS" value="SAS"></el-option>
                        <el-option label="SATA" value="SATA"></el-option>
                        <el-option label="U.2" value="U.2"></el-option>
                        <el-option label="M.2" value="M.2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="硬盘尺寸" >
                    <el-select v-model="form.diskSize" placeholder="请选择" style="width: 315px;">
                        <el-option label="2.5英寸" value="2.5英寸"></el-option>
                        <el-option label="3.5英寸" value="3.5英寸"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Power硬盘类型" >
                    <el-select v-model="form.powerDiskType" placeholder="请选择" style="width: 315px;">
                        <el-option label="2.5英寸" value="2.5英寸"></el-option>
                        <el-option label="3.5英寸" value="3.5英寸"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="扇区类型" >
                    <el-select v-model="form.sectionType" placeholder="请选择" style="width: 315px;">
                        <el-option label="2.5英寸" value="2.5英寸"></el-option>
                        <el-option label="3.5英寸" value="3.5英寸"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="硬盘容量(GB)" >
                    <el-input  v-model="form.diskCapacity" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="功耗(W)" >
                    <el-input  v-model="form.onsumptionc" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="提示信息">
                    <el-input  v-model="form.hint" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="newOpendisk = false">确 定</el-button>
                <el-button @click="newOpendisk = false">取 消</el-button>
            </div>
        </el-dialog>

        <!--点击编辑硬盘,弹出新建点击编辑硬盘对话框-->
        <el-dialog title="编辑硬盘" :visible.sync="editOpendisk" class="newOpenbarebone" style="position:absolute;z-index:30000;" append-to-body width="30%" center >
            <el-form  label-width="110px" :model="form" >
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
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 315px;" ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="供货日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 315px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="退市日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date3"  style="width: 315px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="接口类型" >
                    <el-select v-model="form.portType" placeholder="请选择" style="width: 315px;">
                        <el-option label="SAS" value="SAS"></el-option>
                        <el-option label="SATA" value="SATA"></el-option>
                        <el-option label="U.2" value="U.2"></el-option>
                        <el-option label="M.2" value="M.2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="硬盘尺寸" >
                    <el-select v-model="form.diskSize" placeholder="请选择" style="width: 315px;">
                        <el-option label="2.5英寸" value="2.5英寸"></el-option>
                        <el-option label="3.5英寸" value="3.5英寸"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Power硬盘类型" >
                    <el-select v-model="form.powerDiskType" placeholder="请选择" style="width: 315px;">
                        <el-option label="2.5英寸" value="2.5英寸"></el-option>
                        <el-option label="3.5英寸" value="3.5英寸"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="扇区类型" >
                    <el-select v-model="form.sectionType" placeholder="请选择" style="width: 315px;">
                        <el-option label="2.5英寸" value="2.5英寸"></el-option>
                        <el-option label="3.5英寸" value="3.5英寸"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="硬盘容量(GB)" >
                    <el-input  v-model="form.diskCapacity" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="功耗(W)" >
                    <el-input  v-model="form.onsumptionc" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="提示信息">
                    <el-input  v-model="form.hint" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editOpendisk = false">确 定</el-button>
                <el-button @click="editOpendisk = false">取 消</el-button>
            </div>
        </el-dialog>

        <!--点击删除硬盘,弹出新建点击删除硬盘对话框-->
        <el-dialog title="删除硬盘" :visible.sync="dialogDeleteDisk" class="dialogDeleteDisk"  append-to-body width="25%" center >
            <el-form :model="ruleFormDelete" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="FC" prop="bareboneFc">
                    <el-input v-model="ruleFormDelete.diskFc"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="bareboneDescribe">
                    <el-input v-model="ruleFormDelete.diskDescribe"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogDeleteDisk = false">确 定</el-button>
                <el-button @click="dialogDeleteDisk = false">取 消</el-button>
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
                tableData: Array(10).fill(item),
                optionsPciediskLeftValue:'',//当前所选机器主型号左边下拉
                optionsPciediskLRightValue:'',//当前所选机器主型号右边下拉
                batchvalue:'',//批量操作
                newOpendisk: false,//点击新建硬盘，控制对话框的显示隐藏
                editOpendisk: false,//点击编辑硬盘，控制对话框的显示隐藏
                dialogDeleteDisk: false,//点击删除硬盘，控制对话框的显示隐藏

                // 弹出删除barebone弹框
                ruleFormDelete:{
                    diskFc:"",  //FC
                    diskDescribe:"",  // 描述
                },
                optionsPciediskLeft: [{    //机器主型号左边下拉
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
                optionsPciediskRight: [{   //机器主型号右边下拉
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
                form: {
                    fC:'',//机器主型号
                    chinaDesc:'',  //中文描述
                    englishDesc:'', //英文描述
                    date1: '', //发布时间
                    date2: '', //供货时间
                    date3: '', //退市时间
                    portType:'',//接口类型
                    diskSize:'',//硬盘尺寸
                    powerDiskType:'',//power硬盘类型
                    sectionType:'',// 扇区类型
                    diskCapacity:'',//硬盘容量
                    onsumptionc:'',//功耗(W)
                    hint:'',//提示信息
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
