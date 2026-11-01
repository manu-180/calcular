import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.ddv-kalkulator",
  h1: "DDV kalkulator {{anio}}: prištej ali izloči DDV",
  title: "DDV kalkulator {{anio}}: prištej ali izloči DDV",
  description: "Prištejte ali izločite DDV po stopnji {{si.ddv[splosna]}}, {{si.ddv[nizja]}} ali {{si.ddv[posebna]}}. Izračun zneska z DDV in brez njega v nekaj sekundah.",
  intro: [
    "V Sloveniji se DDV obračunava po treh stopnjah: splošna {{si.ddv[splosna]}}, nižja {{si.ddv[nizja]}} in posebna nižja {{si.ddv[posebna]}}. Tako določa 41. člen ZDDV-1.",
    "Kalkulator deluje v obe smeri. Znesku brez DDV doda davek, iz zneska z DDV pa davek izloči. To drugo je pogosta napaka: DDV ni preprosto odstotek končne cene.",
  ],
  comoSeCalcula: [
    "Prištevanje: DDV = znesek brez DDV × stopnja. Znesek z DDV je vsota obeh.",
    "Izločanje: znesek brez DDV = znesek z DDV / (1 + stopnja). DDV je razlika.",
    "Nižja stopnja {{si.ddv[nizja]}} velja za blago in storitve iz Priloge I k ZDDV-1, posebna nižja {{si.ddv[posebna]}} pa za tiste iz Priloge IV.",
  ],
  ejemplo: [
    "Računu 100,00 € brez DDV se pri splošni stopnji doda 22,00 €, kar da 122,00 €. Iz 122,00 € z DDV izločite 22,00 € in dobite 100,00 €.",
    "Pri nižji stopnji je DDV na 100,00 € enak 9,50 €. Iz zneska 100,00 € z DDV pa je osnova 91,32 €.",
  ],
  faq: [
    {
      pregunta: "Za kaj velja nižja stopnja DDV?",
      respuesta: "Seznam je v Prilogi I k ZDDV-1. FURS na strani o DDV pojasnjuje, da se stopnja {{si.ddv[nizja]}} uporablja le za dobave s tega seznama, vse ostalo pa je obdavčeno po splošni stopnji, če ni oproščeno.",
    },
    {
      pregunta: "Kdo mora obračunavati DDV?",
      respuesta: "Davčni zavezanec, ki je identificiran za namene DDV. Ta kalkulator računa le znesek. Ne ugotavlja, ali ste zavezanec.",
    },
    {
      pregunta: "Kdaj se plača DDV?",
      respuesta: "Zavezanec plača DDV po obračunu za davčno obdobje na prehodni davčni podračun, kot navaja FURS. Rok je v njegovem koledarju.",
    },
  ],
  glosario: [
    { termino: "DDV", definicion: "Davek na dodano vrednost." },
    { termino: "Davčna osnova", definicion: "Znesek brez DDV, od katerega se davek izračuna." },
  ],
});
