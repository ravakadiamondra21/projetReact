import React, { useEffect, useState } from 'react'
import './login.css';
import Axios from 'axios';
import {Link} from 'react-router-dom'
import logo from '../images/logo.jpg'

function Login(){
    var [mail, setMail] = useState("");
    var [mdp, setMdp] = useState(null);
    var [erreur, setErreur] = useState('');
    var [showErreur, setShowErreur]= useState(false);
    var [invalidMail, setInvalidMail] = useState(false);
    var [invalidMdp, setInvalidMdp] = useState(false);
    var [link, setLink] = useState(false)
    var [gerant, setGerant] = useState([])
    // var gerant = []
    // var gerantMdp = [];

    const getGerant = () => {
        Axios.get('http://localhost:9000/gerant/getMail')
        .then((res) => {
            // console.log(mail)
            var gerant = []
            for(var i=0; i< res.data.length ; i++){
                gerant = [...gerant, res.data[i]]
                
            }
            setGerant(gerant)
        })
    }

    const validateMail = (mail, mdp) => {
        console.log(gerant)
        var isInside = gerant.some(item => item.mail == mail && item.mdp == mdp)

        if(isInside){
            setLink(true)
        }
        else {
            setInvalidMdp(true)
            setErreur('! incorrect login')
            setLink(false)
        }

        // console.log(gerantMail)
        // console.log(gerantMdp)



        // if(Gmail != mail && mail != null && mdp != null){
        //     setInvalidMail(true)
        //     setErreur("! invalid Email")
        //     setLink(false)
        // }
        // else if(Gmail == mail){
        //     if(Gmdp != mdp && mail != null && mdp != null){
        //         setInvalidMdp(true)
        //         setErreur('! incorrect password')
        //         setLink(false)
                
        //     }
        //     else{
        //         // changePage()
        //         setLink(true)
        //     }
        // }
    }

    const changePage = () => {
        setLink(true)
    }

    const controlMailValue = (mail) => {
        if((!mail.includes('@') && !mail.includes('.')) || mail == ""){
            setInvalidMail(true)
        }
        
         else {
            setInvalidMail(false)
        }
    }

    const controlMpdValue = (mdp) => {
        if(mdp == ""){
            setInvalidMdp(true)
        } else {
            setInvalidMdp(false)
        }
    }

    useEffect(() => {
        getGerant();
        // if(link != false){
            // changePage()
        // }
        
    }, [])

    return(
        <div className="body-login">
            <div className="div-logo">
                    <img src={logo}/>
                </div>
            <div className="div-login">
                
                <div className="login-title">
                    <h3>Login</h3>
                </div>
                <div className="input-login">
                    <form className='login-form'>
                        <input type="text" className={invalidMail ? 'invalid' : ''} placeholder="Your Email*" onChange = {(e) => {
                            setMail(e.target.value)
                            controlMailValue(e.target.value)
                            validateMail(e.target.value, mdp)
                        } } /> <br/>
                        <input type="password" className={invalidMdp ? 'invalid' : ''} placeholder="Your password*" onChange = {(e) => {
                            setMdp(e.target.value)
                            controlMpdValue(e.target.value)
                            validateMail(mail, e.target.value)
                        } }/>
                    </form>
                </div>
                <div className='erreur-login' style={{display : !showErreur ?  "none" : ""}}>
                    <small>{erreur}</small>
                </div>
                <Link to={link ? "/dashboard" : ""}>
                    <div className="btn-login" onClick={() => validateMail(mail, mdp) , () => setShowErreur(true)}>
                        <p className="login-p">CONNECT</p>
                    </div>
                </Link>
                <Link to="/signup">
                <div className="new-user">
                    <small>Create account</small>
                </div>
            </Link>
                
            </div>
            
        </div>

    )
}

export default Login