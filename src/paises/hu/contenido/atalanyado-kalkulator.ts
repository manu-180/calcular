import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.atalanyado-kalkulator",
  h1: "Átalányadó kalkulátor egyéni vállalkozóknak",
  title: "Átalányadó kalkulátor 2026: SZJA, TB-járulék, szocho",
  description:
    "Mennyi adót fizetsz átalányadózóként? Költséghányad {{hu.atalanyado-koltseghanyad[altalanos]}}, adómentes rész {{hu.atalanyado-adomentes-resz}}, SZJA, TB-járulék és szocho egy évre.",
  intro: [
    "Átalányadózásnál nem kell a költségeidet számlákkal igazolni: a bevételből egy rögzített költséghányadot vonsz le, és a maradék a jövedelem. A legtöbb tevékenységnél a költséghányad {{hu.atalanyado-koltseghanyad[altalanos]}}.",
    "A jövedelem egy része adómentes, ez az éves minimálbér fele: {{hu.atalanyado-adomentes-resz}}. A felette lévő rész után SZJA, TB-járulék és szocho jár.",
  ],
  comoSeCalcula: [
    "Jövedelem = bevétel × (100% − költséghányad). A költséghányad általában {{hu.atalanyado-koltseghanyad[altalanos]}}, egyes tevékenységeknél {{hu.atalanyado-koltseghanyad[kiemelt]}}, kizárólag kiskereskedelemnél {{hu.atalanyado-koltseghanyad[kiskereskedelem]}}.",
    "Adóköteles jövedelem = jövedelem − adómentes rész ({{hu.atalanyado-adomentes-resz}}).",
    "SZJA = adóköteles jövedelem × {{hu.szja}}.",
    "TB-járulék ({{hu.tb-jarulek}}) és szocho ({{hu.szocho}}) az adóköteles jövedelem után, főfoglalkozásban legalább a minimálbér vagy a garantált bérminimum éves összege után.",
  ],
  ejemplo: [
    "Évi 6 000 000 Ft bevétel, általános költséghányad: a jövedelem 3 300 000 Ft, ebből 1 936 800 Ft adómentes. Az SZJA 204 480 Ft. A járulék és a szocho a minimálbér után jár: 716 616 Ft és 503 568 Ft. Összesen 1 424 664 Ft egy évre.",
  ],
  faq: [
    {
      pregunta: "Mennyi az átalányadó költséghányada?",
      respuesta: "Általában {{hu.atalanyado-koltseghanyad[altalanos]}}. Az Szja tv. 53. § (2) bekezdésében felsorolt tevékenységeknél {{hu.atalanyado-koltseghanyad[kiemelt]}}, kizárólag kiskereskedelmi tevékenységnél {{hu.atalanyado-koltseghanyad[kiskereskedelem]}}. Az általános kulcs jövőre 50 százalék lesz.",
    },
    {
      pregunta: "Mekkora bevételig lehet átalányadózó?",
      respuesta: "Amíg a bevétel nem haladja meg az éves minimálbér tízszeresét, idén 38 736 000 Ft-ot. Kizárólag kiskereskedelemnél az éves minimálbér ötvenszereséig.",
    },
    {
      pregunta: "Mennyi az adómentes rész?",
      respuesta: "Az éves minimálbér fele, idén {{hu.atalanyado-adomentes-resz}}. Ekkora jövedelemig nincs SZJA. Általános költséghányaddal ez 3 521 455 Ft bevételnek felel meg.",
    },
    {
      pregunta: "Mellékállásban is van járulékminimum?",
      respuesta: "A minimálbér szerinti alsó határ a főfoglalkozású vállalkozókra vonatkozik. Mellékállásban a kalkulátor a tényleges adóköteles jövedelem után számol.",
    },
  ],
  glosario: [
    { termino: "Költséghányad", definicion: "A bevétel rögzített része, amit költségként levonhatsz számla nélkül." },
    { termino: "Átalányban megállapított jövedelem", definicion: "A bevétel a költséghányad levonása után." },
  ],
});
