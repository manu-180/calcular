import { definirCalculadora, porRegion } from "@/motor/calculo";
import { antiguedad, OPCIONES_PERIODO, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.prima-de-antiguedad",
  mercado: "mx",
  concepto: "propio",
  slug: "prima-de-antiguedad",
  estado: "publicado",
  requiere: {
    "mx.dias-prima-antiguedad": "numero",
    "mx.anios-prima-antiguedad-renuncia": "numero",
    "mx.tope-prima-antiguedad": "numero",
    "mx.salario-minimo": "numero-por-region",
    "mx.exencion-indemnizacion": "numero",
    "mx.uma-diaria": "numero",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo termina el trabajo",
      opciones: [
        { valor: "renuncia", etiqueta: "Renuncia" },
        { valor: "despido", etiqueta: "Despido, con o sin causa" },
        { valor: "muerte", etiqueta: "Fallecimiento del trabajador" },
      ],
      porDefecto: "renuncia",
    },
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo bruto", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Ese sueldo es", opciones: OPCIONES_PERIODO, porDefecto: "mensual" },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "salida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    { id: "region", tipo: "region", etiqueta: "Dónde trabajas", porDefecto: "general" },
  ],
  calcular(entrada, valores, { redondear }) {
    const ant = antiguedad(entrada.ingreso, entrada.salida);
    const minimo = porRegion(valores["mx.salario-minimo"], entrada.region);
    const diario = redondear(salarioDiario(entrada.sueldo, entrada.periodo));
    const tope = redondear(valores["mx.tope-prima-antiguedad"] * minimo);
    const base = Math.min(Math.max(diario, minimo), tope);
    const aniosRenuncia = valores["mx.anios-prima-antiguedad-renuncia"];
    const paga = entrada.motivo !== "renuncia" || ant.anios >= aniosRenuncia;
    const prima = paga ? redondear(base * valores["mx.dias-prima-antiguedad"] * ant.anios) : 0;
    // LISR art. 93 fr. XIII: toda fracción de más de seis meses cuenta como año completo para el exento.
    const aniosExentos = ant.aniosCompletos + (ant.diasDesdeAniversario > 365 / 2 ? 1 : 0);
    const exento = Math.min(prima, redondear(valores["mx.exencion-indemnizacion"] * valores["mx.uma-diaria"] * aniosExentos));
    const observaciones: string[] = [];
    if (!paga) observaciones.push(`Al renunciar, la prima de antigüedad se paga solo con ${aniosRenuncia} años de servicio o más.`);
    if (diario > tope) observaciones.push("Tu salario pasa el doble del salario mínimo, así que se usa ese tope.");
    if (diario < minimo) observaciones.push("Se usa el salario mínimo, porque la base no puede ser menor.");
    return {
      antiguedad: redondear(ant.anios),
      diario,
      base,
      prima,
      exento,
      gravado: redondear(prima - exento),
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Antigüedad", formato: "anios" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "base", etiqueta: "Salario que se usa (con tope)", formato: "moneda" },
    { clave: "prima", etiqueta: "Prima de antigüedad", formato: "moneda", destacada: true },
    { clave: "exento", etiqueta: "Parte que no paga ISR", formato: "moneda" },
    { clave: "gravado", etiqueta: "Parte que paga ISR", formato: "moneda", ocultarSiCero: true },
  ],
});
