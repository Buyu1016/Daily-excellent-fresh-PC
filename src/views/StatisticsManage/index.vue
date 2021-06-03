<template>
  <div class="message-manage-container">
      <div class="card-box">
        <a-card title="本月销量榜" :bordered="true" style="width: 400px">
          <p>CodeGorgeous</p>
          <p>xingjun</p>
          <p>暂无</p>
        </a-card>
        <a-card title="本月好评榜" :bordered="true" style="width: 400px">
          <p>CodeGorgeous</p>
          <p>xingjun</p>
          <p>暂无</p>
        </a-card>
        <a-card title="本月绩效榜" :bordered="true" style="width: 400px">
          <p>CodeGorgeous</p>
          <p>xingjun</p>
          <p>暂无</p>
        </a-card>
      </div>
      <div class="echarts-box">
        <div ref="echartsBox"></div>
      </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    this.echartsChart();
  },
  methods: {
    echartsChart() {
      const chartDom = this.$refs.echartsBox;
      const myChart = echarts.init(chartDom);
      const option = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
          text: '销量总览',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['商品1', '商品2', '商品3', '商品4', '商品5'],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '商品1',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(128, 255, 165)',
              }, {
                offset: 1,
                color: 'rgba(1, 191, 236)',
              }]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
          {
            name: '商品2',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 221, 255)',
              }, {
                offset: 1,
                color: 'rgba(77, 119, 255)',
              }]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [120, 282, 111, 234, 220, 340, 310],
          },
          {
            name: '商品3',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(55, 162, 255)',
              }, {
                offset: 1,
                color: 'rgba(116, 21, 219)',
              }]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [320, 132, 201, 334, 190, 130, 220],
          },
          {
            name: '商品4',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 0, 135)',
              }, {
                offset: 1,
                color: 'rgba(135, 0, 157)',
              }]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [220, 402, 231, 134, 190, 230, 120],
          },
          {
            name: '商品5',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: 'top',
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 191, 0)',
              }, {
                offset: 1,
                color: 'rgba(224, 62, 76)',
              }]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [220, 302, 181, 234, 210, 290, 150],
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style scoped lang="less">
.message-manage-container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .card-box{
    width: 100%;
    height: 30%;
    padding: 20px 20px 40px 20px;
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    .ant-card{
      overflow: hidden;
      border-radius: 5px;
      box-shadow: 2px 2px 5px 0px #aaa;
    }
  }
  .echarts-box{
    width: 100%;
    height: 70%;
    margin: 0 auto;
    div{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
