import type { Detector } from "@/motor/tipos";

// Sin detectores: el 29/10/2026 drc.gov.bt, nab.gov.bt, mof.gov.bt (documentos) y rma.org.bt devolvieron 503
// o cortaron la conexión, así que no hay una página oficial cuya forma se haya podido comprobar.
export const detectores: readonly Detector[] = [];
