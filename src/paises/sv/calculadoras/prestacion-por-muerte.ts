import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { servicio, textoServicio } from "../lib/fechas";

const DIAS_DEL_MES = 30;

// Dos pagos distintos a los beneficiarios: la ayuda para el sepelio del art. 313 del Código y la
// prestación de la ley de renuncia voluntaria, que su art. 3 extiende al caso de muerte del trabajador.
export default definirCalculadora({
  id: "sv.prestacion-por-muerte",
  mercado: "sv",
  concepto: "propio",
  slug: "prestacion-por-muerte",
  estado: "publicado",
  requiere: {
    "sv.muerte-dias": "numero",
    "sv.salario-minimo-diario": "numero-por-region",
    "sv.renuncia-dias-por-anio": "numero",
    "sv.renuncia-tope": "numero",
    "sv.renuncia-anios-minimos": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual del trabajador", min: 0 },
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar" },
    { id: "fallecimiento", tipo: "fecha", etiqueta: "Fecha de fallecimiento", porDefecto: "hoy" },
    { id: "region", tipo: "region", etiqueta: "Sector de la empresa", porDefecto: "comercio-servicios" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fallecimiento < entrada.inicio) throw new ErrorEntrada("La fecha de fallecimiento tiene que ser posterior al inicio.", "fallecimiento");
    const diario = entrada.salario / DIAS_DEL_MES;
    const sepelio = redondear(diario * valores["sv.muerte-dias"]);
    const s = servicio(entrada.inicio, entrada.fallecimiento);
    const minimos = valores["sv.renuncia-anios-minimos"];
    const tope = valores["sv.renuncia-tope"] * porRegion(valores["sv.salario-minimo-diario"], entrada.region);
    const prestacion = s.anios >= minimos ? redondear(Math.min(diario, tope) * valores["sv.renuncia-dias-por-anio"] * s.anios) : 0;
    const observaciones: string[] = [];
    if (prestacion === 0) observaciones.push(`La prestación económica se paga con al menos ${minimos} años de servicio.`);
    observaciones.push("El patrono entrega el dinero a las personas que el trabajador designó en su contrato o en los registros de la empresa; si no designó a nadie, a los parientes más cercanos.");
    observaciones.push("Aparte se deben el aguinaldo, las vacaciones y los salarios pendientes.");
    return {
      tiempo: textoServicio(s),
      sepelio,
      prestacion,
      total: redondear(sepelio + prestacion),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "sepelio", etiqueta: "Ayuda para el sepelio", formato: "moneda" },
    { clave: "prestacion", etiqueta: "Prestación económica por años de servicio", formato: "moneda" },
    { clave: "total", etiqueta: "Total para los beneficiarios", formato: "moneda", destacada: true },
  ],
});
