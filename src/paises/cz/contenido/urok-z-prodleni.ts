import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cz.urok-z-prodleni",
  h1: "Kalkulačka úroku z prodlení",
  title: "Úrok z prodlení {{anio}}: kalkulačka zákonného úroku",
  description:
    "Spočítejte zákonný úrok z prodlení u neuhrazené faktury nebo půjčky: repo sazba ČNB plus 8 procentních bodů za každý den po splatnosti.",
  intro: [
    "Když dlužník nezaplatí včas, může věřitel požadovat zákonný úrok z prodlení. Jeho výši stanoví nařízení vlády podle repo sazby České národní banky.",
    "Kalkulačka spočítá úrok za dobu od prvního dne po splatnosti do dne zaplacení.",
  ],
  comoSeCalcula: [
    "Roční sazba úroku z prodlení je repo sazba ČNB platná první den kalendářního pololetí, ve kterém prodlení začalo, zvýšená o 8 procentních bodů.",
    "Sazba zůstává stejná po celou dobu prodlení, i když ČNB repo sazbu mezitím změní.",
    "Úrok = dlužná částka × sazba × počet dní prodlení / 365.",
  ],
  ejemplo: ["Faktura na 10 000 Kč se splatností 31. března 2026 zaplacená 24. října 2026 je 207 dní po splatnosti. Při sazbě 11,5 % ročně činí úrok z prodlení 652,19 Kč."],
  faq: [
    {
      pregunta: "Jaká je sazba úroku z prodlení v roce 2026?",
      respuesta: "Při prodlení, které začalo od ledna do června 2026, 11,5 % ročně (repo 3,50 % + 8). Při prodlení od července 2026 11,75 % ročně (repo 3,75 % + 8). Aktuální repo sazba ČNB je {{cz.repo-sazba}}.",
    },
    {
      pregunta: "Od kdy se úrok z prodlení počítá?",
      respuesta: "Ode dne následujícího po dni splatnosti až do dne, kdy dluh zaplatíte.",
    },
    {
      pregunta: "Můžu kromě úroku chtít i náhradu nákladů?",
      respuesta: "Mezi podnikateli je minimální výše nákladů spojených s uplatněním každé pohledávky 1 200 Kč podle stejného nařízení vlády.",
    },
  ],
  glosario: [
    { termino: "Repo sazba", definicion: "Hlavní úroková sazba České národní banky." },
    { termino: "Prodlení", definicion: "Stav, kdy dlužník nezaplatil do dne splatnosti." },
  ],
});
