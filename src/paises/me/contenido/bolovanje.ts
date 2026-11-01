import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.bolovanje",
  h1: "Bolovanje {{anio}}: naknada zarade od najmanje {{me.bolovanje-stopa}}",
  title: "Bolovanje {{anio}}: {{me.bolovanje-stopa}} ili {{me.bolovanje-puna}} osnova i ko plaća naknadu",
  description: "Naknada za bolovanje je najmanje {{me.bolovanje-stopa}} prosjeka osnovne zarade, a u slučajevima iz zakona {{me.bolovanje-puna}}. Izračunajte iznos i vidite od kog dana Fond refundira.",
  intro: [
    "Za vrijeme privremene spriječenosti za rad naknada iznosi najmanje {{me.bolovanje-stopa}} osnova, a kod povrede na radu, profesionalne bolesti i održavanja trudnoće {{me.bolovanje-puna}}.",
    "Prvih {{me.bolovanje-dani-poslodavac}} naknadu obezbjeđuje poslodavac, a poslije toga je i dalje on isplaćuje, dok mu Fond za zdravstveno osiguranje refundira sredstva.",
  ],
  comoSeCalcula: [
    "Osnov je prosjek osnovne zarade ili naknade zarade iz poslednjih 12 mjeseci (Zakon o obaveznom zdravstvenom osiguranju, čl. 39).",
    "Na mjesečni osnov se primjenjuje stopa. Kalkulator mjesec dijeli na 30 dana, što je procjena: zakon ne propisuje dnevni način podjele, pa konačan iznos može malo da odstupa.",
    "Kolektivni ugovor može dati veću stopu iz sredstava poslodavca (čl. 40 st. 2).",
  ],
  ejemplo: [
    "Prosjek osnovne zarade je 900 eura, bolovanje traje deset dana zbog prehlade. Po danu je to 21 euro, ukupno 210 eura. U odnosu na osnov za tih deset dana, primate 90 eura manje.",
  ],
  faq: [
    {
      pregunta: "Ko plaća bolovanje duže od 60 dana?",
      respuesta: "Naknadu i dalje obračunava i isplaćuje poslodavac, a Fond mu refundira isplaćena sredstva (čl. 38). Kod održavanja trudnoće Fond refundira od prvog dana.",
    },
    {
      pregunta: "Koliko Fond vraća poslodavcu?",
      respuesta: "{{me.bolovanje-stopa}} osnova, a najviše do jedne prosječne zarade zaposlenih u Crnoj Gori iz prethodne godine (čl. 41). Za 2025. MONSTAT navodi prosječnu bruto zaradu od {{me.prosjecna-bruto-2025}}.",
    },
    {
      pregunta: "Koje bolesti daju pravo na punih 100 odsto?",
      respuesta: "Član 40 stav 4 navodi, između ostalih, maligne bolesti, hemofiliju, cističnu fibrozu, epilepsiju, mišićnu distrofiju, cerebralnu paralizu, hroničnu bubrežnu insuficijenciju na dijalizi i njegu djeteta oboljelog od maligne bolesti.",
    },
  ],
  glosario: [
    { termino: "Privremena spriječenost za rad", definicion: "Zakonski naziv za bolovanje." },
    { termino: "Refundacija", definicion: "Vraćanje isplaćene naknade poslodavcu iz Fonda." },
    { termino: "Osnov za naknadu", definicion: "Prosjek osnovne zarade iz poslednjih 12 mjeseci." },
  ],
});
