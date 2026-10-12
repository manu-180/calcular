import { aplicarEscala, definirCalculadora } from "@/motor/calculo";
import { nombreMes } from "../lib/indice-precios";

export default definirCalculadora({
  id: "cl.impuesto-global-complementario",
  mercado: "cl",
  concepto: "propio",
  slug: "impuesto-global-complementario",
  estado: "publicado",
  requiere: {
    "cl.global-complementario": "escala",
    "cl.utm": "serie",
  },
  campos: [
    {
      id: "renta",
      tipo: "moneda",
      etiqueta: "Renta anual afecta",
      ayuda: "La suma de tus rentas del año que declaras en la Operación Renta: sueldos, honorarios (después de gastos) y otras.",
      min: 0,
    },
    {
      id: "retenciones",
      tipo: "moneda",
      etiqueta: "Impuestos ya pagados en el año",
      ayuda: "Impuesto único retenido en tus liquidaciones y retenciones de boletas de honorarios. Si no sabes, deja 0.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const utm = valores["cl.utm"];
    const uta = utm.valor * 12;
    const enUta = entrada.renta / uta;
    const impuesto = redondear(aplicarEscala(valores["cl.global-complementario"], enUta) * uta);
    const saldo = impuesto - entrada.retenciones;
    return {
      uta,
      mesUta: nombreMes(utm.fecha),
      rentaEnUta: enUta,
      impuesto,
      tasaEfectiva: entrada.renta > 0 ? (impuesto / entrada.renta) * 100 : 0,
      aPagar: saldo > 0 ? saldo : 0,
      aDevolver: saldo < 0 ? -saldo : 0,
      observaciones: [
        "La Operación Renta usa la UTA de diciembre del año de las rentas, con montos reajustados. Mientras no se publique, usamos la UTA del último mes y el resultado es una estimación.",
      ],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Impuesto global complementario", formato: "moneda", destacada: true },
    { clave: "aPagar", etiqueta: "Te faltaría pagar", formato: "moneda", ocultarSiCero: true },
    { clave: "aDevolver", etiqueta: "Te devolverían", formato: "moneda", ocultarSiCero: true },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva", formato: "porcentaje", decimales: 2 },
    { clave: "rentaEnUta", etiqueta: "Tu renta en UTA", formato: "numero", decimales: 2 },
    { clave: "uta", etiqueta: "Valor de la UTA usada", formato: "moneda" },
    { clave: "mesUta", etiqueta: "UTA de", formato: "texto" },
  ],
});
