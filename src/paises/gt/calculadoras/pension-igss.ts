import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.pension-igss",
  mercado: "gt",
  concepto: "jubilacion",
  slug: "pension-igss",
  estado: "publicado",
  requiere: {
    "gt.igss-vejez-edad": "numero",
    "gt.igss-vejez-contribuciones": "numero",
    "gt.igss-vejez-base": "numero",
    "gt.igss-vejez-incremento": "numero",
    "gt.igss-vejez-meses-base": "numero",
    "gt.igss-vejez-asignacion": "numero",
    "gt.igss-vejez-tope": "numero",
    "gt.igss-remuneracion-base-maxima": "numero",
    "gt.igss-vejez-meses-promedio": "numero",
  },
  campos: [
    {
      id: "promedio",
      tipo: "moneda",
      etiqueta: "Promedio de su salario de los últimos cinco años",
      min: 0,
      ayuda: "El promedio de lo que cotizó al IGSS en los últimos 60 meses.",
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses que cotizó al IGSS", min: 0, max: 720 },
    { id: "edad", tipo: "entero", etiqueta: "Su edad", min: 15, max: 110, porDefecto: 60 },
    {
      id: "beneficiarios",
      tipo: "entero",
      etiqueta: "Familiares a su cargo con derecho a asignación",
      min: 0,
      max: 20,
      porDefecto: 0,
      ayuda: "Esposa o conviviente, hijos menores de 18 años y padres que dependan de usted.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses < 0) throw new ErrorEntrada("Los meses cotizados no pueden ser negativos.", "meses");
    const remuneracion = Math.min(entrada.promedio, valores["gt.igss-remuneracion-base-maxima"]);
    const semestres = Math.floor(Math.max(0, entrada.meses - valores["gt.igss-vejez-meses-base"]) / 6);
    const porcentajeBase = valores["gt.igss-vejez-base"] + semestres * valores["gt.igss-vejez-incremento"];
    const tope = redondear(porcentaje(remuneracion, valores["gt.igss-vejez-tope"]));
    const pension = Math.min(redondear(porcentaje(remuneracion, porcentajeBase)), tope);
    const asignacionBruta = redondear(porcentaje(pension, valores["gt.igss-vejez-asignacion"]) * entrada.beneficiarios);
    const asignacion = redondear(Math.min(asignacionBruta, tope - pension));
    const faltanMeses = Math.max(0, valores["gt.igss-vejez-contribuciones"] - entrada.meses);
    const faltanAnios = Math.max(0, valores["gt.igss-vejez-edad"] - entrada.edad);
    let derecho = "Sí, cumple la edad y las cuotas.";
    if (faltanMeses > 0 && faltanAnios > 0) derecho = `Todavía no: le faltan ${faltanAnios} años de edad y ${faltanMeses} meses de cotización.`;
    else if (faltanMeses > 0) derecho = `Todavía no: le faltan ${faltanMeses} meses de cotización.`;
    else if (faltanAnios > 0) derecho = `Todavía no: le faltan ${faltanAnios} años para la edad mínima.`;
    const observaciones = ["Es una estimación con la fórmula del reglamento. El monto final lo fija el IGSS con sus registros."];
    if (entrada.promedio > remuneracion) observaciones.push("Su promedio pasa el máximo que toma el IGSS, así que se usó ese máximo.");
    if (asignacion < asignacionBruta) observaciones.push("La pensión con asignaciones no puede pasar el tope, por eso se redujeron las asignaciones.");
    return { derecho, remuneracion, porcentajeBase, pension, asignacion, total: redondear(pension + asignacion), observaciones };
  },
  resultado: [
    { clave: "derecho", etiqueta: "¿Tiene derecho a la pensión?", formato: "texto" },
    { clave: "remuneracion", etiqueta: "Salario que toma el IGSS", formato: "moneda" },
    { clave: "porcentajeBase", etiqueta: "Porcentaje de la pensión", formato: "porcentaje" },
    { clave: "pension", etiqueta: "Pensión", formato: "moneda" },
    { clave: "asignacion", etiqueta: "Asignación familiar", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Pensión mensual estimada", formato: "moneda", destacada: true },
  ],
});
