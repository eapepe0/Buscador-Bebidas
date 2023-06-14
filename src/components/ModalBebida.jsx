import { Modal, Image } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

/**
* ModalBebida : Muestra un modal , con una imagen , y la receta de la bebida
*
* @param {State} modal estado encargado de si el modal esta activo o no
* @param {State} cargando estado encargado de saber si estamos cargado los datos en el modal
* @param {Function} handleModalClick funcion que cambia el estado de modal , si esta en true lo pone en false y viceversa
* @param {Object} receta objeto en el cual se carga la receta del trago al cual le hicimos click
* @return {Component}  Si cargando es true , muestra el modal , si modal es true se muestra 
*/
export default function ModalBebida() {

    /**
    *             HOOKS
    **/
    const { modal, handleModalClick, receta, cargando } = useBebidas() //* extraemos del hook useBebidas

    /**
    *            FUNCIONES
    **/

    //* funcion encargada de mostrar los clientes , la api devuelve los ingredientes y las medidas en 2 partes distintas
    //* con esta funcion nos encargamos de juntarlos y convertirlos en un <li></li> (list item)

    const mostrarIngredientes = () => {
        let ingredientes = [] //* array vacio

        //* hacemos un for hasta 15 que es la cantidad maxima de ingredientes y medidas que devuelve la Api
        for (let i = 0; i < 16; i++) {

            //* si existe un ingrediente en esta posicion
            if (receta[`strIngredient${i}`]) {
                //* hacemos un push hacia el array de un elemento <li> junto con el ingrediente y la medida</li>
                ingredientes.push(
                    <li key={receta.idDrink}>{receta[`strIngredient${i}`]}     {receta[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes //* devolvemos el array
    }

    return (
        /* Si cargando es true , no renderiza  . Si cargando es false  se ejecuta el codigo*/
        !cargando && (
            <Modal show={modal} onHide={handleModalClick}>
                <Image src={receta.strDrinkThumb} alt={`Imagen receta ${receta.strDrink}`} />
                <Modal.Header>
                    <Modal.Title>{receta.strDrink}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-3">
                        <h2 className="mb-4">Instrucciones</h2>
                        {receta.strInstructions}
                        <h2 className="my-4">Ingredientes y Cantidad</h2>
                        {mostrarIngredientes()}
                    </div>
                </Modal.Body>
            </Modal >
        )
    )
}