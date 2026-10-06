import type { Prefill } from "./tipos";
import { prefill as comercio } from "./comercio";
import { prefill as uocra } from "./uocra";
import { prefill as casas } from "./casas";
import { prefill as alquileres } from "./alquileres";
import { prefill as cuota } from "./cuota";
import { prefill as miSueldo } from "./mi-sueldo";
import { prefill as camioneros } from "./camioneros";
import { prefill as vacaciones } from "./vacaciones";
import { prefill as plazoFijo } from "./plazo-fijo";
import { prefill as indemnizacion } from "./indemnizacion";
import { prefill as ganancias } from "./ganancias";
import { prefill as inflacion } from "./inflacion";
import { prefill as creditoLaboral } from "./credito-laboral";

export const PREFILLS: Record<string, Prefill<unknown>> = {
  "planilla-comercio": comercio as Prefill<unknown>,
  "planilla-uocra": uocra as Prefill<unknown>,
  "planilla-casas-particulares": casas as Prefill<unknown>,
  "planilla-alquileres": alquileres as Prefill<unknown>,
  "informe-cuota-alimentaria": cuota as Prefill<unknown>,
  "planilla-mi-sueldo": miSueldo as Prefill<unknown>,
  "planilla-camioneros": camioneros as Prefill<unknown>,
  "planilla-vacaciones": vacaciones as Prefill<unknown>,
  "planilla-plazo-fijo": plazoFijo as Prefill<unknown>,
  "informe-indemnizacion": indemnizacion as Prefill<unknown>,
  "informe-ganancias": ganancias as Prefill<unknown>,
  "informe-inflacion": inflacion as Prefill<unknown>,
  "informe-credito-laboral": creditoLaboral as Prefill<unknown>,
};
