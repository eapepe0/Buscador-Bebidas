/* eslint-disable react/prop-types */
import { Card, Col, Button } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

/**
* funcion encargada de mostrar una tarjeta con el titulo de la bebida , una imagen , y un boton para abrir un modal
*
* @param {array} bebida array de objetos con un idDrink , strDrink , strDrinkThumb
* @return {component}  una tarjeta creada en bootstrap-react con los datos mostrados
*/

//* en la funcion del boton disparamos 2 funciones una , handleModalClick (muestra u oculta el modal) , handleBebidaIdClick(nos da el id de la bebida que hayamos clickeado)

export default function Bebida({ bebida }) {
    const { handleModalClick, handleBebidaIdClick } = useBebidas() //* extraemos del provider 
    return (
        <Col md={6} lg={3} >
            <Card className="mb-4">
                <Card.Img variant='top' src={bebida.strDrinkThumb} alt={`Imagen de ${bebida.strDrink}`} />
                <Card.Body>
                    <Card.Title>{bebida.strDrink}</Card.Title>
                    <Button variant="danger" className="w-100 text-uppercase mt-2" onClick={() => {
                        handleModalClick()
                        handleBebidaIdClick(parseInt(bebida.idDrink))
                    }}>Ver Receta</Button>
                </Card.Body>
            </Card>
        </Col>

    )
}