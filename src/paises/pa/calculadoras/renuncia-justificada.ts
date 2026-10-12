import { definirCalculadora, enMapa } from "@/motor/calculo";
import {
  mesesConFraccion,
  mesesEnPeriodoDecimo,
  semanalDeMensual,
  semanasIndemnizacion,
  textoTiempo,
  tiempoTrabajado,
  validarFechas,
  validarIngresoLey44,
} from "../reglas";

export default definirCalculadora({
  id: "pa.renuncia-justificada",
  mercado: "pa",
  concepto: "propio",
  slug: "renuncia-justificada",
  estado: "publicado",
  requiere: {
    "pa.prima-antiguedad-semanas": "numero",
    "pa.indemnizacion-semanas": "mapa",
    "pa.vacaciones-meses": "numero",
    "pa.decimo-divisor": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "El promedio de los últimos seis meses o el del último mes, el que sea más alto.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso", min: "1995-08-14" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "mesesVacaciones",
      tipo: "numero",
      etiqueta: "Meses trabajados desde tus últimas vacaciones",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario, fechaIngreso, fechaSalida } = entrada;
    validarFechas(fechaIngreso, fechaSalida);
    validarIngresoLey44(fechaIngreso);
    const t = tiempoTrabajado(fechaIngreso, fechaSalida);
    const anios = mesesConFraccion(t) / 12;
    const semanal = semanalDeMensual(salario);
    const tabla = valores["pa.indemnizacion-semanas"];
    const prima = redondear(semanal * anios * valores["pa.prima-antiguedad-semanas"]);
    const indemnizacion = redondear(semanal * semanasIndemnizacion(anios, enMapa(tabla, "primeros-10-anios"), enMapa(tabla, "desde-anio-11")));
    const vacaciones = redondear((salario * entrada.mesesVacaciones) / valores["pa.vacaciones-meses"]);
    const decimo = redondear((salario * mesesEnPeriodoDecimo(fechaIngreso, fechaSalida) + vacaciones) / valores["pa.decimo-divisor"]);
    return {
      tiempo: textoTiempo(t),
      prima,
      indemnizacion,
      vacaciones,
      decimo,
      total: redondear(prima + indemnizacion + vacaciones + decimo),
      observaciones: [
        "La indemnización por renuncia justificada se cobra cuando la autoridad de trabajo reconoce la causa (por ejemplo, salarios no pagados, maltrato o engaño sobre las condiciones).",
      ],
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "prima", etiqueta: "Prima de antigüedad", formato: "moneda" },
    { clave: "indemnizacion", etiqueta: "Indemnización", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Vacaciones proporcionales", formato: "moneda" },
    { clave: "decimo", etiqueta: "Décimo tercer mes proporcional", formato: "moneda" },
    { clave: "total", etiqueta: "Total a cobrar (bruto)", formato: "moneda", destacada: true },
  ],
});
