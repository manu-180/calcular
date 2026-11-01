import { definirCalculadora, porRegion } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { CAMPO_REGION } from "../lib/plata";

export default definirCalculadora({
  id: "ba.otkazni-rok",
  mercado: "ba",
  concepto: "preaviso",
  slug: "otkazni-rok",
  estado: "publicado",
  requiere: { "ba.otkazni-radnik": "numero-por-region", "ba.otkazni-poslodavac": "numero-por-region" },
  campos: [
    CAMPO_REGION,
    {
      id: "ko",
      tipo: "opcion",
      etiqueta: "Ko otkazuje ugovor",
      opciones: [
        { valor: "radnik", etiqueta: "Radnik" },
        { valor: "poslodavac", etiqueta: "Poslodavac" },
      ],
      porDefecto: "radnik",
    },
    { id: "datum", tipo: "fecha", etiqueta: "Datum uručenja otkaza", porDefecto: "hoy" },
    { id: "ugovoreno", tipo: "entero", etiqueta: "Duži rok iz ugovora, u danima", min: 0, max: 120, porDefecto: 0, ayuda: "Ostavite 0 ako ugovor ne navodi duži rok." },
  ],
  calcular(e, v) {
    const zakonski = porRegion(e.ko === "radnik" ? v["ba.otkazni-radnik"] : v["ba.otkazni-poslodavac"], e.region);
    const dani = Math.max(zakonski, e.ugovoreno);
    const observaciones: string[] = [];
    if (e.ugovoreno > 0 && e.ugovoreno < zakonski) observaciones.push("Ugovoreni rok je kraći od zakonskog, pa važi zakonski.");
    return { dani, zakonski, kraj: sumarDias(e.datum, dani), observaciones };
  },
  resultado: [
    { clave: "kraj", etiqueta: "Zadnji dan otkaznog roka", formato: "fecha", destacada: true },
    { clave: "dani", etiqueta: "Trajanje roka", formato: "dias" },
    { clave: "zakonski", etiqueta: "Zakonski minimum", formato: "dias" },
  ],
});
