import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasDelAnio, diasInclusivos } from "../lib/fechas";

export default definirCalculadora({
  id: "es.vacaciones",
  mercado: "es",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "es.vacaciones-dias": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Desde", ayuda: "El 1 de enero, o tu fecha de alta si empezaste este año." },
    { id: "fin", tipo: "fecha", etiqueta: "Hasta", porDefecto: "hoy", ayuda: "El 31 de diciembre, o el último día de contrato si te vas antes." },
    { id: "disfrutados", tipo: "numero", etiqueta: "Días de vacaciones ya disfrutados", min: 0, porDefecto: 0 },
    {
      id: "diasConvenio",
      tipo: "numero",
      etiqueta: "Días naturales de vacaciones al año según tu convenio",
      min: 0,
      requerido: false,
      ayuda: "Si lo dejas vacío, usamos el mínimo legal en días naturales.",
    },
    { id: "bruto", tipo: "moneda", etiqueta: "Sueldo bruto anual", min: 0, porDefecto: 25000 },
    {
      id: "pagas",
      tipo: "opcion",
      etiqueta: "Número de pagas",
      opciones: [
        { valor: "14", etiqueta: "14 pagas" },
        { valor: "12", etiqueta: "12 pagas (prorrateadas)" },
      ],
      porDefecto: "14",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.inicio.slice(0, 4) !== entrada.fin.slice(0, 4)) throw new ErrorEntrada("Las dos fechas tienen que ser del mismo año.", "fin");
    if (entrada.fin < entrada.inicio) throw new ErrorEntrada("La fecha final tiene que ser posterior a la inicial.", "fin");
    const minimo = valores["es.vacaciones-dias"];
    const anuales = Math.max(entrada.diasConvenio ?? minimo, minimo);
    const trabajados = diasInclusivos(entrada.inicio, entrada.fin);
    const generados = redondear((anuales * trabajados) / diasDelAnio(Number(entrada.fin.slice(0, 4))));
    const pendientes = redondear(Math.max(0, generados - entrada.disfrutados));
    const valorDia = redondear(entrada.bruto / (entrada.pagas === "12" ? 12 : 14) / 30);
    const observaciones: string[] = [];
    if (entrada.diasConvenio !== null && entrada.diasConvenio < minimo) observaciones.push("Tu convenio no puede darte menos vacaciones que el mínimo legal: se calcula con el mínimo.");
    if (entrada.disfrutados > generados) observaciones.push("Has disfrutado más días de los que llevas generados.");
    return {
      trabajados,
      generados,
      pendientes,
      valorDia,
      importe: redondear(pendientes * valorDia),
      observaciones,
    };
  },
  resultado: [
    { clave: "pendientes", etiqueta: "Días de vacaciones pendientes", formato: "dias", decimales: 2, destacada: true },
    { clave: "generados", etiqueta: "Días generados en el periodo", formato: "dias", decimales: 2 },
    { clave: "trabajados", etiqueta: "Días del periodo", formato: "dias" },
    { clave: "valorDia", etiqueta: "Valor de un día de vacaciones", formato: "moneda" },
    { clave: "importe", etiqueta: "Importe si se pagan al terminar el contrato", formato: "moneda" },
  ],
});
