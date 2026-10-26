import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { paaomatuloveroLisasta } from "../lib/paaomatulo";

export default definirCalculadora({
  id: "fi.paaomatulovero",
  mercado: "fi",
  concepto: "propio",
  slug: "paaomatulovero",
  estado: "publicado",
  requiere: {
    "fi.paaomatulovero": "escala",
    "fi.hankintameno-olettama": "mapa",
    "fi.porssiosingon-veronalainen-osuus": "numero",
    "fi.luovutusten-verovapausraja": "numero",
  },
  campos: [
    {
      id: "laji",
      tipo: "opcion",
      etiqueta: "Tulon laji",
      opciones: [
        { valor: "luovutus", etiqueta: "Myyntivoitto (osakkeet, rahastot tai muu omaisuus)" },
        { valor: "osinko", etiqueta: "Pörssiyhtiön osinko" },
        { valor: "muu", etiqueta: "Muu pääomatulo (esim. vuokratulo)" },
      ],
      porDefecto: "luovutus",
    },
    { id: "myyntihinta", tipo: "moneda", etiqueta: "Myyntihinta (kulujen jälkeen)", min: 0, porDefecto: 10000, visibleSi: { laji: ["luovutus"] } },
    { id: "hankintameno", tipo: "moneda", etiqueta: "Hankintahinta ja ostokulut", min: 0, porDefecto: 6000, visibleSi: { laji: ["luovutus"] } },
    { id: "kymmenen", tipo: "si-no", etiqueta: "Omistit omaisuuden vähintään 10 vuotta", porDefecto: false, visibleSi: { laji: ["luovutus"] } },
    { id: "summa", tipo: "moneda", etiqueta: "Tulon määrä", min: 0, porDefecto: 1000, visibleSi: { laji: ["osinko", "muu"] } },
    { id: "muut", tipo: "moneda", etiqueta: "Muut pääomatulosi samana vuonna", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    const observaciones: string[] = [];
    let veronalainen = 0;
    let olettama: number | null = null;
    if (e.laji === "luovutus") {
      const hinta = e.myyntihinta ?? 0;
      if (hinta <= 0) throw new ErrorEntrada("Syötä myyntihinta, joka on suurempi kuin nolla.", "myyntihinta");
      olettama = redondear((hinta * enMapa(v["fi.hankintameno-olettama"], e.kymmenen ? "vahintaan-10" : "alle-10")) / 100);
      const vahennys = Math.max(olettama, e.hankintameno ?? 0);
      if (olettama > (e.hankintameno ?? 0)) observaciones.push("Hankintameno-olettama on todellista hankintamenoa suurempi, joten laskuri käyttää sitä.");
      veronalainen = redondear(hinta - vahennys);
      if (veronalainen < 0) observaciones.push("Myynnistä syntyi tappio, joten siitä ei makseta veroa.");
      const raja = v["fi.luovutusten-verovapausraja"];
      if (hinta <= raja) {
        observaciones.push(`Jos kaikkien vuoden aikana myymiesi omaisuuserien myyntihinnat ovat yhteensä enintään ${String(raja)} euroa, voitto on verovapaa.`);
      }
    } else {
      const summa = e.summa ?? 0;
      if (summa <= 0) throw new ErrorEntrada("Syötä tulo, joka on suurempi kuin nolla.", "summa");
      veronalainen = e.laji === "osinko" ? redondear((summa * v["fi.porssiosingon-veronalainen-osuus"]) / 100) : summa;
    }
    const vero = redondear(paaomatuloveroLisasta(v["fi.paaomatulovero"], e.muut, Math.max(0, veronalainen)));
    return {
      vero,
      veronalainen,
      olettama,
      rajavero: veronalainen > 0 && e.muut + veronalainen > v["fi.paaomatulovero"][1].desde ? v["fi.paaomatulovero"][1].tasa : v["fi.paaomatulovero"][0].tasa,
      observaciones,
    };
  },
  resultado: [
    { clave: "vero", etiqueta: "Pääomatulovero", formato: "moneda", destacada: true },
    { clave: "veronalainen", etiqueta: "Veronalainen pääomatulo", formato: "moneda" },
    { clave: "olettama", etiqueta: "Hankintameno-olettama", formato: "moneda" },
    { clave: "rajavero", etiqueta: "Ylin veroprosentti tälle tulolle", formato: "porcentaje", decimales: 0 },
  ],
});
