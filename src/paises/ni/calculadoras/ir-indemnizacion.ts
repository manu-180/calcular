import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ni.ir-indemnizacion",
  mercado: "ni",
  concepto: "propio",
  slug: "ir-indemnizacion",
  estado: "publicado",
  requiere: {
    "ni.ir-indemnizacion-meses-exentos": "numero",
    "ni.ir-indemnizacion-exencion-adicional": "numero",
    "ni.ir-retencion-indemnizacion": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0, ayuda: "El mismo con el que se calculó la indemnización." },
    { id: "indemnizacion", tipo: "moneda", etiqueta: "Total de indemnizaciones que te pagan", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Poné tu salario mensual.", "salario");
    const topeMeses = redondear(entrada.salario * valores["ni.ir-indemnizacion-meses-exentos"]);
    const exentaMeses = Math.min(entrada.indemnizacion, topeMeses);
    const resto = redondear(entrada.indemnizacion - exentaMeses);
    const exentaAdicional = Math.min(resto, valores["ni.ir-indemnizacion-exencion-adicional"]);
    const gravada = redondear(resto - exentaAdicional);
    const retencion = redondear(porcentaje(gravada, valores["ni.ir-retencion-indemnizacion"]));
    const observaciones =
      gravada === 0
        ? ["Toda tu indemnización está exenta: no te tienen que retener IR."]
        : ["La retención es definitiva: con ella queda pagado el IR de esa parte y no se suma a tu IR anual."];
    return {
      exentaMeses,
      exentaAdicional,
      gravada,
      retencion,
      neto: redondear(entrada.indemnizacion - retencion),
      observaciones,
    };
  },
  resultado: [
    { clave: "exentaMeses", etiqueta: "Exenta por los primeros meses de salario", formato: "moneda" },
    { clave: "exentaAdicional", etiqueta: "Exenta por el monto adicional", formato: "moneda", ocultarSiCero: true },
    { clave: "gravada", etiqueta: "Parte gravada", formato: "moneda" },
    { clave: "retencion", etiqueta: "Retención del IR", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Indemnización que recibís", formato: "moneda" },
  ],
});
