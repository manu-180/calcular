import { definirCasos } from "@/motor/calculo";
import calculadora from "./kurs-jisdor";

export default definirCasos(calculadora, [
  {
    nombre: "USD 100 dengan JISDOR 23 Oktober 2026",
    origen: { tipo: "oficial", url: "https://www.bi.go.id/id/statistik/informasi-kurs/jisdor/default.aspx", detalle: "JISDOR 23 Oktober 2026 Rp18.069,00. 100 x 18.069 = 1.806.900." },
    fecha: "2026-10-24",
    entrada: { arah: "usd-idr", jumlah: 100 },
    esperado: { hasil: 1806900, kurs: 18069, fecha: "2026-10-23" },
  },
  {
    nombre: "Rp10 juta ke dolar AS",
    origen: { tipo: "recalculado", detalle: "10.000.000 / 18.069 = 553,43." },
    fecha: "2026-10-24",
    entrada: { arah: "idr-usd", jumlah: 10000000 },
    esperado: { hasil: 553.43 },
  },
]);
