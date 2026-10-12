import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { fechaChilena } from "../lib/fechas";
import datos from "../datos.json";

// El motor entrega solo el valor vigente; la próxima etapa de la reducción se lee de los tramos
// verificados del mismo datos.json.
const ETAPAS = (datos.datos.find((d) => d.id === "cl.jornada-maxima")?.tramos ?? [])
  .filter((t) => t.estado === "verificado")
  .map((t) => ({ desde: t.desde, horas: Number(t.valor) }));

export default definirCalculadora({
  id: "cl.ley-40-horas",
  mercado: "cl",
  concepto: "propio",
  slug: "ley-40-horas",
  estado: "publicado",
  requiere: {
    "cl.jornada-maxima": "numero",
    "cl.jornada-diaria-maxima": "numero",
    "cl.jornada-dias-minimo": "numero",
    "cl.jornada-dias-maximo": "numero",
  },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Horas semanales de tu contrato", min: 1, max: 60, porDefecto: 44 },
    { id: "dias", tipo: "entero", etiqueta: "Días que trabajas a la semana", min: 1, max: 7, porDefecto: 5 },
  ],
  calcular(entrada, valores, { fecha }) {
    const maxima = valores["cl.jornada-maxima"];
    const minDias = valores["cl.jornada-dias-minimo"];
    const maxDias = valores["cl.jornada-dias-maximo"];
    if (entrada.dias > 7) throw new ErrorEntrada("Una semana tiene 7 días.", "dias");
    const exceso = Math.max(0, entrada.horas - maxima);
    const porDia = Math.min(entrada.horas, maxima) / entrada.dias;
    const proxima = ETAPAS.find((e) => e.desde > fecha);
    const observaciones: string[] = [];
    if (exceso > 0) observaciones.push(`Tu contrato pasa la jornada máxima. Las ${exceso} horas de más se tienen que reducir, o se pagan como horas extra si se trabajan.`);
    if (entrada.horas >= maxima && (entrada.dias < minDias || entrada.dias > maxDias)) observaciones.push(`La jornada completa se reparte en ${minDias} o ${maxDias} días a la semana.`);
    if (porDia > valores["cl.jornada-diaria-maxima"]) observaciones.push(`Así son más de ${valores["cl.jornada-diaria-maxima"]} horas por día, el máximo de la jornada ordinaria.`);
    return {
      maxima,
      exceso,
      porDia,
      proximaFecha: proxima ? fechaChilena(proxima.desde) : "Sin cambios anunciados",
      proximaJornada: proxima ? proxima.horas : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "maxima", etiqueta: "Jornada máxima legal hoy", formato: "horas", destacada: true },
    { clave: "exceso", etiqueta: "Horas que tu contrato pasa el máximo", formato: "horas" },
    { clave: "porDia", etiqueta: "Horas por día con la jornada legal", formato: "horas", decimales: 2 },
    { clave: "proximaFecha", etiqueta: "Próxima reducción", formato: "texto" },
    { clave: "proximaJornada", etiqueta: "Jornada máxima desde esa fecha", formato: "horas" },
  ],
});
