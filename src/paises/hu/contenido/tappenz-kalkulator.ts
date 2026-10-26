import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hu.tappenz-kalkulator",
  h1: "Táppénz kalkulátor",
  title: "Táppénz kalkulátor: mennyi táppénz jár napra és hónapra?",
  description:
    "A táppénz a napi alap {{hu.tappenz[alap]}} része, rövidebb biztosítási időnél és kórházban {{hu.tappenz[rovid]}}. Napi felső határ és nettó összeg.",
  intro: [
    "Ha betegség miatt nem tudsz dolgozni, évente az első napokra betegszabadság jár a munkáltatótól, utána táppénz az egészségbiztosítótól.",
    "A táppénz a napi átlagkereset százaléka: legalább 730 nap biztosítási idővel {{hu.tappenz[alap]}}, ennél rövidebb idővel és kórházi ápolás alatt {{hu.tappenz[korhaz]}}.",
  ],
  comoSeCalcula: [
    "Napi alap: a havi átlagkereset harmincad része (a kalkulátor így közelít).",
    "Napi táppénz = napi alap × {{hu.tappenz[alap]}} (vagy {{hu.tappenz[rovid]}}).",
    "A napi táppénz nem lehet több a minimálbér kétszeresének harmincad részénél.",
    "A táppénzből SZJA-előleget vonnak le, ennek mértéke {{hu.szja}}.",
  ],
  ejemplo: [
    "Havi 600 000 Ft átlagkereset és 30 nap táppénz: a napi alap 20 000 Ft, a táppénz napi 12 000 Ft, összesen 360 000 Ft bruttó. SZJA után 306 000 Ft marad.",
  ],
  faq: [
    {
      pregunta: "Mennyi a táppénz maximuma?",
      respuesta: "A napi táppénz legfeljebb a minimálbér kétszeresének harmincad része, idén 21 520 Ft. Harminc napra ez 645 600 Ft.",
    },
    {
      pregunta: "Mi a különbség a betegszabadság és a táppénz között?",
      respuesta: "A betegszabadság évi {{hu.betegszabadsag[napok]}} munkanap, ezt a munkáltató fizeti a távolléti díj {{hu.betegszabadsag[mertek]}} részével. Ha a betegség tovább tart, táppénz jár.",
    },
    {
      pregunta: "Miért kevesebb a táppénzem kórházban?",
      respuesta: "A kórházi ápolás idejére a táppénz a napi alap {{hu.tappenz[korhaz]}} része, akkor is, ha egyébként {{hu.tappenz[alap]}} járna.",
    },
  ],
  glosario: [
    { termino: "Táppénz", definicion: "Az egészségbiztosítás pénzbeli ellátása keresőképtelenség idejére." },
    { termino: "Betegszabadság", definicion: "A betegség miatti távollét első napjai, amelyeket a munkáltató fizet." },
  ],
});
