import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch.mietzinsrechner",
  h1: "Mietzinsrechner: Referenzzinssatz und Teuerung",
  title: "Mietzinsrechner Schweiz: Referenzzinssatz {{ch.referenzzinssatz}}",
  description:
    "Mietzinsanpassung berechnen: Referenzzinssatz {{ch.referenzzinssatz}}, {{ch.mietzins-hypothekarzins}} je Viertelprozent und {{ch.mietzins-teuerungsanteil}} der Teuerung nach VMWG. Senkung oder Erhöhung.",
  intro: [
    "In der Schweiz hängt der Mietzins vom hypothekarischen Referenzzinssatz ab, den das Bundesamt für Wohnungswesen vierteljährlich veröffentlicht. Er beträgt zurzeit {{ch.referenzzinssatz}}.",
    "Sinkt der Satz seit Ihrer letzten Mietzinsanpassung, können Sie eine Senkung verlangen. Steigt er, darf die Vermieterschaft erhöhen. Der Rechner zeigt, um wie viel.",
  ],
  comoSeCalcula: [
    "Referenzzinssatz: Je Viertelprozent Erhöhung steigt der Mietzins bei Sätzen unter 5 % um höchstens {{ch.mietzins-hypothekarzins}}. Bei einer Senkung rechnet der Rechner umgekehrt: Mietzins geteilt durch 1.03 je Viertelprozent, also rund 2.91 % weniger.",
    "Teuerung: Die Vermieterschaft darf {{ch.mietzins-teuerungsanteil}} der Steigerung des Landesindexes der Konsumentenpreise seit der letzten Anpassung überwälzen.",
    "Allgemeine Kostensteigerungen, zum Beispiel für Unterhalt, kommen nur dazu, wenn sie geltend gemacht werden. Der Rechner zählt die drei Anteile zusammen.",
  ],
  ejemplo: [
    "Ein Mietzins von 2000 Franken, zuletzt angepasst bei 1.75 % und mit dem Landesindex vom Dezember 2023, sinkt beim Referenzzinssatz von 1.25 % um rund 97 Franken auf rund 1903 Franken.",
  ],
  faq: [
    {
      pregunta: "Wann wird der Referenzzinssatz veröffentlicht?",
      respuesta: "Das Bundesamt für Wohnungswesen veröffentlicht ihn vierteljährlich, jeweils Anfang März, Juni, September und Dezember.",
    },
    {
      pregunta: "Kann ich eine Mietzinssenkung verlangen?",
      respuesta: "Ja, schriftlich bei der Vermieterschaft und auf den nächstmöglichen Kündigungstermin. Sie muss innert 30 Tagen Stellung nehmen, sonst können Sie innert 30 Tagen die Schlichtungsbehörde anrufen. Die Vermieterschaft darf die Einsparung mit inzwischen gestiegenen Kosten verrechnen.",
    },
    {
      pregunta: "Wie viel Teuerung darf auf den Mietzins?",
      respuesta: "Höchstens {{ch.mietzins-teuerungsanteil}} der Steigerung des Landesindexes der Konsumentenpreise.",
    },
  ],
});
