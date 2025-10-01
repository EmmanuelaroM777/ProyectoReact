import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ImageBackground
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import axios from 'axios';

export default function Carrusel({ token, onSalir }) {
  const [camisetas, setCamisetas] = useState([]);
  const [msg, setMsg] = useState('');

  // Cargar camisetas al montar
  const cargarCamisetas = useCallback(async () => {
    setMsg('Cargando...');
    try {
      const response = await axios.get('http://localhost:3001/api/camisetas');
      setCamisetas(response.data);
      setMsg('Cargado');
    } catch (error) {
      console.log(error);
      setMsg('Error al cargar camisetas');
      if (Platform.OS === 'web') window.alert('Error al cargar camisetas');
    }
  }, []);

  useEffect(() => {
    cargarCamisetas();
  }, [cargarCamisetas]);

  // Votar por una camiseta
  const votar = async (id, valor) => {
    try {
      const resp = await fetch(`http://localhost:3001/api/camisetas/vota/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (token || '')
        },
        body: JSON.stringify({ calificacion: valor })
      });

      if (resp.ok) {
        await cargarCamisetas();
        if (Platform.OS === 'web') window.alert('¡Voto registrado!');
      } else {
        const error = await resp.json();
        const mensaje = error.error || 'Error al votar';
        if (Platform.OS === 'web') window.alert(mensaje);
      }
    } catch {
      if (Platform.OS === 'web') window.alert('Error de conexión al votar');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Svg height="200" width="200" viewBox="2 2 15 10">
        <Path d="M 5 3 L 5 6 L 3 7 L 1 5" fill={item.mangaIzqColor} stroke="black" />
        <Path d="M 9 5 L 7 3 L 5 3 L 5 6 L 5 12 L 13 12 L 13 6 L 13 3 L 11 3" fill={item.torsoColor} stroke="black" />
        <Path d="M 13 6 L 13 3 L 17 5 L 15 7" fill={item.mangaDerColor} stroke="black" />
        <Path d="M 8 2 L 7 3 L 9 5 L 8 3" fill={item.cuelloDerColor} stroke="black" />
        <Path d="M 10 2 L 11 3 L 9 5 L 10 3 M 1 4" fill={item.cuelloIzqColor} stroke="black" />
      </Svg>

      <Text style={styles.ratingText}>Calificación: {item.calificacion || 0}</Text>

      <TouchableOpacity
        style={styles.voteButton}
        onPress={() => votar(item._id, 1)}
      >
        <Text style={styles.voteText}>Votar +1</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text>Sin camisetas para mostrar</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://picsum.photos/800/1600' }}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Botón de salir en la parte superior */}
        <TouchableOpacity style={styles.exitButton} onPress={onSalir}>
          <Text style={styles.exitText}>Salir</Text>
        </TouchableOpacity>

        <FlatList
          data={camisetas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          ListHeaderComponent={() => (
            <View style={styles.fixedHeader}>
              <Text style={styles.header}>Camisetas</Text>
            </View>
          )}
          stickyHeaderIndices={[0]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => (
            <Text style={styles.footer}>Fin</Text>
          )}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  fixedHeader: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    textDecorationLine: 'underline'
  },
  footer: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  separator: {
    height: 1,
    backgroundColor: 'grey',
    marginHorizontal: 10
  },
  itemContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  voteButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  voteText: { color: '#fff', fontWeight: 'bold' },
  ratingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  exitButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    backgroundColor: 'rgba(255,0,0,0.7)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    zIndex: 2
  },
  exitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
