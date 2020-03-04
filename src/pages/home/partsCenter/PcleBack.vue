<template>
    <!--Pcle背板-->
    <div>
        <el-container>
            <el-main>
                <el-select v-model="optionsPciecardLeftValue" placeholder="机器主型号1" style="float: left;margin-right: 10px;">
                    <el-option
                            v-for="item in optionsPciecardLeft"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="optionsPciecardRightValue" placeholder="机器子型号1">
                    <el-option
                            v-for="item in optionsPciecardRight"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <!--新建pCle板卡-->
                <el-button style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;" @click="newOpenpciecard=true">新建pCle卡</el-button>
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
                    <el-table-column prop="desc" label="描述" align="center" >
                    </el-table-column>
                    <el-table-column prop="issueDate" label="发布日期"  align="center">
                    </el-table-column>
                    <el-table-column prop="supplyDate" label="供货日期"  align="center">
                    </el-table-column>
                    <el-table-column prop="delisteDate" label="退市日期"  align="center">
                    </el-table-column>
                    <!--操作-->
                    <el-table-column prop="operation" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="primary" icon="el-icon-edit" @click="edit=true"/>
                            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="del=true" />
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
        <!--新建pCle板卡，打开新建pCle板卡对话框-->
        <el-dialog title="pCle板卡" :visible.sync="newOpenpciecard"  :modal-append-to-body="false"  width="25%" center >
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
                <el-form-item label="卡板类型" >
                    <el-select v-model="form.cardbackType" placeholder="请选择" style="width: 270px;">
                        <el-option label="LAN" value="LAN"></el-option>
                        <el-option label="SAS" value="SAS"></el-option>
                        <el-option label="HBA" value="HBA"></el-option>
                        <el-option label="HCA" value="HCA"></el-option>
                        <el-option label="GPN" value="GPN"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="PCle代数" >
                    <el-select v-model="form.pcleAlgebra " placeholder="请选择" style="width: 270px;">
                        <el-option label="1.0" value="1.0"></el-option>
                        <el-option label="2.0" value="2.0"></el-option>
                        <el-option label="3.0" value="3.0"></el-option>
                        <el-option label="4.0" value="4.0"></el-option>
                        <el-option label="5.0" value="5.0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="链路数">
                    <el-select v-model="form.linkNumber " placeholder="请选择" style="width: 270px;">
                        <el-option label="x4" value="x4"></el-option>
                        <el-option label="x8" value="x8"></el-option>
                        <el-option label="x16" value="x16"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="物理高度">
                    <el-select v-model="form.PhysicalHeight " placeholder="请选择" style="width: 270px;">
                        <el-option label="全高" value="全高"></el-option>
                        <el-option label="半高" value="半高"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="物理宽度">
                    <el-select v-model="form.PhysicalWidth " placeholder="请选择" style="width: 270px;">
                        <el-option label="全高" value="全高"></el-option>
                        <el-option label="半高" value="半高"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="功耗(W)">
                    <el-input  v-model="form.powerDissipation" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
                <el-form-item  label="提示信息">
                    <el-input  v-model="form.promptMessage" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="newOpenpciecard = false">确 定</el-button>
                <el-button @click="newOpenpciecard = false">取 消</el-button>
            </div>
        </el-dialog>

        <!--编辑pCle板卡，打开编辑pCle板卡对话框-->
        <el-dialog title="编辑pCle板卡" :visible.sync="edit"  :modal-append-to-body="false"  width="25%" center >
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
                <el-form-item label="卡板类型" >
                    <el-select v-model="form.cardbackType" placeholder="请选择" style="width: 270px;">
                        <el-option label="LAN" value="LAN"></el-option>
                        <el-option label="SAS" value="SAS"></el-option>
                        <el-option label="HBA" value="HBA"></el-option>
                        <el-option label="HCA" value="HCA"></el-option>
                        <el-option label="GPN" value="GPN"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="PCle代数" >
                    <el-select v-model="form.pcleAlgebra " placeholder="请选择" style="width: 270px;">
                        <el-option label="1.0" value="1.0"></el-option>
                        <el-option label="2.0" value="2.0"></el-option>
                        <el-option label="3.0" value="3.0"></el-option>
                        <el-option label="4.0" value="4.0"></el-option>
                        <el-option label="5.0" value="5.0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="链路数">
                    <el-select v-model="form. linkNumber " placeholder="请选择" style="width: 270px;">
                        <el-option label="x4" value="x4"></el-option>
                        <el-option label="x8" value="x8"></el-option>
                        <el-option label="x16" value="x16"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="物理高度">
                    <el-select v-model="form. PhysicalHeight " placeholder="请选择" style="width: 270px;">
                        <el-option label="全高" value="全高"></el-option>
                        <el-option label="半高" value="半高"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="物理宽度">
                    <el-select v-model="form. PhysicalWidth " placeholder="请选择" style="width: 270px;">
                        <el-option label="全高" value="全高"></el-option>
                        <el-option label="半高" value="半高"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="功耗(W)">
                    <el-input  v-model="form.powerDissipation" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
                <el-form-item  label="提示信息">
                    <el-input  v-model="form.promptMessage" placeholder="请输入" style="width: 270px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="edit = false">确 定</el-button>
                <el-button @click="edit = false">取 消</el-button>
            </div>
        </el-dialog>

        <!--点击删除pCle板卡,弹出删除pCle板卡对话框-->
        <el-dialog title="删除pCle板卡" :visible.sync="del" :modal-append-to-body="false" width="25%" center >
            <el-form  label-width="80px" :model="form" >
                <el-form-item label="FC">
                    <el-input v-model="form.fC" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item  label="描述">
                    <el-input  v-model="form.chinaDesc" placeholder="中文描述1"></el-input>
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
        name:"PcleBack",
        data() {
            const item =
                {
                    pn: 'FUH-9009000-EM611',
                    FC: 'EM61',
                    desc:'中文描述1',
                    issueDate:'2019/9/1',
                    supplyDate:'2019/9/2',
                    delisteDate:'2019/9/3',
                };
            return {
                tableData: Array(10).fill(item),   //fill() 方法用于将一个固定值替换数组的元素。
                optionsPciecardLeftValue:"", // 当前所选机器主型号左边下拉
                optionsPciecardRightValue:"",// 当前所选机器主型号右边下拉
                batchValue:'',//批量操作
                optionsPciecardLeft: [{  // 机器主型号左边下拉
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

                optionsPciecardRight: [{  //机器主型号右边下拉
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
                newOpenpciecard:false,
                edit:false,//编辑pclecard对话框的显示隐藏
                del:false, //删除pclecard对话框的显示隐藏
                form: {
                    fC:'',//机器主型号
                    chinaDesc:'',  //中文描述
                    englishDesc:'', //英文描述
                    date1: '', //发布时间
                    date2: '', //供货时间
                    date3: '', //退市时间
                    cardbackType:'',//卡板类型
                    pcleAlgebra:'',//pcle代数
                    linkNumber:'',//链路数
                    PhysicalHeight:'',//物理高度
                    PhysicalWidth:'',//物理宽度
                    powerDissipation:'',//功耗
                    promptMessage:'' //提示信息
                }
            }
        },
        methods:{

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
</style>


<!--<template>
    &lt;!&ndash;Pcle背板&ndash;&gt;
    <div>
        <el-container>
            <el-main>
                <el-select v-model="machineType" placeholder="机器主型号1" style="float: left;margin-right: 10px;margin-bottom: 10px;" @change="selectModel(machineType)">
                    <el-option v-for="item in machineTypeLeft"
                               :key="item"
                               :label="item"
                               :value="item"/>
                </el-select>
                <el-select v-model="machineModel" placeholder="机器子型号1" @change="setProductId(machineModel)" >
                    <el-option
                            v-for="item in machineModelRight"
                            :key="item.productModel"
                            :label="item.productModel"
                            :value="item.productModel"/>
                </el-select>
                &lt;!&ndash;新建pCle板卡&ndash;&gt;
                <el-button style="background-color: #006EFF;color: #fff;float: right ; margin-bottom: 15px;" @click="newOpenpciecard=true">新建pCle卡</el-button>
                <el-select v-model="batchValue" placeholder="批量操作" style="float: right ;margin-right: 10px;" >
                    <el-option
                            v-for="item in Batch"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"/>
                </el-select>

                &lt;!&ndash;表格内容&ndash;&gt;
                <el-table :data="data" border stripe>
                    <el-table-column prop="componentPn" label="PN" align="center"/>
                    <el-table-column prop="componentFc" label="FC" align="center"/>
                    <el-table-column prop="description" label="描述" align="center"/>
                    <el-table-column prop="announceDate" label="发布日期" align="center"/>
                    <el-table-column prop="gaDate" label="供货日期" align="center"/>
                    <el-table-column prop="withdrawDate" label="退市日期" align="center"/>
                    &lt;!&ndash;操作&ndash;&gt;
                    <el-table-column prop="operation" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editPciecardData(scope.row.id)"/>
                            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="pciecardShowData(scope.row.id)" />
                        </template>
                    </el-table-column>
                </el-table>
                &lt;!&ndash;分页&ndash;&gt;
                <el-pagination
                        :total="total"
                        :current-page="page + 1"
                        style="margin-top: 8px;float: right;"
                        layout="total, prev, pager, next, sizes"
                        @size-change="sizeChange"
                        @current-change="pageChange"/>
            </el-main>
        </el-container>
        &lt;!&ndash;新建pCle板卡，打开新建pCle板卡对话框&ndash;&gt;
        <el-dialog :visible.sync="newOpenpciecard" :modal-append-to-body="false" title="pCle板卡" width="25%" center >
            <el-form :model="form" label-width="80px" >
                <el-form-item label="PN">
                    <el-input v-model="form.componentPN" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="FC">
                    <el-input v-model="form.componentFC" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="中文描述">
                    <el-input v-model="form.descriptionCN" type="textarea" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="英文描述">
                    <el-input v-model="form.descriptionEN" type="textarea" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="发布日期">
                    <el-date-picker v-model="form.announceDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" class="date_input"/>
                </el-form-item>
                <el-form-item label="供货日期">
                    <el-date-picker v-model="form.deliveryDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" class="date_input"/>
                </el-form-item>
                <el-form-item label="退市日期">
                    <el-date-picker v-model="form.withdrawDate" value-format="yyyy-MM-dd"  type="date" placeholder="选择日期" class="date_input"/>
                </el-form-item>
                <el-form-item label="卡板类型" >
                    <el-select v-model="form.cardbackType" placeholder="请选择" class="date_input">
                        <el-option
                                v-for="item in optionCardbackType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="PCle代数" >
                    <el-select v-model="form.pcleAlgebra " placeholder="请选择" class="date_input">
                        <el-option
                                v-for="item in optionPcleAlgebra"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="链路数">
                    <el-select v-model="form.linkNumber " placeholder="请选择" class="date_input">
                        <el-option
                                v-for="item in optionsLinkNumber"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="物理高度">
                    <el-select v-model="form.PhysicalHeight " placeholder="请选择" class="date_input">
                        <el-option
                                v-for="item in optionsPhysicalHeight"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="物理宽度">
                    <el-select v-model="form.PhysicalWidth " placeholder="请选择" class="date_input">
                        <el-option
                                v-for="item in optionsPhysicalWidth"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="功耗(W)">
                    <el-input v-model="form.powerDissipation" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="提示信息">
                    <el-input v-model="form.tips" placeholder="请输入"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addPciecard()">确 定</el-button>
                <el-button @click="newOpenpciecard = false">取 消</el-button>
            </div>
        </el-dialog>

        &lt;!&ndash;编辑pCle板卡，打开编辑pCle板卡对话框&ndash;&gt;
        <el-dialog :visible.sync="editPciecardIsShow" :modal-append-to-body="false" title="编辑pCle板卡" width="25%" center >
            <el-form :model="formPciecardEdit" label-width="80px" >
                <el-form-item label="PN">
                    <el-input v-model="formPciecardEdit.componentPN" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="FC">
                    <el-input v-model="formPciecardEdit.componentFC" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="中文描述">
                    <el-input v-model="formPciecardEdit.descriptionCN" type="textarea" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="英文描述">
                    <el-input v-model="formPciecardEdit.descriptionEN" type="textarea" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="发布日期">
                    <el-date-picker v-model="formPciecardEdit.announceDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" class="date_input"/>
                </el-form-item>
                <el-form-item label="供货日期">
                    <el-date-picker v-model="formPciecardEdit.deliveryDate"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期" class="date_input"/>
                </el-form-item>
                <el-form-item label="退市日期">
                    <el-date-picker v-model="formPciecardEdit.withdrawDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" class="date_input"/>
                </el-form-item>
                <el-form-item label="卡板类型" >
                    <el-select v-model="formPciecardEdit.cardbackType" placeholder="请选择" class="date_input">
                        <el-option
                                v-for="item in optionCardbackType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="PCle代数" >
                    <el-select v-model="formPciecardEdit.pcleAlgebra " placeholder="请选择" class="date_input">
                        <el-option
                                v-for="item in optionPcleAlgebra"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="链路数">
                    <el-select v-model="formPciecardEdit.linkNumber " placeholder="请选择" class="date_input">
                        <el-option
                                v-for="item in optionsLinkNumber"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="物理高度">
                    <el-select v-model="formPciecardEdit.PhysicalHeight " placeholder="请选择" class="date_input">
                        <el-option
                                v-for="item in optionsPhysicalHeight"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="物理宽度">
                    <el-select v-model="formPciecardEdit.PhysicalWidth " placeholder="请选择" class="date_input">
                        <el-option
                                v-for="item in optionsPhysicalWidth"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="功耗(W)">
                    <el-input v-model="formPciecardEdit.powerDissipation" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="提示信息">
                    <el-input v-model="formPciecardEdit.tips" placeholder="请输入"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="pcieCardSure()">确 定</el-button>
                <el-button @click="editPciecardIsShow = false">取 消</el-button>
            </div>
        </el-dialog>

        &lt;!&ndash;点击删除pCle板卡,弹出删除pCle板卡对话框&ndash;&gt;
        <el-dialog :visible.sync="pciecardDelIsShow" :modal-append-to-body="false" title="删除pCle板卡" width="25%" center >
            <el-form :model="tempValue" label-width="80px" >
                <el-form-item label="FC">
                    <el-input v-model="tempValue.componentFC" placeholder="请输入"/>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="tempValue.descriptionCN" placeholder="请输入"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="pcieCardDelete()">确 定</el-button>
                <el-button @click="pciecardDelIsShow = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import initData from '@/mixins/initDataPage'
    import { machineType , machineModel} from '@/api/pciecard'
    import {
        addPciecardDate,
        editPcieCardUpdate,
        updatePcieCard,
        delPcieCard } from '@/api/pciecard'

    export default {
        mixins: [initData],
        name: 'Pciecard',
        data() {
            return {
                productId:'',
                powerProductId:1,
                machineType: '', // 机器主型号
                machineTypeLeft:[], // 机器主型号数据
                machineModel: '', // 机器子型号
                machineModelRight:[],
                // 表格数据的渲染
                batchValue: '', // 批量操作
                Batch: [{
                    value: '选项1',
                    label: '批量导出'
                }, {
                    value: '选项2',
                    label: '批量导入'
                },
                    {
                        value: '选项3',
                        label: '清空数据'
                    }
                ],
                newOpenpciecard: false,
                editPciecardIsShow: false, // 编辑pclecard对话框的显示隐藏
                pciecardDelIsShow: false, // 删除pclecard对话框的显示隐藏
                //新建
                form: {
                    componentPN:'',  // PN
                    componentFC: '', // FC
                    descriptionCN: '', // 中文描述
                    descriptionEN: '', // 英文描述
                    announceDate: '', // 发布时间
                    deliveryDate: '', // 供货时间
                    withdrawDate: '', // 退市时间
                    cardbackType: '', // 卡板类型
                    pcleAlgebra: '', // pcle代数
                    linkNumber: '', // 链路数
                    PhysicalHeight: '', // 物理高度
                    PhysicalWidth: '', // 物理宽度
                    powerDissipation: '', // 功耗
                    tips: '' // 提示信息
                },
                //编辑
                formPciecardEdit:{
                    componentPN:'',  // PN
                    componentFC: '', // FC
                    descriptionCN: '', // 中文描述
                    descriptionEN: '', // 英文描述
                    announceDate: '', // 发布时间
                    deliveryDate: '', // 供货时间
                    withdrawDate: '', // 退市时间
                    cardbackType: '', // 卡板类型
                    pcleAlgebra: '', // pcle代数
                    linkNumber: '', // 链路数
                    PhysicalHeight: '', // 物理高度
                    PhysicalWidth: '', // 物理宽度
                    powerDissipation: '', // 功耗
                    tips: '' // 提示信息
                },
                //  新建 &#45;&#45; 卡板类型
                optionCardbackType: [
                    {
                        value: '1',
                        label: 'LAN'
                    },
                    {
                        value: '2',
                        label: 'SAS'
                    },
                    {
                        value: '3',
                        label: 'HBA'
                    },
                    {
                        value: '4',
                        label: 'IB'
                    },
                    {
                        value: '5',
                        label: 'GPN'
                    },
                    {
                        value: '6',
                        label: 'FPGA'
                    },
                    {
                        value: '7',
                        label: 'Others'
                    },
                    {
                        value: '8',
                        label: 'NVMe'
                    },
                ],
                //  新建pcle代数
                optionPcleAlgebra: [
                    {
                        value: '0',
                        label: ''
                    },
                    {
                        value: '1',
                        label: ''
                    },
                    {
                        value: '2',
                        label: '2.0'
                    }, {
                        value: '3',
                        label: '3.0'
                    },
                    {
                        value: '4',
                        label: '4.0'
                    }, {
                        value: '5',
                        label: '5.0'
                    }
                ],
                //  新建 &#45;&#45; 链路数
                optionsLinkNumber: [
                    {
                        value: '0',
                        label: 'x16'
                    }, {
                        value: '1',
                        label: 'x8'
                    }, {
                        value: '2',
                        label: 'x4'
                    }
                ],
                //  新建 &#45;&#45; 物理高度
                optionsPhysicalHeight: [
                    {
                        value: '0',
                        label: '半高'
                    },
                    {
                        value: '1',
                        label: '全高'
                    },
                ],
                //  新建 &#45;&#45; 物理宽度
                optionsPhysicalWidth: [
                    {
                        value: '0',
                        label: '单宽'
                    }, {
                        value: '1',
                        label: '双宽'
                    }
                ],
                // 弹框两个数据  &#45;&#45;删除
                tempValue: {
                    componentFC: '',
                    descriptionCN: ''
                }
            }
        },
        created() {
            this.$nextTick(() => {
                this.init()
            })
        },
        mounted() {
            this.init()
            this.selectType()
        },
        methods: {
            // 分页
            beforeInit() {
                this.url = 'iocard/page',
                    this.params = {
                        pageNum: this.page + 1,
                        pageSize: this.size,
                        machineType:this.machineType,
                        machineModel:this.machineModel
                    }
                return true
            },

            //机器主型号
            selectType() {
                machineType().then(res => {
                    console.log(res)
                    this.machineTypeLeft= res.machineType
                }).catch(error =>{
                    console.log('系统错误')
                })
                this.init()
            },
            //机器子型号
            selectModel(type){
                this.machineType=type;
                console.log(type)
                machineModel(type).then(res => {
                    console.log(res)
                    this.machineModelRight= res.machineModel
                    this.machineModel=''
                }).catch(error =>{
                    console.log('err', err)
                    this.$message.error('获取机器主型号失败！');
                })
            },
            setProductId(model){  //机器子型号1
                console.log(model)
                for (let i = 0; i < this.machineModelRight.length; i++) {
                    if(this.machineModelRight[i].productModel==model){
                        this.productId=this.machineModelRight[i].productId;
                        console.log(this.productId)
                    }
                }
                this.init()
            },

            //  新建
            addPciecard() {   //绑定到确定中
                this.newOpenpciecard = true
                const params = {
                    productId: this.productId,
                    componentPn: this.form.componentPN,  // pn
                    componentFc: this.form.componentFC,  // fc
                    description: this.form.descriptionCN,  // 中文描述
                    descriptionEn	: this.form.descriptionEN,  // 英文描述
                    announceDate: this.form.announceDate,     // 发布日期
                    gaDate: this.form.deliveryDate,          // 供货日期
                    withdrawDate: this.form.withdrawDate,     // 退货日期
                    pciCatagoryId:this.form.cardbackType,     //板卡类型
                    pciEGeneration:this.form.pcleAlgebra,    //代数
                    pciESize:this.form.linkNumber,        // 链路数
                    pciEHight:this.form.PhysicalHeight,   // 物理高度
                    PCIEWidth:this.form.PhysicalWidth,    //物理宽度
                    watt:this.form.powerDissipation,       //功耗
                    titleMsg: this.form.tips             // 提示信息
                }
                console.log(params)
                addPciecardDate(params).then(res => {
                    console.log(res)
                    this.$message({
                        message: '新建pcie卡板成功！',
                        type: 'success'
                    })
                    this.newOpenpciecard = false
                    this.init()
                }).catch((err) => {
                    console.log('err', err)
                    this.$message.error('新建失败！');
                })
            },

            //编辑  回显
            editPciecardData(id) {
                this.editPciecardIsShow = true // 点击编辑按钮，弹框显示
                editPcieCardUpdate(id).then(res => {
                    var res = res.data;
                    console.log(res)
                    this.id = res.id
                    this.formPciecardEdit.componentPN =res.componentPn
                    this.formPciecardEdit.componentFC = res.componentFc
                    this.formPciecardEdit.descriptionCN = res.description
                    this.formPciecardEdit.descriptionEN = res.descriptionEn
                    this.formPciecardEdit.announceDate = res.announceDate
                    this.formPciecardEdit.deliveryDate = res.gaDate
                    this.formPciecardEdit.withdrawDate = res.withdrawDate
                    this.formPciecardEdit.cardbackType = res.pciCatagoryId  //卡板类型
                    this.formPciecardEdit.pcleAlgebra = res.pciEGeneration  // 代数                                            //pcle代数
                    this.formPciecardEdit.linkNumber  =res.pciESize  //链路数
                    this.formPciecardEdit.PhysicalHeight = res.pciEHight //物理高度
                    this.formPciecardEdit.PhysicalWidth = res.pciEWidth  //物理宽度
                    this.formPciecardEdit.powerDissipation = res.watt   //功耗
                })
            },

            // 确定修改
            pcieCardSure(id) {
                const params = {
                    id: this.id,
                    componentPn: this.formPciecardEdit.componentPN, // pn
                    componentFc: this.formPciecardEdit.componentFC, // fc
                    description: this.formPciecardEdit.descriptionCN, // 中文描述
                    descriptionEn: this.formPciecardEdit.descriptionEN, // 英文描述
                    announceDate: this.formPciecardEdit.announceDate, // 发布日期
                    gaDate: this.formPciecardEdit.deliveryDate, // 供货日期
                    withdrawDate: this.formPciecardEdit.withdrawDate, // 退货日期
                    pciCatagoryId:this.formPciecardEdit.cardbackType, //卡板类型
                    pciEGeneration:this.formPciecardEdit.pcleAlgebra, //pcle代数
                    pciESize: this.formPciecardEdit.linkNumber,//链路数                                                   //链路数
                    pciEHight: this.formPciecardEdit.PhysicalHeight ,//物理高度                                                //物理高度
                    pciEWidth:this.formPciecardEdit.PhysicalWidth ,  // 物理宽度                                                //物理宽度
                    power: this.formPciecardEdit.ratedPower,  //功耗
                    titleMsg: this.formPciecardEdit.tips // 提示信息
                }
                console.log(params)
                updatePcieCard(params).then(res => {
                    console.log(res)
                    if(true){
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                    }
                    this.init();
                })
                this.editPciecardIsShow = false
            },
// 获取删除模态框数据 回显
            pciecardShowData(id) {
                this.id = id // 全局的id
                console.log(this.id)
                this.pciecardDelIsShow = true
                editPcieCardUpdate(id).then(res => {
                    var res = res.data;
                    console.log(id)
                    console.log(res)
                    // 获取删除模态框两个数据，并且赋值给它
                    this.tempValue.componentFC = res.componentFc // FC
                    this.tempValue.descriptionCN = res.description // 中文描述
                })
            },

            // 点击弹框中确认删除,删除数据
            pcieCardDelete() {
                delPcieCard(this.id).then(res => {
                    console.log(res)
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.init();
                    this.pciecardDelIsShow = false
                }).catch(err => {
                    console.log('err', err)
                    this.$message.error('删除失败！');
                })
            },

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
    .el-form-item__content .date_input{
        width: 100% !important;
    }
</style>-->
