import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_REGION } from "../lib/plata";

export default definirCalculadora({
  id: "ba.prekovremeni-rad",
  mercado: "ba",
  concepto: "horas-extra",
  slug: "prekovremeni-rad",
  estado: "publicado",
  requiere: { "ba.uvecanje-rs": "mapa", "ba.prekovremeno-sedmicno-fbih": "numero" },
  campos: [
    CAMPO_REGION,
    { id: "plata", tipo: "moneda", etiqueta: "Mjesečna osnovna plata", min: 0, porDefecto: 1500 },
    { id: "fond", tipo: "numero", etiqueta: "Radni sati u mjesecu", min: 1, max: 300, porDefecto: 176 },
    { id: "sati", tipo: "numero", etiqueta: "Prekovremeni sati", min: 0, max: 200, porDefecto: 10 },
    { id: "uvecanje", tipo: "porcentaje", etiqueta: "Uvećanje iz vašeg kolektivnog ugovora ili pravilnika", min: 0, max: 200, porDefecto: 0, visibleSi: { region: ["fbih"] }, ayuda: "Zakon o radu FBiH ne propisuje procenat, pa ga morate upisati. Nula znači samo redovna satnica." },
    {
      id: "vrsta",
      tipo: "opcion-dato",
      etiqueta: "Vrsta rada",
      dato: "ba.uvecanje-rs",
      porDefecto: "prekovremeni",
      visibleSi: { region: ["rs"] },
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.plata <= 0) throw new ErrorEntrada("Unesite platu veću od nule.", "plata");
    const stopa = e.region === "rs" ? enMapa(v["ba.uvecanje-rs"], e.vrsta ?? "prekovremeni") : (e.uvecanje ?? 0);
    const satnica = redondear(e.plata / e.fond);
    const uvecanaSatnica = redondear(satnica * (1 + stopa / 100));
    const observaciones: string[] = [];
    if (e.region === "fbih" && e.uvecanje === 0) observaciones.push("Upišite procenat iz kolektivnog ugovora ili pravilnika o radu. Bez njega prikazujemo samo redovnu satnicu.");
    return { ukupno: redondear(uvecanaSatnica * e.sati), satnica, uvecanaSatnica, stopa, observaciones };
  },
  resultado: [
    { clave: "ukupno", etiqueta: "Za prekovremene sate", formato: "moneda", destacada: true },
    { clave: "satnica", etiqueta: "Redovna satnica", formato: "moneda" },
    { clave: "uvecanaSatnica", etiqueta: "Uvećana satnica", formato: "moneda" },
    { clave: "stopa", etiqueta: "Primijenjeno uvećanje", formato: "porcentaje", decimales: 0 },
  ],
});
