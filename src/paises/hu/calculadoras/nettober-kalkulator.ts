import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { nettoBer } from "../lib/ber";

export default definirCalculadora({
  id: "hu.nettober-kalkulator",
  mercado: "hu",
  concepto: "sueldo-neto",
  slug: "nettober-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.szja": "numero",
    "hu.tb-jarulek": "numero",
    "hu.szocho": "numero",
    "hu.fiatalok-kedvezmenye-hatar": "numero",
    "hu.csaladi-kedvezmeny": "mapa",
    "hu.csaladi-kedvezmeny-beteg": "numero",
    "hu.elso-hazasok-kedvezmenye": "numero",
    "hu.minimalber": "mapa",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Havi bruttó bér", min: 0, porDefecto: 500000 },
    {
      id: "gyerekek",
      tipo: "entero",
      etiqueta: "Gyermekek, akik után családi pótlék jár",
      ayuda: "Ők a kedvezményezett eltartottak. Ha nincs gyermeked, hagyd nullán.",
      min: 0,
      max: 15,
      porDefecto: 0,
    },
    {
      id: "eltartottak",
      tipo: "entero",
      etiqueta: "Eltartottak száma összesen (nem kötelező)",
      ayuda: "Akkor írd be, ha a családban több eltartott van, mint kedvezményezett gyermek. A több eltartott magasabb kedvezményt ad gyermekenként.",
      min: 0,
      max: 15,
      requerido: false,
    },
    { id: "tartosanBeteg", tipo: "entero", etiqueta: "Ebből tartósan beteg vagy súlyosan fogyatékos gyermek", min: 0, max: 15, porDefecto: 0 },
    { id: "alatt25", tipo: "si-no", etiqueta: "25 év alatti vagy", ayuda: "A kedvezmény abban a hónapban jár utoljára, amelyben betöltöd a 25. életévedet.", porDefecto: false },
    {
      id: "anyak",
      tipo: "si-no",
      etiqueta: "Anyák kedvezményére jogosult vagy",
      ayuda: "30 év alatti anya, négy vagy több gyermeket nevelő anya, három gyermeket nevelő anya, illetve két gyermeket nevelő anya, ha a 40. életévét 2025 után tölti be. A munkából származó jövedelmed ilyenkor SZJA-mentes.",
      porDefecto: false,
    },
    { id: "szemelyi", tipo: "si-no", etiqueta: "Súlyosan fogyatékos vagy (személyi kedvezmény)", porDefecto: false },
    { id: "elsoHazasok", tipo: "si-no", etiqueta: "Az első házasok kedvezményét te veszed igénybe", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.brutto <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb bruttó bért.", "brutto");
    if (e.tartosanBeteg > e.gyerekek) throw new ErrorEntrada("A tartósan beteg gyermekek nem lehetnek többen, mint a gyermekek.", "tartosanBeteg");
    const sz = nettoBer(
      e.brutto,
      {
        anyak: e.anyak,
        alatt25: e.alatt25,
        szemelyi: e.szemelyi,
        elsoHazasok: e.elsoHazasok,
        gyerekek: e.gyerekek,
        eltartottak: e.eltartottak ?? e.gyerekek,
        tartosanBeteg: e.tartosanBeteg,
      },
      {
        szja: v["hu.szja"],
        tb: v["hu.tb-jarulek"],
        hatar25: v["hu.fiatalok-kedvezmenye-hatar"],
        csaladi: v["hu.csaladi-kedvezmeny"],
        csaladiBeteg: v["hu.csaladi-kedvezmeny-beteg"],
        elsoHazasok: v["hu.elso-hazasok-kedvezmenye"],
        minimalber: enMapa(v["hu.minimalber"], "havi"),
      },
      redondear,
    );
    const observaciones: string[] = [];
    if (sz.csaladiKedvezmeny > sz.csaladiFelhasznalt) {
      observaciones.push(
        sz.jarulekKedvezmeny < sz.tb
          ? "A családi kedvezmény egy része nem fért bele az adóalapba. Ennek 15 százaléka a TB-járulékodat csökkenti."
          : "A családi kedvezmény az SZJA-t és a TB-járulékot is teljesen lenullázza. A fennmaradó részt a veled egy háztartásban élő házastársad vagy élettársad érvényesítheti, ha közösen veszitek igénybe vagy megosztjátok.",
      );
    }
    const levonasok = redondear(sz.tb - sz.jarulekKedvezmeny + sz.szja);
    return {
      netto: sz.netto,
      tb: sz.tb,
      jarulekKedvezmeny: sz.jarulekKedvezmeny,
      szja: sz.szja,
      levonasok,
      szjaAlap: sz.szjaAlap,
      kedvezmeny25: sz.kedvezmeny25,
      anyakKedvezmeny: sz.anyakKedvezmeny,
      szemelyiKedvezmeny: sz.szemelyiKedvezmeny,
      elsoHazasokKedvezmeny: sz.elsoHazasokKedvezmeny,
      csaladiKedvezmeny: sz.csaladiKedvezmeny,
      nettoEves: redondear(sz.netto * 12),
      munkaltatoiKoltseg: redondear(e.brutto + (e.brutto * v["hu.szocho"]) / 100),
      observaciones,
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Nettó bér havonta", formato: "moneda", destacada: true },
    { clave: "tb", etiqueta: "TB-járulék", formato: "moneda" },
    { clave: "jarulekKedvezmeny", etiqueta: "Családi járulékkedvezmény", formato: "moneda", ocultarSiCero: true },
    { clave: "szja", etiqueta: "Személyi jövedelemadó (SZJA)", formato: "moneda" },
    { clave: "levonasok", etiqueta: "Levonások összesen", formato: "moneda" },
    { clave: "szjaAlap", etiqueta: "Az SZJA alapja a kedvezmények után", formato: "moneda" },
    { clave: "anyakKedvezmeny", etiqueta: "Anyák kedvezménye", formato: "moneda", ocultarSiCero: true },
    { clave: "kedvezmeny25", etiqueta: "25 év alattiak kedvezménye", formato: "moneda", ocultarSiCero: true },
    { clave: "szemelyiKedvezmeny", etiqueta: "Személyi kedvezmény", formato: "moneda", ocultarSiCero: true },
    { clave: "elsoHazasokKedvezmeny", etiqueta: "Első házasok kedvezménye", formato: "moneda", ocultarSiCero: true },
    { clave: "csaladiKedvezmeny", etiqueta: "Családi kedvezmény (adóalap-csökkentés)", formato: "moneda", ocultarSiCero: true },
    { clave: "nettoEves", etiqueta: "Nettó bér egy évre", formato: "moneda" },
    { clave: "munkaltatoiKoltseg", etiqueta: "A munkáltató havi költsége (bér és szocho)", formato: "moneda" },
  ],
  mundo: {
    bruto: "brutto",
    periodoBruto: "mes",
    neto: "netto",
    periodoNeto: "mes",
    entrada: { gyerekek: 0, tartosanBeteg: 0, alatt25: false, anyak: false, szemelyi: false, elsoHazasok: false },
  },
});
