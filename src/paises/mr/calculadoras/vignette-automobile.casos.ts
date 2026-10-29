import { definirCasos } from "@/motor/calculo";
import calculadora from "./vignette-automobile";

export default definirCasos(calculadora, [
  {
    nombre: "Uso personal 8 CV",
    origen: { tipo: "recalculado", detalle: "Art. 140 CGI: de 8 a 11 CV, uso personal, 2.970 MRU." },
    fecha: "2026-10-29",
    entrada: { usage: "perso", cv: 8, vehicules: 1 },
    esperado: { total: 2970, unitaire: 2970 },
  },
  {
    nombre: "Tres vehículos de transporte de 17 CV o más",
    origen: { tipo: "recalculado", detalle: "Transporte público, 17 CV o más: 3.600 x 3 = 10.800." },
    fecha: "2026-10-29",
    entrada: { usage: "transport", cv: 20, vehicules: 3 },
    esperado: { total: 10800, unitaire: 3600 },
  },
  {
    nombre: "Bordes de tramo: 4, 7, 12 y 16 CV",
    origen: { tipo: "recalculado", detalle: "4 CV personal 1.620." },
    fecha: "2026-10-29",
    entrada: { usage: "perso", cv: 4, vehicules: 1 },
    esperado: { unitaire: 1620 },
  },
  {
    nombre: "7 CV personal",
    origen: { tipo: "recalculado", detalle: "De 5 a 7 CV: 2.250." },
    fecha: "2026-10-29",
    entrada: { usage: "perso", cv: 7, vehicules: 1 },
    esperado: { unitaire: 2250 },
  },
  {
    nombre: "12 CV transporte",
    origen: { tipo: "recalculado", detalle: "De 12 a 16 CV transporte: 2.400." },
    fecha: "2026-10-29",
    entrada: { usage: "transport", cv: 12, vehicules: 1 },
    esperado: { unitaire: 2400 },
  },
  {
    nombre: "16 CV personal",
    origen: { tipo: "recalculado", detalle: "De 12 a 16 CV personal: 4.050." },
    fecha: "2026-10-29",
    entrada: { usage: "perso", cv: 16, vehicules: 1 },
    esperado: { unitaire: 4050 },
  },
]);
