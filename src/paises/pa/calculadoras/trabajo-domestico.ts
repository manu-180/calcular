import { definirCalculadora, enMapa, porRegion } from "@/motor/calculo";
import { mesesConFraccion, semanalDeMensual, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

const DIAS_LABORABLES_SEMANA = 6;

// Art. 231, numeral 4: la indemnización va por tramos de tiempo de servicio y no se prorratea.
// Los límites se cuentan en meses (dos semanas = medio mes).
function indemnizacionDomestico(meses: number, semanal: number, mensual: number, semanas: Readonly<Record<string, number>>, porMeses: Readonly<Record<string, number>>): number {
  if (meses < 0.5) return 0;
  if (meses < 3) return semanal * enMapa(semanas, "hasta-3-meses");
  if (meses < 12) return semanal * enMapa(semanas, "hasta-1-anio");
  const anios = meses / 12;
  const clave = anios < 2 ? "1-a-2" : anios < 4 ? "2-a-4" : anios < 6 ? "4-a-6" : anios < 10 ? "6-a-10" : anios < 15 ? "10-a-15" : anios < 20 ? "15-a-20" : "20-o-mas";
  return mensual * enMapa(porMeses, clave);
}

export default definirCalculadora({
  id: "pa.trabajo-domestico",
  mercado: "pa",
  concepto: "trabajo-domestico",
  slug: "trabajo-domestico",
  estado: "publicado",
  requiere: {
    "pa.salario-minimo-domestico": "numero-por-region",
    "pa.recargo-feriado-domestico": "numero",
    "pa.indemnizacion-domestico-semanas": "mapa",
    "pa.indemnizacion-domestico-meses": "mapa",
    "pa.preaviso-domestico-dias": "numero",
  },
  campos: [
    {
      id: "region",
      tipo: "region",
      etiqueta: "Región donde trabaja",
      ayuda: "La Región 1 son los distritos que nombra el decreto del salario mínimo. Todos los demás son Región 2.",
      porDefecto: "region-1",
    },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual en dinero", min: 0 },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Fecha de salida o de hoy", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const minimo = porRegion(valores["pa.salario-minimo-domestico"], entrada.region);
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    const semanal = semanalDeMensual(entrada.salario);
    const diario = semanal / DIAS_LABORABLES_SEMANA;
    const recargo = valores["pa.recargo-feriado-domestico"];
    const indemnizacion = indemnizacionDomestico(
      mesesConFraccion(t),
      semanal,
      entrada.salario,
      valores["pa.indemnizacion-domestico-semanas"],
      valores["pa.indemnizacion-domestico-meses"],
    );
    const observaciones: string[] = [];
    if (entrada.salario < minimo) observaciones.push("El salario está por debajo del mínimo de la región. La diferencia se debe pagar.");
    observaciones.push(
      `Para terminar sin causa justificada, el empleador paga la indemnización y da un aviso de ${valores["pa.preaviso-domestico-dias"]} días.`,
      "Salvo pacto en contrario, el salario incluye además la comida y la habitación.",
    );
    return {
      minimo,
      tiempo: textoTiempo(t),
      diario: redondear(diario),
      feriado: redondear(diario * (1 + recargo / 100)),
      indemnizacion: redondear(indemnizacion),
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Salario mínimo mensual en la región", formato: "moneda" },
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "diario", etiqueta: "Salario por día", formato: "moneda" },
    { clave: "feriado", etiqueta: "Pago por trabajar un día feriado", formato: "moneda" },
    { clave: "indemnizacion", etiqueta: "Indemnización por despido sin causa justificada", formato: "moneda", destacada: true },
  ],
});
