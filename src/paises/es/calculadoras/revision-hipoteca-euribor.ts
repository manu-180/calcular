import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

function cuotaFrancesa(capital: number, tipoAnual: number, meses: number): number {
  const i = tipoAnual / 100 / 12;
  if (i === 0) return capital / meses;
  return (capital * i) / (1 - Math.pow(1 + i, -meses));
}

export default definirCalculadora({
  id: "es.revision-hipoteca-euribor",
  mercado: "es",
  concepto: "propio",
  slug: "revision-hipoteca-euribor",
  estado: "publicado",
  requiere: {
    "es.euribor": "serie",
  },
  campos: [
    { id: "capital", tipo: "moneda", etiqueta: "Capital pendiente de la hipoteca", min: 1, porDefecto: 150000 },
    { id: "anios", tipo: "numero", etiqueta: "Años que te quedan por pagar", min: 0.1, max: 50, porDefecto: 20 },
    { id: "diferencial", tipo: "porcentaje", etiqueta: "Diferencial de tu hipoteca", min: 0, porDefecto: 0.75, ayuda: "El porcentaje que se suma al euríbor según tu escritura." },
    {
      id: "euribor",
      tipo: "porcentaje",
      etiqueta: "Euríbor de la revisión",
      requerido: false,
      ayuda: "Si lo dejas vacío, usamos el último euríbor a un año publicado por el Banco de España.",
    },
    { id: "cuotaActual", tipo: "moneda", etiqueta: "Tu cuota actual", min: 0, requerido: false, ayuda: "Para ver cuánto sube o baja." },
  ],
  calcular(entrada, valores, { redondear }) {
    const meses = Math.round(entrada.anios * 12);
    if (meses < 1) throw new ErrorEntrada("El plazo tiene que ser de al menos un mes.", "anios");
    const euribor = entrada.euribor ?? valores["es.euribor"].valor;
    const tipo = Math.max(0, euribor + entrada.diferencial);
    const cuota = redondear(cuotaFrancesa(entrada.capital, tipo, meses));
    const observaciones: string[] = [];
    if (entrada.euribor === null) observaciones.push(`Euríbor usado: el publicado para ${valores["es.euribor"].fecha.slice(5, 7)}/${valores["es.euribor"].fecha.slice(0, 4)}. Tu banco usa el del mes que diga tu escritura, normalmente uno o dos meses antes de la revisión.`);
    if (euribor + entrada.diferencial < 0) observaciones.push("El tipo saldría negativo: se toma un 0 %, porque en una hipoteca no se cobran intereses negativos.");
    return {
      euribor,
      tipo,
      cuota,
      diferencia: entrada.cuotaActual === null ? null : redondear(cuota - entrada.cuotaActual),
      intereses: redondear(cuota * meses - entrada.capital),
      meses,
      observaciones,
    };
  },
  resultado: [
    { clave: "cuota", etiqueta: "Nueva cuota mensual", formato: "moneda", destacada: true },
    { clave: "diferencia", etiqueta: "Diferencia con tu cuota actual", formato: "moneda" },
    { clave: "euribor", etiqueta: "Euríbor aplicado", formato: "porcentaje", decimales: 3 },
    { clave: "tipo", etiqueta: "Tipo de interés aplicado", formato: "porcentaje", decimales: 3 },
    { clave: "intereses", etiqueta: "Intereses que pagarías hasta el final", formato: "moneda" },
    { clave: "meses", etiqueta: "Cuotas restantes", formato: "numero" },
  ],
});
