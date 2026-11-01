import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.zimski-regres",
  mercado: "si",
  concepto: "propio",
  slug: "zimski-regres",
  estado: "publicado",
  requiere: { "si.minimalna-placa": "numero", "si.zimski-regres-delez": "numero" },
  campos: [
    { id: "meseci", tipo: "entero", etiqueta: "Meseci zaposlitve pri delodajalcu v letu", min: 1, max: 12, porDefecto: 12 },
    { id: "delez", tipo: "porcentaje", etiqueta: "Delež polnega delovnega časa", min: 1, max: 100, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.meseci < 1 || e.meseci > 12) throw new ErrorEntrada("Vnesite od 1 do 12 mesecev.", "meseci");
    const polni = redondear((v["si.minimalna-placa"] * v["si.zimski-regres-delez"]) / 100);
    return { znesek: redondear(polni * (e.delez / 100) * (e.meseci / 12)), polni };
  },
  resultado: [
    { clave: "znesek", etiqueta: "Zimski regres", formato: "moneda", destacada: true },
    { clave: "polni", etiqueta: "Polni znesek za vse leto in poln delovni čas", formato: "moneda" },
  ],
});
