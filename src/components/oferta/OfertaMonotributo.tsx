"use client";

import { OfertaPlanilla, type PuntoOferta } from "@/components/OfertaPlanilla";
import { hojaMonotributo } from "@/components/oferta/hojas";
import { CATEGORIAS } from "@/data/monotributo";
import { formatARS } from "@/lib/formato";
import type { Datos } from "@/lib/prefill/monotributo";
import type { DatosOferta } from "@/lib/oferta";

// Oferta de la Planilla de Monotributo. Con `datos` (calculadora de /monotributo y de
// recategorización) muestra el caso de la persona, que es el archivo que se lleva. Sin datos
// (tabla de categorías, obra social) muestra un caso de ejemplo y lo dice.

const INCLUYE: PuntoOferta[] = [
  {
    titulo: "Los 12 meses que mira ARCA",
    texto: "Vienen rotulados los meses de la próxima recategorización. Cargás lo que facturaste y suma sola.",
  },
  {
    titulo: "Superficie, energía y alquileres",
    texto: "Si tenés local, la categoría la define el más alto de tus datos. La planilla los mira a todos, como pide la ley.",
  },
  {
    titulo: "Tablas nuevas sin pagar de nuevo",
    texto: "Cuando ARCA actualiza las categorías en febrero y agosto, te llega la versión al día en el mismo enlace.",
  },
];

const C = CATEGORIAS.find((c) => c.cat === "C")!;
const EJEMPLO: Datos = {
  actividad: "servicios",
  categoriaActual: "C",
  dependencia: false,
  facturacion: Math.round((C.ingresosBrutosMax * 1.08) / 1000) * 1000,
};

export function OfertaMonotributo({
  oferta,
  desde,
  datos = null,
}: {
  oferta: DatosOferta;
  desde: string;
  datos?: Datos | null;
}) {
  const caso = hojaMonotributo(oferta.archivo, datos ?? EJEMPLO);
  if (!caso) return null;
  const { hoja, resumen } = caso;
  const margen = <strong className="font-semibold text-zinc-800">{formatARS(resumen.margen, 0)}</strong>;
  const destino = resumen.siguiente ? `pasar a la ${resumen.siguiente}` : "quedar fuera del monotributo";

  return (
    <OfertaPlanilla
      producto={oferta}
      desde={desde}
      hoja={hoja}
      titulo="Tu categoría, controlada mes a mes"
      bajada={
        datos ? (
          <>
            Con lo que facturaste te corresponde la categoría {resumen.categoria}. Te quedan {margen} para facturar antes
            de {destino}. La planilla suma lo que facturás cada mes y te muestra cuánto te falta para el tope.
          </>
        ) : (
          <>
            Cargás lo que facturás cada mes y la planilla te dice qué categoría te toca, cuánto margen te queda antes de
            pasar a la siguiente y cuánto vas a pagar por mes.
          </>
        )
      }
      incluye={INCLUYE}
      notaHoja={
        datos
          ? "Te llega con tu facturación repartida en los 12 meses. Cargás la de cada mes y se recalcula todo."
          : `Ejemplo: servicios, hoy en ${EJEMPLO.categoriaActual}, con ${formatARS(EJEMPLO.facturacion, 0)} facturados en 12 meses.`
      }
    />
  );
}
