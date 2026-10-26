import type { FuenteVerificada, Novedad } from "@/motor/tipos";

const vero = (titulo: string, url: `https://${string}`): FuenteVerificada => ({ organismo: "Verohallinto", titulo, url, tipo: "primaria", verificadoEl: "2026-10-24" });

const MUUTOKSET = vero("Muutokset veroperusteisiin vuonna 2026", "https://www.vero.fi/tietoa-verohallinnosta/tilastot/verotulojen-kehitys/muutokset-veroperusteisiin-verovuosittain/2026/");

export const novedades: readonly Novedad[] = [
  {
    id: "fi.kilometrikorvaus-2027",
    fecha: "2026-10-24",
    titulo: "Kilometrikorvaus nousee 58 senttiin vuonna 2027",
    texto:
      "Verohallinnon päätöksen mukaan verovapaa kilometrikorvaus on 1.1.2027 alkaen 58 senttiä kilometriltä. Kotimaan kokopäiväraha nousee 55 euroon ja ateriakorvaus 13,75 euroon. Kilometrikorvauslaskuri käyttää uusia määriä vuoden vaihteesta.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["fi.kilometrikorvaus"],
    fuente: vero(
      "Verohallinnon päätös verovapaista matkakustannusten korvauksista vuonna 2027",
      "https://www.vero.fi/syventavat-vero-ohjeet/paatokset/47405/verohallinnon-paatos-verovapaista-matkakustannusten-korvauksista-vuonna-2027/",
    ),
  },
  {
    id: "fi.kotitalousvahennys-2026",
    fecha: "2026-10-24",
    titulo: "Kotitalousvähennys nousi takautuvasti 2 100 euroon",
    texto:
      "Kotitalousvähennyksen enimmäismäärä on vuosina 2026 ja 2027 2 100 euroa henkilöä kohden. Yritykseltä ostetusta työstä saa vähentää 40 prosenttia ja palkasta 15 prosenttia. Omavastuu pysyy 150 eurossa.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["fi.kotitalousvahennys-laskuri"],
    fuente: vero(
      "Kotitalousvähennys nousee takautuvasti (tiedote 13.10.2026)",
      "https://www.vero.fi/tietoa-verohallinnosta/uutishuone/lehdist%C3%B6tiedotteet/2026/kotitalousvahennys-nousee-takautuvasti--nain-saat-korotetun-vahennyksen-kayttoosi/",
    ),
  },
  {
    id: "fi.tuloverot-2026",
    fecha: "2026-10-24",
    titulo: "Ansiotulojen verotus keveni vuonna 2026",
    texto:
      "Valtion tuloveroasteikon alempia tulorajoja nostettiin noin 3,5 prosenttia ja ylin marginaaliveroaste laski noin 52 prosenttiin. Työtulovähennyksen enimmäismäärä nousi 3 430 euroon ja perusvähennys 4 265 euroon.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["fi.palkkalaskuri", "fi.veroprosenttilaskuri", "fi.kunnallisverolaskuri"],
    fuente: MUUTOKSET,
  },
  {
    id: "fi.alv-13-5-2026",
    fecha: "2026-10-24",
    titulo: "Ruoan ja ravintolapalvelujen alv laski 13,5 prosenttiin",
    texto: "Alennettu arvonlisäverokanta laski 14 prosentista 13,5 prosenttiin 1.1.2026. Se koskee muun muassa elintarvikkeita, ravintolaruokaa, kirjoja, lääkkeitä ja henkilöliikennettä.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["fi.alv-laskuri"],
    fuente: MUUTOKSET,
  },
  {
    id: "fi.perinto-ja-lahjavero-2026",
    fecha: "2026-10-24",
    titulo: "Perintöveron ja lahjaveron verovapaat rajat nousivat",
    texto: "Vuodesta 2026 perintöveroa ei makseta alle 30 000 euron perintöosuudesta, kun raja oli aiemmin 20 000 euroa. Lahjaveron raja nousi 5 000 eurosta 7 500 euroon.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["fi.perintoverolaskuri", "fi.lahjaverolaskuri"],
    fuente: MUUTOKSET,
  },
  {
    id: "fi.tyel-2026",
    fecha: "2026-10-24",
    titulo: "Työntekijän TyEL-maksu on kaikille 7,30 prosenttia",
    texto:
      "Siirtymäkausi päättyi, joten 53-62-vuotiaiden korkeampi työeläkemaksu poistui. Vuonna 2026 työntekijän maksu on 7,30 prosenttia kaikissa ikäryhmissä ja työnantajan maksu keskimäärin 17,10 prosenttia.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["fi.palkkalaskuri", "fi.tyonantajan-sivukulut", "fi.lomarahalaskuri"],
    fuente: { organismo: "Eläketurvakeskus", titulo: "Työeläkemaksut vuonna 2026", url: "https://www.etk.fi/ajankohtaista/tyoelakemaksut-vuonna-2026/", tipo: "primaria", verificadoEl: "2026-10-24" },
  },
  {
    id: "fi.tyottomyysvakuutusmaksu-2026",
    fecha: "2026-10-24",
    titulo: "Työttömyysvakuutusmaksut nousivat vuonna 2026",
    texto: "Palkansaajan työttömyysvakuutusmaksu on 0,89 prosenttia palkasta. Työnantajan maksu on 0,31 prosenttia 2 509 500 euron palkkasummaan asti ja 1,23 prosenttia sen ylittävältä osalta.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["fi.palkkalaskuri", "fi.tyonantajan-sivukulut"],
    fuente: {
      organismo: "Työllisyysrahasto",
      titulo: "Vuoden 2026 työttömyysvakuutusmaksut on vahvistettu",
      url: "https://www.tyollisyysrahasto.fi/uutiset/vuoden-2026-tyottomyysvakuutusmaksut-on-vahvistettu/",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
