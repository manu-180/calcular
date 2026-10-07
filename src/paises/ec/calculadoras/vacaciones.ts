import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { textoTiempo, tiempoTrabajado } from "../lib/fechas";
import { diasDelAnio, diasProporcionales } from "../lib/vacaciones";

// Art. 71: se paga la veinticuatroava parte de lo ganado en el año, que por quince días es medio
// sueldo. Un día de vacaciones vale entonces la treintava parte del sueldo mensual.
const DIAS_DEL_MES = 30;

export default definirCalculadora({
  id: "ec.vacaciones",
  mercado: "ec",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "ec.vacaciones-dias": "numero",
    "ec.vacaciones-anios-sin-adicional": "numero",
    "ec.vacaciones-adicionales-max": "numero",
  },
  campos: [
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Sueldo mensual promedio del último año",
      ayuda: "Incluye horas extra y comisiones habituales. Sin décimos, utilidades ni fondo de reserva.",
      min: 0,
    },
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "corte", tipo: "fecha", etiqueta: "Calcular hasta (o último día de trabajo)", porDefecto: "hoy" },
    {
      id: "pendientes",
      tipo: "numero",
      etiqueta: "Días de vacaciones de años anteriores sin tomar",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.corte < entrada.inicio) throw new ErrorEntrada("La fecha final tiene que ser posterior a la fecha en que empezaste.", "corte");
    const reglas = {
      dias: valores["ec.vacaciones-dias"],
      aniosSinAdicional: valores["ec.vacaciones-anios-sin-adicional"],
      adicionalesMax: valores["ec.vacaciones-adicionales-max"],
    };
    const t = tiempoTrabajado(entrada.inicio, entrada.corte);
    const valorDia = entrada.sueldo / DIAS_DEL_MES;
    const proporcionales = diasProporcionales(t, reglas);
    const valorProporcional = redondear(proporcionales * valorDia);
    const valorPendientes = redondear(entrada.pendientes * valorDia);
    const diasAnio = diasDelAnio(t.anios + 1, reglas);
    const observaciones: string[] = [];
    if (t.anios > 0 && t.meses === 0 && t.dias === 0) observaciones.push("Acabas de cumplir un año más. Si no tomaste las vacaciones de ese año, súmalas en los días sin tomar.");
    if (diasAnio > reglas.dias) observaciones.push(`Por tu antigüedad, este año te corresponden ${diasAnio - reglas.dias} días adicionales. El empleador elige si los das de descanso o te los paga.`);
    return {
      antiguedad: textoTiempo(t),
      diasAnio,
      diasProporcionales: redondear(proporcionales),
      valorDia: redondear(valorDia),
      valorAnio: redondear(diasAnio * valorDia),
      valorProporcional,
      valorPendientes,
      total: redondear(valorProporcional + valorPendientes),
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Antigüedad", formato: "texto" },
    { clave: "diasAnio", etiqueta: "Días de vacaciones de este año de servicio", formato: "dias" },
    { clave: "valorAnio", etiqueta: "Valor de un año completo de vacaciones", formato: "moneda" },
    { clave: "valorDia", etiqueta: "Valor de un día de vacaciones", formato: "moneda" },
    { clave: "diasProporcionales", etiqueta: "Días proporcionales acumulados desde tu último aniversario", formato: "dias", decimales: 2 },
    { clave: "valorProporcional", etiqueta: "Vacaciones proporcionales", formato: "moneda" },
    { clave: "valorPendientes", etiqueta: "Vacaciones no tomadas de años anteriores", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a cobrar si sales en esa fecha", formato: "moneda", destacada: true },
  ],
});
