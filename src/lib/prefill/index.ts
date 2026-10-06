import type { Prefill } from "./tipos";
import { prefill as comercio } from "./comercio";
import { prefill as uocra } from "./uocra";
import { prefill as casas } from "./casas";
import { prefill as alquileres } from "./alquileres";
import { prefill as cuota } from "./cuota";

export const PREFILLS: Record<string, Prefill<unknown>> = {
  "planilla-comercio": comercio as Prefill<unknown>,
  "planilla-uocra": uocra as Prefill<unknown>,
  "planilla-casas-particulares": casas as Prefill<unknown>,
  "planilla-alquileres": alquileres as Prefill<unknown>,
  "informe-cuota-alimentaria": cuota as Prefill<unknown>,
};
