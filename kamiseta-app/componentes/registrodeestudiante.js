import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import axios from 'axios';
import Popup from './popup';

// URL de una imagen aleatoria (puedes cambiarla por un servicio distinto si quieres variar cada vez)
const RANDOM_BG = 'https://picsum.photos/800/1600';

export default function Registro({ muestralogin }) {
  const [nombre, setNombre] = useState('');
  const [email, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const registrar = async () => {
    try {
      await axios.post('http://localhost:3001/api/usuarios', { nombre, email, clave });
      mostrar('Usuario registrado correctamente');
	
       muestralogin();
      
    } catch {
      mostrar('Error al registrar usuario');
    }
  };

  const mostrar = (msg) => {
    if (Platform.OS === 'web') window.alert(msg);
    else { setMensaje(msg); setVisible(true); }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: RANDOM_BG }}
        style={styles.fondo}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.titulo}>Registro</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#eee"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor="#eee"
            value={email}
            onChangeText={setCorreo}
          />
          <TextInput
            style={styles.input}
            placeholder="Clave"
            placeholderTextColor="#eee"
            secureTextEntry
            value={clave}
            onChangeText={setClave}
          />
          <TouchableOpacity style={styles.boton} onPress={registrar}>
            <Text style={styles.textoBoton}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        <Popup visible={visible} msg={mensaje} onClose={() => setVisible(false)} />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    justifyContent: 'center'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)' // oscurece para mejorar contraste del texto
  },
  titulo: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    color: '#fff'
  },
  boton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5
  },
  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
