import { definirCasos } from "@/motor/calculo";
import periodoDePrueba from "./periodo-de-prueba";

export default definirCasos(periodoDePrueba, [
  {
    nombre: "Contrato indefinido que empieza el 1 de octubre",
    origen: { tipo: "recalculado", detalle: "Art. 15 del Código del Trabajo: hasta 90 días. Del 1/10/2026 contando ese día, el día 90 es el 29/12/2026. Hoy (1/10) faltan 90 días." },
    fecha: "2026-10-01",
    entrada: { inicio: "2026-10-01", tipo: "general", dias: null },
    esperado: { maximo: 90, pactados: 90, fin: "2026-12-29", restantes: 90 },
  },
  {
    nombre: "Trabajo del hogar: quince días",
    origen: { tipo: "recalculado", detalle: "Art. 15: hasta 15 días en el trabajo remunerado del hogar. Del 1/10/2026 al 15/10/2026. El 10/10 faltan 6 días contando ese." },
    fecha: "2026-10-10",
    entrada: { inicio: "2026-10-01", tipo: "hogar", dias: null },
    esperado: { maximo: 15, fin: "2026-10-15", restantes: 6 },
  },
  {
    nombre: "Contrato que pacta 120 días: se recorta a 90",
    origen: { tipo: "recalculado", detalle: "La ley no permite más de 90 días: fin el 29/12/2026. Al 5/1/2027 ya terminó." },
    fecha: "2027-01-05",
    entrada: { inicio: "2026-10-01", tipo: "general", dias: 120 },
    esperado: { pactados: 90, fin: "2026-12-29", restantes: 0 },
  },
]);
