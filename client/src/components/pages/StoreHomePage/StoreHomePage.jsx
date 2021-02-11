import React, {Component, useEffect, useState} from 'react';
import FooterStore from '../../FooterStore/FooterStore';
import StoreHero from '../../StoreHero/StoreHero';
import './StoreHomePage.scss';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js';

// class StoreHomePage extends Component {
//     constructor() {
//         super();
//         this.state = {
//             data: {
//                 label: ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
//                 datasets: [{
//                     label: "usage",
//                     backgroundColor: "rgba(255, 0, 255, 0.75)",
//                     data: [1, 2, 3, 4, 5],
//                 }]
//             }
//         }
//     }

//     getChartData = canvas => {
//         const data = this.state.data;
//         return data
//     }

//     render() {
//         return (
//             <div>
//                 <StoreHero/>
//                 <div className="store-charts">
//                     <div className="line-chart">
//                         <Line
//                             options={{
//                                 responsive: true
//                             }}
//                             data={this.getChartData}
//                         />
//                         <canvas className="lineChart" id="lineChart" width="300" height="200"></canvas>
    
//                     </div>
                
//                 </div>
    
//                 <FooterStore/>
//             </div>
//         )

//     }
// }

function StoreHomePage() {
    let [data, setData] = useState([]);

    useEffect(()=> {
        let data = [15, 16, 20, 25, 16, 17, 20];
        setData(data);
        const chart = document.getElementById("lineChart");
        console.log(data)
        if (chart) {
            let lineChart = new Chart(chart, {
                type: "line",
                data: {
                    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    datasets: [
                        {
                            label: "My First dataset",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75, 192, 192, 0.4)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHitRadius: 10,
                            data: data,
                        }
                    ]},
                options: {
                    legend: {
                        display: false,
                    }
                }
            })
        
        }

    }, []) 
    
    return (
        <div>
            <StoreHero/>
            <div className="store-charts">
                <canvas id="lineChart" className="lineChart" width="300" height="200"></canvas>

            </div>
            <FooterStore/>
        </div>
    )

}

export default StoreHomePage