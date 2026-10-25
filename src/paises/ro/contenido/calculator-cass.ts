import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-cass",
  h1: "Calculator CASS 2026 pentru chirii, dividende și dobânzi",
  title: "Calculator CASS 2026: chirii, dividende, dobânzi",
  description:
    "Aflați câtă CASS datorați pe veniturile din alte surse: chirii, dividende, dobânzi, drepturi de autor. Baza este fixă, pe trepte de salarii minime.",
  intro: [
    "Pe lângă impozit, veniturile care nu vin din salariu sau din PFA pot aduce și CASS. Contribuția nu este un procent din venit, ci o sumă fixă pe trepte.",
    "Treapta se stabilește după totalul veniturilor nete din alte surse din același an, adunate.",
  ],
  comoSeCalcula: [
    "Pentru fiecare venit se ia suma netă: chiriile minus {{ro.forfetar-chirii}}, dividendele minus impozitul de {{ro.impozit-dividende}}, dobânzile minus impozitul de {{ro.impozit-dobanzi}}, drepturile de autor minus {{ro.forfetar-drepturi-autor}}.",
    "Sub {{ro.plafoane-cass[minim]}} × salariul minim nu se datorează CASS. Între {{ro.plafoane-cass[minim]}} × și {{ro.plafoane-cass[mediu]}} × salariul minim, baza este {{ro.plafoane-cass[minim]}} × salariul minim. Urmează treptele de {{ro.plafoane-cass[mediu]}} × și {{ro.plafoane-cass[maxim]}} ×.",
    "Se folosește salariul minim de la 1 ianuarie, {{ro.salariu-minim-1-ianuarie}}.",
    "CASS este {{ro.cass}} din baza treptei.",
  ],
  faq: [
    {
      pregunta: "Cât este CASS maximă pe veniturile din alte surse în 2026?",
      respuesta: "{{ro.cass}} din {{ro.plafoane-cass[maxim]}} × {{ro.salariu-minim-1-ianuarie}}, oricât de mari ar fi veniturile.",
    },
    {
      pregunta: "Se adună și salariul la aceste praguri?",
      respuesta: "Nu. Pentru salariu CASS se reține lunar de angajator. Pragurile de aici privesc doar veniturile din alte surse, iar PFA-ul are propriile reguli.",
    },
    {
      pregunta: "Când se plătește CASS?",
      respuesta: "Prin Declarația unică, până la 25 mai a anului următor celui în care ați avut veniturile.",
    },
  ],
  glosario: [
    { termino: "Venituri din alte surse", definicion: "Aici: chirii, dividende, dobânzi, drepturi de autor și câștiguri din investiții." },
    { termino: "Treaptă", definicion: "Baza fixă de calcul a CASS, în număr de salarii minime." },
  ],
});
