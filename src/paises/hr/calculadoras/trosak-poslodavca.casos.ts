import { definirCasos } from "@/motor/calculo";
import calc from "./trosak-poslodavca";

const U = "https://porezna-uprava.gov.hr/sdg/Stranice/doprinosi_radni_odnos_JDP.aspx";

export default definirCasos(calc, [
  {
    nombre: "Bruto 2.000 eura",
    origen: { tipo: "recalculado", url: U, detalle: "Zdravstveno 16,5 % = 330; trošak 2.330; godišnje 27.960; neto u Zagrebu 1.370." },
    fecha: "2026-11-01",
    entrada: { bruto: 2000, neoporezivo: 0, grad: "zagreb", drugiStup: true },
    esperado: { zdravstveno: 330, mjesecno: 2330, godisnje: 27960, neto: 1370 },
  },
  {
    nombre: "S neoporezivih 100 eura",
    origen: { tipo: "recalculado", url: U, detalle: "Trošak 2.330 + 100 = 2.430; radnik 1.370 + 100 = 1.470." },
    fecha: "2026-11-01",
    entrada: { bruto: 2000, neoporezivo: 100, grad: "zagreb", drugiStup: true },
    esperado: { mjesecno: 2430, neto: 1470 },
  },
]);
