import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.haigushuvitis",
  h1: "Haigushüvitise kalkulaator",
  title: "Haigushüvitis {{anio}}: {{ee.haigus-maar}} ja ülempiir {{ee.haigus-ulempiir}} päevas",
  description: "Arvuta haigushüvitis ja hooldushüvitis: {{ee.haigus-maar}} või {{ee.hooldus-maar}} tulust, ülempiir {{ee.haigus-ulempiir}} päevas. Näed tööandja ja Tervisekassa osa.",
  intro: [
    "Tavalise haiguse korral on hüvitis {{ee.haigus-maar}} keskmisest tulust. Esimese kolme päeva eest hüvitist ei maksta, 4. kuni 8. päeva eest maksab tööandja ja alates 9. päevast Tervisekassa.",
    "Alates 1. jaanuarist 2026 on Tervisekassa hüvitisel ülempiir {{ee.haigus-ulempiir}} kalendripäevas. Tööandja osale see ei kehti. Lapse või pereliikme põetamisel on määr {{ee.hooldus-maar}} ja tööõnnetuse korral {{ee.tooonnetus-maar}}.",
  ],
  comoSeCalcula: [
    "Tervisekassa kalendripäeva tulu on eelmise kalendriaasta sotsiaalmaksuga maksustatud tulu jagatud arvuga 365 (ravikindlustuse seadus, § 55).",
    "Hüvitis on sellest {{ee.haigus-maar}}, kuid mitte üle {{ee.haigus-ulempiir}} kalendripäevas.",
    "Tööandja osa lähtub viimase kuue kuu töötasust jagatuna kalendripäevadega.",
    "Hooldusleht makstakse esimesest päevast, tööõnnetus teisest päevast, ja mõlemat maksab Tervisekassa.",
    "Hüvitiselt peetakse kinni tulumaks {{ee.tulumaks}}.",
  ],
  ejemplo: [
    "Haigusleht 14 päeva, eelmise aasta tulu 24 000 eurot ja viimase kuue kuu töötasu 10 800 eurot 181 päeva peale. Kolm esimest päeva on tasuta. Tööandja maksab viie päeva eest 208,84 eurot ja Tervisekassa kuue päeva eest 276,16 eurot. Kokku 485 eurot bruto ja 378,30 eurot pärast tulumaksu.",
    "Kui aastatulu on 120 000 eurot, tuleks arvestuslikult 230 eurot päevas, kuid Tervisekassa maksab 126,87 eurot.",
  ],
  faq: [
    {
      pregunta: "Kes maksab haiguslehe?",
      respuesta: "Tavalise haiguse või olmetrauma korral: 1. kuni 3. päev ei hüvitata, 4. kuni 8. päeva maksab tööandja, alates 9. päevast Tervisekassa. Hüvitist makstakse kuni {{ee.haigus-pikim}} järjest.",
    },
    {
      pregunta: "Kui kaua makstakse lapse põetamise eest?",
      respuesta: "Alla 12-aastase lapse põetamisel kuni {{ee.hooldus-pikim}}. Määr on {{ee.hooldus-maar}} ja hüvitist makstakse esimesest päevast.",
    },
    {
      pregunta: "Kas ülempiir puudutab kõiki?",
      respuesta: "See kehtib töövõimetuslehtede kohta, mis algasid 1. jaanuaril 2026 või hiljem, ja ainult Tervisekassa hüvitisele. Erandid on näiteks elundidoonorlus. Ülempiir on {{ee.haigus-ulempiir}} kalendripäevas.",
    },
  ],
  glosario: [
    { termino: "Töövõimetusleht", definicion: "Arsti väljastatud leht, mis vabastab ajutiselt töökohustustest." },
    { termino: "Hooldusleht", definicion: "Töövõimetusleht lapse või pereliikme põetamiseks." },
    { termino: "Tervisekassa", definicion: "Asutus, kes maksab ravikindlustuse hüvitisi." },
  ],
});
