import {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function App() {

 // ESTADOS
  const  [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('' );
  const [mensaje, setMensaje] = useState('');
  const [esError, setEsError] = useState(false);
  const [contador, setContador] = useState(0);

  // REGISTRAR
  const registrarPedido = () => {
    const nombreLimpio = cliente.trim();
    const productoLimpio = producto.trim();
    const cantidadTexto = cantidad.trim();
    const precioTexto = precio.trim();

    // VALIDACIONES
    if  (nombreLimpio === '') {
      setEsError(true);
      setMensaje('Debe ingresar el nombre del cliente');
      return;
    }
    if (productoLimpio === '') {
      setEsError(true);
      setMensaje('Debe ingresar un producto');
      return;
    }
    // canrtidad solo digitos rechaza numeros decimales menores a cero o negativos
    if  (!/^\d+$/.test(cantidadTexto) || parseInt(cantidadTexto, 10) <= 0) {
      setEsError(true);
      setMensaje('Ingrese una cantidad valida');
      return;
    }
    // precio solo acepta un numero que no sea negativo
const precioNumero = Number(precioTexto);
    if (precioTexto === '' || isNaN(precioNumero) || precioNumero <= 0) {
    setEsError(true);
    setMensaje('Ingrese un precio unitario valido');
    return;
}
    const cantidadNumero = parseInt(cantidadTexto, 10);
    const total = cantidadNumero * precioNumero;

    setEsError(false);
    setMensaje(
      `Pedido registrado correctamente\n` +
      `Cliente: ${nombreLimpio}\n` +
      `Producto: ${productoLimpio}\n` +
      `Cantidad: ${cantidadNumero}\n` +
      `Total: $${total.toLocaleString('es-CO')}`
    );
    setContador(contador + 1);
  };

  // LIMPIAR ESTE NO TOCA EL CNTADOR
  const limpiarFormulario = () => {
    setCliente('');
    setProducto('');
    setCantidad('');
    setPrecio('');
    setMensaje('');
    setEsError(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}> AgroMosquera</Text>
      <Text style={styles.bienvenida}>
             Bienvenido. Registra aqui los pedidos de tus clientes
      </Text>

      <Text style={styles.etiqueta}>Nombre del cliente</Text>
      <TextInput 
      style={styles.input}
      placeholder='Ej: Tatiana Pardo'
      value={cliente}
      onChangeText={setCliente}
      />

      <Text style={styles.etiqueta}>Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Papa criolla"
        value={producto}
        onChangeText={setProducto}
      />

      <Text style={styles.etiqueta}>Cantidad (unidades)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 5"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />

      <Text style={styles.etiqueta}>Precio unitario ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 3000"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <View style={styles.botones}>
        <Button title="Registrar pedido" color="#2e7d32" onPress={registrarPedido} />
        <View style={{height: 10}} />
        <Button title="Limpiar" color="#757575" onPress={limpiarFormulario} />
      </View>

      {mensaje !== '' && (
        <View style={[styles.caja, esError ? styles.cajaError : styles.cajaOk]}>
          <Text style={esError ? styles.textoError : styles.textoOk}>{mensaje}</Text>
        </View>
      )}

        <Text style={styles.contador}>Pedidos válidos registrados: {contador}</Text>
    </ScrollView>
  );
} 

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f1f8e9',
    padding: 24,
    paddingTop: 60
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center'
  },
  bienvenida: {
    fontSize: 16, 
    textAlign: 'center',
    marginBottom: 20,
    color: '#33691e'
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#aed581',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  botones: {
    marginTop: 20
  },
  caja: {
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
  },
  cajaOk: {
    backgroundColor: '#c8e6c9'
  },
  cajaError: {
    backgroundColor: '#ffcdd2'
  },
  textoOk: {
    color: '#1b5e20',
    fontSize: 15
  },
  textoError: {
    color: '#b71c1c',
    fontSize: 15,
    fontWeight: '600'
  },
  contador: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});