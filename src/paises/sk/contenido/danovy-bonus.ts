import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.danovy-bonus",
  h1: "Daňový bonus na dieťa {{anio}}",
  title: "Daňový bonus na dieťa {{anio}}: {{sk.danovy-bonus[do15]}} a {{sk.danovy-bonus[od15]}}",
  description: "Daňový bonus je {{sk.danovy-bonus[do15]}} mesačne na dieťa do 15 rokov a {{sk.danovy-bonus[od15]}} od 15 do 18 rokov. Vypočítajte limit a zníženie nad {{sk.bonus-hranica}}.",
  intro: [
    "Daňový bonus je {{sk.danovy-bonus[do15]}} mesačne na dieťa do 15 rokov a {{sk.danovy-bonus[od15]}} na dieťa od 15 do 18 rokov. Jeho výška má však dva stropy.",
    "Prvý je percento zo základu dane podľa počtu detí, od {{sk.bonus-limit[d1]}} pri jednom dieťati po {{sk.bonus-limit[d6]}} pri šiestich a viac. Druhý je zníženie, keď základ dane presiahne {{sk.bonus-hranica}} ročne.",
  ],
  comoSeCalcula: [
    "Spočíta sa nárok na všetky deti za rok.",
    "Pri základe dane nad {{sk.bonus-hranica}} sa bonus na každé dieťa zníži o desatinu rozdielu (§ 33 ods. 11).",
    "Výsledok nesmie presiahnuť percentuálny limit zo základu dane (§ 33 ods. 6).",
  ],
  ejemplo: ["Pri základe dane 6 250 eur a dvoch deťoch do 15 rokov by nárok bol 2 400 eur, ale limit {{sk.bonus-limit[d2]}} ho zníži na 2 250 eur."],
  faq: [
    { pregunta: "Kto si môže daňový bonus uplatniť?", respuesta: "Daňovník so zdaniteľnými príjmami zo zamestnania alebo z podnikania, ktorý s dieťaťom žije v domácnosti (§ 33 ods. 1)." },
    { pregunta: "Čo ak nemám dosť vysoký príjem?", respuesta: "Bonus možno uplatniť len do percentuálneho limitu. Finančná správa uvádza, že v daňovom priznaní možno za podmienok navýšiť základ o základ druhej oprávnenej osoby." },
    { pregunta: "Dokedy sa bonus vypláca?", respuesta: "Vyšší poslednýkrát za mesiac, v ktorom dieťa dovŕši 15 rokov. Nižší za mesiac, v ktorom dovŕši 18 rokov." },
  ],
  glosario: [
    { termino: "Vyživované dieťa", definicion: "Vlastné, osvojené alebo zverené nezaopatrené dieťa žijúce s daňovníkom v domácnosti." },
    { termino: "Percentuálny limit", definicion: "Najvyšší podiel základu dane, ktorý môže bonus tvoriť." },
  ],
});
