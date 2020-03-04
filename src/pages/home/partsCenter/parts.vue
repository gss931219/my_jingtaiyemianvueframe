<template>
    <!-- 配件页面 -->
    <div class="app-container">
        <el-container>
            <el-main>
                <el-select v-model="optionsPartsLeftValue" placeholder="机器主型号1" style="float: left;margin-right: 10px;">
                    <el-option
                            v-for="item in optionsPartsLeft"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="optionsPartsRightValue" placeholder="机器子型号1">
                    <el-option
                            v-for="item in optionsPartsRight"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <!--新建配件-->
                <el-button style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;" @click="newOpenparts = true  ">新建配件</el-button>
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
                            <el-button  size="mini" type="primary" icon="el-icon-edit" @click="edit = true"/>
                            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="del = true" />
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
        <!--点击新建配件,弹出新建配件对话框-->
        <el-dialog title="新建配件" :visible.sync="newOpenparts" :modal-append-to-body="false" width="25%" center >
            <el-form  label-width="80px" :model="form" >
                <el-form-item label="配件类型" >
                    <el-select v-model="form.partsType" placeholder="请选择" style="width: 270px;">
                        <el-option label="请选择" value="请选择"></el-option>
                        <!--<el-option label="面板样式" value=""></el-option>-->
                        <!--<el-option label="基础语言" value=""></el-option>-->
                        <!--<el-option label="处理器激活码" value=""></el-option>-->
                        <!--<el-option label="内存激活码" value=""></el-option>-->
                        <!--<el-option label="动态内存扩展" value=""></el-option>-->
                        <!--<el-option label="线缆" value=""></el-option>-->
                        <!--<el-option label="导轨" value=""></el-option>-->
                    </el-select>
                </el-form-item>
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
                <el-button type="primary" @click="newOpenparts = false">确 定</el-button>
                <el-button @click="newOpenparts = false">取 消</el-button>
            </div>
        </el-dialog>

        <!--点击编辑配件,弹出编辑配件对话框-->
        <el-dialog title="编辑配件" :visible.sync="edit" :modal-append-to-body="false" width="25%" center >
            <el-form  label-width="80px" :model="form" >
                <el-form-item label="配件类型" >
                    <el-select v-model="form.partsType" placeholder="请选择" style="width: 270px;">
                        <el-option label="请选择" value="请选择"></el-option>
                        <!--<el-option label="面板样式" value=""></el-option>-->
                        <!--<el-option label="基础语言" value=""></el-option>-->
                        <!--<el-option label="处理器激活码" value=""></el-option>-->
                        <!--<el-option label="内存激活码" value=""></el-option>-->
                        <!--<el-option label="动态内存扩展" value=""></el-option>-->
                        <!--<el-option label="线缆" value=""></el-option>-->
                        <!--<el-option label="导轨" value=""></el-option>-->
                    </el-select>
                </el-form-item>
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
                <el-button type="primary" @click="newOpenparts = false">确 定</el-button>
                <el-button @click="newOpenparts = false">取 消</el-button>
            </div>
        </el-dialog>

        <!--点击删除配件,弹出删除配件对话框-->
        <el-dialog title="删除配件" :visible.sync="del" :modal-append-to-body="false" width="25%" center >
            <el-form  label-width="80px" :model="form" >
                <el-form-item label="FC">
                    <el-input v-model="form.fC" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="描述">
                    <el-input  v-model="form.chinaDesc" placeholder="请输入"></el-input>
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
        name: "parts",
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
                tableData: Array(8).fill(item),
                optionsPartsLeftValue:'',//
                optionsPartsRightValue:'',//
                batchValue:'',//
                optionsPartsLeft: [{
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
                optionsPartsRight: [{
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
                newOpenparts:false,//点击新建配件,控制新建配件内容是否隐藏
                edit:false,//点击编辑配件,控制编辑配件对话框内容是否隐藏
                del:false,//点击删除配件,控制删除配件对话框是否隐藏
                form: {
                    partsType: '', //配件类型
                    fC:'',//机器主型号
                    chinaDesc:'',  //中文描述
                    englishDesc:'', //英文描述
                    date1: '', //发布时间
                    date2: '', //供货时间
                    date3: '', //退市时间
                    promptMessage:'' //提示信息
                }
            }

        }
    }
</script>
<style >
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
