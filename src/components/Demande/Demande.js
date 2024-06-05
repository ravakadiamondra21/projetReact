import "./Demande.css";
import search from "../../images/bx-search-alt.svg";
import check from "../../images/bx-check-circle.svg";
import React , { useEffect, useState } from "react";
import Axios from 'axios';
import Formulaire from '../Formulaire/Formulaire';
import Navbar from "../Menu/Navbar";

function Demande(){
    var [listeDemande, setListeDemande] = useState([]);
    var [nomToSearch, setNomToSearch] = useState(null);

    var [mail, setMail] = useState(null);
    var [type, setType] = useState(null);
    var [idChambre, setIdChambre] = useState(0);
    var [dateArr, setDateArr] = useState(null);
    var [dateDep, setDateDep] = useState(null);

    const prixChambre = [80000, 100000, 150000];

    const setValueToPost = async (row) => {
        setMail(row.mail);
        setType(row.type);
        setIdChambre(row.idChambre);
        setDateArr(row.dateArr);
        setDateDep(row.dateDep);
    }

    const validerDemande = (idClient, idChambre, dateArr, dateDep,  type) => {
        var cout;
        if(type == "familiale"){
            cout = prixChambre[2]
        }
        else if(type == "couple"){
            cout = prixChambre[1]
        }
        else{
            cout = prixChambre[0]
        }
        Axios.post('http://localhost:9000/reserv/post', {
            idClient : idClient,
            idChambre : idChambre,
            dateArr : dateArr,
            dateDep : dateDep,
            cout : cout
        })
    }

    const DolisteDemande = () => {
        Axios.get('http://localhost:9000/reserv/getDemande')
        .then((result) => {
            setListeDemande(result.data);
        })
    }

    const Search = async (nom) => {
        await Axios.get('http://localhost:9000/reserv/searchDemande/' +nom)
        .then((result) => {
            setListeDemande(result.data);
            console.log(nom , listeDemande)
        })

        
    }

    useEffect(() => {
        DolisteDemande();
        if(nomToSearch != null){
            Search(nomToSearch)
        }
        
    }, [nomToSearch]);

    return(
        <body>
            <Navbar/>
            <section class="content">
                <div class="header">
                    <div class="title">
                            <h3>Reservation request</h3> <br/>
                            <small class="small">Listes d'attente</small>
                    </div>
                    <div class="search">
                        <img src={search}/>
                        <input type="text" placeholder="Chercher..." onChange={(e) => e.target.value != "" ? setNomToSearch(e.target.value) : DolisteDemande()}></input>
                    </div>
                </div>
                <div class="container">
                    
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>mail</th>
                                    <th>téléphone</th>
                                    <th>chambre demandée</th>
                                    <th>numero de chambre</th>
                                    <th>date d'arrivé</th>
                                    <th>date de départ</th>
                                    <th>oui/non</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {listeDemande.map((val, key) => (
                                    <tr key = {key} > 
                                        <td>{val.nom}</td>
                                        <td>{val.mail}</td>
                                        <td>{val.tel}</td>
                                        <td>{val.type}</td>
                                        <td>{val.idChambre}</td>
                                        <td>{val.dateArr}</td>
                                        <td>{val.dateDep}</td>
                                        <td class="validation" onClick={() => setValueToPost(val)}>
                                            <span>
                                                <img src={check} ></img>
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

export default Demande;