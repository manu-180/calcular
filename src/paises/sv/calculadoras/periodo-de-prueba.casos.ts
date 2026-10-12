import { definirCasos } from "@/motor/calculo";
import prueba from "./periodo-de-prueba";

export default definirCasos(prueba, [
  {
    nombre: "Empieza el 1 de octubre",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF",
      detalle: "Art. 28: los primeros 30 días. Del 1/10 al 30/10/2026; desde el 31/10 el contrato sigue por tiempo indefinido.",
    },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-10-01" },
    esperado: { ultimo: "2026-10-30", indefinido: "2026-10-31", dias: 30 },
  },
  {
    nombre: "Empieza el 15 de febrero (mes corto)",
    origen: { tipo: "recalculado", detalle: "Del 15/2 al 16/3/2027 son 30 días." },
    fecha: "2026-10-12",
    entrada: { inicio: "2027-02-15" },
    esperado: { ultimo: "2027-03-16", indefinido: "2027-03-17" },
  },
]);
