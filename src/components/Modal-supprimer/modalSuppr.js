import React, {useState} from 'react';
import '../Modals/modal.css';
import traverser from '../../images/traverser.svg';
import {Link} from 'react-router-dom';
import warning from '../../images/error.png'

function ModalSuppr({modal , annuler}){
    var [simpleClose, setSimpleClose] = useState(false);

    const handleTraverser = () => {
        setSimpleClose(true);
        modal()
    }

    const handleAnnuler = () => {
        annuler();
        modal();
        setSimpleClose(true)
    }
 
    return(
        <body >
            <div className = "modal" style = {{display : simpleClose ? 'none' : ''}}>
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
                        <p>Do you want to drop thisreservation ?</p>
                    </div>
                    <div className='btn-modal'>
                    <Link to="/reservation">
                        <div className="btn-p ok" onClick={handleAnnuler}>
                                <p>YES</p>
                        </div>
                    </Link>
                        <div className="btn-p annuler" onClick = {handleTraverser}>
                            <p >NO</p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        

    )
}

export default ModalSuppr