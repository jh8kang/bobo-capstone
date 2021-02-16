import React, {Component, useEffect, useState} from 'react';
import FooterStore from '../../FooterStore/FooterStore';
import StoreHero from '../../StoreHero/StoreHero';
import './StoreHomePage.scss';
import Chart from 'chart.js';
import {db, auth} from '../../../firebase';

function StoreHomePage() {
    let [data, setData] = useState([]);
    let [date, setDate] = useState(new Date());
    let [prevDate, setPrevDate] = useState(null);

    useEffect(()=> {
        db.collection('stores')
        .get()
        .then(snapshot=> {
            snapshot.forEach(doc=> {
                if (doc.data().uid === auth.currentUser.uid) {
                    
                }
            })
        })

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
                                        fill: false,
                                        lineTension: 0.5,
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
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            suggestedMin: 0,
                                            stepSize: 1,
                                            beginAtZero:true,
                                        },
                                        gridLines: {
                                            // display: false,
                                        }
                                    }],
                                    xAxes: [{
                                        gridLines: {
                                            // display: false,
                                            // drawBorder: true,
                                        }
                                    }]
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
                <div className="store-charts__title">
                    <p className="store-charts__title__text">This week's overview</p>
                    <p className="store-charts__title__text store-charts__title__text--sub">Amount of points given out</p>
                </div>
                <canvas id="lineChart" className="lineChart" width="300" height="170"></canvas>
            </div>
            <FooterStore/>
        </div>
    )

}

export default StoreHomePage