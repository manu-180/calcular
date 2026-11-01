import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, esFechaISO } from "@/motor/vigencia";

function potszabadsagEletkor(eletkor: number, tabla: Readonly<Record<string, number>>): number {
  let nap = 0;
  for (const [kor, ertek] of Object.entries(tabla)) if (eletkor >= Number(kor)) nap = Math.max(nap, ertek);
  return nap;
}

export default definirCalculadora({
  id: "hu.szabadsag-kalkulator",
  mercado: "hu",
  concepto: "vacaciones",
  slug: "szabadsag-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.alapszabadsag": "numero",
    "hu.potszabadsag-eletkor": "mapa",
    "hu.potszabadsag-gyermek": "mapa",
    "hu.potszabadsag-egyeb": "mapa",
  },
  campos: [
    { id: "ev", tipo: "entero", etiqueta: "Melyik évre számolsz?", min: 2000, max: 2100, porDefecto: 2026 },
    { id: "szuletesiEv", tipo: "entero", etiqueta: "Születési éved", min: 1940, max: 2015, porDefecto: 1990 },
    {
      id: "gyerekek",
      tipo: "entero",
      etiqueta: "16 év alatti gyermekeid száma",
      ayuda: "Az a gyermek is számít, aki idén született, vagy idén tölti be a 16. életévét.",
      min: 0,
      max: 15,
      porDefecto: 0,
    },
    { id: "fogyatekos", tipo: "entero", etiqueta: "Ebből fogyatékos gyermek", min: 0, max: 15, porDefecto: 0 },
    { id: "megvaltozott", tipo: "si-no", etiqueta: "Megváltozott munkaképességű vagy, vagy vakok személyi járadékában részesülsz", porDefecto: false },
    { id: "kezdete", tipo: "fecha", etiqueta: "A munkaviszony kezdete, ha az idén kezdődött", requerido: false },
    { id: "vege", tipo: "fecha", etiqueta: "A munkaviszony vége, ha az idén ér véget", requerido: false },
  ],
  calcular(e, v) {
    const eletkor = e.ev - e.szuletesiEv;
    if (eletkor < 14) throw new ErrorEntrada("Ezzel a születési évvel még nem lehetsz munkavállaló.", "szuletesiEv");
    if (e.fogyatekos > e.gyerekek) throw new ErrorEntrada("A fogyatékos gyermekek nem lehetnek többen, mint a gyermekek.", "fogyatekos");
    const alap = v["hu.alapszabadsag"];
    const korSzerint = potszabadsagEletkor(eletkor, v["hu.potszabadsag-eletkor"]);
    const gy = v["hu.potszabadsag-gyermek"];
    const gyermek = (e.gyerekek >= 3 ? enMapa(gy, "3") : e.gyerekek > 0 ? enMapa(gy, String(e.gyerekek)) : 0) + e.fogyatekos * enMapa(gy, "fogyatekos");
    const fiatal = eletkor <= 18 ? enMapa(v["hu.potszabadsag-egyeb"], "fiatal") : 0;
    const egyeb = e.megvaltozott ? enMapa(v["hu.potszabadsag-egyeb"], "megvaltozott") : 0;
    const teljes = alap + korSzerint + gyermek + fiatal + egyeb;

    const evEleje = `${e.ev}-01-01`;
    const evVege = `${e.ev}-12-31`;
    if (!esFechaISO(evEleje) || !esFechaISO(evVege)) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    const tol = e.kezdete && e.kezdete > evEleje ? e.kezdete : evEleje;
    const ig = e.vege && e.vege < evVege ? e.vege : evVege;
    if ((e.kezdete && e.kezdete > evVege) || (e.vege && e.vege < evEleje)) throw new ErrorEntrada("A dátumok nem a választott évre esnek.", "kezdete");
    if (tol > ig) throw new ErrorEntrada("A munkaviszony vége nem lehet a kezdete előtt.", "vege");
    const napokEvben = diasEntre(evEleje, evVege) + 1;
    const napok = diasEntre(tol, ig) + 1;
    const aranyos = napok < napokEvben ? Math.floor((teljes * napok) / napokEvben + 0.5) : null;
    const observaciones: string[] = [];
    if (aranyos !== null) observaciones.push("Év közben kezdődő vagy megszűnő munkaviszonynál a szabadság arányos része jár. A fél napot elérő töredéknap egész napnak számít.");
    observaciones.push("Az apasági szabadság és a szülői szabadság ezen felül jár, nem része az éves szabadságnak.");
    return {
      osszes: aranyos ?? teljes,
      teljes,
      alap,
      korSzerint,
      gyermek,
      fiatal,
      egyeb,
      eletkor,
      aranyos,
      observaciones,
    };
  },
  resultado: [
    { clave: "osszes", etiqueta: "Ennyi szabadság jár neked", formato: "dias", destacada: true },
    { clave: "teljes", etiqueta: "Egész évre", formato: "dias" },
    { clave: "alap", etiqueta: "Alapszabadság", formato: "dias" },
    { clave: "korSzerint", etiqueta: "Pótszabadság az életkorod szerint", formato: "dias" },
    { clave: "gyermek", etiqueta: "Pótszabadság a gyermekeid után", formato: "dias", ocultarSiCero: true },
    { clave: "fiatal", etiqueta: "Fiatal munkavállaló pótszabadsága", formato: "dias", ocultarSiCero: true },
    { clave: "egyeb", etiqueta: "Megváltozott munkaképesség miatti pótszabadság", formato: "dias", ocultarSiCero: true },
    { clave: "eletkor", etiqueta: "Az idén betöltött életkor", formato: "anios" },
    { clave: "aranyos", etiqueta: "Arányos szabadság a munkaviszony idejére", formato: "dias" },
  ],
});
