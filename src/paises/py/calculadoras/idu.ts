import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.idu",
  mercado: "py",
  concepto: "propio",
  slug: "idu",
  estado: "publicado",
  requiere: {
    "py.idu-tasa": "mapa",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Dividendos o utilidades que se distribuyen", min: 0 },
    { id: "residencia", tipo: "opcion-dato", dato: "py.idu-tasa", etiqueta: "Quién los recibe", porDefecto: "residente" },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["py.idu-tasa"], entrada.residencia);
    const impuesto = redondear(porcentaje(entrada.monto, tasa));
    return {
      tasa,
      impuesto,
      neto: redondear(entrada.monto - impuesto),
      observaciones: [
        "La empresa que paga retiene el IDU y lo declara cada mes.",
        "En una empresa unipersonal, la utilidad se considera distribuida en el cuarto mes después del cierre, salvo que se reinvierta.",
        "Las empresas del IRE SIMPLE y del RESIMPLE no pagan IDU.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa", formato: "porcentaje", decimales: 0 },
    { clave: "impuesto", etiqueta: "IDU a retener", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Lo que cobra el socio o accionista", formato: "moneda" },
  ],
});
