import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "si.referendum-ziurs",
    fecha: "2026-11-01",
    titulo: "Razpisan referendum o interventnem zakonu",
    texto: "Državni zbor je razpisal referendum o Zakonu o interventnih ukrepih za razvoj Slovenije. Glasovanje bo 6. decembra 2026. Do uveljavitve zakona izračuni upoštevajo zdaj veljavna pravila.",
    calculadoras: ["si.izracun-place", "si.sp-normiranec", "si.prispevki-sp", "si.zimski-regres"],
    fuente: { organismo: "Uradni list RS", titulo: "Odlok o razpisu zakonodajnega referenduma (OdZIURS)", url: "https://pisrs.si/api/uradni-list/objava/u20261692.pdf", tipo: "primaria", verificadoEl: "2026-11-01" },
  },
  {
    id: "si.ozp-marec-2026",
    fecha: "2026-11-01",
    titulo: "Višji obvezni zdravstveni prispevek",
    texto: "Od marca 2026 do februarja 2027 obvezni zdravstveni prispevek znaša 39,36 evra na mesec. Znesek uporabljajo izračuni plače in prispevkov.",
    vigenteDesde: "2026-03-01",
    calculadoras: ["si.izracun-place", "si.izracun-prispevkov", "si.prispevki-sp"],
    fuente: { organismo: "FURS", titulo: "Obvezni zdravstveni prispevek (OZP)", url: "https://www.fu.gov.si/fileadmin/Internet/Davki_in_druge_dajatve/Podrocja/Prispevki_za_socialno_varnost/Opis/Obvezni_zdravstveni_prispevek_-_OZP.docx", tipo: "primaria", verificadoEl: "2026-11-01" },
  },
  {
    id: "si.minimalna-placa-2026",
    fecha: "2026-11-01",
    titulo: "Minimalna plača v letu 2026",
    texto: "Od 1. januarja 2026 minimalna plača znaša 1.481,88 evra bruto. Ta znesek je tudi spodnja meja regresa za letni dopust.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["si.minimalna-placa", "si.izracun-regresa", "si.zimski-regres"],
    fuente: { organismo: "GOV.SI", titulo: "Minimalna plača", url: "https://www.gov.si/teme/minimalna-placa/", tipo: "primaria", verificadoEl: "2026-11-01" },
  },
  {
    id: "si.normiranci-2026",
    fecha: "2026-11-01",
    titulo: "Nove stopnje za normirance",
    texto: "Za leto 2026 velja stopnja 20 odstotkov do meje davčne osnove in 35 odstotkov nad njo. Meja je 72.000 evrov pri polni samozaposlitvi in 33.000 evrov pri popoldanskem s.p.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["si.sp-normiranec"],
    fuente: { organismo: "PISRS", titulo: "Zakon o pravici do zimskega regresa ter prenovi ugotavljanja davčne osnove z upoštevanjem normiranih odhodkov (ZPZR)", url: "https://pisrs.si/pregledPredpisa?id=ZAKO9359", tipo: "primaria", verificadoEl: "2026-11-01" },
  },
];
