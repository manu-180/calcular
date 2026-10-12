import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { antiguedad, DIAS_ANIO, DIAS_MES, diasInclusivos, mesesIndemnizacion, periodoAguinaldo } from "../prestaciones";

export default definirCalculadora({
  id: "ni.trabajo-domestico",
  mercado: "ni",
  concepto: "trabajo-domestico",
  slug: "trabajo-domestico",
  estado: "publicado",
  requiere: {
    "ni.domestico-especie": "numero",
    "ni.periodo-prueba-domestico-dias": "numero",
    "ni.indemnizacion-meses-por-anio": "numero",
    "ni.indemnizacion-dias-desde-cuarto-anio": "numero",
    "ni.indemnizacion-minimo-meses": "numero",
    "ni.indemnizacion-tope-meses": "numero",
    "ni.aguinaldo-meses": "numero",
    "ni.vacaciones-dias-por-semestre": "numero",
  },
  campos: [
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó el trabajo",
      opciones: [
        { valor: "despido", etiqueta: "Despido sin causa justificada" },
        { valor: "renuncia", etiqueta: "Renuncia o mutuo acuerdo" },
        { valor: "despido-justificado", etiqueta: "Despido por una causa del artículo 48" },
      ],
      porDefecto: "despido",
    },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual en dinero", min: 0 },
    { id: "especie", tipo: "si-no", etiqueta: "Recibe alimentos y habitación en la casa", porDefecto: true },
    {
      id: "vacacionesPendientes",
      tipo: "numero",
      etiqueta: "Días de vacaciones que no gozó",
      min: 0,
      requerido: false,
      ayuda: "Si lo dejás vacío, calculamos los del último año, desde el último aniversario.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fechaIngreso > entrada.fechaSalida) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior a la de salida.", "fechaIngreso");
    const especie = entrada.especie ? redondear(porcentaje(entrada.salario, valores["ni.domestico-especie"])) : 0;
    const base = redondear(entrada.salario + especie);
    const a = antiguedad(entrada.fechaIngreso, entrada.fechaSalida);
    const enPrueba = diasInclusivos(entrada.fechaIngreso, entrada.fechaSalida) <= valores["ni.periodo-prueba-domestico-dias"];
    const regla = {
      mesesPorAnio: valores["ni.indemnizacion-meses-por-anio"],
      diasDesdeCuarto: valores["ni.indemnizacion-dias-desde-cuarto-anio"],
      minimoMeses: valores["ni.indemnizacion-minimo-meses"],
      topeMeses: valores["ni.indemnizacion-tope-meses"],
    };
    const sinIndemnizacion = entrada.motivo === "despido-justificado" || enPrueba;
    const meses = sinIndemnizacion ? 0 : mesesIndemnizacion(a.anios, regla, entrada.motivo === "despido");
    const indemnizacion = redondear(base * meses);
    const periodo = periodoAguinaldo(entrada.fechaIngreso, entrada.fechaSalida);
    const aguinaldo = redondear((base * valores["ni.aguinaldo-meses"] * periodo.dias) / DIAS_ANIO);
    const diasDelAnio = a.diasDelAnioEnCurso === 0 && a.completos > 0 ? DIAS_ANIO : a.diasDelAnioEnCurso;
    const diasVacaciones = redondear(entrada.vacacionesPendientes ?? (valores["ni.vacaciones-dias-por-semestre"] * 2 * diasDelAnio) / DIAS_ANIO);
    const vacaciones = redondear((base / DIAS_MES) * diasVacaciones);
    const observaciones: string[] = [];
    if (entrada.especie) observaciones.push("Los alimentos y la habitación cuentan como parte del salario para las prestaciones (artículo 146).");
    if (enPrueba) observaciones.push("Terminó dentro de los primeros días de prueba: no hay indemnización por antigüedad.");
    if (entrada.motivo === "renuncia") observaciones.push("Con renuncia o mutuo acuerdo, la antigüedad se paga por el tiempo trabajado, sin el mínimo de un mes.");
    if (entrada.vacacionesPendientes === null) observaciones.push("Supusimos que ya gozó las vacaciones de los años anteriores. Si no, poné el total de días pendientes.");
    return { especie, base, anios: redondear(a.anios), indemnizacion, aguinaldo, diasVacaciones, vacaciones, total: redondear(indemnizacion + aguinaldo + vacaciones), observaciones };
  },
  resultado: [
    { clave: "especie", etiqueta: "Valor de alimentos y habitación", formato: "moneda", ocultarSiCero: true },
    { clave: "base", etiqueta: "Salario para calcular prestaciones", formato: "moneda" },
    { clave: "anios", etiqueta: "Antigüedad", formato: "anios", decimales: 2 },
    { clave: "indemnizacion", etiqueta: "Indemnización por antigüedad", formato: "moneda", ocultarSiCero: true },
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "diasVacaciones", etiqueta: "Días de vacaciones a pagar", formato: "numero", decimales: 2 },
    { clave: "vacaciones", etiqueta: "Vacaciones", formato: "moneda" },
    { clave: "total", etiqueta: "Total de la liquidación", formato: "moneda", destacada: true },
  ],
});
