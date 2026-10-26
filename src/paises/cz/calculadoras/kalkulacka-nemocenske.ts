import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { dvzZMzdy, hodinovyZMesicni, redukovanyDvz, redukovanyHodinovy } from "../lib/davky";
import { nahoru } from "../lib/mzda";

export default definirCalculadora({
  id: "cz.kalkulacka-nemocenske",
  mercado: "cz",
  concepto: "propio",
  slug: "kalkulacka-nemocenske",
  estado: "publicado",
  requiere: {
    "cz.redukcni-hranice": "mapa",
    "cz.nemocenske-sazby": "mapa",
    "cz.nahrada-mzdy-nemoc": "numero",
    "cz.nahrada-mzdy-koeficient": "numero",
  },
  campos: [
    { id: "mzda", tipo: "moneda", etiqueta: "Průměrná hrubá mzda za měsíc (posledních 12 měsíců)", min: 0, porDefecto: 40000 },
    { id: "dny", tipo: "entero", etiqueta: "Délka pracovní neschopnosti v kalendářních dnech", min: 1, max: 380, porDefecto: 30 },
    {
      id: "pracovniDny",
      tipo: "entero",
      etiqueta: "Pracovní dny v prvních 14 dnech nemoci",
      ayuda: "Při pětidenním týdnu a nemoci delší než dva týdny je to 10 dní.",
      min: 0,
      max: 14,
      porDefecto: 10,
    },
    { id: "hodinTydne", tipo: "numero", etiqueta: "Týdenní pracovní doba v hodinách", min: 1, max: 60, porDefecto: 40 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mzda <= 0) throw new ErrorEntrada("Zadejte průměrnou hrubou mzdu vyšší než nula.", "mzda");
    const r = v["cz.redukcni-hranice"];
    const h = { prvni: enMapa(r, "prvni"), druha: enMapa(r, "druha"), treti: enMapa(r, "treti") };
    const phv = hodinovyZMesicni(e.mzda, e.hodinTydne);
    const nahradaZaHodinu = (redukovanyHodinovy(phv, h, v["cz.nahrada-mzdy-koeficient"]) * v["cz.nahrada-mzdy-nemoc"]) / 100;
    const hodinDenne = e.hodinTydne / 5;
    const nahradaMzdy = redondear(nahradaZaHodinu * hodinDenne * e.pracovniDny);

    const dvz = redukovanyDvz(dvzZMzdy(e.mzda), h, "nemoc");
    const s = v["cz.nemocenske-sazby"];
    const denne = (sazba: number) => nahoru((dvz * sazba) / 100);
    const pasma = [
      { od: 15, do: 30, castka: denne(enMapa(s, "do-30")) },
      { od: 31, do: 60, castka: denne(enMapa(s, "do-60")) },
      { od: 61, do: 380, castka: denne(enMapa(s, "od-61")) },
    ];
    let nemocenske = 0;
    for (const p of pasma) nemocenske += Math.max(0, Math.min(e.dny, p.do) - p.od + 1) * p.castka;
    const observaciones: string[] = [];
    if (e.dny <= 14) observaciones.push("Při nemoci do 14 dnů platí jen zaměstnavatel náhradu mzdy, nemocenské od ČSSZ nedostanete.");
    observaciones.push("Náhrada mzdy se počítá z průměrného hodinového výdělku za předchozí čtvrtletí. Kalkulačka ho odhaduje z měsíční mzdy.");
    return {
      celkem: redondear(nahradaMzdy + nemocenske),
      nahradaMzdy,
      nahradaZaDen: redondear(nahradaZaHodinu * hodinDenne),
      nemocenske,
      nemocenskeDenne: pasma[0].castka,
      dvz,
      observaciones,
    };
  },
  resultado: [
    { clave: "celkem", etiqueta: "Celkem za dobu nemoci", formato: "moneda", destacada: true },
    { clave: "nahradaMzdy", etiqueta: "Náhrada mzdy od zaměstnavatele (prvních 14 dní)", formato: "moneda" },
    { clave: "nahradaZaDen", etiqueta: "Náhrada mzdy za jeden pracovní den", formato: "moneda" },
    { clave: "nemocenske", etiqueta: "Nemocenské od ČSSZ (od 15. dne)", formato: "moneda" },
    { clave: "nemocenskeDenne", etiqueta: "Nemocenské za kalendářní den (15. až 30. den)", formato: "moneda" },
    { clave: "dvz", etiqueta: "Redukovaný denní vyměřovací základ", formato: "moneda" },
  ],
});
