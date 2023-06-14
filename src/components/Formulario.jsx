import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import useCategorias from "../hooks/useCategorias";
import { useState } from "react";
import useBebidas from "../hooks/useBebidas";

/**
* descripcion de la funcion
*
* @param {tipo de parametro}  nombre del parametro  descripcion del parametro
* @param {tipo de parametro}  nombre del parametro  descripcion del parametro
* @return {que tipo retorna}  descripcion del retorno
*/
export default function Formulario() {

    /**
    *             HOOKS
    **/

    const { categorias } = useCategorias() //* extraemos categorias (estado que es un array de objetos con todas las categorias de bebidas)
    const { obtenerBebidas } = useBebidas() //* extraemos la funcion obtenerBebidas ( hace una llamada al API , y devuelve las bebidas dependiendo del nombre y categoria )


    /**
    *        ESTADOS
    **/

    const [busqueda, setBusqueda] = useState({
        nombre: '',
        categoria: ''
    }) //* estado que es un objeto , (aca van los datos ingresados en el formulario , para que despues sean enviados a la API mediante obtenerBebidas)

    const [alerta, setAlerta] = useState('') //* estado que maneja los Errores del Formulario

    /**
    *      FUNCIONES   
    **/

    //* esta funcion se llama cuando apretamos Buscar Bebidas hacemos el submit

    const handleSubmit = (e) => {

        e.preventDefault() //* prevenimos que se actualice la pagina

        if (Object.values(busqueda).includes('')) { //* si el objeto busqueda esta vacio en alguno de sus elementos
            setAlerta('Todos los campos son obligatorios') //* nos pone el estado alerta con un mensaje
            return  //* y sale
        }

        //* en caso contrario que el objeto busqueda este completo
        setAlerta('') //* borramos el alerta por si quedo el estado lleno

        obtenerBebidas(busqueda) //* llamamos a la funcion que se escarga de buscar las bebidas dependiendo del nombre y la categoria
    }

    return (

        <Form onSubmit={handleSubmit}>
            {alerta && <Alert variant="danger" className="text-center">{alerta}</Alert>}
            {/* si alerta es true , mostramos el alerta */}
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="nombre">Nombre Bebida</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ej : Tequila , Vodka , etc."
                            id="nombre"
                            name="nombre"
                            value={busqueda.nombre}
                            onChange={e => setBusqueda({ ...busqueda, [e.target.name]: e.target.value })}
                        /*  ponemos en el estado busqueda , el spread de lo que ya habiamos ingresado y lo ingresado en este campo*/
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="categoria" name='categoria'>Categoria Bebida</Form.Label>
                        <Form.Select id='categoria'
                            name="categoria"
                            value={busqueda.categoria}
                            onChange={e => setBusqueda({ ...busqueda, [e.target.name]: e.target.value })}
                        /*  ponemos en el estado busqueda , el spread de lo que ya habiamos ingresado y lo ingresado en este campo*/
                        >
                            <option value="">-- Selecciona Categoria --</option>
                            {/* mapeamos las categorias que sacamos con el hook useCategorias , llenamos el option con esas categorias */}
                            {
                                categorias.map((categoria) => (

                                    <option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory} </option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-end">
                <Col md={3}>
                    <Button variant='danger' className="text-uppercase w-100" type="submit"> {/* boton que dispara la funcion handleSubmit */}
                        Buscar Bebidas
                    </Button>
                </Col>
            </Row>
        </Form >
    );
}
