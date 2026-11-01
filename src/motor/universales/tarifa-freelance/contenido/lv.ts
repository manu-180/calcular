import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLv } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  const horas = Math.round(r.horas);
  return {
    h1: "Pašnodarbinātā stundas likmes kalkulators",
    title: tituloQueEntre(
      `Stundas likmes kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Cik prasīt par stundu: likmes kalkulators",
      "Stundas likmes kalkulators",
    ),
    description:
      "Aprēķiniet pašnodarbinātā stundas un dienas likmi pēc vēlamajiem ienākumiem, izdevumiem, nodokļiem, brīvajām dienām un apmaksātajām stundām.",
    intro: [
      "Biežākā pašnodarbināto kļūda ir ņemt vēlamo algas summu un dalīt ar 160 stundām. Tā aizmirstas nodokļi, izdevumi, atvaļinājums un visas stundas, par kurām neviens nemaksā.",
      "Šis kalkulators balstās uz neto ienākumiem, kādus vēlaties, un parāda, cik jāprasa no klientiem.",
    ],
    comoSeCalcula: [
      "Vajadzīgie ieņēmumi = neto ienākumi ÷ (1 − nodokļu likme) + saimnieciskās darbības izdevumi.",
      "Darba dienas = 52 nedēļas × darba dienas nedēļā − brīvās dienas.",
      "Apmaksātās stundas gadā = darba dienas × apmaksātās stundas dienā.",
      "Stundas likme = vajadzīgie ieņēmumi ÷ apmaksātās stundas gadā.",
    ],
    ejemplo: [
      `Lai neto ienākumi gadā būtu ${m(ingreso)}, ja izdevumi ir ${m(gastos)}, bet nodokļi 25%, jānopelna ${m(r.facturado)}.`,
      `Ja brīvo dienu ir 30, bet apmaksāto stundu nedēļā 25, gadā sanāk ${formatearNumero(ctx, horas)} ${formaLv(horas, "stunda", "stundas", "stundu")}: likme ir ${m(r.hora)} stundā vai ${m(r.dia)} dienā.`,
    ],
    faq: [
      {
        pregunta: "Cik stundu nedēļā var būt apmaksātas?",
        respuesta:
          "Mazāk, nekā strādājat. Klientu meklēšana, e-pasti, rēķinu izrakstīšana un mācīšanās aizņem laiku, par kuru neviens nemaksā. Parasti apmaksātas ir 20 līdz 30 stundas no 40.",
      },
      {
        pregunta: "Vai prasīt samaksu par stundu vai par projektu?",
        respuesta: "Der abi veidi. Pat ja nosakāt cenu visam projektam, novērtējiet stundu skaitu un sareiziniet to ar šo likmi, lai nepaliktu zaudējumos.",
      },
      {
        pregunta: "Kādu nodokļu likmi izmantot?",
        respuesta:
          "Tas ir atkarīgs no valsts un darbības formas. Saskaitiet ienākuma nodokli un sociālās un veselības apdrošināšanas iemaksas. Ja šaubāties, pajautājiet grāmatvedim.",
      },
    ],
    glosario: [
      { termino: "Apmaksātās stundas", definicion: "Darba stundas, par kurām izrakstāt rēķinu klientam." },
      { termino: "Neto ienākumi", definicion: "Kas paliek pēc nodokļu samaksas un saimnieciskās darbības izdevumu atskaitīšanas." },
    ],
  };
};
