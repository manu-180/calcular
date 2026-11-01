import { definirCasos } from "@/motor/calculo";
import calc from "./ellilifeyrir";

export default definirCasos(calc, [
  {
    nombre: "Engar aðrar tekjur, býr ein(n)",
    origen: { tipo: "oficial", url: "https://island.is/umsokn-um-ellilifeyri/fjarhaedir", detalle: "Fullur ellilífeyrir 365.592 og heimilisuppbót 92.384." },
    fecha: "2026-06-15",
    entrada: { atvinna: 0, adrar: 0, einn: true },
    esperado: { lifeyrir: 365592, samtals: 457976 },
  },
  {
    nombre: "300.000 kr. úr lífeyrissjóði",
    origen: { tipo: "recalculado", detalle: "300.000 - 43.658 = 256.342; x 45% = 115.354; 365.592 - 115.354 = 250.238." },
    fecha: "2026-06-15",
    entrada: { atvinna: 0, adrar: 300000, einn: false },
    esperado: { skerding: 115354, lifeyrir: 250238 },
  },
  {
    nombre: "Atvinnutekjur",
    origen: { tipo: "recalculado", detalle: "400.000 - 210.400 = 189.600; - 43.658 = 145.942; x 45% = 65.674; 365.592 - 65.674 = 299.918." },
    fecha: "2026-06-15",
    entrada: { atvinna: 400000, adrar: 0, einn: false },
    esperado: { lifeyrir: 299918 },
  },
  {
    nombre: "Tekjumörk TR",
    origen: { tipo: "oficial", url: "https://island.is/umsokn-um-ellilifeyri/fjarhaedir", detalle: "Ellilífeyrir fellur niður við 856.085 kr. tekjur á mánuði." },
    fecha: "2026-06-15",
    entrada: { atvinna: 0, adrar: 856085, einn: false },
    esperado: { lifeyrir: 0 },
  },
]);
