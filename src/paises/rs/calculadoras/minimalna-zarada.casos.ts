import { definirCasos } from "@/motor/calculo";
import minimalnaZarada from "./minimalna-zarada";

const MF = "https://www.mfin.gov.rs/sr/aktivnosti-1/mali-vlada-u-etvrtak-donosi-odluku-o-redovnom-poveanju-minimalne-zarade-na-551-evro-od-1-januara-2026-godine-1";
const VL = "https://www.srbija.gov.rs/vest/994489/vlada-usvojila-predlog-zakona-o-rebalansu-budzeta-za-2026-godinu.php";

export default definirCasos(minimalnaZarada, [
  {
    nombre: "2026, 174 časa",
    origen: { tipo: "oficial", url: MF, detalle: "Ministarstvo finansija: 371 dinar po času, mesečno 64.554 dinara." },
    fecha: "2026-10-31",
    entrada: { casova: 174 },
    esperado: { neto: 64554, cenaCasa: 371, bruto: 87206.71 },
    tolerancia: 0.02,
  },
  {
    nombre: "2027, 174 časa",
    origen: { tipo: "oficial", url: VL, detalle: "Vlada: 405 dinara po radnom času, oko 70.470 dinara mesečno." },
    fecha: "2027-01-15",
    entrada: { casova: 174 },
    esperado: { neto: 70470, cenaCasa: 405 },
  },
  {
    nombre: "Poslednji dan 2026 još važi 371",
    origen: { tipo: "recalculado", url: MF, detalle: "184 časa puta 371 = 68.264." },
    fecha: "2026-12-31",
    entrada: { casova: 184 },
    esperado: { neto: 68264 },
  },
]);
