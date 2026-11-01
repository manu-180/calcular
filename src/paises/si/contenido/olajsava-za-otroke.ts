import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.olajsava-za-otroke",
  h1: "Olajšava za otroke {{anio}}: koliko znaša in koliko prihranite",
  title: "Olajšava za otroke {{anio}}: izračun po številu otrok",
  description: "Olajšava za prvega otroka znaša {{si.olajsava-otroci[prvi]}} na leto. Izračunajte znesek za vse otroke in koliko več dobite pri plači.",
  intro: [
    "Olajšava za vzdrževane otroke zmanjša davčno osnovo, ne dohodnine neposredno. Za prvega otroka znaša {{si.olajsava-otroci[prvi]}} na leto, zneski za naslednje otroke pa so višji.",
    "Koliko to pomeni v denarju, je odvisno od razreda lestvice. Zato kalkulator poleg olajšave izračuna tudi razliko v mesečni akontaciji pri vaši plači.",
  ],
  comoSeCalcula: [
    "Za drugega otroka se znesek za prvega poveča za {{si.olajsava-otroci[drugi]}}, za tretjega za {{si.olajsava-otroci[tretji]}}, za četrtega za {{si.olajsava-otroci[cetrti]}}, za petega za {{si.olajsava-otroci[peti]}}.",
    "Za vsakega nadaljnjega otroka se olajšava za predhodnega poveča za {{si.olajsava-otroci[nadaljnji]}}.",
    "Prihranek je razlika med akontacijo brez olajšave in z njo, izračunana po celotnem izračunu plače.",
  ],
  ejemplo: [
    "Dva otroka: 2.995,83 € za prvega in 3.256,77 € za drugega, skupaj 6.252,60 € na leto ali 521,05 € na mesec. Pri bruto plači 2.500,00 € je akontacija manjša za 135,47 € na mesec, torej 1.625,64 € na leto.",
  ],
  faq: [
    {
      pregunta: "Kje so določeni zneski?",
      respuesta: "V 1. členu Pravilnika za leto 2026 (Uradni list RS, št. 104/25), ki usklajuje zneske iz 114. člena ZDoh-2. Za otroka, ki potrebuje posebno nego in varstvo, velja višji znesek iz istega pravilnika.",
    },
    {
      pregunta: "Kako uveljavim olajšavo?",
      respuesta: "Med letom pri delodajalcu ali prek eDavkov, dokončno pa v postopku letne odmere. FURS na svoji strani navaja postopek za uveljavljanje olajšave za vzdrževane družinske člane.",
    },
    {
      pregunta: "Ali olajšava vpliva samo na plačo?",
      respuesta: "Ne. Olajšava zmanjša davčno osnovo tudi pri letni odmeri dohodnine. Med letom vpliva na akontacijo, če jo uveljavljate med letom.",
    },
  ],
  glosario: [
    { termino: "Vzdrževani otrok", definicion: "Otrok, ki ga zavezanec preživlja in zanj uveljavlja olajšavo." },
    { termino: "Olajšava", definicion: "Znesek, ki zmanjša davčno osnovo." },
  ],
});
