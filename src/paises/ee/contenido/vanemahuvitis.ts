import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.vanemahuvitis",
  h1: "Vanemahüvitise kalkulaator",
  title: "Vanemahüvitis {{anio}}: ülempiir {{ee.vanemahuvitis-ulempiir}} kuus",
  description: "Arvuta vanemahüvitis oma keskmisest tulust. Ülempiir on {{ee.vanemahuvitis-ulempiir}}, määr {{ee.vanemahuvitis-maar}} ja kestus kuni {{ee.vanemahuvitis-paevad}}.",
  intro: [
    "Vanemahüvitis arvutatakse sinu sotsiaalmaksuga maksustatud keskmisest kuutulust. 2026. aastal sündinud lapse puhul on ülempiir {{ee.vanemahuvitis-ulempiir}} kuus, see on Eesti kahekordne keskmine tulu.",
    "Hüvitist makstakse kuni {{ee.vanemahuvitis-paevad}} kalendripäeva lapse kohta, emale, isale ja jagatava osana kokku (perehüvitiste seadus, § 34). Kui arvestusperioodil tulu ei olnud, on hüvitis {{ee.vanemahuvitis-maar}} kuus.",
  ],
  comoSeCalcula: [
    "Arvestusperiood on lapse sünnikuule eelnenud 21 kuud, millest jäetakse välja viimased 9 kuud (§ 39). Ema vanemahüvitise puhul loetakse eeldatavast sünnikuust.",
    "Keskmine kuutulu jagatakse arvuga 30 ja see annab kalendripäeva hüvitise.",
    "Kui tulu oli väiksem kui töötasu alammäär {{ee.miinimumpalk-kuu}}, arvutatakse hüvitis alammäärast (§ 42). Kui tulu ei olnud üldse, on see {{ee.vanemahuvitis-maar}} (§ 41).",
    "Ülempiir on {{ee.vanemahuvitis-ulempiir}} kuus.",
    "Hüvitiselt peetakse kinni tulumaks {{ee.tulumaks}}, maksuvaba tulu avalduse korral väiksemalt summalt.",
  ],
  ejemplo: [
    "Keskmine kuutulu 2000 eurot: hüvitis on 2000 eurot kuus ehk 66,67 eurot päevas. Pärast tulumaksu ja maksuvaba tulu 700 eurot jääb kätte 1714 eurot. Kogu perioodi eest teeb see bruto 40 333,33 eurot.",
    "Kuutulu 6000 eurot: hüvitis on ülempiiri tõttu 3806,10 eurot. Kuutulu 500 eurot: hüvitis on alammäära järgi 946 eurot.",
  ],
  faq: [
    {
      pregunta: "Kui suur on vanemahüvitise ülempiir?",
      respuesta: "2026. aastal sündinud või sel aastal eeldatava sünniajaga lapse puhul {{ee.vanemahuvitis-ulempiir}} kuus. Kuni 31. detsembrini 2025 sündinud lastele jääb varasem, kõrgem ülempiir.",
    },
    {
      pregunta: "Kas võin hüvitise ajal töötada?",
      respuesta: "Jah. Sotsiaalkindlustusameti teatel kadus 2026. aastast tulu teenimise piirmäär ja hüvitis enam töötamise pärast ei vähene.",
    },
    {
      pregunta: "Mis saab, kui alammäär aasta jooksul tõuseb?",
      respuesta: "Kui hüvitis on määratud alammäära järgi, arvutatakse see alammäära tõustes ümber (§ 45). Praegu on alammäär {{ee.miinimumpalk-kuu}}.",
    },
  ],
  glosario: [
    { termino: "Arvestusperiood", definicion: "Kuud, mille tulu järgi hüvitis arvutatakse." },
    { termino: "Jagatav vanemahüvitis", definicion: "Hüvitise osa, mida vanemad saavad omavahel jagada." },
  ],
});
