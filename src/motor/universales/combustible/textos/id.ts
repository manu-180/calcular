import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosId: TextosUi<UiCombustible> = {
  slug: "kalkulator-biaya-bensin",
  ui: () => ({
    distancia: (u) => `Jarak perjalanan (${u})`,
    idaYVuelta: "Pulang pergi",
    tipoConsumo: "Cara mengukur konsumsi BBM",
    l100: "Liter per 100 km",
    kml: "Kilometer per liter (km/l)",
    consumo: "Konsumsi BBM",
    consumoMpg: "Konsumsi BBM (mil per galon)",
    consumoAyuda: "Lihat buku manual atau layar info di dasbor. Di jalan tol biasanya lebih irit daripada di dalam kota.",
    precio: (u) => (u === "L" ? "Harga per liter" : "Harga per galon"),
    personas: "Jumlah orang yang patungan",
    costo: "Biaya bensin",
    porPersona: "Per orang",
    combustible: (u) => (u === "L" ? "BBM yang dibutuhkan (liter)" : "BBM yang dibutuhkan (galon)"),
    distanciaTotal: (u) => `Jarak total (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Biaya per mil" : `Biaya per ${u}`),
    errorConsumo: "Konsumsi BBM harus lebih dari 0.",
    errorPersonas: "Minimal harus ada satu orang.",
  }),
};
