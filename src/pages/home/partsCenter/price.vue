<template>
    <!-- 价格管理页面 -->
    <div class="app-container">
        <el-select v-model="value" placeholder="机器主型号1" style="float: left;padding-right:10px ;">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="value" placeholder="机器子型号1" style="padding-right:10px;">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="value" placeholder="全部">
            <el-option
                    v-for="item in all"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="value" placeholder="批量操作" style="float: right ;" >
            <el-option
                    v-for="item in Batch"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-container>
            <el-main>
                <!--表格内容-->
                <el-table :data="tableData" border  stripe>
                    <el-table-column prop="pn" label="PN" align="center">
                    </el-table-column>
                    <el-table-column prop="FC" label="FC" align="center">
                    </el-table-column>
                    <el-table-column prop="desc" label="描述" align="center">
                    </el-table-column>
                    <el-table-column prop="price" label="价格" align="center">
                    </el-table-column>
                    <!--操作-->
                    <el-table-column prop="operation" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="primary" icon="el-icon-edit" @click="edit=true"/>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-pagination
                        :total="100"
                        :current-page="page + 1"
                        style="margin-top: 8px;float: right;"
                        layout="total, prev, pager, next, sizes"/>

                <!--点击编辑,弹出编辑价格对话框-->
                <el-dialog title="编辑价格" :visible.sync="edit" :modal-append-to-body="false" width="25%" center >
                    <el-form  label-width="80px" :model="form" >
                        <el-form-item label="FC">
                            <el-input v-model="form.fC" placeholder="FUH-9009000-EM66"></el-input>
                        </el-form-item>
                        <el-form-item  label="描述">
                            <el-input  v-model="form.chinaDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="是否计价" >
                            <el-select v-model="form.valuation" placeholder="请选择" style="width: 270px;">
                                <el-option label="请选择" value="请选择"></el-option>
                                <el-option label="有价" value=""></el-option>
                                <el-option label="无价" value=""></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="edit = false">确 定</el-button>
                        <el-button @click="edit = false">取 消</el-button>
                    </div>
                </el-dialog>

            </el-main>
        </el-container>
    </div>
</template>
<script>
    export default {
        name: "price",
        data() {
            const item =
                {
                    pn: 'FUH-9009000-EM61',
                    FC: 'EM61',
                    desc:'中文描述1',
                    price:'￥88888.00'
                }
            return {
                tableData: Array(8).fill(item),
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
                all:[
                    {
                        value:'选项1',
                        label:'处理器'
                    },
                    {
                        value:'选项2',
                        label:'内存'
                    },
                    {
                        value:'选项3',
                        label:'电源'
                    },
                ],
                edit:false,//编辑
                form: {
                    fC:'',//机器主型号
                    chinaDesc:'',  //中文描述
                    valuation:'',//是否计价
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
