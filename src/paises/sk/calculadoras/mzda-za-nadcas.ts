import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "sk.mzda-za-nadcas",
  mercado: "sk",
  concepto: "horas-extra",
  slug: "mzda-za-nadcas",
  estado: "publicado",
  requiere: { "sk.nadcas": "mapa" },
  campos: [
    { id: "hodinova", tipo: "moneda", etiqueta: "Hodinová mzda", min: 0, porDefecto: 12 },
    { id: "priemerny", tipo: "moneda", etiqueta: "Priemerný hodinový zárobok", min: 0, porDefecto: 12 },
    { id: "hodiny", tipo: "numero", etiqueta: "Hodiny nadčasu", min: 0, porDefecto: 10 },
    { id: "druh", tipo: "opcion-dato", dato: "sk.nadcas", etiqueta: "Druh práce", porDefecto: "bezna" },
  ],
  calcular(e, v, { redondear }) {
    if (e.hodiny <= 0) throw new ErrorEntrada("Zadajte počet hodín nadčasu.", "hodiny");
    const mzda = redondear(e.hodinova * e.hodiny);
    const zvyhodnenie = redondear((e.priemerny * e.hodiny * enMapa(v["sk.nadcas"], e.druh)) / 100);
    return { spolu: redondear(mzda + zvyhodnenie), mzda, zvyhodnenie };
  },
  resultado: [
    { clave: "spolu", etiqueta: "Spolu za nadčas", formato: "moneda", destacada: true },
    { clave: "mzda", etiqueta: "Dosiahnutá mzda", formato: "moneda" },
    { clave: "zvyhodnenie", etiqueta: "Mzdové zvýhodnenie", formato: "moneda" },
  ],
});
