import { definirCalculadora, enMapa } from "@/motor/calculo";
import { uvtDelAnio } from "../lib/uvt-anual";

export default definirCalculadora({
  id: "co.debo-declarar-renta",
  mercado: "co",
  concepto: "propio",
  slug: "debo-declarar-renta",
  estado: "publicado",
  requiere: {
    "co.uvt": "numero",
    "co.declarar-topes": "mapa",
  },
  campos: [
    {
      id: "anio",
      tipo: "opcion",
      etiqueta: "Año gravable",
      ayuda: "En 2026 se declara el año gravable 2025.",
      opciones: [
        { valor: "2025", etiqueta: "2025 (se declara en 2026)" },
        { valor: "2026", etiqueta: "2026 (se declara en 2027)" },
      ],
      porDefecto: "2025",
    },
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos brutos del año", ayuda: "Todo lo que recibiste: salario, honorarios, arriendos, intereses.", min: 0, porDefecto: 0 },
    { id: "patrimonio", tipo: "moneda", etiqueta: "Patrimonio bruto al 31 de diciembre", ayuda: "Lo que tenías: casa, carro, ahorros, inversiones, sin restar deudas.", min: 0, porDefecto: 0 },
    { id: "tarjeta", tipo: "moneda", etiqueta: "Consumos con tarjeta de crédito en el año", min: 0, porDefecto: 0 },
    { id: "compras", tipo: "moneda", etiqueta: "Compras y consumos totales del año", min: 0, porDefecto: 0 },
    { id: "consignaciones", tipo: "moneda", etiqueta: "Consignaciones, depósitos e inversiones del año", min: 0, porDefecto: 0 },
    { id: "iva", tipo: "si-no", etiqueta: "Eres responsable de IVA", porDefecto: false },
  ],
  calcular(entrada, valores) {
    const uvt = uvtDelAnio(Number(entrada.anio), "anio");
    const t = valores["co.declarar-topes"];
    const tope = (clave: string) => enMapa(t, clave) * uvt;
    const topeIngresos = tope("ingresos");
    const topePatrimonio = tope("patrimonio");
    const razones: string[] = [];
    if (entrada.iva) razones.push("eres responsable de IVA");
    if (entrada.ingresos >= topeIngresos) razones.push("tus ingresos llegan al tope");
    if (entrada.patrimonio > topePatrimonio) razones.push("tu patrimonio pasa el tope");
    if (entrada.tarjeta > tope("tarjeta")) razones.push("tus consumos con tarjeta pasan el tope");
    if (entrada.compras > tope("compras")) razones.push("tus compras pasan el tope");
    if (entrada.consignaciones > tope("consignaciones")) razones.push("tus consignaciones pasan el tope");
    const obligado = razones.length > 0;
    return {
      uvt,
      topeIngresos,
      topePatrimonio,
      topeMovimientos: tope("consignaciones"),
      resultado: obligado ? "Sí, tienes que declarar renta" : "No estás obligado a declarar",
      motivo: obligado ? razones.join(", ") : null,
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "¿Debes declarar?", formato: "texto", destacada: true },
    { clave: "motivo", etiqueta: "Por qué", formato: "texto" },
    { clave: "uvt", etiqueta: "UVT del año gravable", formato: "moneda", decimales: 0 },
    { clave: "topeIngresos", etiqueta: "Tope de ingresos", formato: "moneda", decimales: 0 },
    { clave: "topePatrimonio", etiqueta: "Tope de patrimonio", formato: "moneda", decimales: 0 },
    { clave: "topeMovimientos", etiqueta: "Tope de tarjeta, compras y consignaciones", formato: "moneda", decimales: 0 },
  ],
});
