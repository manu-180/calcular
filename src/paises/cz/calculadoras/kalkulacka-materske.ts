import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { dvzZMzdy, redukovanyDvz } from "../lib/davky";
import { nahoru } from "../lib/mzda";

export default definirCalculadora({
  id: "cz.kalkulacka-materske",
  mercado: "cz",
  concepto: "propio",
  slug: "kalkulacka-materske",
  estado: "publicado",
  requiere: {
    "cz.redukcni-hranice": "mapa",
    "cz.ppm-sazba": "numero",
    "cz.ppm-podpurci-doba": "mapa",
  },
  campos: [
    { id: "mzda", tipo: "moneda", etiqueta: "Průměrná hrubá mzda za měsíc (posledních 12 měsíců)", min: 0, porDefecto: 40000 },
    { id: "deti", tipo: "opcion-dato", dato: "cz.ppm-podpurci-doba", etiqueta: "Počet narozených dětí", porDefecto: "jedno" },
  ],
  calcular(e, v, { redondear }) {
    if (e.mzda <= 0) throw new ErrorEntrada("Zadejte průměrnou hrubou mzdu vyšší než nula.", "mzda");
    const r = v["cz.redukcni-hranice"];
    const dvz = redukovanyDvz(dvzZMzdy(e.mzda), { prvni: enMapa(r, "prvni"), druha: enMapa(r, "druha"), treti: enMapa(r, "treti") }, "materstvi");
    const denne = nahoru((dvz * v["cz.ppm-sazba"]) / 100);
    const tydny = enMapa(v["cz.ppm-podpurci-doba"], e.deti);
    return {
      celkem: denne * tydny * 7,
      denne,
      mesicne: denne * 30,
      tydny,
      dvz,
      observaciones: [
        "Peněžitou pomoc v mateřství můžete začít čerpat od 8. do 6. týdne před očekávaným porodem. Nárok máte po 270 dnech pojištění v posledních dvou letech.",
      ],
    };
  },
  resultado: [
    { clave: "celkem", etiqueta: "Peněžitá pomoc v mateřství celkem", formato: "moneda", destacada: true },
    { clave: "denne", etiqueta: "Za kalendářní den", formato: "moneda" },
    { clave: "mesicne", etiqueta: "Za 30 dní", formato: "moneda" },
    { clave: "tydny", etiqueta: "Délka čerpání", formato: "semanas", decimales: 0 },
    { clave: "dvz", etiqueta: "Redukovaný denní vyměřovací základ", formato: "moneda" },
  ],
});
