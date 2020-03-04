<template>
    <!--配件规则-->
    <div>
        <el-select v-model="optionsPartsruleLeftValue" placeholder="机器主型号1" style="float: left;margin-right: 10px;">
            <el-option
                    v-for="item in optionsPartsruleLeft"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="optionsPartsruleRightValue" placeholder="机器子型号1">
            <el-option
                    v-for="item in optionsPartsruleRight"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-container>
            <el-main>
                <!--表格-->
                <el-table :data="tableData" border stripe>
                    <el-table-column prop="type" label="类型"  align="center">
                    </el-table-column>
                    <el-table-column prop="min" label="最小数量"  align="center">
                    </el-table-column>
                    <el-table-column prop="max" label="最大数量"  align="center">
                    </el-table-column>
                    <el-table-column prop="minimumActivationNumber" label="最小激活数量" align="center">
                    </el-table-column>
                    <el-table-column prop="allowSay" label="允许混插" align="center">
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
    </div>
</template>
<script>
    export default {
        name: "partsrule",
        data() {
            const item =
                {
                    type: '计算节点',
                    min: '1',
                    max:'1',
                    minimumActivationNumber:'是',
                    allowSay: '否 '
                }
            return {
                tableData: Array(9).fill(item),
                optionsPartsruleLeftValue:'',//第一个机器下拉列表
                optionsPartsruleRightValue:'',//第二个机器下拉列表
                optionsPartsruleLeft: [{
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
                optionsPartsruleRight: [{
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
                }]

            }
        }
    }
</script>
<style>
    .el-container{
        width:100%;
        height:92vh;
    }
</style>
