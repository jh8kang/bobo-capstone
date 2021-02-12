import React, {Component, useEffect, useState} from 'react';
import FooterStore from '../../FooterStore/FooterStore';
import StoreHero from '../../StoreHero/StoreHero';
import './StoreHomePage.scss';
// import {Line} from 'react-chartjs-2';
import Chart from 'chart.js';
import {db, auth} from '../../../firebase';


function StoreHomePage() {
    let [data, setData] = useState([]);

    useEffect(()=> {

        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    setData(doc.data().tracker)

                    const chart = document.getElementById("lineChart");
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
                                        data: doc.data().tracker,
                                    }
                                ]},
                            options: {
                                legend: {
                                    display: false,
                                }
                            }
                        })
                    
                    }
                }
            })
        })
        .catch(err=> console.log(err))


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