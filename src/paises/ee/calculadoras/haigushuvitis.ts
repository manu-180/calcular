import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ee.haigushuvitis",
  mercado: "ee",
  concepto: "propio",
  slug: "haigushuvitis",
  estado: "publicado",
  requiere: {
    "ee.haigus-maar": "numero",
    "ee.hooldus-maar": "numero",
    "ee.tooonnetus-maar": "numero",
    "ee.haigus-ulempiir": "numero",
    "ee.haigus-pikim": "numero",
    "ee.hooldus-pikim": "numero",
    "ee.tulumaks": "numero",
  },
  campos: [
    {
      id: "pohjus",
      tipo: "opcion",
      etiqueta: "Töövõimetuse põhjus",
      opciones: [
        { valor: "haigus", etiqueta: "Haigus või olmetrauma" },
        { valor: "hooldus", etiqueta: "Lapse või pereliikme põetamine (hooldusleht)" },
        { valor: "too", etiqueta: "Tööõnnetus või kutsehaigus" },
      ],
      porDefecto: "haigus",
    },
    { id: "paevad", tipo: "entero", etiqueta: "Töövõimetuslehe kalendripäevad", min: 1, max: 240, porDefecto: 14 },
    { id: "aastatulu", tipo: "moneda", etiqueta: "Eelmise kalendriaasta sotsiaalmaksuga maksustatud tulu", min: 0, porDefecto: 24000 },
    { id: "kuueKuuTasu", tipo: "moneda", etiqueta: "Viimase kuue kuu töötasu kokku", ayuda: "Sellest arvutab tööandja oma osa.", min: 0, porDefecto: 12000, visibleSi: { pohjus: ["haigus"] } },
    { id: "kuueKuuPaevad", tipo: "entero", etiqueta: "Nende kuue kuu kalendripäevad", min: 1, max: 184, porDefecto: 181, visibleSi: { pohjus: ["haigus"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.paevad < 1) throw new ErrorEntrada("Päevi peab olema vähemalt üks.", "paevad");
    if (e.aastatulu < 0) throw new ErrorEntrada("Tulu ei saa olla negatiivne.", "aastatulu");
    const pikim = e.pohjus === "hooldus" ? v["ee.hooldus-pikim"] : v["ee.haigus-pikim"];
    if (e.paevad > pikim) throw new ErrorEntrada(`Selle põhjuse puhul makstakse hüvitist kuni ${pikim} kalendripäeva.`, "paevad");
    const maar = e.pohjus === "hooldus" ? v["ee.hooldus-maar"] : e.pohjus === "too" ? v["ee.tooonnetus-maar"] : v["ee.haigus-maar"];
    const esimeneTervisekassa = e.pohjus === "hooldus" ? 1 : e.pohjus === "too" ? 2 : 9;
    let tooandja = 0;
    if (e.pohjus === "haigus") {
      const tooandjaPaevi = Math.max(0, Math.min(e.paevad, 8) - 3);
      const paev = (e.kuueKuuTasu ?? 0) / (e.kuueKuuPaevad ?? 1);
      tooandja = redondear(porcentaje(paev, maar) * tooandjaPaevi);
    }
    const tervisekassaPaevi = Math.max(0, e.paevad - esimeneTervisekassa + 1);
    const paevaTulu = e.aastatulu / 365;
    const paevaHuvitis = Math.min(porcentaje(paevaTulu, maar), v["ee.haigus-ulempiir"]);
    const tervisekassa = redondear(paevaHuvitis * tervisekassaPaevi);
    const kokku = redondear(tooandja + tervisekassa);
    return {
      neto: redondear(kokku - porcentaje(kokku, v["ee.tulumaks"])),
      kokku,
      tooandja,
      tervisekassa,
      paevaHuvitis: redondear(paevaHuvitis),
      tervisekassaPaevi,
      tasustamataPaevi: e.pohjus === "haigus" ? Math.min(e.paevad, 3) : e.pohjus === "too" ? 1 : 0,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Hüvitis pärast tulumaksu", formato: "moneda", destacada: true },
    { clave: "kokku", etiqueta: "Hüvitis bruto", formato: "moneda" },
    { clave: "tooandja", etiqueta: "Tööandja maksab", formato: "moneda", ocultarSiCero: true },
    { clave: "tervisekassa", etiqueta: "Tervisekassa maksab", formato: "moneda", ocultarSiCero: true },
    { clave: "paevaHuvitis", etiqueta: "Tervisekassa hüvitis kalendripäevas", formato: "moneda" },
    { clave: "tervisekassaPaevi", etiqueta: "Tervisekassa päevad", formato: "dias", ocultarSiCero: true },
    { clave: "tasustamataPaevi", etiqueta: "Hüvitiseta päevad", formato: "dias", ocultarSiCero: true },
  ],
});
