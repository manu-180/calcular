import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-concediu-medical",
  h1: "Calcul concediu medical {{anio}}",
  title: "Calcul concediu medical {{anio}}: indemnizația pe zile",
  description:
    "Calculați indemnizația de concediu medical după durata certificatului și venitul brut din ultimele 6 luni, cu procentele în vigoare din august 2025.",
  intro: [
    "Din august 2025 procentul indemnizației pentru boli obișnuite depinde de durata certificatului de concediu medical.",
    "Calculatorul pornește de la venitul brut mediu din ultimele 6 luni și de la zilele lucrătoare din certificat.",
  ],
  comoSeCalcula: [
    "Media zilnică este venitul din ultimele 6 luni împărțit la zilele lucrătoare din acele luni.",
    "Procentul este {{ro.concediu-medical-procente[max-7]}} pentru certificatele de până la 7 zile, {{ro.concediu-medical-procente[8-14]}} pentru 8 până la 14 zile și {{ro.concediu-medical-procente[peste-14]}} peste acest prag. La bolile cardiovasculare procentul este {{ro.concediu-medical-procente[cardiovascular]}}.",
    "Indemnizația este media zilnică înmulțită cu procentul și cu zilele plătite.",
  ],
  faq: [
    {
      pregunta: "Cât se plătește concediul medical în 2026?",
      respuesta: "Pentru boli obișnuite, {{ro.concediu-medical-procente[max-7]}}, {{ro.concediu-medical-procente[8-14]}} sau {{ro.concediu-medical-procente[peste-14]}} din baza de calcul, după durata certificatului.",
    },
  ],
  glosario: [
    { termino: "Certificat de concediu medical", definicion: "Documentul eliberat de medic care atestă incapacitatea temporară de muncă." },
  ],
});
