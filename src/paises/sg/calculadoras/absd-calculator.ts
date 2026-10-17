import { aplicarEscalaMarginal, definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { bajarAlDolar } from "../lib/impuestos";

export default definirCalculadora({
  id: "sg.absd-calculator",
  mercado: "sg",
  concepto: "propio",
  slug: "absd-calculator",
  estado: "publicado",
  requiere: {
    "sg.absd": "mapa",
    "sg.bsd-residencial": "escala",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Purchase price or market value, whichever is higher", min: 0, porDefecto: 1500000 },
    { id: "perfil", tipo: "opcion-dato", dato: "sg.absd", etiqueta: "Buyer profile", porDefecto: "sc-2", ayuda: "If you buy with someone of a different profile, the highest rate applies to the whole price." },
  ],
  calcular(entrada, v) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the price of the home.", "precio");
    const tasa = enMapa(v["sg.absd"], entrada.perfil);
    const absd = tasa > 0 ? Math.max(1, bajarAlDolar((entrada.precio * tasa) / 100)) : 0;
    const bsd = Math.max(1, bajarAlDolar(aplicarEscalaMarginal(v["sg.bsd-residencial"], entrada.precio)));
    const observaciones = tasa === 0 ? ["No ABSD applies to this purchase. You still pay Buyer's Stamp Duty."] : [];
    return { absd, tasa, bsd, total: absd + bsd, efectiva: ((absd + bsd) / entrada.precio) * 100, observaciones };
  },
  resultado: [
    { clave: "absd", etiqueta: "Additional Buyer's Stamp Duty", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "ABSD rate", formato: "porcentaje", decimales: 0 },
    { clave: "bsd", etiqueta: "Buyer's Stamp Duty", formato: "moneda" },
    { clave: "total", etiqueta: "Total stamp duty", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Total as a share of the price", formato: "porcentaje", decimales: 2 },
  ],
});
