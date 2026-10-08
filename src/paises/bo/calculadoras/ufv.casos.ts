import { definirCasos } from "@/motor/calculo";
import ufv from "./ufv";

export default definirCasos(ufv, [
  {
    nombre: "Mil UFV el 7/10/2026",
    origen: { tipo: "oficial", url: "https://www.bcb.gob.bo/librerias/indicadores/otras/otras_imprimir.php?qdd=07&qmm=10&qaa=2026", detalle: "Tabla del BCB del 7/10/2026: UFV 3,35449. 1.000 × 3,35449 = 3.354,49." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-bolivianos", monto: 1000 },
    esperado: { bolivianos: 3354.49, ufvs: null, valorUfv: 3.35449, fecha: "2026-10-07" },
  },
  {
    nombre: "Diez mil bolivianos a UFV",
    origen: { tipo: "recalculado", detalle: "10.000 / 3,35449 = 2.981,079..., redondeado 2.981,08." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-ufv", monto: 10000 },
    esperado: { ufvs: 2981.08, bolivianos: null },
  },
  {
    nombre: "Domingo: la UFV tiene valor todos los días",
    origen: { tipo: "oficial", url: "https://www.bcb.gob.bo/librerias/indicadores/otras/otras_imprimir.php?qdd=04&qmm=10&qaa=2026", detalle: "Tabla del BCB pedida para el domingo 4/10/2026: UFV 3,35317 (el TCO es el del lunes, la UFV es la del día)." },
    fecha: "2026-10-04",
    entrada: { sentido: "a-bolivianos", monto: 100 },
    esperado: { valorUfv: 3.35317, fecha: "2026-10-04", bolivianos: 335.32 },
  },
]);
