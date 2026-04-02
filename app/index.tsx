import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./estilos";
import { calcularSiguienteApuesta } from "./estrategias";
import { GeneradorCongruencial } from "./logica";

export default function JuegoDeVolados() {
  const [pantallaActual, setPantallaActual] = useState("config");

  // --- CONFIGURACIÓN DE LA PARTIDA ---
  const [montoBase, setMontoBase] = useState("30");
  const [meta, setMeta] = useState("50");
  const [apuestaInicial, setApuestaInicial] = useState("10");
  const [corridasTotales, setCorridasTotales] = useState("3");
  const [estrategiaElegida, setEstrategiaElegida] = useState(1);

  // --- ESTADOS DEL JUEGO ---
  const [corridaActual, setCorridaActual] = useState(1);
  const [exitos, setExitos] = useState(0);
  const [quiebras, setQuiebras] = useState(0);
  const [dineroDisponible, setDineroDisponible] = useState(0);
  const [apuestaEnMesa, setApuestaEnMesa] = useState(0);
  const [rngMoneda, setRngMoneda] = useState(null);
  const [historialManual, setHistorialManual] = useState([]);

  const musicaFondoRef = useRef(null);
  const [musicaActivada, setMusicaActivada] = useState(true);

  // SISTEMA DE APAGADO
  const alternarMusica = async () => {
    if (musicaFondoRef.current) {
      const nuevoEstado = !musicaActivada;
      // Si el nuevo estado es true, el volumen es 0.2, si es false, es 0 (silencio)
      await musicaFondoRef.current.setVolumeAsync(nuevoEstado ? 0.2 : 0);
      setMusicaActivada(nuevoEstado);
    }
  };

  // ==========================================
  // SISTEMA DE AUDIO
  // ==========================================

  useEffect(() => {
    const configurarAudioPrincipal = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });

        const { sound } = await Audio.Sound.createAsync(
          require("../assets/sonidos/fondo.mp3"),
          { shouldPlay: true, isLooping: true, volume: 0.2 },
        );
        musicaFondoRef.current = sound;
      } catch (error) {
        console.log("Error al iniciar audio global:", error);
      }
    };

    configurarAudioPrincipal();

    return () => {
      if (musicaFondoRef.current) {
        musicaFondoRef.current.unloadAsync();
      }
    };
  }, []);

  const reproducirEfecto = async (tipo) => {
    try {
      let archivo;
      if (tipo === "moneda") archivo = require("../assets/sonidos/moneda.mp3");
      if (tipo === "ganar") archivo = require("../assets/sonidos/ganar.mp3");
      if (tipo === "perder") archivo = require("../assets/sonidos/perder.mp3");

      const { sound } = await Audio.Sound.createAsync(archivo);
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("Error en efecto de sonido:", error);
    }
  };

  // ==========================================
  // INFORMACIÓN DE ESTRATEGIAS
  // ==========================================

  const mostrarInfoEstrategia = (tipo) => {
    let titulo = "";
    let mensaje = "";

    if (tipo === 1) {
      titulo = "TIPO 1: Martingala";
      mensaje =
        "Si pierdes, DOBLAS tu apuesta en la siguiente ronda para recuperar lo perdido. Si ganas, vuelves a la apuesta base.\n\n⚠️ RIESGO ALTO: Una mala racha puede dejarte sin dinero muy rápido.";
    } else if (tipo === 2) {
      titulo = "TIPO 2: Apuesta Plana";
      mensaje =
        "Siempre apuestas exactamente la misma cantidad, sin importar si ganas o pierdes.\n\n🐢 RIESGO BAJO: Es un juego lento y seguro, ideal para no quebrar rápido.";
    } else if (tipo === 3) {
      titulo = "TIPO 3: Anti-Martingala";
      mensaje =
        "Si ganas, DOBLAS tu apuesta para aprovechar tu racha de suerte. Si pierdes, regresas a la apuesta base para proteger tu dinero.\n\n🔥 RIESGO MEDIO: Te hace ganar mucho si tienes varias victorias seguidas.";
    }

    Alert.alert(titulo, mensaje, [
      { text: "Buscar otra", style: "cancel" },
      { text: "¡Seleccionar esta!", onPress: () => setEstrategiaElegida(tipo) },
    ]);
  };

  // ==========================================
  // LÓGICA DEL JUEGO
  // ==========================================

  const iniciarPartida = () => {
    const base = parseFloat(montoBase);
    const inicial = parseFloat(apuestaInicial);
    setDineroDisponible(base - inicial);
    setApuestaEnMesa(inicial);
    setCorridaActual(1);
    setExitos(0);
    setQuiebras(0);
    setHistorialManual([]);
    setRngMoneda(new GeneradorCongruencial(Date.now()));
    setPantallaActual("juego");
  };

  const procesarFinCorrida = (fueExito) => {
    const nuevosExitos = fueExito ? exitos + 1 : exitos;
    const nuevasQuiebras = !fueExito ? quiebras + 1 : quiebras;

    if (corridaActual >= parseInt(corridasTotales)) {
      setExitos(nuevosExitos);
      setQuiebras(nuevasQuiebras);
      setPantallaActual("resultados");
    } else {
      setExitos(nuevosExitos);
      setQuiebras(nuevasQuiebras);
      setCorridaActual(corridaActual + 1);
      const inicial = parseFloat(apuestaInicial);
      setDineroDisponible(parseFloat(montoBase) - inicial);
      setApuestaEnMesa(inicial);
      setHistorialManual([]);
    }
  };

  const jugarRondaManual = async (eleccionJugador) => {
    reproducirEfecto("moneda");
    const numAleatorio = rngMoneda.siguienteNumero();
    const resultadoMoneda = numAleatorio < 0.5 ? "Cara" : "Sello";
    const gano = eleccionJugador === resultadoMoneda;
    let totalDinero = dineroDisponible + apuestaEnMesa;

    if (gano) {
      reproducirEfecto("ganar");
      totalDinero += apuestaEnMesa;
      setHistorialManual([
        `💰 Salió ${resultadoMoneda}. ¡Ganaste $${apuestaEnMesa}!`,
        ...historialManual,
      ]);
      if (totalDinero >= parseFloat(meta)) {
        Alert.alert(
          `¡NIVEL SUPERADO!`,
          `Llegaste a la meta con $${totalDinero}.`,
        );
        procesarFinCorrida(true);
        return;
      }
    } else {
      reproducirEfecto("perder");
      totalDinero -= apuestaEnMesa;
      setHistorialManual([
        `💀 Salió ${resultadoMoneda}. Perdiste $${apuestaEnMesa}.`,
        ...historialManual,
      ]);
      if (totalDinero <= 0) {
        Alert.alert(`GAME OVER`, `Te quedaste sin monedas.`);
        procesarFinCorrida(false);
        return;
      }
    }
    let nuevaApuesta = calcularSiguienteApuesta(
      estrategiaElegida,
      gano,
      apuestaEnMesa,
      parseFloat(apuestaInicial),
      totalDinero,
    );
    setApuestaEnMesa(nuevaApuesta);
    setDineroDisponible(totalDinero - nuevaApuesta);
  };

  const automatizarResto = () => {
    let currentExitos = exitos;
    let currentQuiebras = quiebras;
    let currCorrida = corridaActual;
    let currTotal = dineroDisponible + apuestaEnMesa;
    let currApuesta = apuestaEnMesa;
    const rngAutoJugador = new GeneradorCongruencial(Date.now() + 1234);

    while (currCorrida <= parseInt(corridasTotales)) {
      while (currTotal > 0 && currTotal < parseFloat(meta)) {
        const elJugador =
          rngAutoJugador.siguienteNumero() < 0.5 ? "Cara" : "Sello";
        const elMoneda = rngMoneda.siguienteNumero() < 0.5 ? "Cara" : "Sello";
        const ganoRonda = elJugador === elMoneda;
        if (ganoRonda) currTotal += currApuesta;
        else currTotal -= currApuesta;
        if (currTotal > 0 && currTotal < parseFloat(meta)) {
          currApuesta = calcularSiguienteApuesta(
            estrategiaElegida,
            ganoRonda,
            currApuesta,
            parseFloat(apuestaInicial),
            currTotal,
          );
        }
      }
      if (currTotal >= parseFloat(meta)) currentExitos++;
      else currentQuiebras++;
      currCorrida++;
      currTotal = parseFloat(montoBase);
      currApuesta = parseFloat(apuestaInicial);
    }
    setExitos(currentExitos);
    setQuiebras(currentQuiebras);
    setPantallaActual("resultados");
  };

  // ==========================================
  // RENDERIZADO
  // ==========================================

  if (pantallaActual === "juego") {
    return (
      <View style={styles.pantalla}>
        <View style={styles.contenedorJuego}>
          <Text style={styles.titulo}>
            Ronda {corridaActual}/{corridasTotales}
          </Text>
          <Text style={styles.subtitulo}>
            Estrategia Activa: TIPO {estrategiaElegida}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "#555",
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            Bolsa: ${dineroDisponible}
          </Text>
          <Text style={styles.textoGrande}>En Mesa: ${apuestaEnMesa}</Text>
          <View style={styles.filaBotones}>
            <Pressable
              style={({ pressed }) => [
                styles.botonBase,
                pressed ? styles.botonVerdePresionado : styles.botonVerde,
                { flex: 1, marginRight: 5 },
              ]}
              onPress={() => jugarRondaManual("Cara")}
            >
              <Text style={styles.textoBoton}>CARA</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.botonBase,
                pressed ? styles.botonAzulPresionado : styles.botonAzul,
                { flex: 1, marginLeft: 5 },
              ]}
              onPress={() => jugarRondaManual("Sello")}
            >
              <Text style={styles.textoBoton}>SELLO</Text>
            </Pressable>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.botonBase,
              pressed ? styles.botonPrimarioPresionado : styles.botonPrimario,
              { width: "100%", marginBottom: 10 },
            ]}
            onPress={automatizarResto}
          >
            <Text style={styles.textoBoton}>🤖 Auto-Completar</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.botonBase,
              pressed ? styles.botonRojoPresionado : styles.botonRojo,
              { width: "100%" },
            ]}
            onPress={() => setPantallaActual("config")}
          >
            <Text style={styles.textoBoton}>🚪 Rendirse</Text>
          </Pressable>
          <View style={styles.historialJuego}>
            {historialManual.slice(0, 3).map((item, index) => (
              <Text key={index} style={{ fontSize: 12 }}>
                {item}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  }

  if (pantallaActual === "resultados") {
    const probabilidad = (exitos / parseInt(corridasTotales)) * 100;

    return (
      <ScrollView contentContainerStyle={styles.pantalla}>
        <View style={styles.contenedorFormulario}>
          <Text style={[styles.titulo, { color: "#333" }]}>
            Resultados Finales
          </Text>
          <Text style={[styles.subtitulo, { color: "#333" }]}>
            Estrategia {estrategiaElegida}
          </Text>

          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Intentos totales: {corridasTotales}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "#28a745",
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            ✅ Victorias: {exitos}
          </Text>
          <Text style={{ fontSize: 18, color: "#dc3545", fontWeight: "bold" }}>
            ❌ Derrotas: {quiebras}
          </Text>

          <View
            style={{
              backgroundColor: "#e8f4f8",
              padding: 15,
              borderRadius: 8,
              marginTop: 15,
              alignItems: "center",
              borderWidth: 2,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Tasa de Supervivencia:
            </Text>
            <Text style={{ fontSize: 36, fontWeight: "900", color: "#0066cc" }}>
              {probabilidad.toFixed(2)}%
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Pressable
              style={({ pressed }) => [
                styles.botonBase,
                pressed ? styles.botonPrimarioPresionado : styles.botonPrimario,
              ]}
              onPress={() => setPantallaActual("config")}
            >
              <Text style={styles.textoBoton}>Volver a Jugar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    );
  }

  // PANTALLA PRINCIPAL (Configuración)
  return (
    <ScrollView contentContainerStyle={styles.pantalla}>
      <Text style={styles.titulo}>VOLADOS ARCADE</Text>

      <Pressable
        onPress={alternarMusica}
        style={{
          alignSelf: "center",
          marginBottom: 15,
          padding: 10,
          backgroundColor: "#eee",
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 24 }}>
          {musicaActivada ? "🔊 Música ON" : "🔇 Música OFF"}
        </Text>
      </Pressable>

      <View style={styles.contenedorFormulario}>
        <Text style={styles.label}>Elige tu Estrategia:</Text>
        <View style={styles.filaBotones}>
          <Pressable
            style={[
              styles.botonBase,
              estrategiaElegida === 1
                ? styles.botonPrimario
                : styles.botonInactivo,
              { flex: 1, marginHorizontal: 2 },
            ]}
            onPress={() => mostrarInfoEstrategia(1)}
          >
            <Text style={styles.textoBoton}>TIPO 1</Text>
          </Pressable>

          <Pressable
            style={[
              styles.botonBase,
              estrategiaElegida === 2
                ? styles.botonPrimario
                : styles.botonInactivo,
              { flex: 1, marginHorizontal: 2 },
            ]}
            onPress={() => mostrarInfoEstrategia(2)}
          >
            <Text style={styles.textoBoton}>TIPO 2</Text>
          </Pressable>

          <Pressable
            style={[
              styles.botonBase,
              estrategiaElegida === 3
                ? styles.botonPrimario
                : styles.botonInactivo,
              { flex: 1, marginHorizontal: 2 },
            ]}
            onPress={() => mostrarInfoEstrategia(3)}
          >
            <Text style={styles.textoBoton}>TIPO 3</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Dinero Inicial ($):</Text>
        <TextInput
          style={styles.input}
          value={montoBase}
          onChangeText={setMontoBase}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Meta para ganar ($):</Text>
        <TextInput
          style={styles.input}
          value={meta}
          onChangeText={setMeta}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Apuesta Base ($):</Text>
        <TextInput
          style={styles.input}
          value={apuestaInicial}
          onChangeText={setApuestaInicial}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Oportunidades (Corridas):</Text>
        <TextInput
          style={styles.input}
          value={corridasTotales}
          onChangeText={setCorridasTotales}
          keyboardType="numeric"
        />

        <View style={{ marginTop: 20 }}>
          <Pressable
            style={({ pressed }) => [
              styles.botonBase,
              pressed ? styles.botonVerdePresionado : styles.botonVerde,
            ]}
            onPress={iniciarPartida}
          >
            <Text style={[styles.textoBoton, { fontSize: 20 }]}>
              ▶ INICIAR JUEGO
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
