import React, { Component } from 'react';

// Importación de los componentes necesarios para cada ruta
import Login from "./login"; // Componente de inicio de sesión
import Registro from "./registrodeestudiante"; // Componente de registro de estudiantes

import Carrusel from "./carrusel.js"; // Componente de carrusel



// Definición del componente 'menu' que extiende de Component
class menu extends Component {
    // Estado inicial del componente
    state = {
        // Estados para controlar qué componente se muestra en la interfaz
        muestraLogin: true, // Mostrar componente de inicio de sesión por defecto
        muestraregistro: false, // No mostrar componente de registro al inicio
        muestracamiseta: false, // No mostrar componente de diseño de camiseta al inicio
        muestracarrusel: false, // No mostrar componente de carrusel al inicio
        muestraslider: false, // No mostrar componente de slider al inicio
        configuser: false, // No mostrar componente de configuración de usuario al inicio
        // Datos del estudiante logueado (vacíos por defecto)
        estudiantelog: {
            CARNET: "",
            CORREO: "",
            NOMBRE_COMPLETO: "",
            ESPECIALIDAD: "",
            SECCION: "",
            FOTO: "",
            CLAVE: ""
        },
        token:""
    }

    // Método de renderizado del componente
    render() {
        // Renderizar componente de inicio de sesión si 'muestraLogin' es true
        if (this.state.muestraLogin) {
            return (
                <Login
                onLoginSuccess={(token) => {
                console.log('Token recibido:', token);
                this.state.token = token
                // aquí puedes guardarlo en AsyncStorage o en el estado global
                this.navegaracarrusel(); // o la acción que desees
                }}
                onIrRegistro={ this.navegararegistro}
                />
            );
        }

        // Renderizar componente de registro si 'muestraregistro' es true
        if (this.state.muestraregistro) {
            return (
                <Registro muestralogin={this.navegararlogin} /> // Propiedad para mostrar componente de inicio de sesión
            );
        }

     

        // Renderizar componente de carrusel si 'muestracarrusel' es true
        if (this.state.muestracarrusel) {
            return (
                <Carrusel
                    token = {this.state.token}
                    onSalir={this.salir}
                />
            );
        }

       
    }

    // Método para navegar al componente de registro
    navegararegistro = () => {
        this.setState({ 
            muestraLogin: false, // Ocultar componente de inicio de sesión
            muestraregistro: true, // Mostrar componente de registro
        });
    }; 

    // Método para navegar al componente de inicio de sesión
    navegararlogin = () => {
        this.setState({ 
            muestraLogin: true, // Mostrar componente de inicio de sesión
            muestraregistro: false, // Ocultar componente de registro
        });
    }; 

    // Método para salir de cualquier componente y volver al inicio de sesión
    salir = () => {
        this.setState({ 
            token: "",
            muestraLogin: true, // Mostrar componente de inicio de sesión
            muestraregistro: false, // Ocultar componente de registro
            muestracamiseta: false, // Ocultar componente de diseño de camiseta
            muestracarrusel: false, // Ocultar componente de carrusel
            muestraslider: false, // Ocultar componente de slider
            configuser: false, // Ocultar componente de configuración de usuario
        });
    }; 

   
    // Método para navegar al componente de carrusel
    navegaracarrusel = () => {
        this.setState({ 
            muestraLogin: false, // Ocultar componente de inicio de sesión
            muestraregistro: false, // Ocultar componente de registro
            muestracamiseta: false, // Ocultar componente de diseño de camiseta
            muestracarrusel: true, // Mostrar componente de carrusel
        });
    }; 

  
}

// Exportar el componente 'menu' para su uso en otros archivos
export default menu;
