import logo from '../../images/logo.jpg'
import './signup.css'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';

function Signup(){

    var [mail, setMail] = useState(null);
    var [mdp, setMdp] = useState(null);
    var [confMdp, setConfMdp] = useState(null);
    var [erreur, setErreur] = useState(null);
    var [showErreur, setShowErreur] = useState(null);
    var [link, setLink] = useState(null);
    var [letPost, setLetPost] = useState(false);
    var [allMail, setAllMail] = useState([]);

    const getAllMail = () => {
        Axios.get('http://localhost:9000/gerant/getAllMail')
        .then((res) => {
            var allMail = [];
            for(var i=0; i<res.data.length; i++) {
                allMail = [...allMail, res.data[i].mail]
            }
            setAllMail(allMail)
            console.log(allMail)
        })
    }

    const createUser = () => {
        
        console.log(letPost)
        Axios.post('http://localhost:9000/gerant/createUser', {
            mail : mail,
            mdp : mdp
        }
        )
    }

    const postUser = () => {
        console.log("mande post")
        
        var isInside = allMail.some(item => item == mail)
        if(mail == null || mdp == null || confMdp == null){
            setErreur("! fill all informations")
            setLetPost(false)
            // setShowErreur(true)
        }
        else if(isInside) {
            setErreur("! this mail is already used")
            setLetPost(false)
        }
        else if(mdp != confMdp) {
            setErreur("! incorrect password")
            setLetPost(false)
            // setShowErreur(true)
        }
        else {
            setLetPost(true)
            setLink("/")
            // createUser()
        }
    }

    const handleErreur = () => {
        setShowErreur(true)
        if(letPost == true) {
            createUser()
        }
    }

    useEffect(() => {
        getAllMail()
        postUser()
    }, [mail, mdp, confMdp])

    return(
        <div className="body-login">
            <div className="div-logo">
                    <img src={logo}/>
                </div>
            <div className="div-login signup">
                
                <div className="login-title">
                    <h3>Create account</h3>
                </div>
                <div className="input-login">
                    <form className='login-form'>
                        <input type="text" placeholder="Your Email*" onChange={(e) => {
                            setMail(e.target.value)
                            // postUser()
                        }
                        }/> <br/>
                        <input type="password" placeholder="Your password*" onChange={(e) =>
                        {
                            // postUser()
                            setMdp(e.target.value)
                        }
                        }/> <br/>
                        <input type="password" placeholder="Confirm password*" onChange={(e) => {
                            // postUser()
                            setConfMdp(e.target.value)
                        }
                        }/>
                    </form>
                </div>
                <div className='erreur-login' style={{display : !showErreur ? 'none' : ''}}>
                    <small>{erreur}</small>
                </div>
                <Link to={link}>
                    <div className="btn-login" onClick={() => {postUser() ; handleErreur()}}>
                        <p className="login-p">CREATE</p>
                    </div>
                </Link>
                
            </div>
            
        </div>

    )
}

export default Signup