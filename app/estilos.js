// app/estilos.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pantalla: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#2b2b2b", // Fondo oscuro tipo arcade
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 20,
    color: "#ffcc00", // Letras amarillas brillantes
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  contenedorFormulario: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: "#000", // Bordes gruesos tipo cómic/2D
    elevation: 5,
  },
  contenedorJuego: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: "#000",
    alignItems: "center",
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    borderWidth: 3,
    borderColor: "#000",
    backgroundColor: "#f4f4f4",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textoGrande: {
    fontSize: 24,
    marginVertical: 10,
    color: "#d9534f",
    fontWeight: "900",
  },
  filaBotones: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  historialJuego: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
  },
  // --- NUEVOS ESTILOS PARA BOTONES INTERACTIVOS ---
  botonBase: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase", // Letras en mayúscula
  },
  // Colores por defecto de los botones
  botonVerde: { backgroundColor: "#28a745" },
  botonVerdePresionado: { backgroundColor: "#1e7e34" }, // Más oscuro al presionar

  botonAzul: { backgroundColor: "#17a2b8" },
  botonAzulPresionado: { backgroundColor: "#117a8b" },

  botonRojo: { backgroundColor: "#dc3545" },
  botonRojoPresionado: { backgroundColor: "#a71d2a" },

  botonPrimario: { backgroundColor: "#0066cc" },
  botonPrimarioPresionado: { backgroundColor: "#004085" },

  botonInactivo: { backgroundColor: "#ccc" },
});
