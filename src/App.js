import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap'; // Importa componentes de Bootstrap
import './App.css';

function App() {
  const [carne, setCarne] = useState('');
  const [enunciado, setEnunciado] = useState('');
  const [tituloEnunciado, setTituloEnunciado] = useState('');

  const generarEnunciado = async () => {
    try {
      const response = await axios.post('https://final-taller-back-cr9rw5dqs-jbraulio85.vercel.app/generarEnunciado', { carne });
      console.log(response.data)
      if(response.data.success){
        Swal.fire({
          title: 'Enuncidado generado',
          text: 'El enunciado se ha generado con éxito!!!',
          icon: 'success',
          timer: 2000
        });
        setEnunciado(response.data.enunciado.descripcionEnunciado || '');
        setTituloEnunciado(response.data.enunciado.nombreEnunciado || '');
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al generar el enunciado',
          icon: 'error',
          timer: 4000
        });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      if(error.response.status === 500){
        Swal.fire({
          title: 'Error!!!',
          text: 'Error al generar el enunciado el carné ya tiene un enunciado asignado, intenta con otro',
          icon: 'error',
        });
      }else if(error.response.status === 400){
        Swal.fire({
          title: 'Error!!!',
          text: 'El carné no tiene el formato correcto, ingresa un carné correcto',
          icon: 'error',
        });
      }
    }
  };

  return (
    <div  className="App" style={{ backgroundColor: '#A7A6A7', height: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div >
        <div>
          <img
            src="https://i.imgur.com/SGmu8qG.png"
            alt="Icono"
            style={{
              width: '250px',
              height: '300px',
              position: 'relative',
              opacity: '1', // Ajusta la opacidad para que sea una marca de agua
            }}
          />
        </div>

        <label
          className="display-2"
          style={{
            fontWeight: 'bold ',
            paddingBottom: '30px',
          }}
        >
          ¿Cómo está tu suerte hoy?
        </label>

        <Form>
          <div style={{ float: 'left' }}>
            <Form.Group controlId="txtTituloEnunciado">
              <FormControl
                type="text"
                placeholder="TÍTULO DEL ENUNCIADO"
                readOnly
                value={tituloEnunciado}
                onChange={(e) => setTituloEnunciado(e.target.value)}
                style={{
                  width: '499px',
                  height: '60px',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  margin: '20px',
                  textAlign: 'center',
                  color: '#010342',
                }}
              />
            </Form.Group>
            <Form.Group controlId="dspEnunciado">
              <FormControl
                as="textarea"
                placeholder="DESCRIPCIÓN DEL ENUNCIADO"
                readOnly
                wrap="true"
                value={enunciado}
                onChange={(e) => setEnunciado(e.target.value)}
                style={{
                  width: '499px',
                  height: '296px',
                  fontSize: '18px',
                  margin: '20px',
                  fontWeight: 'bold',
                  textAlign: 'justify',
                  color: '#010342',
                }}
              />
            </Form.Group>
          </div>
          <div style={{ float: 'right' }}>
            <Form.Group controlId="txtCarne">
              <FormControl
                type="text"
                placeholder="Ingresa tu # de Carné"
                value={carne}
                onChange={(e) => setCarne(e.target.value)}
                style={{
                  width: '200px',
                  height: '39px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  float: 'right',
                  margin: '20px',
                  color: '#010342',
                }}
              />
            </Form.Group>
            <FormGroup>
              <Button
                id="btnGenerar"
                variant="light"
                type='button'
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  margin: '20px',
                  marginRight: '20px',
                  color: '#010342',
                }}
                onClick={generarEnunciado}
              >
                Generar Enunciado
              </Button>
            </FormGroup>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default App;
