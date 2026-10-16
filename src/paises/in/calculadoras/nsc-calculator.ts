import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.nsc-calculator",
  mercado: "in",
  concepto: "propio",
  slug: "nsc-calculator",
  estado: "publicado",
  requiere: {
    "in.small-savings-rates": "mapa",
  },
  campos: [{ id: "monto", tipo: "moneda", etiqueta: "Amount invested", min: 0, porDefecto: 100000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount you invest.", "monto");
    const tasa = enMapa(v["in.small-savings-rates"], "nsc");
    let saldo = entrada.monto;
    const porAnio: number[] = [];
    for (let a = 0; a < 5; a++) {
      const interes = (saldo * tasa) / 100;
      porAnio.push(interes);
      saldo += interes;
    }
    return {
      madurez: redondear(saldo),
      interes: redondear(saldo - entrada.monto),
      anio1: redondear(porAnio[0]),
      anio5: redondear(porAnio[4]),
      tasa,
    };
  },
  resultado: [
    { clave: "madurez", etiqueta: "Maturity value after 5 years", formato: "moneda", destacada: true },
    { clave: "interes", etiqueta: "Total interest", formato: "moneda" },
    { clave: "anio1", etiqueta: "Interest in year 1", formato: "moneda" },
    { clave: "anio5", etiqueta: "Interest in year 5", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate used", formato: "porcentaje", decimales: 1 },
  ],
});
