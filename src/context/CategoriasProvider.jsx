/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
const CategoriasContext = createContext()

const CategoriasProvider = ({ children }) => {

    /**
    *            ESTADOS
    **/

    const [categorias, setCategorias] = useState([]) //* estado que es un array , aca guardamos las categorias que nos va a devolver el Api

    /**
    *            FUNCIONES
    **/
    //* esta funcion hace una llamada a la api , devuelve una serie de categorias las cual se guardan en el estado categorias
    const obtenerCategorias = async () => {
        try {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
            const { data } = await axios(url) //* import axios
            setCategorias(data.drinks)
        } catch (error) {
            console.log("Error")
        }
    }

    /**
    *            EFECTOS
    **/

    useEffect(() => {
        obtenerCategorias()
    }, [])
    //* cada vez que carga el componente se llama la funcion obtenerCategorias


    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {children}
        </CategoriasContext.Provider>
    )
}

export {
    CategoriasProvider
}

export default CategoriasContext


//* recomendado : crear el archivo en CategoriasProvider.jsx en la carpeta context
//* modo de uso : <CategoriasProvider>
//*             :    <App/> o un Componente de Alto Orden (HOC)
//*               </CategoriasProvider>

