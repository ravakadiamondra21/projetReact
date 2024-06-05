import success from '../../images/confirm.png'
import {Link} from 'react-router-dom'

function ModalSuccess({message, modal}){
    const handleClose = () => {
        modal()
    }
    return(
        <body >
            <div className = "modal">
                <div className = "modal-content">
                    
                    <div className="title-modal">
                        <img src={success} className="modal-img"/>
                        <h3>Message</h3>
                    </div>
                    <div className='messageContent'>
                        <p>{message}</p>
                    </div>
                    <div className='btn-modal'>
                    <Link to='/reservation'>
                        <div className="btn-p ok" onClick={handleClose}>
                                <p >OK</p> 
                        </div>
                    </Link>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default ModalSuccess