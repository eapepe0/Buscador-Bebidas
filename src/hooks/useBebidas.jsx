import { useContext } from 'react'
import BebidasContext from '../context/BebidasProvider'

const useBebidas = () => {
    return useContext(BebidasContext)
}

export default useBebidas

//* lo usamos importando primero donde lo vayamos a usar :
//*
//* import useBebidas from 'ruta del hook'
//*
//* const { datos que vayamos a sacar del Provider } = useBebidas()
//* crear el useBebidas en la carpeta /hooks