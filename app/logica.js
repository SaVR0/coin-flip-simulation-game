// app/logica.js
export class GeneradorCongruencial {
  constructor(semillaInicial) {
    this.X = semillaInicial;
    this.a = 1664525;
    this.c = 1013904223;
    this.m = 4294967296;
  }

  siguienteNumero() {
    this.X = (this.a * this.X + this.c) % this.m;
    return this.X / this.m;
  }
}
