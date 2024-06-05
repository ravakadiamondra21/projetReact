import React, {useEffect, useState} from 'react';
import emailjs from '@emailjs/browser';
import './email.css';


    const sendEmail = (mail) => {
        

        emailjs.send('service_wadfshj', 'template_783n524', {
            to_mail : mail,
            message : 'Votre réservation chez Golden Hotel a été bien enregistré.'
        } ,'v0z74wBSEx0tiUr0M')
        .then((result) => {
            console.log(result.text)
        }, (err) => {
            console.log(err.text)
        })
    };

export default sendEmail
    
