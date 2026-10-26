import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { fluturas, leuSus } from "../lib/fiscal";
import { parametriSalariu, REQ_SALARIU } from "../lib/parametri";

export default definirCalculadora({
  id: "ro.salariul-minim",
  mercado: "ro",
  concepto: "salario-minimo",
  slug: "salariul-minim",
  estado: "publicado",
  requiere: { ...REQ_SALARIU, "ro.cam": "numero", "ro.salariu-minim-orar": "numero", "ro.ore-lunare-salariu-minim": "numero" },
  campos: [
    { id: "ore", tipo: "numero", etiqueta: "Ore de lucru pe zi în contract", min: 1, max: 8, porDefecto: 8, ayuda: "8 ore înseamnă normă întreagă." },
  ],
  calcular(e, v) {
    if (e.ore <= 0 || e.ore > 8) throw new ErrorEntrada("Introduceți între 1 și 8 ore pe zi.", "ore");
    const p = parametriSalariu(v);
    const sm = v["ro.salariu-minim"];
    const f = fluturas(sm, { persoane: 0, sub26: false, copiiScoala: 0, laSalariulMinim: true }, p);
    const cam = leuSus(((sm - f.sumaNeimpozabila) * v["ro.cam"]) / 100);
    const proportional = Number(((sm * e.ore) / 8).toFixed(2));
    const observaciones: string[] = [];
    if (e.ore < 8) {
      observaciones.push("La normă parțială brutul se calculează proporțional. Netul și costul de mai jos sunt pentru normă întreagă.");
    }
    return {
      brut: proportional,
      orar: v["ro.salariu-minim-orar"],
      oreLuna: v["ro.ore-lunare-salariu-minim"],
      net: f.net,
      sumaNeimpozabila: f.sumaNeimpozabila,
      cost: sm + cam,
      anual: Number((sm * 12).toFixed(2)),
      observaciones,
    };
  },
  resultado: [
    { clave: "brut", etiqueta: "Salariul minim brut pe lună pentru programul ales", formato: "moneda", destacada: true },
    { clave: "orar", etiqueta: "Salariul minim brut pe oră", formato: "moneda", decimales: 3 },
    { clave: "oreLuna", etiqueta: "Ore pe lună folosite de hotărâre (în medie)", formato: "numero", decimales: 3 },
    { clave: "net", etiqueta: "Salariul minim net (normă întreagă)", formato: "moneda" },
    { clave: "sumaNeimpozabila", etiqueta: "Suma neimpozabilă inclusă", formato: "moneda", ocultarSiCero: true },
    { clave: "cost", etiqueta: "Cost total pentru angajator (normă întreagă)", formato: "moneda" },
    { clave: "anual", etiqueta: "Salariul minim brut pe an", formato: "moneda" },
  ],
});
