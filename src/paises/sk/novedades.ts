import type { Novedad } from "@/motor/tipos";

const SP_Z = "https://www.socpoist.sk/socialne-poistenie/zmeny-v-socialnom-poisteni/najdolezitejsie-zmeny-v-socialnom-poisteni-od-1-1";
const VSZP = "https://www.vszp.sk/platitelia/platenie-poistneho/oznamenia-zmeny/zmeny-od-01-01.2026/";
const H = "2026-11-01";

export const novedades: readonly Novedad[] = [
  {
    id: "sk.minimalna-mzda-2027",
    fecha: "2026-08-24",
    titulo: "Minimálna mzda v roku 2027: 972 eur",
    texto: "Ministerstvo práce oznámilo, že od januára 2027 bude minimálna mzda 972 eur. Do konca roka 2026 platí 915 eur.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["sk.minimalna-mzda", "sk.priplatky-za-pracu"],
    fuente: { organismo: "MPSVR SR", titulo: "Minimálna mzda sa opäť zvýši", url: "https://www.employment.gov.sk/sk/uvodna-stranka/informacie-media/aktuality/minimalna-mzda-opat-zvysi-buduci-rok-priblizi-k-hranici-1000-eur.html", tipo: "primaria", verificadoEl: H },
  },
  {
    id: "sk.davky-2027",
    fecha: "2026-09-22",
    titulo: "Vyššie stropy nemocenských dávok v roku 2027",
    texto: "Pri dôvode na dávku v roku 2027 stúpne strop denného vymeriavacieho základu na 106,5206 eura. Materské dosiahne najviac 2 476,70 eura za 31-dňový mesiac.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["sk.kalkulacka-pn", "sk.kalkulacka-materske", "sk.tehotenske", "sk.osetrovne"],
    fuente: { organismo: "Sociálna poisťovňa", titulo: "Zmena 2027: vyššie maximálne sumy dávok", url: "https://www.socpoist.sk/news/zmena-2027-socialna-poistovna-bude-vyplacat-vyssie-maximalne-sumy-davok-nemocenske-materske", tipo: "primaria", verificadoEl: H },
  },
  {
    id: "sk.dan-2026",
    fecha: "2026-01-01",
    titulo: "Nové pásma dane z príjmov: 19, 25, 30 a 35 %",
    texto: "Od roku 2026 má daň z príjmov fyzických osôb štyri pásma a hranice sa viažu na životné minimum.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["sk.vypocet-cistej-mzdy", "sk.dan-z-prijmov"],
    fuente: { organismo: "Finančná správa SR", titulo: "Sadzba dane z príjmov fyzickej osoby za rok 2026", url: "https://podpora.financnasprava.sk/081400-Sadzba-dane-z-pr%C3%ADjmov-fyzickej-osoby-za-rok-2026", tipo: "primaria", verificadoEl: H },
  },
  {
    id: "sk.zdravotne-2026",
    fecha: "2026-01-01",
    titulo: "Vyššie zdravotné poistenie: zamestnanec 5 %, SZČO 16 %",
    texto: "Od januára 2026 do konca roka 2027 platí zamestnanec 5 % namiesto 4 % a SZČO 16 % namiesto 15 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["sk.vypocet-cistej-mzdy", "sk.odvody-szco"],
    fuente: { organismo: "Všeobecná zdravotná poisťovňa", titulo: "Zmeny od 1. 1. 2026", url: VSZP, tipo: "primaria", verificadoEl: H },
  },
  {
    id: "sk.szco-2026",
    fecha: "2026-01-01",
    titulo: "SZČO: vyšší minimálny základ a osobitný základ",
    texto: "Minimálny vymeriavací základ stúpol na 914,40 eura. Pri príjme do 9 144 eur sa platí z osobitného základu 396,24 eura.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["sk.odvody-szco"],
    fuente: { organismo: "Sociálna poisťovňa", titulo: "Najdôležitejšie zmeny v sociálnom poistení od 1. januára 2026", url: SP_Z, tipo: "primaria", verificadoEl: H },
  },
];
