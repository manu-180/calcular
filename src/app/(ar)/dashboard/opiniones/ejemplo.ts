import type { OpinionAdmin } from "@/lib/opiniones";
import { ESTADO_DE_FILTRO, type BandejaDatos, type Filtro } from "./datos";

const hace = (min: number) => new Date(Date.now() - min * 60_000).toISOString();

const TODAS: OpinionAdmin[] = [
  {
    id: "00000000-0000-4000-8000-0000000000a1",
    tipo: "error",
    mensaje: "En la calculadora de aguinaldo puse 3 meses trabajados y me dio el proporcional de 4. ¿Puede ser que cuente el mes de ingreso entero?",
    desde: "/aguinaldo",
    estado: "nueva",
    created_at: hace(12),
    email: "persona.uno@ejemplo.test",
  },
  {
    id: "00000000-0000-4000-8000-0000000000a2",
    tipo: "idea",
    mensaje: "Estaría bueno poder comparar dos sueldos lado a lado, por ejemplo el de este mes contra el del año pasado ajustado por inflación.",
    desde: "/sueldo-neto",
    estado: "nueva",
    created_at: hace(95),
    email: "persona.dos@ejemplo.test",
  },
  {
    id: "00000000-0000-4000-8000-0000000000a3",
    tipo: "otra",
    mensaje: "Gracias por la página.\nLa uso todos los meses para chequear el recibo.",
    desde: null,
    estado: "leida",
    created_at: hace(60 * 26),
    email: "persona.tres@ejemplo.test",
  },
  {
    id: "00000000-0000-4000-8000-0000000000a4",
    tipo: "idea",
    mensaje: "Sumen la calculadora de horas extras para trabajo nocturno.",
    desde: "/horas-extras",
    estado: "resuelta",
    created_at: hace(60 * 24 * 6),
    email: null,
  },
];

export function bandejaDeEjemplo(filtro: Filtro, vacia: boolean, mercado: string | null = null): BandejaDatos {
  const base = vacia || (mercado && mercado !== "ar") ? [] : TODAS.map((o) => ({ ...o, mercado: "ar" }));
  return {
    porMercado: true,
    mercado,
    opiniones: filtro === "todas" ? base : base.filter((o) => o.estado === ESTADO_DE_FILTRO[filtro]),
    cuentas: {
      nueva: base.filter((o) => o.estado === "nueva").length,
      leida: base.filter((o) => o.estado === "leida").length,
      resuelta: base.filter((o) => o.estado === "resuelta").length,
    },
  };
}
