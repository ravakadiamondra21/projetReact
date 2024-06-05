import React, {useEffect, useState} from 'react';
import Axios from 'axios';



    export function getChartFamiliale() {
            Axios.get('http://localhost:9000/reserv/chart/familiale')
            .then((res) => {
                return(res.data)
            })
        }
  

// var [chartFamiliale, setChartFamiliale] = useState(null);

// var chartFamiliale;

// const getChartFamiliale = () => {
//     Axios.get('http://localhost:9000/reserv/chart/familiale')
//     .then((res) => {
//         chartFamiliale = res.data
//         console.log(chartFamiliale);
//     })
// }

// // useEffect(() => {
// //     getChartFamiliale()
// // })
