import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.impuesto-renta-sociedades",
  mercado: "ec",
  concepto: "propio",
  slug: "impuesto-renta-sociedades",
  estado: "publicado",
  requiere: {
    "ec.utilidades": "numero",
    "ec.impuesto-renta-sociedades": "numero",
    "ec.impuesto-renta-sociedades-recargo": "numero",
  },
  campos: [
    {
      id: "utilidad",
      tipo: "moneda",
      etiqueta: "Utilidad contable del año",
      ayuda: "La utilidad antes de la participación de los trabajadores y del impuesto a la renta.",
    },
    { id: "noDeducibles", tipo: "moneda", etiqueta: "Gastos no deducibles", min: 0, porDefecto: 0 },
    { id: "exentos", tipo: "moneda", etiqueta: "Ingresos exentos", min: 0, porDefecto: 0 },
    {
      id: "recargo",
      tipo: "si-no",
      etiqueta: "La sociedad no informó su composición societaria o tiene socios en paraísos fiscales",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const participacion = entrada.utilidad > 0 ? redondear(porcentaje(entrada.utilidad, valores["ec.utilidades"])) : 0;
    const base = redondear(Math.max(entrada.utilidad - participacion + entrada.noDeducibles - entrada.exentos, 0));
    const tarifa = valores["ec.impuesto-renta-sociedades"] + (entrada.recargo ? valores["ec.impuesto-renta-sociedades-recargo"] : 0);
    const impuesto = redondear(porcentaje(base, tarifa));
    const observaciones: string[] = [
      "Es una conciliación simplificada. La participación de trabajadores puede cambiar si hay ingresos exentos o gastos atribuibles a ellos.",
      "Si reinviertes utilidades en activos productivos, la ley permite bajar la tarifa sobre lo reinvertido. Eso no está en este cálculo.",
    ];
    if (entrada.recargo) observaciones.push("El recargo se aplica sobre toda la base solo si esos socios tienen el 50 % o más del capital; si no, sobre su parte.");
    return {
      participacion,
      base,
      tarifa,
      impuesto,
      utilidadNeta: redondear(entrada.utilidad - participacion - impuesto),
      observaciones,
    };
  },
  resultado: [
    { clave: "participacion", etiqueta: "Participación de los trabajadores", formato: "moneda" },
    { clave: "base", etiqueta: "Base imponible", formato: "moneda" },
    { clave: "tarifa", etiqueta: "Tarifa del impuesto a la renta", formato: "porcentaje" },
    { clave: "impuesto", etiqueta: "Impuesto a la renta causado", formato: "moneda", destacada: true },
    { clave: "utilidadNeta", etiqueta: "Utilidad después de participación e impuesto", formato: "moneda" },
  ],
});
