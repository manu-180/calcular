import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.porodiljsko-odsustvo",
  h1: "Porodiljsko odsustvo {{anio}}: trajanje i naknada",
  title: "Porodiljsko odsustvo {{anio}}: {{ba.porodiljsko@fbih}} u FBiH i RS",
  description: "Porodiljsko odsustvo traje {{ba.porodiljsko@fbih}}, u RS {{ba.porodiljsko-blizanci-rs}} za blizance i treće dijete. Izračunajte datum završetka i naknadu plate u RS.",
  intro: [
    "Žena u oba entiteta ima pravo na {{ba.porodiljsko@fbih}} neprekidnog odsustva. U Republici Srpskoj za blizance, treće i svako naredno dijete odsustvo traje {{ba.porodiljsko-blizanci-rs}}.",
    "Odsustvo može početi {{ba.porodiljsko-prije@fbih}} prije porođaja. Naknada u RS je prosječna plata iz zadnjih {{ba.porodiljsko-prosjek-rs}}, a u FBiH o njoj odlučuju kantonalni propisi.",
  ],
  comoSeCalcula: [
    "Datum završetka dobija se dodavanjem zakonskih mjeseci na prvi dan odsustva.",
    "U RS naknada je prosjek plata iz zadnjih {{ba.porodiljsko-prosjek-rs}}. Za svaki mjesec bez plate u tom prosjeku uzima se najniža plata u Republici.",
    "U FBiH kalkulator daje samo datum, jer iznos zavisi od kantona u kojem živite.",
  ],
  ejemplo: [
    "Odsustvo koje počne 1. marta 2026. traje do 1. marta 2027. U RS, za blizance, trajalo bi do 1. septembra 2027.",
    "Radnica u RS s prosječnom platom 1.500 KM za to vrijeme prima 1.500 KM mjesečno.",
  ],
  faq: [
    {
      pregunta: "Može li otac koristiti odsustvo?",
      respuesta: "Da. Član 62 Zakona o radu FBiH to dopušta nakon {{ba.porodiljsko-najkrace-fbih}} poslije porođaja, ako se roditelji dogovore. Član 107 zakona RS dopušta nakon isteka {{ba.porodiljsko-otac-rs}} od rođenja djeteta.",
    },
    {
      pregunta: "Mogu li u FBiH koristiti kraće odsustvo?",
      respuesta: "Da. Član 62 stav 3 dopušta kraće odsustvo, ali ne kraće od {{ba.porodiljsko-najkrace-fbih}} poslije porođaja.",
    },
    {
      pregunta: "Kako se računa naknada u RS?",
      respuesta: "Zakon o izmjeni Zakona o radu iz „Službenog glasnika RS” 112/23, u članu 112, daje naknadu u visini prosječne plate iz zadnjih 18 mjeseci. Za mjesece bez plate računa se najniža plata u Republici.",
    },
  ],
  glosario: [
    { termino: "Porodiljsko odsustvo", definicion: "Odsustvo zbog trudnoće, porođaja i njege djeteta." },
    { termino: "Naknada plate", definicion: "Novac koji se prima umjesto plate za vrijeme odsustva." },
    { termino: "Kantonalni propis", definicion: "Propis kantona u FBiH, koji određuje iznos naknade." },
  ],
});
