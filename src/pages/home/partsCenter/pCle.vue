<template>
    <!-- pCle插槽 -->
    <div>
        <el-container>
            <el-main>
                <el-select v-model="optionsPcieslotLeftValue" placeholder="机器主型号1" style="float: left;margin-right: 10px;">
                    <el-option
                            v-for="item in optionsPcieslotLeft"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="optionsPcieslotRightValue" placeholder="机器子型号1">
                    <el-option
                            v-for="item in optionsPcieslotRight"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <!--新建pCle插槽-->
                <el-button style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;" @click="newOpenPcle = true ">新建pCle插槽</el-button>
                <el-select v-model="batchValue" placeholder="批量操作" style="float: right ;margin-right: 10px;" >
                    <el-option
                            v-for="item in Batch"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <!--pCle插槽表格-->
                <el-table :data="tableData" border stripe>
                    <el-table-column prop="cpuNumber" label="隶属CPU的编号"  align="center">
                    </el-table-column>
                    <el-table-column prop="algebra" label="PCle代数"  align="center">
                    </el-table-column>
                    <el-table-column prop="numberOflinks" label="链路数"  align="center">
                    </el-table-column>
                    <el-table-column prop="physicalHeight" label="物理高度"  align="center">
                    </el-table-column>
                    <!--操作-->
                    <el-table-column prop="operation" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="primary" icon="el-icon-edit" @click="editOpenPcle = true"/>
                            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="del = true" />
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        :total="100"
                        :current-page="page + 1"
                        style="margin-top: 8px;float: right;"
                        layout="total, prev, pager, next, sizes"/>
            </el-main>
        </el-container>
        <!--点击新建Pcle插槽,弹出新建Pcle插槽对话框-->
        <el-dialog title="新建Pcle插槽" :visible.sync="newOpenPcle" :modal-append-to-body="false" width="28%" center >
            <el-form  label-width="112px" :model="form" >
                <el-form-item label="隶属CPU的编号">
                    <el-input v-model="form.cpuNumber" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="PCle代数" >
                    <el-select v-model="form.algebra" placeholder="请选择" style="width: 282px;">
                        <el-option label="请选择" value="请选择"></el-option>
                        <el-option label="5.0" value="5.0"></el-option>
                        <el-option label="4.0" value="4.0"></el-option>
                        <el-option label="3.0" value="3.0"></el-option>
                        <el-option label="2.0" value="2.0"></el-option>
                        <el-option label="1.0" value="1.0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="链路数">
                    <el-select v-model="form.numberOflinks" placeholder="请选择" style="width: 282px;">
                        <el-option label="请选择" value="请选择"></el-option>
                        <el-option label="X16" value="X16"></el-option>
                        <el-option label="X8" value="X8"></el-option>
                        <el-option label="X4" value="X4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="物理高度">
                    <el-select v-model="form.physicalHeight" placeholder="请选择" style="width: 282px;">
                        <el-option label="请选择" value="请选择"></el-option>
                        <el-option label="全高" value="全高"></el-option>
                        <el-option label="半高" value="半高"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="newOpenPcle = false">确 定</el-button>
                <el-button @click="newOpenPcle = false">取 消</el-button>
            </div>
        </el-dialog>

        <!--点击编辑Pcle插槽,弹出编辑Pcle插槽对话框-->
        <el-dialog title="编辑Pcle插槽" :visible.sync="editOpenPcle" :modal-append-to-body="false" width="28%" center >
            <el-form  label-width="112px" :model="form" >
                <el-form-item label="隶属CPU的编号">
                    <el-input v-model="form.cpuNumber" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="PCle代数" >
                    <el-select v-model="form.algebra" placeholder="请选择" style="width: 282px;">
                        <el-option label="5.0" value="5.0"></el-option>
                        <el-option label="4.0" value="4.0"></el-option>
                        <el-option label="3.0" value="3.0"></el-option>
                        <el-option label="2.0" value="2.0"></el-option>
                        <el-option label="1.0" value="1.0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="链路数">
                    <el-select v-model="form.numberOflinks" placeholder="请选择" style="width: 282px;">
                        <el-option label="X16" value="X16"></el-option>
                        <el-option label="X8" value="X8"></el-option>
                        <el-option label="X4" value="X4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="物理高度">
                    <el-select v-model="form.physicalHeight" placeholder="请选择" style="width: 282px;">
                        <el-option label="全高" value="全高"></el-option>
                        <el-option label="半高" value="半高"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editOpenPcle = false">确 定</el-button>
                <el-button @click="editOpenPcle = false">取 消</el-button>
            </div>
        </el-dialog>

        <!--点击删除Pcle插槽,弹出删除Pcle插槽对话框-->
        <el-dialog title="删除Pcle插槽" :visible.sync="del" :modal-append-to-body="false" width="25%" center >
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
    export default {
        name: "pCle",
        data() {
            const item =
                {
                    cpuNumber: '1',
                    algebra: '4.0',
                    numberOflinks:'x16',
                    physicalHeight:'全高',
                }
            return {
                tableData: Array(10).fill(item),
                optionsPcieslotLeftValue:'',//当前所选机器主型号左边下拉
                optionsPcieslotRightValue:'',//当前所选机器主型号右边下拉
                batchValue:'',//批量操作
                newOpenPcle:false,//新建PCle弹窗的显示隐藏
                editOpenPcle:false,//编辑PCle弹窗的显示隐藏
                del:false,//删除PCle弹窗的显示隐藏
                form: {
                    cpuNumber: '', //隶属CPU的编号
                    algebra:'',//PCle代号
                    numberOflinks:'',//链路数
                    physicalHeight:'',//物理高度
                },
                optionsPcieslotLeft: [{
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
                optionsPcieslotRight: [{
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
                }, {
                    value: '选项3',
                    label: '清空数据'
                }
                ]
            }
        },
        methods:{

        }
    }
</script>
<style>
    .dialog-footer{
        display: flex;
        justify-content: center;
    }
    .el-dialog__header{
        border-bottom: solid 1px #EFEFEF;
    }
    .dialog-footer{
        display: flex;
        justify-content: center;
    }
</style>

