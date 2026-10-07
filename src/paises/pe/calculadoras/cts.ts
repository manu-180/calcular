import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.cts",
  mercado: "pe",
  concepto: "fondo-cesantia",
  slug: "cts",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.cts-por-regimen": "mapa",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", ayuda: "El que cobraste en abril (depósito de mayo) o en octubre (depósito de noviembre).", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Cobras asignación familiar", porDefecto: false },
    {
      id: "variable",
      tipo: "moneda",
      etiqueta: "Promedio mensual de pagos variables",
      ayuda: "Comisiones, horas extras u otros pagos que recibiste al menos 3 meses del semestre. Déjalo vacío si no tienes.",
      min: 0,
      requerido: false,
    },
    {
      id: "gratificacion",
      tipo: "moneda",
      etiqueta: "Gratificación que cobraste en el semestre",
      ayuda: "La de diciembre para el depósito de mayo y la de julio para el de noviembre, sin la bonificación extraordinaria. Se suma un sexto.",
      min: 0,
      requerido: false,
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses completos trabajados en el semestre", min: 0, max: 6, porDefecto: 6 },
    { id: "dias", tipo: "entero", etiqueta: "Días sueltos (además de los meses)", min: 0, max: 29, porDefecto: 0 },
    {
      id: "regimen",
      tipo: "opcion",
      etiqueta: "Régimen laboral de tu empleador",
      opciones: [
        { valor: "general", etiqueta: "Régimen general" },
        { valor: "pequena", etiqueta: "Pequeña empresa (REMYPE)" },
        { valor: "micro", etiqueta: "Microempresa (REMYPE)" },
      ],
      porDefecto: "general",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses < 0 || entrada.meses > 6) throw new ErrorEntrada("Un semestre tiene 6 meses como máximo.", "meses");
    if (entrada.dias < 0 || entrada.dias > 29) throw new ErrorEntrada("Los días sueltos van de 0 a 29. Si son 30, súmalos como un mes.", "dias");
    if (entrada.meses === 6 && entrada.dias > 0) throw new ErrorEntrada("Con 6 meses completos ya cubriste el semestre.", "dias");
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const sextoGratificacion = redondear((entrada.gratificacion ?? 0) / 6);
    const remuneracion = redondear(entrada.sueldo + asignacion + (entrada.variable ?? 0) + sextoGratificacion);
    if (entrada.regimen === "micro") {
      return {
        remuneracion,
        sextoGratificacion,
        porMeses: 0,
        porDias: 0,
        total: 0,
        observaciones: ["En la microempresa del régimen especial no se deposita CTS."],
      };
    }
    const factor = enMapa(valores["pe.cts-por-regimen"], entrada.regimen);
    const porMeses = redondear(((remuneracion * factor) / 12) * entrada.meses);
    const porDias = redondear(((remuneracion * factor) / 360) * entrada.dias);
    const observaciones: string[] = [];
    if (entrada.regimen === "pequena") observaciones.push("En la pequeña empresa la CTS es la mitad: 15 remuneraciones diarias por año.");
    if (entrada.gratificacion === null) observaciones.push("Si cobraste gratificación en el semestre, escríbela: un sexto se suma a tu CTS.");
    return { remuneracion, sextoGratificacion, porMeses, porDias, total: redondear(porMeses + porDias), observaciones };
  },
  resultado: [
    { clave: "remuneracion", etiqueta: "Remuneración computable", formato: "moneda" },
    { clave: "sextoGratificacion", etiqueta: "Sexto de la gratificación incluido", formato: "moneda", ocultarSiCero: true },
    { clave: "porMeses", etiqueta: "Por los meses completos", formato: "moneda" },
    { clave: "porDias", etiqueta: "Por los días sueltos", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Depósito de CTS", formato: "moneda", destacada: true },
  ],
});
