import React, {useEffect, useState} from 'react';
import './modal.css';
import traverser from '../../images/traverser.svg';
import {Link} from 'react-router-dom';
import confirm from "../../images/confirm.png"
import warning from "../../images/warning-.png"

function Modal({annuler , modal, message, reserver, isDisabled, setIsDisabled}){
    var [simpleClose, setSimpleClose] = useState(false);
    var [modalSuccess, setModalSucces] = useState(false)
    var image = warning

    const annulerModal = () => {
        annuler()
        modal()
        setSimpleClose(true)
    }

    const handleTraverser = () => {
        modal();
        setIsDisabled();
        setSimpleClose(true);
        setModalSucces(true)
    }

 
    return(
        <body >
            { <div className = "modal" style={{display : simpleClose ? 'none' : ''}}>
                <div className = "modal-content">
                    {/* <div className="close-btn">
                        <p>
                            <img src={traverser} onClick={ handleTraverser}></img>
                        </p>
                    </div>  */}
                    <div className="title-modal">
                        <img src={image} className="modal-img"/>
                        <h3>Message</h3>
                    </div>
                    <div className='messageContent'>
                        <p>{message}</p>
                    </div>
                    <div className='btn-modal'>
                        {/* <Link to={!isDisabled ? "/reservation" : ""}> */}
                            <div className="btn-p ok" onClick={!isDisabled ? () => reserver() : undefined} style={{ cursor : isDisabled ?  'not-allowed' : 'pointer', opacity : isDisabled ? '0.5' : '1'}}>
                                    <p>YES</p>
                            </div>
                        {/* </Link> */}
                        <div className="btn-p annuler" onClick={!isDisabled ? annulerModal : handleTraverser} /*style={{ cursor : isDisabled ?  'not-allowed' : 'pointer', opacity : isDisabled ? '0.5' : '1' }}*/>
                            <p >CANCEL</p>
                        </div>
                    </div>
                </div>
            </div> }
            
        </body>
        

    )
}

export default Modal