import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { izracunPlace, prispevkiDelodajalca, REQ_PLACA } from "../lib/placa";

export default definirCalculadora({
  id: "si.strosek-delodajalca",
  mercado: "si",
  concepto: "costo-empleador",
  slug: "strosek-delodajalca",
  estado: "publicado",
  requiere: { ...REQ_PLACA, "si.minimalna-placa": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mesečna bruto plača", min: 0, porDefecto: 2500 },
    { id: "delez", tipo: "porcentaje", etiqueta: "Delež polnega delovnega časa", min: 1, max: 100, porDefecto: 100 },
    { id: "regres", tipo: "moneda", etiqueta: "Regres za letni dopust", min: 0, requerido: false, ayuda: "Če polje pustite prazno, računamo z minimalnim regresom." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Vnesite bruto plačo, večjo od nič.", "bruto");
    const d = prispevkiDelodajalca(e.bruto, e.delez, v, redondear);
    const p = izracunPlace(e.bruto, { otroci: 0, do29: false, delez: e.delez }, v, redondear);
    const mesecno = redondear(e.bruto + d.skupaj);
    const regres = e.regres ?? redondear((v["si.minimalna-placa"] * e.delez) / 100);
    return {
      mesecno,
      lastni: d.lastni,
      zaDelavca: d.zaDelavca,
      neto: p.neto,
      regres,
      letno: redondear(mesecno * 12 + regres),
    };
  },
  resultado: [
    { clave: "mesecno", etiqueta: "Mesečni strošek delodajalca", formato: "moneda", destacada: true },
    { clave: "lastni", etiqueta: "Prispevki delodajalca", formato: "moneda" },
    { clave: "zaDelavca", etiqueta: "Prispevki delavca od razlike do najnižje osnove", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Neto plača delavca brez otrok", formato: "moneda" },
    { clave: "regres", etiqueta: "Upoštevani regres", formato: "moneda" },
    { clave: "letno", etiqueta: "Letni strošek z regresom", formato: "moneda" },
  ],
});
