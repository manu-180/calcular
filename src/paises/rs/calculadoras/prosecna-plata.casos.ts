import { definirCasos } from "@/motor/calculo";
import prosecnaPlata from "./prosecna-plata";

const ZAR = "https://publikacije.stat.gov.rs/G2026/Html/G20261285.html";

export default definirCasos(prosecnaPlata, [
  {
    nombre: "Plata 100.000 prema proseku za avgust 2026",
    origen: { tipo: "oficial", url: ZAR, detalle: "RZS: neto 117.282, bruto 161.953. 100.000 / 117.282 = 85,26 %; razlika -17.282." },
    fecha: "2026-10-31",
    entrada: { neto: 100000 },
    esperado: { prosekNeto: 117282, prosekBruto: 161953, razlika: -17282 },
  },
]);
