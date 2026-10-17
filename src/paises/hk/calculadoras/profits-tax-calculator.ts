import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { etiquetaAnio } from "../lib/impuestos";

export default definirCalculadora({
  id: "hk.profits-tax-calculator",
  mercado: "hk",
  concepto: "propio",
  slug: "profits-tax-calculator",
  estado: "publicado",
  requiere: {
    "hk.profits-tax-corporations": "escala",
    "hk.profits-tax-unincorporated": "escala",
    "hk.basic-allowance": "mapa",
    "hk.tax-reduction-cap": "mapa",
  },
  campos: [
    { id: "anio", tipo: "opcion-dato", etiqueta: "Year of assessment", dato: "hk.basic-allowance", porDefecto: "2026-27" },
    { id: "beneficio", tipo: "moneda", etiqueta: "Assessable profits", min: 0, porDefecto: 3000000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of business",
      opciones: [
        { valor: "corporation", etiqueta: "Corporation (limited company)" },
        { valor: "unincorporated", etiqueta: "Unincorporated (sole proprietor or partnership)" },
      ],
      porDefecto: "corporation",
    },
    { id: "dosTramos", tipo: "si-no", etiqueta: "Use the two-tiered rates", ayuda: "Turn this off to charge the single rate on all profits.", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.beneficio <= 0) throw new ErrorEntrada("Enter the assessable profits.", "beneficio");
    const escala = entrada.tipo === "corporation" ? v["hk.profits-tax-corporations"] : v["hk.profits-tax-unincorporated"];
    const tasaUnica = escala[escala.length - 1].tasa;
    const unica = redondear(porcentaje(entrada.beneficio, tasaUnica));
    const impuesto = entrada.dosTramos ? redondear(aplicarEscalaMarginal(escala, entrada.beneficio)) : unica;
    const topeReduccion = v["hk.tax-reduction-cap"][entrada.anio] ?? 0;
    const reduccion = Math.min(impuesto, topeReduccion);
    const aPagar = redondear(impuesto - reduccion);
    const observaciones: string[] = [];
    if (topeReduccion > 0) observaciones.push(`The ${etiquetaAnio(entrada.anio)} profits tax is reduced by 100%, up to a cap for each business.`);
    return {
      aPagar,
      impuesto,
      reduccion,
      ahorro: entrada.dosTramos ? redondear(unica - impuesto) : 0,
      tasaEfectiva: (aPagar / entrada.beneficio) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "aPagar", etiqueta: "Profits tax payable", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Tax before any reduction", formato: "moneda" },
    { clave: "reduccion", etiqueta: "One-off tax reduction", formato: "moneda", ocultarSiCero: true },
    { clave: "ahorro", etiqueta: "Saving from the two-tiered rates", formato: "moneda", ocultarSiCero: true },
    { clave: "tasaEfectiva", etiqueta: "Effective rate", formato: "porcentaje", decimales: 2 },
  ],
});
