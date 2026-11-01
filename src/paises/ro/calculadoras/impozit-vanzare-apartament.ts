import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { leu } from "../lib/fiscal";

export default definirCalculadora({
  id: "ro.impozit-vanzare-apartament",
  mercado: "ro",
  concepto: "propio",
  slug: "impozit-vanzare-apartament",
  estado: "publicado",
  requiere: { "ro.impozit-transfer-imobiliar": "mapa" },
  campos: [
    { id: "pret", tipo: "moneda", etiqueta: "Prețul de vânzare din contract", min: 0, porDefecto: 500000 },
    { id: "grila", tipo: "moneda", etiqueta: "Valoarea minimă din grila notarilor (opțional)", min: 0, requerido: false, ayuda: "Studiul de piață al camerei notarilor. Dacă prețul e mai mic, impozitul se calculează la această valoare." },
    { id: "detinere", tipo: "opcion-dato", dato: "ro.impozit-transfer-imobiliar", etiqueta: "De cât timp dețineți proprietatea", porDefecto: "peste-3-ani" },
  ],
  calcular(e, v) {
    if (e.pret <= 0) throw new ErrorEntrada("Introduceți prețul de vânzare.", "pret");
    const grila = e.grila ?? 0;
    const baza = Math.max(e.pret, grila);
    const cota = enMapa(v["ro.impozit-transfer-imobiliar"], e.detinere);
    const impozit = leu((baza * cota) / 100);
    const observaciones: string[] = [];
    if (grila > e.pret) observaciones.push("Prețul este sub valoarea din grila notarilor, așa că impozitul se calculează la valoarea din grilă.");
    return { impozit, baza, cota, ramas: e.pret - impozit, observaciones };
  },
  resultado: [
    { clave: "impozit", etiqueta: "Impozit la vânzare", formato: "moneda", destacada: true },
    { clave: "cota", etiqueta: "Cota aplicată", formato: "porcentaje", decimales: 0 },
    { clave: "baza", etiqueta: "Baza de calcul", formato: "moneda" },
    { clave: "ramas", etiqueta: "Vă rămân din preț după impozit", formato: "moneda" },
  ],
});
