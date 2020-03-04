<template>
    <!--计算节点规则-->
    <div>
        <el-container>
            <el-main>
                <div class="select_machine">
                    <el-select v-model="value" placeholder="机器主型号" style="margin-right:10px;">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="机器子型号">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <!--新建计算节点规则-->
                    <el-button  @click="dialogCountNode=true" style="background-color:#46a6ff;color: #fff;float: right ; margin-bottom: 15px;">新建计算节点</el-button>
                </div>

                <!--表格-->
                <el-table :data="tableData" border>
                    <el-table-column prop="calculate" label="计算节点数量" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="processorNumber" label="处理器数量" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="memoryNumber" label="内存数量" width="200" align="center" >
                    </el-table-column>
                    <el-table-column prop="memoryOptional" label="内存可选数量" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="pcleNumber" label="PCle数量" align="center">
                    </el-table-column>
                    <!--操作-->
                    <el-table-column prop="operation" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="primary" icon="el-icon-edit" @click="dialogeditCount=true"/>
                            <el-button  type="danger" icon="el-icon-delete" size="mini" @click="dialogeDelete=true"/>
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
        <!--右上角新建计算节弹框-->
        <el-dialog title="新建计算节点" :visible.sync="dialogCountNode" :modal-append-to-body='false' width="25%" class="compile_product" style="text-align:center;">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="计算节点" prop="countNumber">
                    <el-input  v-model="ruleForm.countNumber" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="处理器数量" prop="handleNumber">
                    <el-input  v-model="ruleForm.handleNumber" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="内存数量" prop="memoryNumber">
                    <el-input  v-model="ruleForm.memoryNumber" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="内存可选数量" prop="OptionalNumber">
                    <el-input  v-model="ruleForm.OptionalNumber" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="PCLe数量" prop="PcleNumber">
                    <el-input  v-model="ruleForm.PcleNumber" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogeditCount = false">确 定</el-button>
                <el-button @click="dialogCountNode = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-----------------------------------------编辑计算节点弹框----------------------------------->
        <el-dialog title="编辑计算节点" :visible.sync="dialogeditCount" :modal-append-to-body='false' width="25%" class="compile_product" style="text-align:center;">
            <el-form :model="ruleFormEdit" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="计算节点数量" prop="editCount">
                    <el-input  v-model="ruleFormEdit.editCount" placeholder="请输入" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="处理器数量" prop="editHandle">
                    <el-input  v-model="ruleFormEdit.editHandle" placeholder="请输入" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内存数量" prop="editMemory">
                    <el-input  v-model="ruleFormEdit.editMemory" placeholder="请输入" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内存可选数量" prop="editOptional">
                    <el-input  v-model="ruleFormEdit.editOptional" placeholder="请输入" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="PCLe数量" prop="editPcle">
                    <el-input  v-model="ruleFormEdit.editPcle" placeholder="请输入" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogeditCount = false">确 定</el-button>
                <el-button @click="dialogeditCount = false">取 消</el-button>
            </div>
        </el-dialog>
        <!---------------------------------------删除计算节点弹框------------------------------>
        <el-dialog title="删除计算节点" :visible.sync="dialogeDelete" :modal-append-to-body='false' width="25%" class="compile_product" style="text-align:center;">
            <el-form :model="ruleFormDelete" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="计算节点数量" prop="deleteCount">
                    <el-input  v-model="ruleFormDelete.deleteCount" placeholder="请输入" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="处理器数量" prop="deleteHandle">
                    <el-input  v-model="ruleFormDelete.deleteHandle" placeholder="请输入" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内存数量" prop="deleteMemory">
                    <el-input  v-model="ruleFormDelete.deleteMemory" placeholder="请输入" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内存可选数量" prop="deleteOptional">
                    <el-input  v-model="ruleFormDelete.deleteOptional" placeholder="请输入" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="PCLe数量" prop="deletePcle">
                    <el-input  v-model="ruleFormDelete.deletePcle" placeholder="请输入" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogeDelete = false">确 定</el-button>
                <el-button @click="dialogeDelete = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "noderule",
        data() {
            const item =
                {
                    calculate: '1',
                    processorNumber: '1',
                    memoryNumber:'1',
                    memoryOptional:'2',
                    pcleNumber:'1',
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
                dialogCountNode:false,    // 新建计算节点弹框是否展开
                // 新建计算节点
                ruleForm: {
                    countNumber:"",    // 计算节点数量
                    handleNumber:"",    // 处理器数量
                    memoryNumber:"",    // 内存数量
                    editOptional:"",  // 内存可选数量
                    PcleNumber:"",      // PCLe数量
                },
                // 编辑计算节点
                ruleFormEdit: {
                    editCount:"",    // 计算节点数量
                    editHandle:"",    // 处理器数量
                    editMemory:"",    // 内存数量
                    OptionalNumber:"",  // 内存可选数量
                    editPcle:"",      // PCLe数量
                },
                dialogeditCount:false,  // 是否展开编辑计算节点弹框
                ruleFormDelete:{
                    deleteCount:"2",
                    deleteHandle:"3",
                    deleteMemory:"28",
                    deleteOptional:"2,4,8",
                    deletePcle:"22",
                },
                dialogeDelete:false,     // 是否展开删除计算节点弹框
            }
        }
    }
</script>
<style scoped>
    .el-container{
        width:100%;
        height:92vh;
    }
    .el-header {
        background-color: #000;
        color: #333;
        line-height: 60px;
    }
    .dialog-footer {
        text-align:center;
    }
</style>

