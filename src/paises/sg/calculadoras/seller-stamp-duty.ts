import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { bajarAlDolar } from "../lib/impuestos";

function sumarAnios(fecha: string, anios: number): string {
  const anio = Number(fecha.slice(0, 4)) + anios;
  const resto = fecha.slice(4);
  const bisiesto = (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
  return `${anio}${resto === "-02-29" && !bisiesto ? "-02-28" : resto}`;
}

export default definirCalculadora({
  id: "sg.seller-stamp-duty",
  mercado: "sg",
  concepto: "propio",
  slug: "seller-stamp-duty",
  estado: "publicado",
  requiere: {
    "sg.ssd-2017": "mapa",
    "sg.ssd-2025": "mapa",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Selling price or market value, whichever is higher", min: 0, porDefecto: 1200000 },
    { id: "compra", tipo: "fecha", etiqueta: "Date you bought the home", min: "2017-03-11", porDefecto: "2025-08-01", ayuda: "The date your Option to Purchase was accepted, or the date of the sale and purchase agreement." },
    { id: "venta", tipo: "fecha", etiqueta: "Date you sell", porDefecto: "hoy", ayuda: "The date the buyer's Option to Purchase is accepted." },
  ],
  calcular(entrada, v) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the selling price.", "precio");
    if (entrada.compra < "2017-03-11") throw new ErrorEntrada("This calculator covers homes bought on or after 11 March 2017.", "compra");
    if (entrada.venta < entrada.compra) throw new ErrorEntrada("The selling date has to be after the buying date.", "venta");
    const nuevo = entrada.compra >= "2025-07-04";
    const tabla = nuevo ? v["sg.ssd-2025"] : v["sg.ssd-2017"];
    const plazo = Object.keys(tabla).length;
    let anio = 0;
    for (let n = 1; n <= plazo; n++) {
      if (entrada.venta <= sumarAnios(entrada.compra, n)) {
        anio = n;
        break;
      }
    }
    const tasa = anio ? tabla[String(anio)] : 0;
    const ssd = tasa ? bajarAlDolar((entrada.precio * tasa) / 100) : 0;
    const libre = sumarAnios(entrada.compra, plazo);
    const observaciones = [
      nuevo
        ? `You bought on or after 4 July 2025, so the holding period is ${plazo} years.`
        : `You bought between 11 March 2017 and 3 July 2025, so the holding period is ${plazo} years.`,
      anio ? "If you wait until after the date shown below, no Seller's Stamp Duty is payable." : "You are past the holding period, so no Seller's Stamp Duty is payable.",
    ];
    return { ssd, tasa, anio: anio || null, libre, observaciones };
  },
  resultado: [
    { clave: "ssd", etiqueta: "Seller's Stamp Duty", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "SSD rate", formato: "porcentaje", decimales: 0 },
    { clave: "anio", etiqueta: "Year of ownership you are selling in", formato: "numero", decimales: 0 },
    { clave: "libre", etiqueta: "No SSD if you sell after", formato: "fecha" },
  ],
});
