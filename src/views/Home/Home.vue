<template>
  <el-row class="home"
          :gutter='20'>
    <el-col :span='8'
            style="margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="userImg">
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021-08-08</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top:20px"
               shadow="hover">
        <el-table :data='tableData'>
          <el-table-column show-overflow-tooltip
                           v-for='(val,key) in tableLabel'
                           :key="key"
                           :prop='key'
                           :label='val'>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span='16'
            style="margin-top:20px">
      <div class="num">
        <el-card shadow='hover'
                 v-for="item in countData"
                 :key='item.name'
                 :body-style="{display:'flex',padding:0}">
          <i class="icon"
             :class="'el-icon-'+item.icon"
             :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover"
               style="height:288px">
        <div style="height:288px"
             ref="echart"></div>
      </el-card>
      <div class="graph">
        <el-card shadow="hover"
                 style="height:240px">
          <div style="height:240px"
               ref="userEchart"></div>
        </el-card>
        <el-card shadow="hover">
          <div style="height:240px"
               ref="videoEchart"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getHome } from '../../api/data'
import * as echarts from 'echarts'
export default {
  data () {
    return {
      userImg: require('../../assets/images/user.png'),
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总共购买'
      },
      countData: [{
        name: '今日支付订单',
        value: 1234,
        icon: 'success',
        color: '#2ec7c9'
      }, {
        name: '今日收藏订单',
        value: 1234,
        icon: 'star-on',
        color: '#ffb980'
      }, {
        name: '今日未支付订单',
        value: 1234,
        icon: 's-goods',
        color: '#5ab1ef'
      }, {
        name: '本月支付订单',
        value: 1234,
        icon: 'success',
        color: '#2ec7c9'
      }, {
        name: '本月收藏订单',
        value: 1234,
        icon: 'star-on',
        color: '#ffb980'
      }, {
        name: '本月未支付订单',
        value: 1234,
        icon: 's-goods',
        color: '#5ab1ef'
      }],
      echartsData: {
        order: {
          legend: {
            textStyle: {
              color: '#333'
            }
          },
          grid: {
            left: '20%'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: '#17b3a3'
            }
          },
          axisLabel: { interval: 0, color: '#333' },
          yAxis: [{
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }],
          color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3'],
          series: []
        },
        users: {
          legend: {
            textStyle: {
              color: '#333'
            }
          },
          grid: {
            left: '20%'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: '#17b3a3'
            }
          },
          axisLabel: { color: '#333' },
          yAxis: [{
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }],
          color: ['#2ec7c9', '#b6a2de'],
          series: []
        },
        video: {
          tooltip: {
            trigger: 'item'
          },
          color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
          series: []
        }
      }
    }
  },
  methods: {
    getTableData () {
      getHome().then((res) => {
        this.tableData = res.data.tableData
        // 折线图的展示
        const order = res.data.orderData
        console.log(order.date)
        this.echartsData.order.xAxis.data = order.date
        const keyArray = Object.keys(order.data[0])
        keyArray.forEach((key) => {
          this.echartsData.order.series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: 'line'
          })
          const myEchartsOrder = echarts.init(this.$refs.echart)
          myEchartsOrder.setOption(this.echartsData.order)
          // 用户图
          const userData = res.data.userData
          this.echartsData.users.xAxis.data = userData.map((item) => item.date)
          this.echartsData.users.series.push({
            name: '新增用户',
            data: res.data.userData.map((item) => item.new),
            type: 'bar',
            stack: '1'

          })
          this.echartsData.users.series.push({
            name: '活跃用户',
            data: res.data.userData.map((item) => item.active),
            type: 'bar',
            stack: '2'
          })
          const myEchartUser = echarts.init(this.$refs.userEchart)
          myEchartUser.setOption(this.echartsData.users)

          // 饼状图
          this.echartsData.video.series.push({
            data: res.data.videoData,
            type: 'pie'
          })
          const myEchartVideo = echarts.init(this.$refs.videoEchart)
          myEchartVideo.setOption(this.echartsData.video)
        })
      })
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/home";
</style>
