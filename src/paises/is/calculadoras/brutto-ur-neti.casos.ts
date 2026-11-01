import { definirCasos } from "@/motor/calculo";
import calc from "./brutto-ur-neti";

export default definirCasos(calc, [
  {
    nombre: "Dæmi Skattsins, öfugt",
    origen: { tipo: "oficial", url: "https://www.skatturinn.is/media/2026/rsk_0601_1_2026.is.pdf", detalle: "600.000 kr. laun gefa 462.047 kr. útborguð eftir 24.000 iðgjald og 113.953 staðgreiðslu. Námundun getur skilað krónu minna." },
    fecha: "2026-06-15",
    entrada: { neto: 462047, sereign: 0, nyting: 100 },
    esperado: { heildarlaun: 600000 },
    tolerancia: 2,
  },
  {
    nombre: "Undir skattleysismörkum",
    origen: { tipo: "recalculado", detalle: "192.000 útborgað: laun 200.000, 4% iðgjald 8.000, engin staðgreiðsla." },
    fecha: "2026-06-15",
    entrada: { neto: 192000, sereign: 0, nyting: 100 },
    esperado: { heildarlaun: 200000 },
    tolerancia: 1,
  },
]);
