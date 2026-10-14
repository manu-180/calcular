import { aplicarEscala, aplicarEscalaMarginal, definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { euros } from "../lib/impuestos";

export default definirCalculadora({
  id: "ie.local-property-tax",
  mercado: "ie",
  concepto: "propio",
  slug: "local-property-tax",
  estado: "publicado",
  requiere: {
    "ie.lpt-bands": "escala",
    "ie.lpt-high-value-rates": "escala",
    "ie.lpt-band-limit": "numero",
    "ie.lpt-local-adjustment": "mapa",
  },
  campos: [
    {
      id: "valor",
      tipo: "moneda",
      etiqueta: "Market value of your home on 1 November 2025",
      min: 0,
      porDefecto: 400000,
    },
    { id: "consejo", tipo: "opcion-dato", dato: "ie.lpt-local-adjustment", etiqueta: "Local authority", porDefecto: "dublin-city" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.valor <= 0) throw new ErrorEntrada("Enter the value of your home.", "valor");
    const limite = v["ie.lpt-band-limit"];
    const bandas = v["ie.lpt-bands"];
    const enBanda = entrada.valor <= limite;
    const basico = redondear(enBanda ? aplicarEscala(bandas, entrada.valor) : aplicarEscalaMarginal(v["ie.lpt-high-value-rates"], entrada.valor));
    let banda: number | null = null;
    if (enBanda) for (let i = 0; i < bandas.length; i++) if (entrada.valor >= bandas[i].desde) banda = i + 1;
    const ajuste = enMapa(v["ie.lpt-local-adjustment"], entrada.consejo);
    const anual = redondear((basico * (100 + ajuste)) / 100);
    const observaciones: string[] = [];
    if (!enBanda) observaciones.push(`Homes worth more than ${euros(limite)} are charged on their declared market value, not on a band.`);
    return { anual, basico, ajuste, banda, observaciones };
  },
  resultado: [
    { clave: "anual", etiqueta: "LPT for 2026", formato: "moneda", destacada: true },
    { clave: "basico", etiqueta: "Basic LPT charge", formato: "moneda" },
    { clave: "ajuste", etiqueta: "Local Adjustment Factor", formato: "porcentaje", decimales: 1 },
    { clave: "banda", etiqueta: "Valuation band", formato: "numero", decimales: 0 },
  ],
});
