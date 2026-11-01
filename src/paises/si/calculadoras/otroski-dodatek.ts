import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

const RAZREDI = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"];

export default definirCalculadora({
  id: "si.otroski-dodatek",
  mercado: "si",
  concepto: "propio",
  slug: "otroski-dodatek",
  estado: "publicado",
  requiere: { "si.otroski-dodatek": "mapa", "si.otroski-dodatek-meje": "mapa" },
  campos: [
    { id: "dohodek", tipo: "moneda", etiqueta: "Povprečni mesečni dohodek na osebo v družini", min: 0, porDefecto: 700 },
    { id: "srednjesolci", tipo: "entero", etiqueta: "Otroci v srednji šoli (do 18. leta)", min: 0, max: 12, porDefecto: 0 },
    { id: "osnovnosolci", tipo: "entero", etiqueta: "Mlajši otroci, do konca osnovne šole", min: 0, max: 12, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.srednjesolci + e.osnovnosolci < 1) throw new ErrorEntrada("Vnesite vsaj enega otroka.", "osnovnosolci");
    const meje = v["si.otroski-dodatek-meje"];
    const i = RAZREDI.findIndex((r) => e.dohodek <= enMapa(meje, r));
    if (i < 0) return { skupaj: 0, razred: null, naLeto: 0, observaciones: ["Dohodek na osebo je nad najvišjim dohodkovnim razredom, zato otroški dodatek ne pripada."] };
    const t = v["si.otroski-dodatek"];
    let skupaj = 0;
    // Zaporedje: starejši otroci so prej, zato najprej srednješolci.
    for (let k = 1; k <= e.srednjesolci + e.osnovnosolci; k++) {
      const tabela = k <= e.srednjesolci ? "s" : "o";
      skupaj += enMapa(t, `${tabela}${i + 1}-${Math.min(k, 3)}`);
    }
    return { skupaj: redondear(skupaj), razred: i + 1, naLeto: redondear(skupaj * 12), observaciones: [] as string[] };
  },
  resultado: [
    { clave: "skupaj", etiqueta: "Otroški dodatek na mesec", formato: "moneda", destacada: true },
    { clave: "razred", etiqueta: "Dohodkovni razred", formato: "numero", decimales: 0 },
    { clave: "naLeto", etiqueta: "Znesek na leto", formato: "moneda" },
  ],
});
