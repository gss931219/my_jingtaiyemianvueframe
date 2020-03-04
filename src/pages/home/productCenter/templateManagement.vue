<template>
    <div class="product">
        <!--新建产品线按钮-->
        <div class="test_top">
            <el-form :model="form" label-width="80px">
                <el-button size="small" type="primary" @click="dialogNewProduct = true">新建产品线</el-button>
            </el-form>
        </div>
        <!--表格-->
        <el-table
                :data="tableData"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    prop="numberCode"
                    label="编号"
                    align="center"
                    min-width="180"
            >

            </el-table-column>
            <el-table-column
                    prop="ChineseName"
                    label="中文名称"
                    align="center"
                    min-width="180">
            </el-table-column>
            <el-table-column
                    prop="EnglishName"
                    align="center"
                    min-width="180"
                    label="英文名称">
            </el-table-column>
            <el-table-column
                    align="center"
                    min-width="180"
                    label="操作">
                <template slot-scope="scope">
                    <!-- 编辑产品线按钮 -->
                    <div class="icon_btn">
                        <i class="el-icon-edit" @click="dialogCompileProduct=true"></i>
                        <!--<el-button  size="mini" type="primary" icon="el-icon-edit" @click="dialoguserRedact = true"/>-->
                    </div>
                    <!-- 删除按钮  -->
                    <div class="icon_btn">
                        <i class="el-icon-close" @click="dialogDeleteProdect=true"></i>
                    </div>

                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                    :total="100"
                    :current-page="page + 1"
                    style="margin-top: 8px;float: right;"
                    layout="total, prev, pager, next, sizes"
                    @size-change="sizeChange"
                    @current-change="pageChange" />
        </div>
        <!------------------------------右上角新建产品线按钮------------------------------------->
        <el-dialog title="编辑产品线" :visible.sync="dialogNewProduct" :modal-append-to-body='false' width="25%" class="compile_product" style="border-bottom:1px solid #ccc;">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="中文名称" prop="chinaese">
                    <el-input  v-model="ruleForm.chinaese" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="英文名称" prop="english">
                    <el-input  v-model="ruleForm.english" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogNewProduct = false">确 定</el-button>
                <el-button @click="dialogNewProduct = false">取 消</el-button>
            </div>
        </el-dialog>
        <!------------------------------图标--编辑产品线------------------------------------->
        <el-dialog title="编辑产品线" :visible.sync="dialogCompileProduct" :modal-append-to-body='false' width="25%" class="compile_product" style="border-bottom:1px solid #ccc;">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="中文名称" prop="chinaese">
                    <el-input  v-model="ruleForm.chinaese" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="英文名称" prop="english">
                    <el-input  v-model="ruleForm.english" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogCompileProduct = false">确 定</el-button>
                <el-button @click="dialogCompileProduct = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                // 表格
                tableData: [{
                    numberCode: '00000001',
                    ChineseName: '产品线1',
                    EnglishName: 'PL1'
                },
                    {
                        numberCode: '00000002',
                        ChineseName: '产品线2',
                        EnglishName: 'PL2'
                    },{
                        numberCode: '00000003',
                        ChineseName: '产品线3',
                        EnglishName: 'PL3'
                    },
                    {
                        numberCode: '00000004',
                        ChineseName: '产品线',
                        EnglishName: 'PL4'
                    }],
                dialogNewProduct:false,      // 新建产品线按钮
                dialogCompileProduct:false, // 是否展开编辑产品线弹框
                dialogDeleteProdect:false,  //  是否展开删除产品线弹框
                ruleForm:{           // 编辑产品线
                    chinaese:"",              // 中文名称
                    elglish:"",               // 英文名称
                }
            }
        }
    }
</script>

<style scoped>
    .test_top {
        margin:15px;
        text-align:right;
        padding-top:20px;
    }
    .icon_btn{
        display: inline;
        padding:3px;
        border-radius: 50%;
        margin: 0 4px;
    }
    /*编辑产品线弹框*/
    .compile_product {
        text-align:center;
    }
</style>

