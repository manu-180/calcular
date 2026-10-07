import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, fechaChilena, feriadoEnCalendario } from "../lib/fechas";

export default definirCalculadora({
  id: "cl.vacaciones-proporcionales",
  mercado: "cl",
  concepto: "vacaciones",
  slug: "vacaciones-proporcionales",
  estado: "publicado",
  requiere: {
    "cl.feriado-anual": "numero",
    "cl.feriado-anual-austral": "numero",
  },
  campos: [
    {
      id: "desde",
      tipo: "fecha",
      etiqueta: "Fecha de ingreso o de tu último aniversario en la empresa",
      ayuda: "Si llevas más de un año, usa la fecha en que cumpliste tu último año.",
    },
    { id: "termino", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    {
      id: "diasPendientes",
      tipo: "numero",
      etiqueta: "Días hábiles de vacaciones de años anteriores sin tomar",
      min: 0,
      porDefecto: 0,
    },
    { id: "zonaAustral", tipo: "si-no", etiqueta: "Trabajas en Magallanes, Aysén o Palena", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.termino < entrada.desde) throw new ErrorEntrada("El último día tiene que ser posterior a la fecha de inicio.", "termino");
    const a = antiguedad(entrada.desde, entrada.termino);
    if (a.anios > 0) throw new ErrorEntrada("Pasó más de un año. Usa la fecha de tu último aniversario y suma como pendientes los días del año cumplido.", "desde");
    const feriadoAnual = entrada.zonaAustral ? valores["cl.feriado-anual-austral"] : valores["cl.feriado-anual"];
    const porMes = feriadoAnual / 12;
    const proporcionales = porMes * a.meses + (porMes / 30) * a.dias;
    const habiles = proporcionales + entrada.diasPendientes;
    const calendario = feriadoEnCalendario(entrada.termino, habiles);
    const corridos = habiles + calendario.inhabiles;
    const observaciones = corridos > 0 ? [`Se cuentan desde el día siguiente a tu salida hasta el ${fechaChilena(calendario.hasta)}. Si en ese período cae un festivo en día hábil, se suma un día más por cada uno.`] : [];
    return {
      tiempo: `${a.meses} ${a.meses === 1 ? "mes" : "meses"} y ${a.dias} ${a.dias === 1 ? "día" : "días"}`,
      porMes,
      proporcionales,
      habiles,
      inhabiles: calendario.inhabiles,
      corridos,
      monto: redondear((entrada.sueldo / 30) * corridos),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado desde la última anualidad", formato: "texto" },
    { clave: "porMes", etiqueta: "Días hábiles por mes trabajado", formato: "numero", decimales: 4 },
    { clave: "proporcionales", etiqueta: "Días hábiles proporcionales", formato: "dias", decimales: 2 },
    { clave: "habiles", etiqueta: "Días hábiles a pagar", formato: "dias", decimales: 2 },
    { clave: "inhabiles", etiqueta: "Sábados y domingos que se suman", formato: "dias" },
    { clave: "corridos", etiqueta: "Días corridos a pagar", formato: "dias", decimales: 2 },
    { clave: "monto", etiqueta: "Monto a pagar", formato: "moneda", destacada: true },
  ],
});
