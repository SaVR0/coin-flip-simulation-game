export const calcularSiguienteApuesta = (
  estrategia,
  gano,
  apuestaActual,
  apuestaInicial,
  dineroTotalRestante,
) => {
  let siguienteApuesta = apuestaInicial;

  if (estrategia === 1) {
    // ESTRATEGIA 1: Martingala (Doblar al perder, volver a base al ganar)
    siguienteApuesta = gano ? apuestaInicial : apuestaActual * 2;
  } else if (estrategia === 2) {
    // ESTRATEGIA 2: Apuesta Plana (Siempre la misma apuesta)
    siguienteApuesta = apuestaInicial;
  } else if (estrategia === 3) {
    // ESTRATEGIA 3: Anti-Martingala (Doblar al ganar, volver a base al perder)
    siguienteApuesta = gano ? apuestaActual * 2 : apuestaInicial;
  }

  // REGLA UNIVERSAL DE QUIEBRA
  if (siguienteApuesta > dineroTotalRestante) {
    siguienteApuesta = dineroTotalRestante;
  }

  return siguienteApuesta;
};
