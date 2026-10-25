import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { bazaCassTrepte, leu } from "../lib/fiscal";

export default definirCalculadora({
  id: "ro.calculator-cass",
  mercado: "ro",
  concepto: "propio",
  slug: "calculator-cass",
  estado: "publicado",
  requiere: {
    "ro.cass": "numero",
    "ro.plafoane-cass": "mapa",
    "ro.salariu-minim-1-ianuarie": "numero",
    "ro.forfetar-chirii": "numero",
    "ro.impozit-dividende": "numero",
    "ro.impozit-dobanzi": "numero",
    "ro.forfetar-drepturi-autor": "numero",
  },
  campos: [
    { id: "chirii", tipo: "moneda", etiqueta: "Chirii încasate în an (brut)", min: 0, porDefecto: 0 },
    { id: "dividende", tipo: "moneda", etiqueta: "Dividende brute", min: 0, porDefecto: 0 },
    { id: "dobanzi", tipo: "moneda", etiqueta: "Dobânzi brute la depozite", min: 0, porDefecto: 0 },
    { id: "drepturi", tipo: "moneda", etiqueta: "Drepturi de autor brute", min: 0, porDefecto: 0 },
    { id: "altele", tipo: "moneda", etiqueta: "Alte venituri nete (câștiguri din acțiuni, alte surse)", min: 0, porDefecto: 0 },
  ],
  calcular(e, v) {
    const netChirii = e.chirii - leu((e.chirii * v["ro.forfetar-chirii"]) / 100);
    const netDividende = e.dividende - leu((e.dividende * v["ro.impozit-dividende"]) / 100);
    const netDobanzi = e.dobanzi - leu((e.dobanzi * v["ro.impozit-dobanzi"]) / 100);
    const netDrepturi = e.drepturi - leu((e.drepturi * v["ro.forfetar-drepturi-autor"]) / 100);
    const total = netChirii + netDividende + netDobanzi + netDrepturi + e.altele;
    if (total <= 0) throw new ErrorEntrada("Introduceți cel puțin un venit.", "chirii");
    const sm = v["ro.salariu-minim-1-ianuarie"];
    const bazaCass = bazaCassTrepte(total, sm, v["ro.plafoane-cass"]);
    const cass = leu((bazaCass * v["ro.cass"]) / 100);
    return {
      cass,
      bazaCass,
      total,
      prag: (v["ro.plafoane-cass"].minim ?? 0) * sm,
      observaciones: bazaCass === 0 ? ["Totalul este sub primul prag, deci nu datorați CASS pentru aceste venituri."] : [],
    };
  },
  resultado: [
    { clave: "cass", etiqueta: "CASS de plată pentru an", formato: "moneda", destacada: true },
    { clave: "bazaCass", etiqueta: "Baza CASS (treapta)", formato: "moneda" },
    { clave: "total", etiqueta: "Total venituri nete luate în calcul", formato: "moneda" },
    { clave: "prag", etiqueta: "Primul prag de la care se plătește CASS", formato: "moneda" },
  ],
});
