import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.kalkulacka-dph",
  h1: "Kalkulačka DPH",
  title: "Kalkulačka DPH {{anio}}: výpočet DPH {{cz.dph[zakladni]}} a {{cz.dph[snizena]}}",
  description:
    "Přičtěte DPH k ceně nebo ji vypočítejte z ceny s daní. Základní sazba {{cz.dph[zakladni]}}, snížená {{cz.dph[snizena]}}, výpočet podle zákona o DPH.",
  intro: [
    "Kalkulačka DPH spočítá cenu s daní z ceny bez daně a naopak. Hodí se pro fakturu, nabídku i kontrolu účtenky.",
    "V Česku platí dvě sazby DPH: základní {{cz.dph[zakladni]}} a snížená {{cz.dph[snizena]}}.",
  ],
  comoSeCalcula: [
    "Z ceny bez DPH: DPH = základ × sazba. Cena s DPH je základ plus daň.",
    "Z ceny s DPH: základ daně je cena vydělená koeficientem 1 + sazba (například 1,21). DPH je rozdíl mezi cenou s daní a základem.",
    "Částky se zaokrouhlují na haléře.",
  ],
  ejemplo: ["Služba za 10 000 Kč bez DPH stojí se základní sazbou 12 100 Kč, z toho DPH 2 100 Kč."],
  faq: [
    {
      pregunta: "Jaké jsou sazby DPH v roce 2026?",
      respuesta: "Základní sazba je {{cz.dph[zakladni]}} a snížená {{cz.dph[snizena]}}. Sníženou sazbou se daní zboží a služby uvedené v přílohách č. 2 a 3 zákona o DPH a také dodávky tepla a chladu.",
    },
    {
      pregunta: "Jak spočítám DPH z ceny s daní?",
      respuesta: "Cenu vydělte koeficientem 1 + sazba, u základní sazby tedy 1,21, a dostanete základ daně. DPH je rozdíl mezi cenou a základem. Z 12 100 Kč je to 2 100 Kč.",
    },
    {
      pregunta: "Musím jako podnikatel platit DPH?",
      respuesta: "Plátcem DPH se stanete po překročení obratu daného zákonem o DPH nebo dobrovolnou registrací. Neplátce DPH na fakturu nepřičítá.",
    },
  ],
  glosario: [
    { termino: "Základ daně", definicion: "Cena bez DPH, ze které se daň počítá." },
    { termino: "Plátce DPH", definicion: "Podnikatel registrovaný k DPH, který daň přičítá k ceně a odvádí ji finančnímu úřadu." },
  ],
});
