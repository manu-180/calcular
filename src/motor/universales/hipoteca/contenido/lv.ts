import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Mājokļa kredīta kalkulators",
    title: tituloQueEntre(`Mājokļa kredīta kalkulators (${ctx.nombrePais})`, "Mājokļa kredīta kalkulators: maksājums un procenti", "Mājokļa kredīta kalkulators"),
    description: "Aprēķiniet ikmēneša mājokļa kredīta maksājumu pēc cenas, pirmās iemaksas, procentu likmes un termiņa. Redzēsiet procentus un atlikumu pa gadiem.",
    intro: [
      "Lielākajai daļai mājsaimniecību mājokļa kredīts ir lielākais parāds mūžā. Ir vērts redzēt visus skaitļus vēl pirms sarunas ar banku.",
      "Ievadiet mājokļa cenu, pirmo iemaksu, procentu likmi un kredīta termiņu. Ja kopā ar kredītu maksājat apdrošināšanu vai nekustamā īpašuma nodokli, pievienojiet tos un redzēsiet īsto mēneša summu.",
    ],
    comoSeCalcula: [
      "Kredīta summa = mājokļa cena − pirmā iemaksa.",
      "Ikmēneša maksājumu rēķina kā anuitāti (visu laiku vienādu): procentu likmi gadā dala ar 12, bet termiņu ņem mēnešos.",
      "Par katru gadu saskaita samaksātos procentus un atmaksāto kredīta daļu, tad parāda atlikumu.",
    ],
    ejemplo: [
      `Ja mājoklis maksā ${m(precio)} un pirmā iemaksa ir 20%, kredīta summa ir ${m(prestado)}. Ja procentu likme gadā ir 7% un termiņš 30 gadi, ikmēneša maksājums ir ${m(cuota30)}.`,
      `Procentu kopsumma 30 gados: ${m(interesesTotales(prestado, 7, 360))}. Ja termiņš ir 15 gadi, maksājums pieaug līdz ${m(cuota15)}, bet procentu kopsumma ir ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Cik liela pirmā iemaksa vajadzīga?",
        respuesta:
          "Tas atkarīgs no bankas un valstī spēkā esošajiem noteikumiem; bankas parasti aizdod tikai daļu mājokļa vērtības. Jo lielāka pirmā iemaksa, jo mazāk aizņematies, jo mazāks maksājums un jo mazāk procentu samaksāsiet. Atlieciet naudu arī līguma noslēgšanas izdevumiem.",
      },
      {
        pregunta: "Kāpēc pirmajos gados parāds gandrīz nesamazinās?",
        respuesta:
          "Procentus rēķina no kredīta atlikuma. Sākumā tas ir liels, tāpēc lielākā maksājuma daļa aiziet procentiem. Vēlāk attiecība pamazām mainās.",
      },
      {
        pregunta: "Vai labāks ir īsāks kredīta termiņš?",
        respuesta:
          "Ja lielāku maksājumu varat atļauties, jā: procentos samaksāsiet ievērojami mazāk. Ja ne, var derēt garāks termiņš un papildu maksājumi, kad vien izdodas.",
      },
      {
        pregunta: "Vai mans maksājums var mainīties?",
        respuesta:
          "Kamēr procentu likme ir fiksēta, maksājums nemainās. Kad fiksācijas periods beidzas vai likme ir mainīga, maksājums var pieaugt vai samazināties. Šis kalkulators visam kredīta termiņam piemēro vienu un to pašu likmi.",
      },
    ],
    glosario: [
      { termino: "Pirmā iemaksa", definicion: "Mājokļa cenas daļa, ko samaksājat no savas naudas." },
      { termino: "Kredīta atlikums", definicion: "Aizņemtā summa, kas vēl jāatmaksā." },
      { termino: "Procentu likmes fiksācija", definicion: "Periods, kurā banka nemaina mājokļa kredīta procentu likmi." },
    ],
  };
};
