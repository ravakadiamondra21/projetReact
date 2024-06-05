import React, {createContext, useState, useContext} from 'react';

const MyContext = createContext();

export const MyProvider = ({children}) => {
    const [mailC, setMailC] = useState('mail')
    const [dateArrC, setDateArrC] = useState(null);
    const [dateDepC, setDateDepC] = useState(null);
    const [idChambreC, setIdChambreC] = useState(0);

    return(
        <MyContext.Provider value = {{mailC, setMailC, dateArrC, setDateArrC, dateDepC, setDateDepC, idChambreC, setIdChambreC}}>
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => useContext(MyContext)