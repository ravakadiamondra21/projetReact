import search from "../../images/bx-search-alt.svg";
import React, {useState, useEffect} from 'react';
import "./Formulaire.css"
import Axios from 'axios';
import Modal from '../Modals/modal';
import Navbar from "../Menu/Navbar";
import sendEmail, { Email } from "../Email.js/email";
import compterChambre from'./CompterChambre';
import ModalSuc from "../modalSucces/modalSucces"

import confirm from "../../images/confirm.png";
import warning from "../../images/warning-.png";
import { fabClasses } from "@mui/material";
import { Link } from "react-router-dom";

function Formulaire(){
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowString = tomorrow.toISOString().split('T')[0]
    var [modal,setModal]=useState(false)
    var [message, setMessage] = useState("")
    var [isDisabled, setIsDisabled] =  useState(false);
 
    var [idClient, setIdClient] = useState(0);
    var [nom, setNom] = useState("");
    var [mail, setMail] = useState(null);
    var [numero, setNumero] = useState(null);
    var [nbAdulte, setNbAdulte] = useState(null);
    var [nbEnfant, setNbEnfant] = useState(null);
    var [nbFamiliale, setNbFamiliale] = useState(null);
    var [nbCouple, setNbCouple] = useState(null);
    var [nbSimple, setNbSimple] = useState(null);
    var [dateArr, setDateArr] = useState(null);
    var [dateDep, setDateDep] = useState(null);

    var [idMail, setIdMail] = useState(false);
    var [idTel, setIdTel] = useState(false);
    var [idNom, setIdNom] = useState(false);
    var [idDateArr, setIdDateArr] = useState(false);
    var [idDateDep, setIdDateDep] = useState(false);
    var [idAdulte, setIdAdulte] = useState(false);

    var [familleDispo, setFamilleDispo] = useState(0);
    var [coupleDispo, setCoupleDispo] = useState(0);
    var [simpleDispo, setSimpleDispo] = useState(0);

    var [minFamiliale, setMinFamiliale] = useState([]);
    var [minCouple, setMinCouple] = useState([]);
    var [minSimple, setMinSimple] = useState([]);

    var [date, setDate] = useState(null);
    var [postClicked, setPostClicked] = useState(false);

    var prixChambre = [80000, 100000, 150000];
    var [showConfirm, setShowConfirm] = useState(false)

    const annuler = () => {
        setNom("");
        setMail(null);
        setNumero("");
        setNbAdulte(null)
        setNbEnfant("");
        setNbFamiliale("");
        setNbCouple("");
        setNbSimple("");
        setDateArr(null);
        setDateDep(null);
        setDate(null);
        window.location.reload();
        // setphholder(true);

        console.log("annuler")
    }

    const getFamDispo = async (date) => {
        await Axios.get('http://localhost:9000/chambre/countDispo/' +date + '/familiale' )
        .then((res) => {
            setFamilleDispo(res.data[0]?.chambreDispo)
        })
    }

    const getCoupleDispo = async (date) => {
        await Axios.get('http://localhost:9000/chambre/countDispo/' +date + '/couple' )
        .then((res) => {
            const count = res.data[0]?.chambreDispo;
            setCoupleDispo(count)
        })
    }

    const getSimpleDispo = async (date) => {
        await Axios.get('http://localhost:9000/chambre/countDispo/' +date + '/simple' )
        .then((res) => {
            const count = res.data[0]?.chambreDispo;
            setSimpleDispo(count)
        })
    }


    const getIdFam = async (date) => {
        await Axios.get('http://localhost:9000/chambre/minIdChambre/' +date+ '/familiale'
        )
        .then((res) => {
            const id = res.data.map(item => item.idChambre);
            setMinFamiliale(id);
        })

    }

    const getIdCouple = async (date) => {
        await Axios.get('http://localhost:9000/chambre/minIdChambre/' +date+ '/couple')
        .then((res) => {
            const id = res.data.map(item => item.idChambre);
            setMinCouple(id);
        })
    }

    const getIdSimple = async (date) => {
        await Axios.get('http://localhost:9000/chambre/minIdChambre/' +date+ '/simple')
        .then((res) => {
            const id = res.data.map(item => item.idChambre);
            setMinSimple(id);
        })
    }

    const postClient = async (nom, mail, numero) => {
        if(nom !== null && mail !== null && numero !== null){
            await Axios.post('http://localhost:9000/client/post', {
                nom : nom,
                mail : mail,
                tel : numero
            })
        }
        
    }

    const insertReservation = async (client, chambre, arr, dep, cout) => {
        
        await Axios.post('http://localhost:9000/reserv/post', {
            idClient : client,
            idChambre : chambre,
            dateArr : arr,
            dateDep : dep,
            cout : cout
        })
        
    }

    
    const getLastId = async () => {
            await Axios.get('http://localhost:9000/client/get/maxId')
            .then((res) => {
                setIdClient(res.data[0]?.lastId);
                console.log(idClient)
            })
        }

    const clientExist = async () => {
        // console.log("mande ny clientExist zao")
        console.log(postClicked)
        console.log("mail ao amn clientExist " + mail)
           if(mail != null){
                await Axios.get('http://localhost:9000/client/get/mail/' +mail)
                .then((res) => {
                    const id = res.data[0]?.idClient;
                    if(res.data.length == 0){

                            postClient(nom, mail, numero);
                            console.log(idClient);
                          
                        // getLastId();
                        console.log(idClient)
                        setIdClient(idClient + 1)
                        postReservation(idClient);
                    }
                    else{
                        console.log(id)
                        setIdClient(id);
                        postReservation(id);
                    }
                })
            }
    }

    const postReservation = async (idClient) => {
            var nbMois = Math.abs(new Date(dateDep) - new Date(dateArr));
            var nbJour = Math.ceil(nbMois / (1000 * 60 * 60 * 24))

            var coutFam = nbJour * prixChambre[2]
            var coutCouple = nbJour * prixChambre[1]
            var coutSimple = nbJour * prixChambre[0]

            for(var i=0; i < nbFamiliale; i++){
                insertReservation(idClient, minFamiliale[i], dateArr, dateDep, coutFam)
            }
    
            for(var i=0; i < nbCouple; i++){
                
                insertReservation(idClient, minCouple[i], dateArr, dateDep, coutCouple)
            }
    
            for(var i=0; i < nbSimple; i++){
                insertReservation(idClient, minSimple[i], dateArr, dateDep, coutSimple)
            }
            sendEmail(mail)
            
        // }
        setPostClicked(false);
    }

    const reserver = async () => {
        const nbChambre = compterChambre(nbAdulte, nbEnfant, nbFamiliale, nbCouple, nbSimple);
        // console.log(nbChambre)
        console.log(simpleDispo)
        if(nbChambre == true){
            if(nbFamiliale > familleDispo){
                setMessage("feno ny familiale")
                setIsDisabled(true)
            }
            else{
                if(nbCouple > coupleDispo){
                    setMessage('feno ny couple')
                    setIsDisabled(true)
                }
                else{
                    if(nbSimple > simpleDispo){
                        // setModal(true)
                        setMessage('feno ny simple')
                        setIsDisabled(true)
                    }
                    else{
                        setPostClicked(true);
                        await clientExist();
                        setShowConfirm(true)
                        setModal(false)
                    }
                }
            }
            
        } else {
            setMessage("Les chambres ne sont pas suffisantes pour les clients")
            console.log('blabla')
         }
        
    }

    const postFormulaire = async () => {
        setModal(true)
        if(nom === null || dateArr === null || dateDep === null || mail === null || numero === null ){
            setMessage("Veuillez remplir tous les champs")
            setIsDisabled(true)
        }
        else if(nbAdulte == null || nbAdulte == ""){
            setMessage("Il doit avoir au moins un adulte.")
            setIdAdulte(true)
            setIsDisabled(true)
        }
        else{
            setMessage("Voulez-vous vraiment enregistrer cette réservation ?")
            await getFamDispo(dateArr);
            await getCoupleDispo(dateArr);
            await getSimpleDispo(dateArr);

        }

    }

    const controlTelValue = (value) => {
        if( value.length<10){
            setIdTel(true)
        }
        else{
            setIdTel(false);
        }
    }

    const controlMailValue = (value) => {
        if(!value.includes('@') || !value.includes('.')){
            setIdMail(true)
            // value.target.placeholder = "mail"
        }
        else{
            setIdMail(false)
        }
    }

    const controlNameValue = (value) => {
        if(value.length == 0){
            setIdNom(true)
        }
        else{
            setIdNom(false)
        }
    }

    const controlDateArr = (value) => {
        if(value === null){
            setIdDateArr(true)
            
        }
        else{
            setIdDateArr(false)
        }
        
    }

    const controlDateDep = (value) => {
        if(value === "jj/mm/aaaa"){
            setIdDateDep(true)
        }
        else{
            setIdDateDep(false)
        }
    }

    useEffect(() => {
        if(nom == ""){

            getLastId();
            console.log(idClient)
            console.log(nom)
        }
        getFamDispo(dateArr);
        getCoupleDispo(dateArr);
        getSimpleDispo(dateArr);
        
        if(date != dateArr){
            
            getIdFam(dateArr); 
            getIdCouple(dateArr);
            getIdSimple(dateArr);
            setDate(dateArr);
            console.log(minFamiliale)
        }

        // context()
        
    }, [ minFamiliale, minCouple, minSimple, dateArr, date, mail, nom])

    

    return(
        <body class="form-body">
            <Navbar/>
            <section class="content">
                <div class="header">
                    <div class="title">
                            <h3>Reservation request</h3> <br/>
                            <small class="small">Enter here your reservation</small>
                    </div>
                    {/* <div class="search">
                        <img src={search}/>
                        <input type="text" placeholder="Chercher..."></input> 
                    </div>  */}
                </div>
             <div class="div-formulaire"> 
                <div class="header-ajout">
                    <h2>Fill form for reservation</h2>
                    
                 </div>
                 <div class="formulaire">
                    <form action="">
                        <div class="form-body">
                            <div>
                            
                                <input type="text" value={nom} id={idNom ? "invalidClass" : ""} className="inp" placeholder="name*" name="nom" onChange={(event) => {
                                    setNom(event.target.value)
                                    controlNameValue(event.target.value)
                                    console.log(nom)
                                }}/><br/>
                    
                                <input type="text" value={mail} name="mail"  class="inp" placeholder="Email*" id={idMail ? "invalidClass" : ""} onChange={(event) => {
                                    setMail(event.target.value)
                                    controlMailValue(event.target.value)
                                }}/> <br/>
                    
                                <input type="tel" value={numero} id={idTel ? "invalidClass" : ""} class="inp" placeholder="Phone number*" name="tel" onChange={(event) => {
                                    setNumero(event.target.value)
                                    controlTelValue(event.target.value)
                                }}/> <br/>
                    
                                <input type="number" value={nbAdulte} id={idAdulte ? "invalidClass" : ""} class="inp" placeholder="Adult*" name="adulte*" onChange={(event) => {
                                    setNbAdulte(event.target.value)
                                }}/> <br/>
                            </div>
            
                            <div>
                                <input type="number" value={nbEnfant} class="inp" placeholder="Kid" name="enfant" onChange={(event) => {
                                    setNbEnfant(event.target.value)
                                }}/> <br/>
                
                                <span>
                                    <input type="number" value={nbFamiliale} placeholder="Familial" name="familiale" onChange={(event) => {
                                    setNbFamiliale(event.target.value)
                                }}/> <br/>
                
                                    <input type="number" value={nbCouple} placeholder="Couple" name="couple" onChange={(event) => {
                                    setNbCouple(event.target.value)
                                }}/> <br/>
                
                                    <input type="number" value={nbSimple} placeholder="Simple" name="simple" onChange={(event) => {
                                    setNbSimple(event.target.value)
                                }}/> <br/>
                                </span>
                    
                                <input min={tomorrowString} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => dateArr == null ? e.target.type = 'text'  : ''} value={dateArr} class="inp" id={idDateArr ? "invalidClass" : ""} placeholder="Arrival date*" onChange={(event) => {
                                    setDateArr(event.target.value)
                                    controlDateArr(event.target.value)
                                    
                                }}/> <br/>
                    
                                <input min={dateArr} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => dateDep == null ? e.target.type = 'text' : ''} value={dateDep} class="inp" id={idDateDep ? "invalidClass" : ""} placeholder="Departure date* " onChange={(event) => {
                                    setDateDep(event.target.value)
                                    controlDateDep(event.target.value)
                                   
                                }}/> <br/>
                            </div>
                        </div>
                        {showConfirm && <ModalSuc message="Reservation avec succès" modal={() => setShowConfirm(fabClasses)}/>}
                        {modal && <Modal annuler={annuler} modal={() => setModal(false)} setIsDisabled={() => setIsDisabled(false)} message={message} reserver={reserver} isDisabled={isDisabled} />}
                        <div class="btn">
                            <div class="div-btn" onClick={postFormulaire}>
                                
                                <p>Save</p>
                            </div>
                            {/* <Link to="/enregistrer"> */}
                                <div class="div-btn" onClick={annuler}>
                                    
                                    <p style={{textDecoration : "none"}}>Cancel</p>
                                </div>
                            {/* </Link> */}
                            
                    
                         </div>
                    </form>
                 </div>
            </div>
            </section>
            
        </body>
    )
}

export default Formulaire;