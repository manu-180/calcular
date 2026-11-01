import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Izdevumu dalīšanas kalkulators",
    title: tituloQueEntre(`Izdevumu dalīšana: kopīgo izdevumu kalkulators (${ctx.nombrePais})`, "Izdevumu dalīšana: kopīgo izdevumu kalkulators", "Izdevumu dalīšana"),
    description: "Sadaliet kopīgos izdevumus starp ne vairāk kā astoņiem cilvēkiem: katra daļa un kurš kam cik pārskaita, ar pēc iespējas mazāk maksājumiem.",
    intro: [
      "Tas noder ceļojumam, vakariņām, svinībām vai kopīgai īrei, kad katrs samaksājis citu summu.",
      "Ievadiet, cik katrs samaksāja. Redzēsiet katra daļu un maksājumus, pēc kuriem nepaliks parādu.",
    ],
    comoSeCalcula: [
      "Daļa = kopējie izdevumi ÷ personu skaits.",
      "Kas samaksāja mazāk par savu daļu, tam jāpiemaksā starpība. Kas samaksāja vairāk, tas starpību atgūst.",
      "Maksājumi iet no lielākā parāda uz lielāko pārmaksu, tāpēc neviena maksājuma nav par daudz.",
    ],
    ejemplo: [
      `Anna samaksāja ${m(a)}, Jānis ${m(b)}, bet Līga neko. Kopā ${m(a + b)}, tāpēc katra daļa ir ${m(cuota)}.`,
      `Līga pārskaita Annai ${m(cuota)}, bet Jānis pārskaita Annai ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Kā sadalīt rēķinu, ja katrs samaksājis citu summu?",
        respuesta: "Saskaitiet visas summas, daliet ar personu skaitu un salīdziniet ar to, ko katrs samaksāja. Starpība parāda, kuram cik jāpiemaksā vai jāatgūst.",
      },
      {
        pregunta: "Kā rīkoties, ja kāds neko nesamaksāja?",
        respuesta: "Ievadiet šai personai 0, lai arī tā piedalītos izdevumos. Ja lauks atstāts tukšs, šī persona netiek skaitīta.",
      },
      {
        pregunta: "Kāpēc maksājumu ir mazāk nekā cilvēku?",
        respuesta: "Parādi tiek apvienoti: persona ar lielāko parādu maksā tai, kura visvairāk pārmaksāja, un tā tālāk. Maksājumu nekad nevajag vairāk par personu skaitu mīnus viens.",
      },
    ],
    glosario: [
      { termino: "Daļa", definicion: "Cik katram jāsamaksā no kopējiem izdevumiem." },
      { termino: "Bilance", definicion: "Starpība starp to, ko persona samaksāja, un tai pienākošos daļu." },
    ],
  };
};
