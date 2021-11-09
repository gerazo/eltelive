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
    },
    data(){
        return {
            myChart:null,
            TimeOutHandle:null
        };
    },
    mounted() {
        const labels = [1,2,3,4,5];
        const data = {
            labels: labels,
            datasets: [{
                label:"RAM PER SECOND",
                data:[0],
                fill: false,
                borderColor: 'rgb(243,9,9)',
                backgroundColor:'rgb(243,9,9)',
                tension: 0.1
            }]
        };
        const config = {
            type: 'line',
            data: data,
            options: {}
        };

        const getRandomInt= (max)=> {
            return Math.floor(Math.random() * max);
        }
        const fakeRealTimeData = ()=>{
            return {
                data:getRandomInt(1000),
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
                if (dataset.data.length>5){
                    dataset.data.shift()
                    console.log("DATA SHIFTED")
                    chart.data.labels.shift();
                }
            });
            if(chart.data.labels.length>5){
                chart.data.labels.shift()
            }
            chart.update();
        }
        function updateChart(chart){


            ShiftData(chart)
            const newData=fakeRealTimeData();
            addData(chart,newData.time,newData.data,)

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

            updateChart(this.myChart)

        },2000)
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
