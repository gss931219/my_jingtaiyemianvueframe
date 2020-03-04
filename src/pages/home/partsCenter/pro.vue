<template>
  <div class="product">
    <!--新建产品线按钮-->
    <div class="test_top">
      <el-form label-width="80px">
        <el-button size="small" type="primary" @click="dialogNewProduct = true">新建产品</el-button>
      </el-form>
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        align="center"
        min-width="180"
      >

      </el-table-column>
      <el-table-column
        prop="nameCN"
        label="中文名称"
        align="center"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="nameEN"
        align="center"
        min-width="180"
        label="英文名称">
      </el-table-column>
      <el-table-column
        prop="machineType"
        align="center"
        min-width="180"
        label="机器主型号">
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
    <!--分页-->
    <el-pagination
      :total="pageTotal"
      :current-page="pageNum"
      style="margin-top: 8px;float: right;"
      layout="total, prev, pager, next, sizes"/>
    <!------------------------------右上角新建产品线按钮------------------------------------->
    <el-dialog title="新建产品" :visible.sync="dialogNewProduct" :modal-append-to-body='false' width="25%" class="compile_product">
      <el-form :model="ruleFormNewProduct" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="机器主型号" prop="machineType">
          <el-input  v-model="ruleFormNewProduct.machineType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="chinese">
          <el-input  v-model="ruleFormNewProduct.chinese" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="english">
          <el-input  v-model="ruleFormNewProduct.english" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文描述" prop="describeeChinese">
          <el-input  v-model="ruleFormNewProduct.describeeChinese" text="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文描述" prop="describeeEnglish">
          <el-input  v-model="ruleFormNewProduct.describeeEnglish" text="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <!--上传图片-->
        <el-form-item label="产品图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary" style="width:255px;">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供货日期" >
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="退市日期">
          <el-date-picker
            v-model="value3"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogNewProduct = false">确 定</el-button>
        <el-button @click="dialogNewProduct = false">取 消</el-button>
      </div>
    </el-dialog>
    <!------------------------------图标--编辑产品线------------------------------------->
    <el-dialog title="编辑产品线" :visible.sync="dialogCompileProduct" :modal-append-to-body='false' width="25%" class="compile_product" style="border-bottom:1px solid #ccc;">
      <el-form :model="ruleFormRedact" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="机器主型号" prop="redactModel">
          <el-input  v-model="ruleFormRedact.redactModel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="redactChinaese">
          <el-input  v-model="ruleFormRedact.redactChinaese" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="english">
          <el-input  v-model="ruleFormRedact.english" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文描述" prop="redactChinese">
          <el-input  v-model="ruleFormRedact.redactChinese" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="英文描述" prop="redactEnglish">
          <el-input  v-model="ruleFormRedact.redactEnglish" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="产品图片" prop="redactPicture">
          <el-input  v-model="ruleFormRedact.redactPicture" autocomplete="off"></el-input>
        </el-form-item>
        <el-button type="primary" style="width:200px;margin-right:-95px;margin-bottom:15px;">上传图片</el-button>
        <el-form-item label="发布日期" prop="redactIssue">
          <el-date-picker
            v-model="value4"
            type="date"
            placeholder="选择日期"
          style="width:255px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供货日期" prop="redactIssue">
          <el-date-picker
            v-model="value5"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="退市日期" prop="redactIssue">
          <el-date-picker
            v-model="value6"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
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
  import { getProductList, setProductAdd,modifyProduct } from '@/api/productApi'
  export default {
    data() {
      return {
        // 分页
        pageNum: 1,
        pageSize: 10,
        pageTotal: 10,
        // 表格
        tableData: [
          {
            id: '00000002',
            nameCN: '产品线1',
            nameEN: 'PL1',
            machineType: "9009",
          },
        ],
        dialogNewProduct: false,      // 新建产品线按钮
        dialogCompileProduct: false, // 是否展开编辑产品线弹框
        dialogDeleteProdect: false,  //  是否展开删除产品线弹框
        ruleForm: {           // 编辑产品线
          chinaese: "",              // 中文名称
          elglish: "",               // 英文名称
        },
        // 新建产品
        ruleFormNewProduct: {
          machineType: "",  // 机器主型号
          chinese: "",     // 中文名称
          english: "",     // 英文名称
          describeeChinese: "",  // 中文描述
          describeeEnglish: "",  // 英文描述
        },
        // 点击上传图片
        fileList: [{
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        // 编辑产品
        ruleFormRedact:{
          redactModel:"", // 机器主机型号
          redactChinaese:"", // 中文名称
          redactEnglish:"", // 英文名称
        },
        optionsProductWireValue:"",   //编辑当前所选的产品
        optionsProductWire:[{
          value: '选项1',
          label: '产品线1'
        },{
          value: '选项2',
          label: '产品线2'
        },{
          value: '选项3',
          label: '产品线3'
        }],
      }
    },
    created () {
      // this.getProductListApi ();

    },
    methods: {

      //    分页--页码  获取列表数据
      getProductListApi () {
        this.tableData = []
        const params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        getProductList(...params).then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list || [ ]
            this.pageTotal = res.data.total
          }
        }).catch((err) => {
          console.log('err',err)
        })
      },

      // 新建产品
      setProductAddApi () {
          const params = {
            machineType:this.ruleFormNewProduct.machineType,
            nameCN:this.ruleFormNewProduct.chinese,
            nameEN:this.ruleFormNewProduct.english,
            descriptionCN:ruleFormNewProduct.describeeChinese,
            descriptionEN:ruleFormNewProduct.describeeEnglish,
            // productImg:
            announceDate:this.value1,
            deliveryDate:this.value2,
            withdrawDate:this.value3,
          }
        setProductAdd (...params).then(res=>{
          if (res.status === 200 ) {
            this.$message({
              message: '新建成功！',
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: '新建失败',
              type: 'error'
            });
          }
        })
      },
      setProductAddSummit () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.setProductAddApi ()
          }
        })
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    },
  }
</script>

<style>
  .el-dialog__header{
    border-bottom: solid 1px #EFEFEF;
  }
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
  .dialog-footer {
    text-align:center;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 255px;
  }

</style>

