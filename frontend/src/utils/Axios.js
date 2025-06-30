import axios from 'axios';

// const axiosInstance=axios.create({
//     baseURL:import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api',
//       withCredentials: true
// ,
// //     headers:{
// //         "Content-Type":'application/json',
// //     },
//   timeout: 20000 // increase to 20 seconds
// })
// axiosInstance.interceptors.response.use(res=>{return res},)



// axiosLocal.js
export const axiosLocal = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// axiosNASA.js
export const axiosNASA = axios.create({
  baseURL: "https://api.nasa.gov/neo/rest/v1",
  // No credentials
});

