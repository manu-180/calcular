import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { parametri, REQ_SALARIU, salariu } from "../lib/fiscal";

export default definirCalculadora({
  id: "md.salariul-minim",
  mercado: "md",
  concepto: "salario-minimo",
  slug: "salariul-minim",
  estado: "publicado",
  requiere: { ...REQ_SALARIU, "md.salariu-minim": "numero", "md.salariu-minim-orar": "numero", "md.ore-lunare-salariu-minim": "numero" },
  campos: [
    { id: "ore", tipo: "numero", etiqueta: "Ore de lucru pe zi în contract", min: 1, max: 8, porDefecto: 8, ayuda: "8 ore pe zi înseamnă program complet." },
  ],
  calcular(e, v) {
    if (e.ore <= 0 || e.ore > 8) throw new ErrorEntrada("Introduceți între 1 și 8 ore pe zi.", "ore");
    const sm = v["md.salariu-minim"];
    const s = salariu(sm, { scutire: "personala", intretinuti: 0, intretinutiDizabilitate: 0 }, parametri(v));
    const observaciones: string[] = [];
    if (e.ore < 8) observaciones.push("La program redus salariul minim se socotește pe oră. Netul și costul de mai jos sunt pentru program complet.");
    return {
      brut: Number(((sm * e.ore) / 8).toFixed(2)),
      orar: v["md.salariu-minim-orar"],
      oreLuna: v["md.ore-lunare-salariu-minim"],
      net: s.net,
      cost: s.cost,
      anual: sm * 12,
      observaciones,
    };
  },
  resultado: [
    { clave: "brut", etiqueta: "Salariul minim brut pe lună pentru programul ales", formato: "moneda", destacada: true },
    { clave: "orar", etiqueta: "Salariul minim pe oră", formato: "moneda" },
    { clave: "oreLuna", etiqueta: "Ore pe lună la program complet (în medie)", formato: "numero", decimales: 0 },
    { clave: "net", etiqueta: "Salariul minim net, cu scutirea personală", formato: "moneda" },
    { clave: "cost", etiqueta: "Costul total pentru angajator", formato: "moneda" },
    { clave: "anual", etiqueta: "Salariul minim brut pe an", formato: "moneda" },
  ],
});
