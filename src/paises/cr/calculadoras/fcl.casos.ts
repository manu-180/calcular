import { definirCasos } from "@/motor/calculo";
import fcl from "./fcl";

export default definirCasos(fcl, [
  {
    nombre: "Cinco años con ₡800.000",
    origen: { tipo: "recalculado", detalle: "Ley 7983, art. 3: 1,5 % de 800.000 = 12.000 por mes. 60 meses: 720.000. Ya puede retirarlo (art. 6 c)." },
    fecha: "2026-10-12",
    entrada: { salario: 800000, meses: 60 },
    esperado: { aporte: 12000, acumulado: 720000, mesesParaRetiro: 0 },
  },
  {
    nombre: "Dos años con ₡450.000",
    origen: { tipo: "recalculado", detalle: "1,5 % de 450.000 = 6.750; × 24 = 162.000. Faltan 36 meses para los cinco años." },
    fecha: "2026-10-12",
    entrada: { salario: 450000, meses: 24 },
    esperado: { aporte: 6750, acumulado: 162000, mesesParaRetiro: 36 },
  },
]);
