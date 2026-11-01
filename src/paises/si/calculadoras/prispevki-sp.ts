import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { osnovaSp, prispevkiSp } from "../lib/sp";

export default definirCalculadora({
  id: "si.prispevki-sp",
  mercado: "si",
  concepto: "propio",
  slug: "prispevki-sp",
  estado: "publicado",
  requiere: {
    "si.prispevki-sp": "mapa",
    "si.pavsalni-prispevki": "mapa",
    "si.ozp": "numero",
    "si.najnizja-osnova": "numero",
    "si.najvisja-osnova-sp": "numero",
    "si.znizanje-osnove-sp": "numero",
  },
  campos: [{ id: "dobicek", tipo: "moneda", etiqueta: "Letni dobiček brez prispevkov", min: 0, porDefecto: 30000, ayuda: "Pri vnosu 0 dobite najnižjo osnovo." }],
  calcular(e, v, { redondear }) {
    if (e.dobicek < 0) throw new ErrorEntrada("Dobiček ne more biti negativen.", "dobicek");
    const osnova = redondear(osnovaSp(e.dobicek, v["si.znizanje-osnove-sp"], v["si.najnizja-osnova"], v["si.najvisja-osnova-sp"]));
    const p = prispevkiSp(osnova, v["si.prispevki-sp"], v["si.ozp"], redondear);
    return { skupaj: p.skupaj, osnova, piz: p.piz, zz: p.zz, dolg: p.dolg, drugi: p.drugi, letno: redondear(p.skupaj * 12) };
  },
  resultado: [
    { clave: "skupaj", etiqueta: "Prispevki na mesec", formato: "moneda", destacada: true },
    { clave: "osnova", etiqueta: "Zavarovalna osnova", formato: "moneda" },
    { clave: "piz", etiqueta: "Pokojninsko in invalidsko zavarovanje", formato: "moneda" },
    { clave: "zz", etiqueta: "Zdravstvo z OZP in poškodbami pri delu", formato: "moneda" },
    { clave: "dolg", etiqueta: "Dolgotrajna oskrba", formato: "moneda" },
    { clave: "drugi", etiqueta: "Starševsko varstvo in zaposlovanje", formato: "moneda" },
    { clave: "letno", etiqueta: "Prispevki na leto", formato: "moneda" },
  ],
});
