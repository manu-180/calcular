import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hu.csed-kalkulator",
  mercado: "hu",
  concepto: "propio",
  slug: "csed-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.csed": "numero",
    "hu.csed-napok": "numero",
  },
  campos: [
    { id: "havi", tipo: "moneda", etiqueta: "Havi bruttó átlagkereset a szülés előtt", min: 0, porDefecto: 500000 },
    { id: "napok", tipo: "entero", etiqueta: "Hány napra kapod a CSED-et?", ayuda: "A CSED legfeljebb a szülés napjától számított 168 napig jár.", min: 1, max: 400, porDefecto: 168 },
  ],
  calcular(e, v, { redondear }) {
    if (e.havi <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb átlagkeresetet.", "havi");
    const observaciones: string[] = [];
    let napok = e.napok;
    if (napok > v["hu.csed-napok"]) {
      napok = v["hu.csed-napok"];
      observaciones.push("A CSED legfeljebb 168 napig jár, ezért ennyivel számoltunk. Koraszülött gyermeknél ez a korlát nem érvényes.");
    }
    const napi = redondear(((e.havi / 30) * v["hu.csed"]) / 100);
    const osszes = redondear(napi * napok);
    observaciones.push("A CSED a 2025. június 30. után folyósított összegektől SZJA-mentes, ezért a teljes összeget megkapod.");
    observaciones.push("A napi alapot a havi átlagkereset harmincad részével közelítjük. A pontos összeget a korábbi jövedelmeidből állapítják meg.");
    return { osszes, havi: redondear(napi * 30), napi, napok, observaciones };
  },
  resultado: [
    { clave: "osszes", etiqueta: "CSED összesen", formato: "moneda", destacada: true },
    { clave: "havi", etiqueta: "CSED egy hónapra (30 nap)", formato: "moneda" },
    { clave: "napi", etiqueta: "CSED naponta", formato: "moneda" },
    { clave: "napok", etiqueta: "Napok száma", formato: "dias" },
  ],
});
