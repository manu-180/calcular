import { definirCasos } from "@/motor/calculo";
import inflatsiisKalkulatori from "./inflatsiis-kalkulatori";

const GEO = "https://www.geostat.ge/ka/modules/categories/26/samomkhmareblo-fasebis-indeksi-inflatsia";

export default definirCasos(inflatsiisKalkulatori, [
  {
    nombre: "1000 ლარი, ერთი წელი",
    origen: { tipo: "oficial", url: GEO, detalle: "ინდექსი 2025 სექტემბერი 186,5466, 2026 სექტემბერი 196,9341: 1000 × 1,05568 = 1055,68." },
    fecha: "2026-11-01",
    entrada: { tanxa: 1000, dan: "2025-09-15", mde: "2026-09-20" },
    esperado: { axali: 1055.68, skhvaoba: 55.68, danTve: "სექტემბერი, 2025", mdeTve: "სექტემბერი, 2026" },
  },
  {
    nombre: "მომავალი თვე ბოლო მონაცემამდე ჩერდება",
    origen: { tipo: "oficial", url: GEO, detalle: "ბოლო თვე სექტემბერი, 2026; ოქტომბრის მოთხოვნა სექტემბრამდე ითვლება." },
    fecha: "2026-11-01",
    entrada: { tanxa: 1000, dan: "2025-09-01", mde: "2026-10-30" },
    esperado: { axali: 1055.68, mdeTve: "სექტემბერი, 2026" },
  },
]);
