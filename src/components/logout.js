import React, {useState} from 'react';
import './Modals/modal.css';
import {Link} from 'react-router-dom';
import warning from '../images/warning-.png'
import './logout.css'

function Logout({modal}){
 
    const [close, setClose] = useState(false)

    const Close = () => {
        setClose(true)
        modal()
    }

    return(
        <body className="logout-body" >
            <div className = "modal" style={{display : close ? "none" : ""}}> 
                <div className = "modal-content">
                    {/* <div className="close-btn">
                        <p>
                            <img src={traverser} onClick = {handleTraverser}></img>
                        </p>
                    </div> */}
                    <div className="title-modal">
                        <img src={warning} className="modal-img"/>
                        <h3>Message</h3>
                    </div>
                    <div className='messageContent'>
                        <p>Do you want to log out ?</p>
                    </div>
                    <div className='btn-modal'>
                    <Link to="/">
                        <div className="btn-p ok">
                                <p>YES</p>
                        </div>
                    </Link>
                        <div className="btn-p annuler" onClick={Close}> 
                            <p >CANCEL</p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        

    )
}

export default Logout