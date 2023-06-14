import { useContext } from 'react'
import CategoriasContext from '../context/CategoriasProvider'

const useCategorias = () => {
    return useContext(CategoriasContext)
}

export default useCategorias

//* lo usamos importando primero donde lo vayamos a usar :
//*
//* import useCategorias from 'ruta del hook'
//*
//* const { datos que vayamos a sacar del Provider } = useCategorias()
//* crear el useCategorias en la carpeta /hooks