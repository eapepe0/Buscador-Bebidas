/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from 'axios'
import { createContext, useState, useEffect } from 'react'


const BebidasContext = createContext()

const BebidasProvider = ({ children }) => {
    /**
    *            ESTADOS
    **/
    const [bebidas, setBebidas] = useState([]) //* estado que es un array de bebidas encotradas en obtenerBebidas
    const [modal, setModal] = useState(false) //* estado encargado del estado del modal , si esta activo
    const [bebidaId, setBebidaId] = useState(null) //* estado encargado de tener el Id de la bebida a la cual hacemos click
    const [receta, setReceta] = useState({}) //* estado que es un objeto, en el cual se carga una receta
    const [cargando, setCargando] = useState(false) //* estado encargado de manejar si se esta cargando

    /**
    *            FUNCIONES
    **/

    //* esta funcion llama a la Api y segun el nombre del trago y la categoria , devuelve un array con el resultado , el cual se guarda en bebidas
    const obtenerBebidas = async (datos) => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`
            const { data } = await axios(url) //* 
            setBebidas(data.drinks)
        } catch (error) {
            console.log("Error")
        }
    }

    const obtenerReceta = async () => {
        if (!bebidaId) return //* si bebidaId es null , o sea no se clickeo nada , no hacemos nada

        //* hacemos la llamada a la API y ponemos el resultado en el estado receta
        try {
            const url = `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
            const { data } = await axios(url)
            setReceta(data.drinks[0])

        } catch (error) { //* si hay un error
            console.log(error)
        }
        //* una vez que terminamos el try , ponemos cargando en falso
        finally {
            setCargando(false)
        }
    }

    const handleModalClick = () => {
        setModal(!modal) //* ponemos el estado de verdadero a falso y viceversa
    }

    const handleBebidaIdClick = (id) => {
        setBebidaId(id) //* le cargamos a bebida el Id del elemento donde clickeamos
    }


    /**
    *            EFECTOS
    **/

    useEffect(() => {
        setCargando(true) //* ponemos el estado cargando en verdero
        obtenerReceta() //* obtenemos la receta , dependiendo de que bebida hayamos clickeado
    }, [bebidaId]) //* este efecto se dispara cada vez que el bebidaId cambia , que seria cada vez que se clickea una bebida distinta


    return (
        <BebidasContext.Provider
            value={{
                bebidas, obtenerBebidas, handleModalClick, modal, handleBebidaIdClick, receta, cargando
            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider
}

export default BebidasContext


//* recomendado : crear el archivo en BebidasProvider.jsx en la carpeta context
//* modo de uso : <BebidasProvider>
//*             :    <App/> o un Componente de Alto Orden (HOC)
//*               </BebidasProvider>