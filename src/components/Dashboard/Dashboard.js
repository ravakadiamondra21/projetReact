import "./Dashboard.css"
import React, {useEffect, useState} from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, DatasetController} from "chart.js/auto";
import Axios from 'axios';
import Navbar from '../Menu/Navbar'

function Dashboard(){
    
    var [totalFamiliale, setTotalFamiliale] = useState(null);
    var [totalCouple, setTotalCouple] = useState(null);
    var [totalSimple, setTotalSimple] = useState(null);
    var [total, setTotal] = useState(null);

    const getTotalFamiliale = () => {
        Axios.get('http://localhost:9000/reserv/getFamMontantObtenu')
        .then((res) => {
            setTotalFamiliale(Number(res.data[0]?.sommeFamille))
        })
    }

    const getTotalCouple = () => {
        Axios.get('http://localhost:9000/reserv/getCoupleMontantObtenu')
        .then((res) => {
            setTotalCouple(Number(res.data[0]?.sommeCouple))
        })
    }

    const getTotalSimple = () => {
        Axios.get('http://localhost:9000/reserv/getSimpleMontantObtenu')
        .then((res) => {
            setTotalSimple(Number(res.data[0]?.sommeSimple))
        })
    }

    const setTotalValue = () => {
        var total = Number(totalFamiliale + totalCouple + totalSimple);
        setTotal(total);
    }

    
    var [datasF, setDataF] = useState([]);
    const getChartFamiliale = () => {
        Axios.get('http://localhost:9000/reserv/chart/familiale')
        .then((res) => {
            setDataF(res.data);
            console.log(res.data)
        })
    }

    var [datasC, setDataC] = useState([]);
    const getChartCouple = () => {
        Axios.get('http://localhost:9000/reserv/chart/couple')
        .then((res) => {
            setDataC(res.data);
            console.log(res.data)
        })
    }

    var [datasS, setDataS] = useState([]);
    const getChartSimple = () => {
        Axios.get('http://localhost:9000/reserv/chart/simple')
        .then((res) => {
            setDataS(res.data);
            console.log(res.data)
        })
    }

    var labelF = datasF.map(lab => lab.date)
    var dataF = datasF.map(data => data.total)

    var labelC = datasC.map(lab => lab.date)
    var dataC = datasC.map(data => data.total)

    var labelS = datasS.map(lab => lab.date)
    var dataS = datasS.map(data => data.total)

    var [label, setLabel] = useState([])

    function mergeAndSortDates(date1, date2, date3){
        const combinedArray = date1.concat(date2, date3);
        const uniqueDate = new Set(combinedArray);
        const uniqueDateArray = Array.from(uniqueDate);

        uniqueDateArray.sort((a,b) => a-b);

        setLabel(uniqueDateArray);
    }

    useEffect(() => {
        getTotalFamiliale();
        getTotalCouple();
        getTotalSimple();
        setTotalValue();
        getChartFamiliale();
        getChartCouple();
        getChartSimple();

        mergeAndSortDates(labelF, labelC, labelS)
        console.log(label)
    }, [totalFamiliale, totalCouple, totalSimple, total]);
    

    const Data ={
        
        labels: label,
        datasets : [
            {
                label: "familial",
                data : dataF,
                tension: 0.2,
                // backgroundColor : '#8a5b25'
            },
            {
                label: "couple",
                data : dataC,
                tension: 0.2,
                // backgroundColor : 'rgb(10, 10, 27);'
            },
            {
                label: "simple",
                data : dataS,
                tension: 0.2,
                // backgroundColor : 'rgb(10, 10, 27);'
            }
        ],
        
      }

    return(
        <body>
            <Navbar/>
            <section class="content">
            <div class="title">
                <h3>Dashboard</h3>
            </div>
            <div class="cost">
            <div>
                <small class="small">Total until yesterday</small>
            </div>
            <div class="card-wrapper">
                <div class="card ">
                    <h6>Familial room</h6>
                    <p>{totalFamiliale} Ar</p>
                </div>
                <div class="card ">
                    <h6>Couple room</h6>
                    <p>{totalCouple} Ar</p>
                </div>
                <div class="card ">
                    <h6>SImple room</h6>
                    <p>{totalSimple} Ar</p>
                </div>
                <div class="card ">
                    <h6>Total</h6>
                    <p>{total} Ar</p>
                </div>
            </div>
            
        </div>

        { <div class="chart">
            <div>
                <small class="small">Every month</small>
                <div class="schema">
                    <Line  data={Data}/>
                </div>
                
            </div>
        </div> }
        
    </section>

        </body>
    )
}

export default Dashboard;