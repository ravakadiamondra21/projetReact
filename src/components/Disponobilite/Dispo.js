import "./Dispo.css"
import search from "../../images/bx-search-alt.svg";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Axios from 'axios';
import { interval } from "date-fns";
import Navbar from "../Menu/Navbar";

function Dispo(){
        var [date, setDate] = useState(new Date());

        var [intervalFamiliale, setIntervalFamiliale] = useState([])
        var [intervaleCouple, setIntervalCouple] = useState([])
        var [intervaleSimple, setIntervaleSimple] = useState([])
        
        useEffect(() => {
            Axios.get('http://localhost:9000/reserv/getDate/familiale')
            .then(res => {
                const dates = res.data.map(row => ({
                    startDate : new Date(row.dateArr),
                    endDate : new Date(row.dateDep),
                    nombre : row.nombre
                }));
                console.log(dates)
                setIntervalFamiliale(dates)
            })

        })

        useEffect(() => {
            Axios.get('http://localhost:9000/reserv/getDate/couple')
            .then(res => {
                const dates = res.data.map(row => ({
                    startDate : new Date(row.dateArr),
                    endDate : new Date(row.dateDep),
                    nombre : row.nombre
                }));
                console.log(dates)
                setIntervalCouple(dates)
            })

        })

        useEffect(() => {
            Axios.get('http://localhost:9000/reserv/getDate/simple')
            .then(res => {
                const dates = res.data.map(row => ({
                    startDate : new Date(row.dateArr),
                    endDate : new Date(row.dateDep),
                    nombre : row.nombre
                }));
                console.log(dates)
                setIntervaleSimple(dates)
            })

        })

        const tileClassNameF = ({date}) => {
            if(isWithinAnyIntervale(date, intervalFamiliale)){
                return 'style'
            }
            return null
            // isWithinAnyIntervale(date, intervalFamiliale)
        } 

        const tileClassNameC = ({date}) => {
            if(isWithinAnyIntervale(date, intervaleCouple)){
                return 'style'
            }
            return null
        } 

        const tileClassNameS = ({date}) => {
            if(isWithinAnyIntervale(date, intervaleSimple)){
                return 'style'
            }
            return null
        } 

        const isWithinAnyIntervale = (date, intervals) => {
            return intervals.some(intervalDate =>{
                return(date >= intervalDate.startDate && date <= intervalDate.endDate && intervalDate.nombre  == 3)
            })
        }

 return(
     <body>
         <Navbar/>
         <section class="content"> 
                <div class="header">
                    <div class="title">
                            <h3>Room avalaibility</h3> <br/>
                            <small class="small">Summary</small>
                    </div>
                    {/* <div class="search">
                        <img src={search}/>
                        <input type="text" placeholder="Chercher..."></input>
                    </div> */}
                </div>
                <div class="container">
                    <div class="table-wraper">
                        <div class="calendar-grid">
                            <div class="calendrierContainer" >
                                <Calendar  value= {date} tileClassName={tileClassNameF}/>
                            </div>
                            <div class="calendrierContainer">
                                <Calendar value= {date} tileClassName={tileClassNameC}/>
                            </div>
                            <div class="calendrierContainer">
                                <Calendar value= {date} tileClassName={tileClassNameS}/>
                            </div>
                        </div>
                    </div>
                </div>
         </section>
     </body>
 )
}

export default Dispo;