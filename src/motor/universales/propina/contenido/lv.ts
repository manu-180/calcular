import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Dzeramnaudas kalkulators",
    title: tituloQueEntre(
      `Dzeramnaudas kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Cik atstāt dzeramnaudā: kalkulators",
      "Dzeramnaudas kalkulators",
    ),
    description: "Aprēķiniet dzeramnaudu, kopējo rēķina summu un katra daļu, ja maksājat kopā. Daļu var noapaļot līdz veselai summai.",
    intro: [
      "Ievadiet rēķina summu, dzeramnaudas procentu un maksātāju skaitu. Redzēsiet dzeramnaudu, kopējo summu un katra daļu.",
      "Ja labāk patīk apaļi skaitļi, kalkulators katra daļu noapaļo uz augšu, bet starpība aiziet dzeramnaudā.",
    ],
    comoSeCalcula: ["Dzeramnauda = rēķins × dzeramnaudas procents ÷ 100.", "Kopā = rēķins + dzeramnauda.", "Katra daļa ir kopējā summa, izdalīta ar cilvēku skaitu."],
    ejemplo: [
      `Ja rēķins ir ${m(cuenta)}, 10% dzeramnauda ir ${m(propina)}, tātad kopā maksāsiet ${m(cuenta + propina)}.`,
      `Ja maksā trīs cilvēki, katrs samaksā ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Cik parasti atstāj dzeramnaudā?",
        respuesta: `Tas ir atkarīgs no vietējām paražām. Painteresējieties, kas ir ierasts ${GRAMATICA.lv.en(ctx.nombrePais)}, un pārbaudiet, vai rēķinā jau nav iekļauta maksa par apkalpošanu.`,
      },
      {
        pregunta: "Vai dzeramnaudu rēķina no summas ar nodokļiem?",
        respuesta: "Parasti no visas rēķina summas. Ja vēlaties rēķināt no summas bez nodokļiem, ievadiet to.",
      },
      {
        pregunta: "Kā ātri aprēķināt 10% vai 15% dzeramnaudu?",
        respuesta: `Rēķinu izdaliet ar desmit, tā iegūsiet 10%. Lai iegūtu 15%, pieskaitiet vēl pusi no šīs summas. Ja rēķins ir 850, 10% ir ${n(850 * 0.1)}, bet 15% ir ${n(850 * 0.15)}.`,
      },
    ],
    glosario: [
      { termino: "Dzeramnauda", definicion: "Papildu summa, ko atstājat par apkalpošanu, neskaitot pašu cenu." },
      { termino: "Maksa par apkalpošanu", definicion: "Summa, ko iestāde par apkalpošanu jau pieskaitījusi rēķinam." },
    ],
  };
};
