import { pluralSq } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const ore = (x: number) => pluralSq(n(x), "orë", "orë");
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Kalkulator orë pune",
    title: tituloQueEntre(`Kalkulator orë pune dhe orë shtesë: ${ctx.nombrePais}`, `Kalkulator orë pune: ${ctx.nombrePais}`, "Kalkulator orë pune"),
    description: "Mblidhni orët e punës së javës sipas orës së fillimit, orës së mbarimit dhe pushimeve dhe llogaritni pagesën, përfshirë orët shtesë.",
    intro: [
      "Zgjidhni orën e fillimit dhe të mbarimit për çdo ditë, pushimin e papaguar dhe pagesën për orë. Shikoni totalin e orëve, orët shtesë dhe pagesën në javë.",
      "Ju ndihmon të kontrolloni fletëpagesën, të plotësoni regjistrin e orëve ose të faturoni punën e paguar me orë.",
    ],
    comoSeCalcula: [
      "Orë në ditë = ora e mbarimit − ora e fillimit − pushimi. Nëse mbarimi është më herët se fillimi, turni mbaron ditën tjetër.",
      "Orë shtesë = totali i javës − orët normale, kur totali i kalon ato.",
      "Pagesa = orë normale × pagesa për orë + orë shtesë × pagesa për orë × (1 + rritja).",
    ],
    ejemplo: [
      `Nga ${hora("09:00")} deri në ${hora("17:30")}, me një pushim prej 30 minutash, janë ${ore(jornada)} në ditë. Nga e hëna në të premte, ${ore(jornada * 5)}: me ${m(pago)} për orë, ${m(jornada * 5 * pago)}.`,
      `Nga ${hora("08:00")} deri në ${hora("18:00")}, me një orë pushim, janë ${ore(larga * 5)} në javë, nga të cilat ${n(extra)} janë shtesë. Me një rritje prej 50%, pagesa është ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Si t'i llogaris orët e punës?",
        respuesta: "Zbritni orën e fillimit nga ora e mbarimit dhe hiqni pushimin. Pastaj mblidhni të gjitha ditët e javës.",
      },
      {
        pregunta: "Si t'i kthej minutat në orë me dhjetore?",
        respuesta: `Pjesëtoni minutat me 60. Një gjysmë ore është ${n(0.5, 1)}; 15 minuta, ${n(0.25, 2)}; 45 minuta, ${n(0.75, 2)}. Pra, 7 orë e 45 minuta janë ${n(7.75, 2)} orë.`,
      },
      {
        pregunta: "Sa orë shtesë mund të punoj dhe si paguhen?",
        respuesta: "Varet nga ligji i vendit ku punoni dhe nga kontrata e punës. Ky kalkulator përdor rritjen dhe orët normale që vendosni, pa zbatuar një rregull të caktuar.",
      },
    ],
    glosario: [
      { termino: "Orë shtesë", definicion: "Orët e punuara mbi orarin normal, të paguara me një rritje." },
      { termino: "Regjistër orësh", definicion: "Evidenca e orëve të fillimit dhe të mbarimit të punës për çdo ditë." },
    ],
  };
};
