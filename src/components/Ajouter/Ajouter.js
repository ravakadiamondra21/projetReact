import "./Ajouter.css";
import drop from '../../images/bx-trash.svg'
import search from "../../images/bx-search-alt.svg";
import React, { useEffect, useState } from "react";
import Axios  from "axios";
import ModalSuppr from "../Modal-supprimer/modalSuppr";
import Modal from "../Modals/modal";
import Navbar from "../Menu/Navbar";
import ModalSuc from '../modalSucces/modalSucces'

function Ajouter(){
    const [listeReservation, setListeReservation] = useState([]);
    const [nom, setNom] = useState(null);
    const [modal, setModal] = useState(false);
    const [idRes, setIdRes] = useState(null);
    const [modalSuccess, setModalSuccess] = useState(false);
    var message = "Réservation annulée"

    const handleModal = (param) => {
        setIdRes(param)
        setModal(true)
    }

    const DolisteReservation = async () => {
        await Axios.get('http://localhost:9000/reserv/getReservationAccepte')
        .then((result) => {
            setListeReservation(result.data)
        })
    }

    const Search = async (nom) => {
        await Axios.get('http://localhost:9000/reserv/searchReservationAccepte/' +nom)
        .then((result) => {
            setListeReservation(result.data);
            // console.log(nom , listeReservation)
        })
        
    }


    const annulerReservation = () =>{
        Axios.delete('http://localhost:9000/reserv/annuler/'+ idRes)
        setModalSuccess(true)
        DolisteReservation()
    }
 
    useEffect(() => {
        DolisteReservation();
        if(nom != null){
            Search(nom)
        }
    }, [nom])

    


    return(
        <body>
            <Navbar/>
            <section class="content">
                <div class="header">
                    <div class="title">
                            <h3>Reservations</h3> <br/>
                            <small class="small">Find reservations here</small>
                    </div>
                    <div class="search">
                        <img src={search}/>
                        <input type="text" placeholder="Search..." onChange={(e) => e.target.value != "" ? setNom(e.target.value) : DolisteReservation()}></input>
                    </div>
                </div>
                
                <div class="container">
                    
                    <div class="table-wrapper">
                        <table class="table-reservation">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Number phone</th>
                                    <th>Room</th>
                                    <th>Room number</th>
                                    <th>Arival date</th>
                                    <th>Departure date</th>
                                    <th>Drop reservation</th>
                                </tr>
                            </thead>
                            
                            {modal && <ModalSuppr modal={() => setModal(false)} annuler={annulerReservation}/>}
                            {modalSuccess && <ModalSuc message={message} modal={() => setModalSuccess(false)}/>}
                            <tbody>
                                {listeReservation.map((val, key) => (
                                    <tr key = {key}>
                                        <td>{val.idRes}</td>
                                        <td>{val.nom}</td>
                                        <td>{val.mail}</td>
                                        <td>{val.tel}</td>
                                        <td>{val.type}</td>
                                        <td>{val.idChambre}</td>
                                        <td>{val.dateArr}</td>
                                        <td>{val.dateDep}</td>
                                        <td class="validation" onClick={() => handleModal(val.idRes)}>
                                            <span>
                                                <img src={drop} className="image"></img>
                                            </span>
                                        </td>
                                    </tr>
                                ))} 
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </section>
        </body>
    )
}

export default Ajouter;