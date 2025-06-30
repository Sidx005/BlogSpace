import React, { useEffect, useState } from 'react';
import  { axiosNASA } from '../utils/Axios';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2'; // Ensure you've imported the chart type you need
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement, // Register LineElement for line charts
    PointElement, // Register PointElement for line charts or scatter charts
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios';
import { useAuth } from '../Context';

// Register required components for the chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement, // Register LineElement for Line charts
    PointElement, // Register PointElement for Points in line charts
    Title,
    Tooltip,
    Legend
);

const Analytics = () => {
    // const {token,navigate}=useAuth()
    // if(!token){
    //     navigate('/login')
    // }
    const [chartData, setChartData] = useState({});

    const [marsData, setMarsData] = useState({});
    const [rateCheck, setRateCheck] = useState(false);
    const [loadCharts, setLoadCharts] = useState(true);
    const [hazardousCount, setHazardousCount] = useState(0);
    const[error,setError]=useState(false)
    const [nonHazardousCount, setNonHazardousCount] = useState(0);
    const [hazardousChartData, setHazardousChartData] = useState({});


    const fetchData = async () => {
        setLoadCharts(true);
        try {
            const res = await axiosNASA.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-04-20&end_date=2024-04-27&api_key=${import.meta.env.VITE_NASAPI}`);
            
            // Check if 'near_earth_objects' exists and is an object with keys
            if (res.data.near_earth_objects && typeof res.data.near_earth_objects === 'object') {
                const formatData = Object.keys(res.data.near_earth_objects);
                
                if (Array.isArray(formatData)) {
                    const result = formatData.map(date => res.data.near_earth_objects[date].length);
                    
                    let hazardousCount = 0;
                    let nonHazardousCount = 0;
                    
                    formatData.forEach(date => {
                        const asteroids = res.data.near_earth_objects[date];
                        
                        if (Array.isArray(asteroids)) {
                            asteroids.forEach(asteroid => {
                                if (asteroid.is_potentially_hazardous_asteroid) {
                                    hazardousCount++;
                                } else {
                                    nonHazardousCount++;
                                }
                            });
                        }
                    });
    
                    setHazardousCount(hazardousCount);
                    setNonHazardousCount(nonHazardousCount);
                    setHazardousChartData({
                        labels: ['Hazardous', 'Non-Hazardous'],
                        datasets: [{
                            label: 'Hazardous Asteroids Ratio',
                            data: [hazardousCount, nonHazardousCount],
                            backgroundColor: ['blue', '#fff'],
                            borderColor: ['#blue', '#fff'],
                            borderWidth: 1,
                        }]
                    });
                    
                    setChartData({
                        labels: formatData,
                        datasets: [{
                            label: 'Asteroids',
                            data: result,
                            backgroundColor: "rgba(111,110,114,1)",
                            borderColor: "rgba(255,255,255,1)",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                            borderWidth: 1,
                        }]
                    });
                } else {
                    throw new Error('Invalid data format: formatData is not an array');
                }
            } else {
                throw new Error('Invalid data: near_earth_objects is missing or not an object');
            }
        } catch (err) {
            console.log(err);
            setRateCheck(true);
        } finally {
            setLoadCharts(false);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    const fetchMarsData = async () => {
        try {
            const labels = [];
const res = await axios.get(`https://api.nasa.gov/insight_weather/?api_key=${import.meta.env.VITE_NASAPI}&feedtype=json&ver=1.0`);
            const solKeys = res.data.sol_keys;
            labels.push(...solKeys);
            const solData = solKeys.map(sol => (res.data[sol].AT.av));

            setMarsData({
                labels: labels,
                datasets: [{
                    label: 'Mars Avg Temperature on Sols',
                    data: solData,
                    backgroundColor: 'rgba(255,255,255,1)',
                    borderColor: 'rgba(255,255,255, 1)',

                }]
            });

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMarsData();
    }, []);

    if (loadCharts) {
        return <div className='w-full h-screen flex items-center justify-center text-2xl'>Loading...</div>;
    }

    if (rateCheck) {
        return <div className='w-full h-screen flex items-center flex-col justify-center text-2xl'>
            <img src="/ErrorAnalytics.png" alt="" />
            <h1 className="text-3xl text-white">Sorry we ran into an issue !! 😔</h1>
        </div>;
    }

    return (
        <div className='w-full flex flex-col min-h-screen p-4'>
            <h1 className='text-4xl font-bold text-center mt-20 mb-6'>Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 w-full gap-3">
                <div className="w-full max-w-4xl mx-auto bg-black/20 border-2 border-white/50 p-4 rounded-xl shadow-md">
                    <div className=" w-full h-[400px]  ">
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                               
                                plugins: {
                                    legend: { position: 'top' },
                                    title: {
                                        display: true,
                                        color: '#ffffff',  // Title text color - white
                                        text: 'Near Earth Objects Count Per Day'
                                    }
                                },
                                scales: {
                                    y: {
                                          grid: {
        color: 'rgba(255, 255, 255, 0.2)',   // X-axis grid line color (faint white)
        borderColor: 'white',                  // X-axis border color (the axis line)
      },
                                        ticks: {
                                            color: '#ffffff', // Y-axis text color - white
                                        },
                                        beginAtZero: true
                                    }
                                },  x: {
                                      grid: {
        color: 'rgba(255, 255, 255, 0.2)',   // X-axis grid line color (faint white)
        borderColor: 'white',                  // X-axis border color (the axis line)
      },
                                        ticks: {
                                            color: '#ffffff', // Y-axis text color - white
                                        },
                                        // beginAtZero: true
                                    }
                                
                            }}
                        />
                    </div>
                </div>     <div className="w-full max-w-4xl mx-auto bg-black/20 border-2 border-white p-4 rounded-xl shadow-md">
                    <div className=" w-full h-[400px]">
                        <Doughnut
                            data={hazardousChartData}
                            options={{
                                responsive: true,
                                
                                maintainAspectRatio: false,
                                scales:{
                                    x:{
                                          grid: {
        color: 'rgba(255, 255, 255, 0.2)',   // X-axis grid line color (faint white)
        borderColor: 'white',                  // X-axis border color (the axis line)
      },
                                        ticks:{
                                            color: '#ffffff', // X-axis text color - white
                                        }
                                    },
                                    y:{
                               ticks:{
                                            color: '#ffffff', // Y-axis text color - white
                                        },
                                        beginAtZero: true
                                    }
                                },
                                plugins: {
                                    legend: { position: 'top' },
                                    title: {
                                        display: true,
                                        color: '#ffffff',  // Title text color - white
                                        text: 'Hazardous Vs Non-Hazardous Asteroids'
                                    }
                                },
                              
                            }}
                        />
                    </div>
                </div>
                <div className="w-full max-w-4xl mx-auto bg-black/20 border-2 p-4 rounded-xl shadow-md">
                    <div className=" w-full h-[400px]">
                        <Line
                            data={marsData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales:{
                                    x:{
                                          grid: {
        color: 'rgba(255, 255, 255, 0.2)',   // X-axis grid line color (faint white)
        borderColor: 'white',                  // X-axis border color (the axis line)
      },
                                        ticks:{
                                            color: '#ffffff', // X-axis text color - white
                                        }
                                    },
                                    y:{
                                        ticks:{
                                            color: '#ffffff', // Y-axis text color - white
                                        },
                                        // beginAtZero: true
                                    }
                                },
                                plugins: {
                                    legend: { position: 'top',
                                        labels:{
                                        color: '#ffffff',
                                        
                                    
                                    }// Legend text color - white,
                                    
                                     },
                                    title: {
                                        display: true,
                                                color: '#ffffff',  // Title text color - white

                                        text: 'Mars Average Temperature on Sols'
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
