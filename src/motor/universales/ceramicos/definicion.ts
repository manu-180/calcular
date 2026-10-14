import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { redondear } from "../../formato";
import type { DefinicionCalculadora } from "../../tipos";
import type { ContextoUniversal } from "../tipos";

export interface UiCeramicos {
  superficie: (u: string) => string;
  largo: (u: string) => string;
  ancho: (u: string) => string;
  desperdicio: string;
  desperdicioAyuda: string;
  porCaja: string;
  porCajaAyuda: string;
  piezas: string;
  cajas: string;
  conDesperdicio: (u: string) => string;
  cubre: (u: string) => string;
  errorSuperficie: string;
  errorPieza: string;
}

const r2 = (n: number) => redondear(n, { decimales: 2, modo: "mitad-arriba" });
// 1e-9 evita que 165,00000000000003 piezas se conviertan en 166 por el error de coma flotante.
const haciaArriba = (n: number) => Math.ceil(n - 1e-9);

export function definir(ctx: ContextoUniversal, ui: UiCeramicos): DefinicionCalculadora {
  const imperial = ctx.unidades === "imperial";
  const us = imperial ? "ft²" : "m²";
  const up = imperial ? "in" : "cm";
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "ceramicos",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "superficie", tipo: "numero", etiqueta: ui.superficie(us), min: 0, porDefecto: imperial ? 200 : 20 },
      { id: "largo", tipo: "numero", etiqueta: ui.largo(up), min: 0, porDefecto: imperial ? 12 : 60 },
      { id: "ancho", tipo: "numero", etiqueta: ui.ancho(up), min: 0, porDefecto: imperial ? 12 : 60 },
      { id: "desperdicio", tipo: "porcentaje", etiqueta: ui.desperdicio, ayuda: ui.desperdicioAyuda, min: 0, max: 50, porDefecto: 10 },
      { id: "porCaja", tipo: "entero", etiqueta: ui.porCaja, ayuda: ui.porCajaAyuda, min: 1, requerido: false },
    ],
    calcular(e) {
      if (e.superficie <= 0) throw new ErrorEntrada(ui.errorSuperficie, "superficie");
      if (e.largo <= 0) throw new ErrorEntrada(ui.errorPieza, "largo");
      if (e.ancho <= 0) throw new ErrorEntrada(ui.errorPieza, "ancho");
      const areaPieza = imperial ? (e.largo * e.ancho) / 144 : (e.largo / 100) * (e.ancho / 100);
      const conDesperdicio = e.superficie * (1 + e.desperdicio / 100);
      const piezas = haciaArriba(conDesperdicio / areaPieza);
      const porCaja = e.porCaja && e.porCaja > 0 ? e.porCaja : null;
      const cajas = porCaja ? haciaArriba(piezas / porCaja) : null;
      return {
        piezas,
        cajas,
        conDesperdicio: r2(conDesperdicio),
        cubre: cajas && porCaja ? r2(cajas * porCaja * areaPieza) : null,
      };
    },
    resultado: [
      { clave: "piezas", etiqueta: ui.piezas, formato: "numero", destacada: true },
      { clave: "cajas", etiqueta: ui.cajas, formato: "numero" },
      { clave: "conDesperdicio", etiqueta: ui.conDesperdicio(us), formato: "numero" },
      { clave: "cubre", etiqueta: ui.cubre(us), formato: "numero" },
    ],
  });
}
