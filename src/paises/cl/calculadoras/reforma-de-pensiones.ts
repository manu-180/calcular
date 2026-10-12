import { definirCalculadora, porcentaje } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { fechaChilena } from "../lib/fechas";
import datos from "../datos.json";

// El motor entrega la tasa vigente; las tasas siguientes se leen de datos.json, solo las verificadas.
// Desde agosto de 2029 la ley deja la tasa sujeta a una evaluación externa, así que esos tramos
// quedan como no verificados y no se muestran.
const CRONOGRAMA = (datos.datos.find((d) => d.id === "cl.cotizacion-empleador-pensiones")?.tramos ?? [])
  .filter((t) => t.estado === "verificado")
  .map((t) => ({ desde: t.desde as FechaISO, tasa: Number(t.valor) }));

export default definirCalculadora({
  id: "cl.reforma-de-pensiones",
  mercado: "cl",
  concepto: "propio",
  slug: "reforma-de-pensiones",
  estado: "publicado",
  requiere: {
    "cl.cotizacion-empleador-pensiones": "numero",
    "cl.tope-imponible": "numero",
    "cl.uf": "serie",
  },
  campos: [{ id: "imponible", tipo: "moneda", etiqueta: "Sueldo bruto imponible", min: 0 }],
  calcular(entrada, valores, { redondear, fecha }) {
    const tope = redondear(valores["cl.tope-imponible"] * valores["cl.uf"].valor);
    const base = Math.min(entrada.imponible, tope);
    const tasa = valores["cl.cotizacion-empleador-pensiones"];
    const proxima = CRONOGRAMA.find((t) => t.desde > fecha);
    const observaciones: string[] = [];
    if (entrada.imponible > tope) observaciones.push("El sueldo pasa el tope imponible: la cotización se calcula hasta ese tope.");
    return {
      tasa,
      aporte: redondear(porcentaje(base, tasa)),
      proximaFecha: proxima ? fechaChilena(proxima.desde) : "Sin cambios confirmados",
      proximaTasa: proxima ? proxima.tasa : null,
      proximoAporte: proxima ? redondear(porcentaje(base, proxima.tasa)) : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "aporte", etiqueta: "Cotización del empleador al mes", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Tasa vigente", formato: "porcentaje", decimales: 2 },
    { clave: "proximaFecha", etiqueta: "Próxima alza", formato: "texto" },
    { clave: "proximaTasa", etiqueta: "Tasa desde esa fecha", formato: "porcentaje", decimales: 2 },
    { clave: "proximoAporte", etiqueta: "Cotización desde esa fecha (mismo sueldo)", formato: "moneda" },
  ],
});
