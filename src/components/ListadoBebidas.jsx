import { Row } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"
import Bebida from "./Bebida"


/**
* Listado Bebidas , esta encargada de Mostrar una lista de bebidas como si fuera una rejilla en un grid
*
* @param {Array}  bebidas  array de bebidas encotradas en obtenerBebidas
* @return {Component}  el componente mapea  el array de bebidas encontradas y carga cada item en el componente <Bebida/>
*/


export default function ListadoBebidas() {
    const { bebidas } = useBebidas()
    return (
        <Row className="mt-5">
            {
                bebidas.map(bebida => (
                    <Bebida key={bebida.idDrink} bebida={bebida} />
                ))
            }
        </Row>
    )
}