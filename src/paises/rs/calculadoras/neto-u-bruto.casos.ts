import { definirCasos } from "@/motor/calculo";
import netoUBruto from "./neto-u-bruto";

const ZPDG = "https://www.mfin.gov.rs//upload/media/MOq4eO_6aa14ac8c7a47.docx";

export default definirCasos(netoUBruto, [
  {
    nombre: "Neto 73.522,10 vraća bruto 100.000",
    origen: { tipo: "recalculado", url: ZPDG, detalle: "(73.522,10 - 3.422,10) / 0,701 = 100.000." },
    fecha: "2026-10-31",
    entrada: { neto: 73522.1, radnoVreme: 100 },
    esperado: { bruto: 100000, doprinosi: 19900, porez: 6577.9, trosakPoslodavca: 115150 },
  },
  {
    nombre: "Neto minimalne zarade za 174 časa",
    origen: { tipo: "recalculado", url: ZPDG, detalle: "(64.554 - 3.422,10) / 0,701 = 87.206,71 (na paru naviše)." },
    fecha: "2026-10-31",
    entrada: { neto: 64554, radnoVreme: 100 },
    esperado: { bruto: 87206.71 },
    tolerancia: 0.02,
  },
]);
