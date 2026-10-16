import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { rupias } from "../lib/impuestos";

export default definirCalculadora({
  id: "in.sukanya-samriddhi-calculator",
  mercado: "in",
  concepto: "propio",
  slug: "sukanya-samriddhi-calculator",
  estado: "publicado",
  requiere: {
    "in.small-savings-rates": "mapa",
    "in.ssy-min-deposit": "numero",
    "in.ssy-max-deposit": "numero",
  },
  campos: [
    { id: "aporte", tipo: "moneda", etiqueta: "Yearly deposit", min: 0, porDefecto: 150000 },
    { id: "edad", tipo: "entero", etiqueta: "Daughter's age when the account is opened", min: 0, max: 9, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    const min = v["in.ssy-min-deposit"];
    const max = v["in.ssy-max-deposit"];
    if (entrada.aporte < min || entrada.aporte > max) throw new ErrorEntrada(`The deposit must be between ${rupias(min)} and ${rupias(max)} a year.`, "aporte");
    if (entrada.edad > 9) throw new ErrorEntrada("The account can be opened only before the girl turns 10.", "edad");
    const tasa = enMapa(v["in.small-savings-rates"], "ssy");
    let saldo = 0;
    for (let anio = 1; anio <= 21; anio++) {
      if (anio <= 15) saldo += entrada.aporte;
      // El esquema redondea el interés acreditado al rupee más cercano (50 paisa o más suben).
      saldo += Math.round((saldo * tasa) / 100);
    }
    const invertido = entrada.aporte * 15;
    return {
      madurez: redondear(saldo),
      invertido,
      interes: redondear(saldo - invertido),
      edadMadurez: entrada.edad + 21,
      tasa,
    };
  },
  resultado: [
    { clave: "madurez", etiqueta: "Maturity value after 21 years", formato: "moneda", destacada: true },
    { clave: "invertido", etiqueta: "Total deposited over 15 years", formato: "moneda" },
    { clave: "interes", etiqueta: "Interest earned", formato: "moneda" },
    { clave: "edadMadurez", etiqueta: "Daughter's age at maturity", formato: "anios" },
    { clave: "tasa", etiqueta: "Rate used", formato: "porcentaje", decimales: 1 },
  ],
});
