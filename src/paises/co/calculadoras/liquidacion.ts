import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { anioDe, dias360, indemnizacionIndefinido, mayorFecha, mesDe, recibeAuxilio } from "../reglas";

export default definirCalculadora({
  id: "co.liquidacion",
  mercado: "co",
  concepto: "liquidacion-final",
  slug: "liquidacion",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.auxilio-transporte": "numero",
    "co.auxilio-tope": "numero",
    "co.intereses-cesantias": "numero",
    "co.indemnizacion-dias": "mapa",
    "co.indemnizacion-umbral": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaRetiro", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "vacacionesDesde",
      tipo: "fecha",
      etiqueta: "Desde cuándo no tomas vacaciones",
      ayuda: "Si nunca tomaste vacaciones, déjalo vacío y usamos tu fecha de ingreso.",
      requerido: false,
    },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó el contrato",
      opciones: [
        { valor: "renuncia", etiqueta: "Renuncia, mutuo acuerdo o fin del plazo" },
        { valor: "despido", etiqueta: "Despido sin justa causa (contrato a término indefinido)" },
      ],
      porDefecto: "renuncia",
    },
    { id: "auxilio", tipo: "si-no", etiqueta: "Recibes auxilio de transporte", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "salario");
    const { salario, fechaIngreso, fechaRetiro } = entrada;
    if (fechaRetiro < fechaIngreso) throw new ErrorEntrada("La fecha de retiro tiene que ser posterior a la de ingreso.", "fechaRetiro");
    const vacDesde = entrada.vacacionesDesde ?? fechaIngreso;
    if (vacDesde < fechaIngreso || vacDesde > fechaRetiro) {
      throw new ErrorEntrada("Esa fecha tiene que estar entre tu ingreso y tu retiro.", "vacacionesDesde");
    }
    const smmlv = valores["co.smmlv"];
    const conAuxilio = entrada.auxilio && recibeAuxilio(salario, smmlv, valores["co.auxilio-tope"]);
    const auxilio = conAuxilio ? valores["co.auxilio-transporte"] : 0;
    const base = salario + auxilio;

    const anio = anioDe(fechaRetiro);
    const diasCesantias = dias360(mayorFecha(fechaIngreso, `${anio}-01-01`), fechaRetiro);
    const cesantias = redondear((base * diasCesantias) / 360);
    const intereses = redondear((porcentaje(cesantias, valores["co.intereses-cesantias"]) * diasCesantias) / 360);

    const inicioSemestre = mesDe(fechaRetiro) <= 6 ? `${anio}-01-01` : `${anio}-07-01`;
    const diasPrima = dias360(mayorFecha(fechaIngreso, inicioSemestre as typeof fechaRetiro), fechaRetiro);
    const prima = redondear((base * diasPrima) / 360);

    const diasVacaciones = dias360(vacDesde, fechaRetiro);
    const vacaciones = redondear((salario * diasVacaciones) / 720);

    const diasServicio = dias360(fechaIngreso, fechaRetiro);
    const indemnizacion =
      entrada.motivo === "despido"
        ? indemnizacionIndefinido(salario, diasServicio, smmlv, valores["co.indemnizacion-dias"], valores["co.indemnizacion-umbral"], redondear).valor
        : 0;

    const observaciones: string[] = [];
    if (auxilio > 0) observaciones.push("Las cesantías y la prima incluyen el auxilio de transporte, porque ganas hasta dos salarios mínimos. Las vacaciones no lo incluyen.");
    if (diasServicio > diasCesantias) observaciones.push("Las cesantías de años anteriores ya deberían estar en tu fondo de cesantías, por eso solo calculamos las de este año.");

    return {
      base,
      diasCesantias,
      cesantias,
      intereses,
      diasPrima,
      prima,
      diasVacaciones,
      vacaciones,
      indemnizacion,
      total: redondear(cesantias + intereses + prima + vacaciones + indemnizacion),
      observaciones,
    };
  },
  resultado: [
    { clave: "base", etiqueta: "Salario base para cesantías y prima", formato: "moneda", decimales: 0 },
    { clave: "diasCesantias", etiqueta: "Días para cesantías este año", formato: "dias" },
    { clave: "cesantias", etiqueta: "Cesantías", formato: "moneda", decimales: 0 },
    { clave: "intereses", etiqueta: "Intereses sobre las cesantías", formato: "moneda", decimales: 0 },
    { clave: "diasPrima", etiqueta: "Días para la prima de este semestre", formato: "dias" },
    { clave: "prima", etiqueta: "Prima de servicios", formato: "moneda", decimales: 0 },
    { clave: "diasVacaciones", etiqueta: "Días trabajados sin vacaciones", formato: "dias" },
    { clave: "vacaciones", etiqueta: "Vacaciones pendientes en dinero", formato: "moneda", decimales: 0 },
    { clave: "indemnizacion", etiqueta: "Indemnización por despido sin justa causa", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "total", etiqueta: "Total de la liquidación", formato: "moneda", decimales: 0, destacada: true },
  ],
});
