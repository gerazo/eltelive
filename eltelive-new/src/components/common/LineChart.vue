<template>
    <div>
        <canvas id="line-chart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
export default {
    name: 'LineChart',
    props:{
        isModalVisible:Boolean,
        title:String,
        chartData:Number,
    },
    data(){
        return {
            myChart:null,
            TimeOutHandle:null
        };
    },
    mounted() {
        const labels = [];
        const data = {
            labels: labels,
            datasets: [{
                label:`${this.title} PER SECOND`,
                data:[],
                fill: true,
                borderColor: 'rgba(243,77,77,0.96)',
                backgroundColor:'rgba(159,89,89,0.5)',
                tension: 0.1
            }]
        };
        const config = {
            type: 'line',
            data: data,
            options:{
                scales: {
                    y: { // defining min and max so hiding the dataset does not change scale range
                        min: 0,
                        max: 100
                    }
                }
                }
        };

        const getRandomInt= (max)=> {
            return Math.floor(Math.random() * max);
        }
        const fakeRealTimeData = ()=>{
            return {
                data:getRandomInt(100),
                time:(new Date()).getSeconds()
            }
        }


        function addData(chart, label, data) {
            chart.data.labels.push(label);
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(data);
            });
            chart.update();
        }

        // function removeData(chart) {
        //     chart.data.labels.pop();
        //     chart.data.datasets.forEach((dataset) => {
        //         dataset.data.pop();
        //     });
        //     chart.update();
        // }

        function ShiftData(chart) {


            chart.data.datasets.forEach((dataset) => {
                if (dataset.data.length>7){
                    dataset.data.shift()
                    console.log("DATA SHIFTED")
                    chart.data.labels.shift();
                }
            });
            if(chart.data.labels.length>7){
                chart.data.labels.shift()
            }
            chart.update();
        }
        function updateChart(chart,chartData,lastUpdate){


            ShiftData(chart)
            const time=(new Date(lastUpdate));
            const timeData=`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${time.getHours()>12?'PM':'AM'}`
            addData(chart,timeData,chartData)

        }

        const ctx = document.getElementById('line-chart');

        if(this.isModalVisible){
            console.log("I AM HERE")
            if(this.myChart){
                this.myChart.destroy();
            }
            this.myChart= new Chart(ctx, config);
        }
        if(this.myChart){
            console.log("I AM HERE")
          this.TimeOutHandle=  setInterval(()=>{

            updateChart(this.myChart,this.chartData,new Date())

        },3000)
        }
    },
    beforeDestroy(){
        if(this.TimeOutHandle){
            clearInterval(this.TimeOutHandle)
            this.myChart.destroy();
        }
    }
}
</script>
