import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

function sav(evek: number, tabla: Readonly<Record<string, number>>): string | null {
  let kulcs: string | null = null;
  for (const k of Object.keys(tabla)) if (evek >= Number(k) && (kulcs === null || Number(k) > Number(kulcs))) kulcs = k;
  return kulcs;
}

export default definirCalculadora({
  id: "hu.vegkielegites-szamitas",
  mercado: "hu",
  concepto: "indemnizacion-despido",
  slug: "vegkielegites-szamitas",
  estado: "publicado",
  requiere: {
    "hu.vegkielegites": "mapa",
    "hu.vegkielegites-emeles": "mapa",
  },
  campos: [
    {
      id: "tavolletiDij",
      tipo: "moneda",
      etiqueta: "Havi távolléti díj",
      ayuda: "Az alapbéred, a pótlékátalány és az elmúlt hat hónap rendszeres pótlékai. Ha csak alapbéred van, az alapbért írd be.",
      min: 0,
      porDefecto: 500000,
    },
    { id: "evek", tipo: "entero", etiqueta: "Hány évet dolgoztál a munkáltatónál?", ayuda: "A 30 napnál hosszabb, fizetés nélküli időszakok nem számítanak bele. Kivétel többek között a gyermekgondozás miatti fizetés nélküli szabadság.", min: 0, max: 60, porDefecto: 5 },
    {
      id: "megszunes",
      tipo: "opcion",
      etiqueta: "Hogyan szűnik meg a munkaviszony?",
      opciones: [
        { valor: "felmondas", etiqueta: "A munkáltató mond fel" },
        { valor: "megszunt", etiqueta: "A munkáltató jogutód nélkül megszűnik" },
        { valor: "mas", etiqueta: "Én mondok fel, vagy közös megegyezéssel" },
      ],
      porDefecto: "felmondas",
    },
    {
      id: "magatartas",
      tipo: "si-no",
      etiqueta: "A felmondás oka a magatartásod vagy nem egészségi okú képességed",
      porDefecto: false,
      visibleSi: { megszunes: ["felmondas"] },
    },
    { id: "nyugdijas", tipo: "si-no", etiqueta: "Nyugdíjasnak minősülsz", porDefecto: false },
    { id: "nyugdijElott", tipo: "si-no", etiqueta: "Az öregségi nyugdíjkorhatár előtti öt éven belül vagy", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.tavolletiDij <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb távolléti díjat.", "tavolletiDij");
    const observaciones: string[] = [];
    let jar = true;
    if (e.megszunes === "mas") {
      jar = false;
      observaciones.push("Munkavállalói felmondásnál és közös megegyezésnél a törvény nem ír elő végkielégítést. Közös megegyezésnél a felek megállapodhatnak róla.");
    } else if (e.megszunes === "felmondas" && e.magatartas) {
      jar = false;
      observaciones.push("Nem jár végkielégítés, ha a felmondás oka a munkavállaló magatartása vagy nem egészségi okkal összefüggő képessége.");
    } else if (e.nyugdijas) {
      jar = false;
      observaciones.push("Nem jár végkielégítés annak, aki a felmondás közlésekor nyugdíjasnak minősül.");
    }
    const kulcs = sav(e.evek, v["hu.vegkielegites"]);
    if (jar && kulcs === null) observaciones.push("Végkielégítés legalább három év munkaviszony után jár.");
    const alapHonap = jar && kulcs ? enMapa(v["hu.vegkielegites"], kulcs) : 0;
    const emeles = jar && kulcs && e.nyugdijElott ? enMapa(v["hu.vegkielegites-emeles"], kulcs) : 0;
    const honapok = alapHonap + emeles;
    return {
      osszeg: redondear(honapok * e.tavolletiDij),
      honapok,
      alapHonap,
      emeles,
      observaciones,
    };
  },
  resultado: [
    { clave: "osszeg", etiqueta: "Végkielégítés bruttó összege", formato: "moneda", destacada: true },
    { clave: "honapok", etiqueta: "Ennyi havi távolléti díj", formato: "meses" },
    { clave: "alapHonap", etiqueta: "A munkaviszony hossza szerint", formato: "meses" },
    { clave: "emeles", etiqueta: "Emelés a nyugdíjkorhatár előtt", formato: "meses", ocultarSiCero: true },
  ],
});
