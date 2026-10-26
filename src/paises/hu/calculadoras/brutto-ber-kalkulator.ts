import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { bruttoNettobol } from "../lib/ber";

export default definirCalculadora({
  id: "hu.brutto-ber-kalkulator",
  mercado: "hu",
  concepto: "propio",
  slug: "brutto-ber-kalkulator",
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
    { id: "netto", tipo: "moneda", etiqueta: "Kívánt havi nettó bér", min: 0, porDefecto: 400000 },
    { id: "gyerekek", tipo: "entero", etiqueta: "Gyermekek, akik után családi pótlék jár", min: 0, max: 15, porDefecto: 0 },
    {
      id: "eltartottak",
      tipo: "entero",
      etiqueta: "Eltartottak száma összesen (nem kötelező)",
      ayuda: "Akkor írd be, ha a családban több eltartott van, mint kedvezményezett gyermek.",
      min: 0,
      max: 15,
      requerido: false,
    },
    { id: "alatt25", tipo: "si-no", etiqueta: "25 év alatti vagy", porDefecto: false },
    { id: "anyak", tipo: "si-no", etiqueta: "Anyák kedvezményére jogosult vagy", ayuda: "30 év alatti anya, három vagy több gyermeket nevelő anya, vagy két gyermeket nevelő anya, ha a 40. életévét 2025 után tölti be.", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.netto <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb nettó bért.", "netto");
    const sz = bruttoNettobol(
      e.netto,
      {
        anyak: e.anyak,
        alatt25: e.alatt25,
        szemelyi: false,
        elsoHazasok: false,
        gyerekek: e.gyerekek,
        eltartottak: e.eltartottak ?? e.gyerekek,
        tartosanBeteg: 0,
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
    if (sz.netto > e.netto) observaciones.push("A forintra kerekítés miatt a nettó egy-két forinttal több lehet a kértnél.");
    if (sz.brutto < enMapa(v["hu.minimalber"], "havi")) observaciones.push("Ez a bruttó kevesebb a teljes munkaidős minimálbérnél. Teljes munkaidőben ennél kevesebbet nem lehet fizetni.");
    return {
      brutto: sz.brutto,
      nettoKapott: sz.netto,
      tb: sz.tb,
      jarulekKedvezmeny: sz.jarulekKedvezmeny,
      szja: sz.szja,
      munkaltatoiKoltseg: redondear(sz.brutto + (sz.brutto * v["hu.szocho"]) / 100),
      observaciones,
    };
  },
  resultado: [
    { clave: "brutto", etiqueta: "Szükséges havi bruttó bér", formato: "moneda", destacada: true },
    { clave: "nettoKapott", etiqueta: "Ennyi nettó marad belőle", formato: "moneda" },
    { clave: "tb", etiqueta: "TB-járulék", formato: "moneda" },
    { clave: "jarulekKedvezmeny", etiqueta: "Családi járulékkedvezmény", formato: "moneda", ocultarSiCero: true },
    { clave: "szja", etiqueta: "SZJA", formato: "moneda" },
    { clave: "munkaltatoiKoltseg", etiqueta: "A munkáltató havi költsége (bér és szocho)", formato: "moneda" },
  ],
});
