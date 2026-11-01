import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "sk.rodicovsky-prispevok",
  mercado: "sk",
  concepto: "propio",
  slug: "rodicovsky-prispevok",
  estado: "publicado",
  requiere: { "sk.rodicovsky": "mapa", "sk.rodicovsky-navysenie": "numero" },
  campos: [
    { id: "druh", tipo: "opcion-dato", dato: "sk.rodicovsky", etiqueta: "Pred príspevkom ste poberali", porDefecto: "po-materskom" },
    { id: "deti", tipo: "entero", etiqueta: "Počet súčasne narodených detí", min: 1, max: 8, porDefecto: 1 },
    { id: "materske", tipo: "moneda", etiqueta: "Materské za celý mesiac, ak ho stále poberáte", min: 0, porDefecto: 0 },
  ],
  calcular(e, v) {
    const zaklad = enMapa(v["sk.rodicovsky"], e.druh);
    const s = zaklad * (1 + (v["sk.rodicovsky-navysenie"] * (e.deti - 1)) / 100);
    const suma = Math.round(s * 10) / 10;
    const vyplata = e.materske > 0 ? Math.max(0, Math.round((suma - e.materske) * 100) / 100) : suma;
    return { vyplata, suma, zaRok: Math.round(vyplata * 12 * 100) / 100 };
  },
  resultado: [
    { clave: "vyplata", etiqueta: "Príspevok na výplatu za mesiac", formato: "moneda", destacada: true },
    { clave: "suma", etiqueta: "Suma príspevku pred odpočítaním materského", formato: "moneda" },
    { clave: "zaRok", etiqueta: "Za 12 mesiacov", formato: "moneda" },
  ],
});
