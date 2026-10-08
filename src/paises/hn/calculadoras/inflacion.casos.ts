import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

const BCH = "https://www.bch.hn/_api/web/lists(guid'de39aaba-3f0c-4a14-a5e5-ce7827f2ad4d')/items?$select=Fecha,Valor1,Valor2,Valor3&$top=500";

export default definirCasos(inflacion, [
  {
    nombre: "Mil lempiras de diciembre 2025 llevados a agosto 2026",
    origen: { tipo: "oficial", url: BCH, detalle: "BCH: inflación acumulada a agosto 2026 = 4.78 %. L1,000 × 1.0478 = L1,047.80; mensual publicada: 0.79 %. Interanual: el BCH publica 6.20 % y el índice armado con acumuladas da 6.21 % (redondeo de las acumuladas)." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2025-12-31", hasta: "2026-08-01" },
    esperado: { montoActualizado: 1047.8, variacionAcumulada: 4.78, variacionInteranual: 6.21, variacionMensual: 0.79, mesDestino: "agosto de 2026" },
  },
  {
    nombre: "Desde la base del índice armado (diciembre 2020 = 100)",
    origen: { tipo: "recalculado", detalle: "Cadena de acumuladas de diciembre del BCH (2021: 5.32 %, 2022: 9.80 %, 2023: 5.19 %, 2024: 3.88 %, 2025: 4.98 %) y agosto 2026: 4.78 %. Índice = 138.9967. L500 × 1.389967 = L694.98." },
    fecha: "2026-10-08",
    entrada: { monto: 500, desde: "2020-12-01", hasta: "2026-08-15" },
    esperado: { montoActualizado: 694.98, indiceOrigen: 100, indiceDestino: 138.9967 },
  },
  {
    nombre: "Un mes sin dato publicado usa el último disponible",
    origen: { tipo: "recalculado", detalle: "Al 8/10/2026 el último dato del BCH es agosto 2026. Julio a agosto: 138.9967 / 137.9089 = 1.00789. L1,000 → L1,007.89." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2026-07-01", hasta: "2026-10-08" },
    esperado: { montoActualizado: 1007.89, mesDestino: "agosto de 2026" },
  },
  {
    nombre: "Un mes anterior a diciembre 2020 da error",
    origen: { tipo: "recalculado", detalle: "La lista del BCH empieza en enero 2021; la base del índice es diciembre 2020." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2020-11-30", hasta: "2026-08-01" },
    esperaError: true,
  },
]);
