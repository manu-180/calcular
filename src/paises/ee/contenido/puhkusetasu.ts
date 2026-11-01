import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.puhkusetasu",
  h1: "Puhkusetasu arvutamine",
  title: "Puhkusetasu arvutamine {{anio}}: kuue kuu keskmisest",
  description: "Arvuta puhkusetasu kuue kuu keskmisest. Põhipuhkus on {{ee.pohipuhkus}}, alaealisel {{ee.pohipuhkus-pikk}}. Näed päevatasu ja puhkuse õigust.",
  intro: [
    "Puhkusetasu arvutatakse viimase kuue kalendrikuu töötasust, kui osa palgast on muutuv. Põhipuhkus on {{ee.pohipuhkus}} (töölepingu seadus, § 55). Alaealisel ja osalise või puuduva töövõimega töötajal on see {{ee.pohipuhkus-pikk}}.",
    "Kui said kõigil kuuel kuul ainult muutumatut palka, keskmist ei arvutata ja puhkuse ajal makstakse sama palka. Seda ütleb Vabariigi Valitsuse määruse nr 91 § 1. Muutuva tasu korral (tükitöö, preemiad, ületunnid) tuleb arvutada, ja seda see kalkulaator teebki.",
  ],
  comoSeCalcula: [
    "Liida kokku puhkuse algusele eelnenud kuue kalendrikuu töötasu. Arvutuskuu on kuu, millele langeb viimase eelne tööpäev enne puhkust.",
    "Jaga summa nende kuude kalendripäevadega. Rahvuspüha ja riigipühi päevade hulka ei arvata (määruse § 4).",
    "Korruta kalendripäevatasu puhkusepäevadega.",
    "Tööandja maksab tasu hiljemalt eelviimasel tööpäeval enne puhkuse algust, kui ei ole kokku lepitud teisiti (töölepingu seadus, § 70).",
  ],
  ejemplo: [
    "Kuue kuu töötasu 10 800 eurot ja 178 kalendripäeva ilma riigipühadeta: kalendripäevatasu on 60,67 eurot. Täispuhkuse 28 päeva eest teeb see 1698,88 eurot bruto.",
    "Kui töötasid aastas ainult kuus kuud, on põhipuhkuse õigus proportsionaalne: 14 päeva. Puhkust võib nõuda siis, kui oled sama tööandja juures töötanud vähemalt kuus kuud.",
  ],
  faq: [
    {
      pregunta: "Mitu päeva puhkust mulle kuulub?",
      respuesta: "Eeldatavalt {{ee.pohipuhkus}} kalendriaastas. Alaealisel ning osalise või puuduva töövõimega töötajal {{ee.pohipuhkus-pikk}}. Kokku võib leppida ka pikema puhkuse. Riigipühad puhkusepäevade hulka ei kuulu (§ 54).",
    },
    {
      pregunta: "Millal puhkusetasu makstakse?",
      respuesta: "Hiljemalt eelviimasel kalendaarsel tööpäeval enne puhkuse algust, kui ei ole kokku lepitud teisiti. Kokkulepe võib seda lükata kuni puhkusele järgneva palgapäevani (§ 70).",
    },
    {
      pregunta: "Kas kasutamata puhkus aegub?",
      respuesta: "Põhipuhkuse nõue aegub ühe aasta jooksul selle kalendriaasta lõpust, mille eest puhkust arvestatakse. Töölepingu lõppemisel hüvitab tööandja kasutamata ja aegumata puhkuse rahas (§ 68 ja § 71).",
    },
    {
      pregunta: "Kas puhkuse võib osadeks jagada?",
      respuesta: "Poolte kokkuleppel jah, kuid vähemalt 14 kalendripäeva tuleb kasutada järjest. Tööandja võib keelduda seitsmest päevast lühemast osast (§ 68).",
    },
  ],
  glosario: [
    { termino: "Põhipuhkus", definicion: "Iga-aastane tasustatud puhkus." },
    { termino: "Keskmine kalendripäevatasu", definicion: "Kuue kuu töötasu jagatud kalendripäevadega ilma pühadeta." },
  ],
});
