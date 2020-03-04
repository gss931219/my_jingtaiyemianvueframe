<template>
  <a-table id='table' :columns="columns" :dataSource="data" :loading="loading" bordered :scroll="{ x: 1500, y: y }" :pagination="{ pageSize }"
    @change="handleTableChange"
  >
    <template slot="robotID" slot-scope="text, record">
      <a href="javascript:;" @click="() => checkRobotID(record)">{{text}}</a>
    </template>
    <template slot="state" slot-scope="text">
      {{text}}
    </template>
    <template slot="mode" slot-scope="text,record">
      <span>{{text}}</span>
    </template>
    <template slot="title" slot-scope="currentPageData">
      <span class='titleSpan'>机器人列表</span>
      <span>距离下次更新还有{{num}}秒</span>
    </template>
  </a-table>
</template>
<script>
import {robotList , imuError , cameraError , chaoshengError , dipanError} from '../../../config.js'
let data = [];
let bol = true;//youdianxiaowenti
export default {
  data() {
    return {
      data,
      pageSize: 10,
      columns:robotList,
      arr:[],
      ti:'',
      obj:[],
      userID:this.$store.state.data.userID,
      loading:false,
      clock: '',
      num: 10,
      yy: 320,
    }
  },
  inject: ['watchClientHeight'],
  computed: {
    y(){
      console.log('xxxxx_y: ', this.$store.state.layout_content)
      let ay = this.$store.state.layout_content<300?this.yy:this.$store.state.layout_content
      return ay
    }
  },
  mounted() {
    this.watchClientHeight()
    this.timer();
    this.clock1();
    this.clock = window.setInterval(() => {//10 miao dao ji shi
      setTimeout(() => {
        this.clock1()
      },0)
    },1000)
  },
  destroyed(){
    if(this.clock){
      clearInterval(this.clock)
    }
    sessionStorage.removeItem('robotID_log')
  },
  methods: {
    clock1(){
      this.num>0 ? this.num-- : this.timer();
    },
    // 检查机器人状态是否异常
    customRow(arr){
      this.$nextTick(()=>{
        let rows = document.querySelectorAll('.ant-table-tbody')[0].rows;
        let rows1 = document.querySelectorAll('.ant-table-tbody')[1].rows;
        
        for (let i=0;i<rows.length;i++){
          arr.map((item,index) => {
            if(item.err != '-' && item.err.length != 0){
              item['bgColor'] = 'red'
            }else if (item.warn != '-' && item.warn.length != 0){
              item['bgColor'] = 'yellow'
            }
            // console.log('robotList--arr',arr)
          })
          let text = rows[i].innerText
          if(text.match(RegExp(/异常/))){
            console.log('item.bgColor', arr[i].bgColor,'i: ',i)
            rows[i].style.backgroundColor = arr[i].bgColor;
            rows1[i].style.backgroundColor = arr[i].bgColor;
          }else{
            rows[i].style.backgroundColor = '';
            rows1[i].style.backgroundColor = '';
          }
        }
        
      })
    },
    // 检查机器人状态
    handleTableChange(){
      this.customRow(this.data)
    },

    getRobotStatus(){
      console.log('获取机器人参数列表',this.data)
      let dataArr
      let that = this;
      if(bol){
        this.loading = true;
        bol = false; 
      }
      this.$http.robotList({userID:this.userID})
      .then(msg=>{
        console.log('RobotList----------',msg)
        if(msg.err == 0){
          let robots = msg.data.robots
          let result = async function () {
            dataArr = await that.aboutRobotStatusList(robots)
            let isbol = true;
            // console.log('this.obj',that.obj,that.obj.length,'newData',dataArr,dataArr.length)
            if(that.obj.length==dataArr.length){
              for (let i = 0; i < dataArr.length; i++) {　　　　　　　　
                for(let k in dataArr[i]){
                  if(dataArr[i][k]!=that.obj[i][k]){
                    isbol = false
                  }
                }　　　　　　
              }　
            }else{
              isbol = false
            }
            if(!isbol){
              that.data = dataArr
              that.customRow(that.data)
            }
            that.obj = dataArr
            console.log('this.obj',that.obj,'newData',dataArr)
          }
          result()
          // console.log('xxxxxxxxxvvvvvvvvvvvvvvvvvvvvvvvvvv',dataArr)
        }else{
          this.$message.info(msg.errMsg)
        }
        this.loading = false
      })
    },
    checkRobotID(obj){
      console.log('xxxxxxxxxxxx',obj)
      this.$store.dispatch('val', obj)
      this.$store.dispatch('robotID', obj.robotID)
      this.$router.push({name:"robotLog"})
    },
    timer(){
      this.num = 10;
      this.getRobotStatus()
    },
    getTheSame(attendUid,dataattendUid) {
      let result = new Array();        
      for (let i = 0; i < attendUid.length; i++) {            
        for (let j = 0; j < dataattendUid.length; j++) {                    
          // if (parseInt(dataattendUid[j].code,16) == attendUid[i]) {    103==259                    
          if (dataattendUid[j].code == attendUid[i]) {                        
            result.push(dataattendUid[j].description);  
            break;                    
          }                
        }            
      }        
      //console.log(result);
      return result.join('、');   
    },

    // 匹配机器人列表的状态信息
    aboutRobotStatusList(robots){
      let that = this;
      return new Promise((resolve,reject)=>{
        let dataArr = [];
        for(let i=0;i<robots.length;i++){
          (function(){
            for(let k in robots[i]){
              if(robots[i][k]==null){
                robots[i][k] = '-'
              }
            }
            if(robots[i].err!="-"&&robots[i].warn!="-"&&robots[i].err.length == 0 && robots[i].warn.length==0){
              robots[i].imu = 'ok'
              robots[i].dipan = 'ok'
              robots[i].camera = 'ok'
              robots[i].chaosheng = 'ok'
              robots[i].code = '正常'
            }else if(robots[i].warn=="-" && robots[i].err=="-"){
              robots[i].imu = '-'
              robots[i].dipan = '-'
              robots[i].camera = '-'
              robots[i].chaosheng = '-'
              robots[i].code = '-'
            }else if(robots[i].warn!="-" || robots[i].err!="-"){
              let newArr;
              if(robots[i].warn=="-"){
                newArr = robots[i].err
              }else if(robots[i].err=="-"){
                newArr = robots[i].warn
              }else{
                newArr = robots[i].err.concat(robots[i].warn)
              }
              robots[i].imu = that.getTheSame(newArr,imuError) || 'ok'
              robots[i].dipan = that.getTheSame(newArr,dipanError) || 'ok'
              robots[i].camera = that.getTheSame(newArr,cameraError) || 'ok'
              robots[i].chaosheng = that.getTheSame(newArr,chaoshengError) || 'ok'
              robots[i].code = '异常'
            }
            for(let k in robots[i]){
              if(!robots[i].robotStatus){
                if(k!='robotID'&&k!='robotMAC'&&k!='robotStatus'&&k!='siteName'){
                  robots[i][k] = "-"
                }
              }
            }
            robots[i].robotStatus = (robots[i].robotStatus==true?'在线':'离线')
            robots[i]['key'] = i;
            dataArr.push(robots[i])
          })(i)
          resolve(dataArr)
        }
      })
    },

  },
}
</script>