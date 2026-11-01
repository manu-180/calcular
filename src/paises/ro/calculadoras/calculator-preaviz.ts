import { definirCalculadora, enMapa } from "@/motor/calculo";
import { dupaZileLucratoare } from "../lib/zile";

export default definirCalculadora({
  id: "ro.calculator-preaviz",
  mercado: "ro",
  concepto: "preaviso",
  slug: "calculator-preaviz",
  estado: "borrador",
  requiere: { "ro.preaviz": "mapa" },
  campos: [
    { id: "tip", tipo: "opcion-dato", dato: "ro.preaviz", etiqueta: "Situația", porDefecto: "demisie" },
    { id: "data", tipo: "fecha", etiqueta: "Data la care se comunică demisia sau concedierea", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    const zile = enMapa(v["ro.preaviz"], e.tip);
    return {
      zile,
      ultimaZi: dupaZileLucratoare(e.data, zile),
      observaciones: ["Calculul sare peste sâmbete și duminici, dar nu și peste sărbătorile legale. Contractul poate prevedea un preaviz mai lung la concediere sau mai scurt la demisie, în limitele legii."],
    };
  },
  resultado: [
    { clave: "ultimaZi", etiqueta: "Ultima zi a preavizului (estimată)", formato: "fecha", destacada: true },
    { clave: "zile", etiqueta: "Durata preavizului (zile lucrătoare)", formato: "numero", decimales: 0 },
  ],
});
