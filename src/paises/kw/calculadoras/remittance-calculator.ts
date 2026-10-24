import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { codigo, OPCIONES_DIVISA, REQUIERE_FX, tasa } from "../lib/divisas";

export default definirCalculadora({
  id: "kw.remittance-calculator",
  mercado: "kw",
  concepto: "propio",
  slug: "remittance-calculator",
  estado: "publicado",
  requiere: REQUIERE_FX,
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount you send (KWD)", min: 0, porDefecto: 100 },
    { id: "divisa", tipo: "opcion", etiqueta: "Currency your family receives", opciones: OPCIONES_DIVISA, porDefecto: "inr" },
    { id: "comision", tipo: "moneda", etiqueta: "Transfer fee (KWD)", min: 0, porDefecto: 1 },
    { id: "ofrecida", tipo: "numero", etiqueta: "Rate the exchange company offers (units for one KWD)", min: 0, porDefecto: 0, ayuda: "Leave 0 to use the CBK rate." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("Enter the amount you send.", "importe");
    if (entrada.comision >= entrada.importe) throw new ErrorEntrada("The fee has to be less than the amount you send.", "comision");
    const t = tasa(v, entrada.divisa);
    const oficial = 1 / t.valor;
    const usada = entrada.ofrecida > 0 ? entrada.ofrecida : oficial;
    const recibe = redondear((entrada.importe - entrada.comision) * usada);
    const conOficial = redondear(entrada.importe * oficial);
    return {
      recibe,
      moneda: codigo(entrada.divisa),
      oficial,
      diferencia: redondear(conOficial - recibe),
      costo: ((conOficial - recibe) / conOficial) * 100,
      fecha: t.fecha,
    };
  },
  resultado: [
    { clave: "recibe", etiqueta: "Your family receives", formato: "numero", decimales: 2, destacada: true },
    { clave: "moneda", etiqueta: "Currency", formato: "texto" },
    { clave: "oficial", etiqueta: "CBK rate (units for one KWD)", formato: "numero", decimales: 4 },
    { clave: "diferencia", etiqueta: "Less than at the CBK rate with no fee", formato: "numero", decimales: 2 },
    { clave: "costo", etiqueta: "Total cost of the transfer", formato: "porcentaje", decimales: 2 },
    { clave: "fecha", etiqueta: "CBK rate date", formato: "fecha" },
  ],
});
