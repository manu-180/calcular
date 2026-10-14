import { definirCasos } from "@/motor/calculo";
import ueberstundenRechner from "./ueberstunden-rechner";

export default definirCasos(ueberstundenRechner, [
  {
    nombre: "3500 Euro, 40 Stunden, 10 Überstunden mit 25 % Zuschlag",
    origen: { tipo: "recalculado", detalle: "Stundenlohn 3500 × 3 / (13 × 40) = 20,19. Grund 20,19 × 10 = 201,90; Zuschlag 25 % = 50,48; zusammen 252,38." },
    fecha: "2026-10-14",
    entrada: { brutto: 3500, wochenstunden: 40, stunden: 10, zuschlag: 25 },
    esperado: { stundenlohn: 20.19, grund: 201.9, zuschlag: 50.48, gesamt: 252.38 },
  },
  {
    nombre: "Teilzeit ohne Zuschlag",
    origen: { tipo: "recalculado", detalle: "1800 × 3 / (13 × 20) = 20,77; 6 Stunden = 124,62." },
    fecha: "2026-10-14",
    entrada: { brutto: 1800, wochenstunden: 20, stunden: 6, zuschlag: 0 },
    esperado: { stundenlohn: 20.77, gesamt: 124.62 },
  },
]);
