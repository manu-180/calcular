import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import {
  INICIO_ESCALA_B,
  INICIO_LEY_44,
  mesesConFraccion,
  semanalDeMensual,
  semanasEscalaB,
  semanasIndemnizacion,
  tiempoTrabajado,
  validarFechas,
} from "../reglas";

export default definirCalculadora({
  id: "pa.salarios-caidos",
  mercado: "pa",
  concepto: "propio",
  slug: "salarios-caidos",
  estado: "publicado",
  requiere: {
    "pa.salarios-caidos-meses": "mapa",
    "pa.recargo-no-reintegro": "mapa",
    "pa.indemnizacion-semanas": "mapa",
    "pa.indemnizacion-escala-b": "mapa",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "El promedio de los últimos seis meses o el del último mes, el que sea más alto.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso", min: "1972-04-02" },
    { id: "fechaDespido", tipo: "fecha", etiqueta: "Fecha del despido" },
    { id: "fechaSentencia", tipo: "fecha", etiqueta: "Fecha de la sentencia (o de hoy)", porDefecto: "hoy" },
    {
      id: "resultado",
      tipo: "opcion",
      etiqueta: "Qué decidió la sentencia",
      opciones: [
        { valor: "reintegro", etiqueta: "Me reintegran al trabajo" },
        { valor: "indemnizacion", etiqueta: "Solicité la indemnización" },
        { valor: "no-reintegra", etiqueta: "Ordenaron el reintegro, pero el empleador prefiere pagar" },
      ],
      porDefecto: "indemnizacion",
    },
    {
      id: "fondoAlDia",
      tipo: "si-no",
      etiqueta: "El empleador está al día en el fondo de cesantía",
      porDefecto: true,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario, fechaIngreso, fechaDespido, fechaSentencia } = entrada;
    validarFechas(fechaIngreso, fechaDespido);
    if (fechaSentencia < fechaDespido) throw new ErrorEntrada("La fecha de la sentencia tiene que ser posterior al despido.", "fechaSentencia");
    if (fechaIngreso < INICIO_ESCALA_B) throw new ErrorEntrada("Si empezaste antes del 2 de abril de 1972, el cálculo lleva otra escala. Esta calculadora no la cubre.", "fechaIngreso");
    const antes = fechaIngreso < INICIO_LEY_44;
    const tope = enMapa(valores["pa.salarios-caidos-meses"], antes ? "antes-ley-44" : "desde-ley-44");
    const mesesCaidos = Math.min(mesesConFraccion(tiempoTrabajado(fechaDespido, fechaSentencia)), tope);
    const salariosCaidos = redondear(salario * mesesCaidos);

    const anios = mesesConFraccion(tiempoTrabajado(fechaIngreso, fechaDespido)) / 12;
    const tabla = valores["pa.indemnizacion-semanas"];
    const semanas = antes
      ? semanasEscalaB(anios * 12, valores["pa.indemnizacion-escala-b"])
      : semanasIndemnizacion(anios, enMapa(tabla, "primeros-10-anios"), enMapa(tabla, "desde-anio-11"));
    const indemnizacion = entrada.resultado === "reintegro" ? 0 : redondear(semanalDeMensual(salario) * semanas);

    const recargos = valores["pa.recargo-no-reintegro"];
    const tasaRecargo = entrada.resultado !== "no-reintegra" ? 0 : antes ? enMapa(recargos, "antes-ley-44") : entrada.fondoAlDia ? 0 : enMapa(recargos, "desde-ley-44-sin-fondo");
    const recargo = redondear(porcentaje(indemnizacion, tasaRecargo));

    const observaciones = [`Los salarios caídos tienen un tope de ${tope} meses desde el despido.`];
    if (entrada.resultado === "reintegro") observaciones.push("Con el reintegro vuelves a tu puesto en las mismas condiciones y te pagan los salarios caídos.");
    observaciones.push("A esto se suma la prima de antigüedad, las vacaciones pendientes y el décimo proporcional.");
    return {
      mesesCaidos: redondear(mesesCaidos),
      salariosCaidos,
      indemnizacion,
      recargo,
      total: redondear(salariosCaidos + indemnizacion + recargo),
      observaciones,
    };
  },
  resultado: [
    { clave: "mesesCaidos", etiqueta: "Meses de salarios caídos", formato: "meses", decimales: 2 },
    { clave: "salariosCaidos", etiqueta: "Salarios caídos", formato: "moneda" },
    { clave: "indemnizacion", etiqueta: "Indemnización", formato: "moneda", ocultarSiCero: true },
    { clave: "recargo", etiqueta: "Recargo por no reintegrar", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total que ordena pagar la sentencia", formato: "moneda", destacada: true },
  ],
});
