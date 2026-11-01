import { pluralSq } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Kalkulator tarife freelance për orë",
    title: tituloQueEntre(`Tarifë freelance për orë: ${ctx.nombrePais}`, "Kalkulator tarife freelance për orë", "Tarifë freelance për orë"),
    description: "Llogaritni tarifën për orë dhe për ditë si freelancer nga të ardhurat e dëshiruara, shpenzimet, tatimet, ditët e lira dhe orët që mund të faturoni.",
    intro: [
      "Gabimi më i shpeshtë i një freelancer-i është të marrë pagën që do të donte si punonjës dhe ta pjesëtojë me 160 orë. Kështu mbeten jashtë tatimet, shpenzimet, pushimet dhe të gjitha orët që nuk mund të faturohen.",
      "Kalkulatori nis nga sa dëshironi t'ju mbeten dhe ju tregon sa duhet të kërkoni për të arritur atje.",
    ],
    comoSeCalcula: [
      "Faturimi i nevojshëm = të ardhurat e dëshiruara ÷ (1 − norma e tatimit) + shpenzimet e veprimtarisë.",
      "Ditë pune = 52 javë × ditë në javë − ditë të lira.",
      "Orë të faturueshme në vit = ditë pune × orë të faturueshme në ditë.",
      "Tarifa për orë = faturimi i nevojshëm ÷ orët e faturueshme në vit.",
    ],
    ejemplo: [
      `Që t'ju mbeten ${m(ingreso)} në vit, me shpenzime prej ${m(gastos)} dhe tatime prej 25%, duhet të faturoni ${m(r.facturado)}.`,
      `Me 30 ditë të lira dhe 25 orë të faturueshme në javë, dalin ${pluralSq(formatearNumero(ctx, Math.round(r.horas)), "orë", "orë")} në vit: një tarifë prej ${m(r.hora)} për orë ose ${m(r.dia)} për ditë.`,
    ],
    faq: [
      {
        pregunta: "Sa orë në javë mund të faturoj?",
        respuesta: "Më pak se sa punoni. Kërkimi i klientëve, e-mailet, faturimi dhe mësimi kërkojnë kohë që askush nuk e paguan. Zakonisht faturohen 20 deri në 30 orë nga 40.",
      },
      {
        pregunta: "A është më mirë të kërkoj tarifë për orë apo për projekt?",
        respuesta: "Të dyja mënyrat funksionojnë. Edhe nëse e caktoni çmimin për projekt, përllogaritni orët dhe shumëzojini me këtë tarifë, që të mos dilni me humbje.",
      },
      {
        pregunta: "Çfarë norme tatimi të përdor?",
        respuesta: "Varet nga vendi dhe nga forma në të cilën e ushtroni veprimtarinë. Mblidhni tatimin mbi të ardhurat dhe kontributet shoqërore. Nëse nuk jeni të sigurt, pyesni një kontabilist.",
      },
    ],
    glosario: [
      { termino: "Orë të faturueshme", definicion: "Orët e punës që ia faturoni një klienti." },
      { termino: "Të ardhura neto", definicion: "Ajo që mbetet pas tatimeve dhe shpenzimeve të veprimtarisë." },
    ],
  };
};
