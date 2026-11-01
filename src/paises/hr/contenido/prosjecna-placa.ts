import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.prosjecna-placa",
  h1: "Prosječna plaća u Hrvatskoj {{anio}}: usporedite svoju",
  title: "Prosječna plaća u Hrvatskoj {{anio}}: {{hr.prosjecna-neto}} neto",
  description: "Prosječna neto plaća je {{hr.prosjecna-neto}}, a medijalna {{hr.medijalna-neto}}. Unesite svoju neto plaću i pogledajte gdje ste prema podacima DZS-a.",
  intro: [
    "Prema Državnom zavodu za statistiku prosječna mjesečna neto plaća za {{hr.prosjecna-neto#desde}} iznosi {{hr.prosjecna-neto}}, a bruto {{hr.prosjecna-bruto}}. Medijalna neto plaća je {{hr.medijalna-neto}}, a medijalna bruto {{hr.medijalna-bruto}}.",
    "Unesite svoju neto plaću i vidjet ćete koliko ste iznad ili ispod te dvije crte. Medijan je često bolja usporedba jer visoke plaće dižu prosjek.",
  ],
  comoSeCalcula: [
    "Vašu neto plaću dijelimo s prosječnom neto plaćom i izražavamo u postotku. Sto posto znači da zarađujete točno prosjek.",
    "Isto radimo s medijalnom plaćom, a razlika u eurima pokazuje koliko vam nedostaje do prosjeka ili koliko ste iznad njega.",
    "Podatak se ažurira kad DZS objavi novo mjesečno priopćenje.",
  ],
  ejemplo: [
    "S neto plaćom od 1.336 eura zarađujete točno medijan, ali to je 86,58 % prosjeka od 1.543 eura, odnosno 207 eura manje.",
    "S neto plaćom od 1.543 eura nalazite se točno na prosjeku za kolovoz 2026., a 15,5 % iznad medijana.",
  ],
  faq: [
    {
      pregunta: "Zašto je medijan manji od prosjeka?",
      respuesta: "Medijan je plaća koja zaposlene dijeli na dvije polovice. Prosjek povlače naviše rijetke visoke plaće. Zato je medijalna neto plaća od {{hr.medijalna-neto}} manja od prosječne od {{hr.prosjecna-neto}}.",
    },
    {
      pregunta: "Na koga se odnose ovi podaci?",
      respuesta: "Prema priopćenju DZS-a RAD-2026-1-1/8 riječ je o prosječnoj isplaćenoj plaći po zaposlenome u Republici Hrvatskoj za promatrani mjesec.",
    },
    {
      pregunta: "Koliko je to u bruto iznosu?",
      respuesta: "Prosječna bruto plaća je {{hr.prosjecna-bruto}}, a medijalna {{hr.medijalna-bruto}}. Svoju bruto plaću možete pretvoriti u neto u bruto neto kalkulatoru.",
    },
  ],
  glosario: [
    { termino: "Prosječna plaća", definicion: "Zbroj isplaćenih plaća podijeljen s brojem zaposlenih." },
    { termino: "Medijalna plaća", definicion: "Plaća od koje polovica zaposlenih ima manje, a polovica više." },
    { termino: "DZS", definicion: "Državni zavod za statistiku." },
  ],
});
