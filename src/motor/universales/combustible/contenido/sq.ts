import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Një udhëtim prej 150 miljesh në vajtje dhe po aq në ardhje, me një makinë që bën 30 milje për gallon, konsumon ${formatearNumero(ctx, galones)} galona.`,
          `Me ${m(precio)} për gallon, kjo bën ${m(galones * precio)}. E ndarë për 2 persona, ${m((galones * precio) / 2)} për person.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Një udhëtim prej 300 km në vajtje dhe po aq në ardhje, me një makinë që konsumon 8 litra për 100 km, ka nevojë për ${formatearNumero(ctx, litros)} litra.`,
          `Me ${m(precio)} për litër, kjo bën ${m(litros * precio)}. E ndarë për 2 persona, ${m((litros * precio) / 2)} për person.`,
        ];
      })();
  return {
    h1: "Kalkulator karburanti",
    title: tituloQueEntre(`Kalkulator karburanti: ${ctx.nombrePais}`, "Kalkulator konsumi karburanti", "Kalkulator karburanti"),
    description: "Llogaritni sa kushton karburanti për një udhëtim sipas distancës, konsumit të makinës dhe çmimit të karburantit, si dhe sa paguan secili person.",
    intro: [
      `Vendosni distancën, konsumin e makinës dhe çmimin për ${imperial ? "gallon" : "litër"}. Shikoni sa karburant ju duhet dhe sa kushton udhëtimi.`,
      imperial ? "Konsumi vendoset në milje për gallon, si në skedën e makinës." : "Konsumi mund të vendoset në litra për 100 km ose në kilometra për litër.",
    ],
    comoSeCalcula: imperial
      ? ["Galona = distanca ÷ milje për gallon.", "Kosto = galona × çmimi për gallon. Një udhëtim vajtje-ardhje e dyfishon distancën."]
      : [
          "Me litra për 100 km: litra = distanca × konsumi ÷ 100.",
          "Me kilometra për litër: litra = distanca ÷ konsumi.",
          "Kosto = litra × çmimi për litër. Një udhëtim vajtje-ardhje e dyfishon distancën.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Si i kthej kilometrat për litër në litra për 100 km?",
        respuesta: `Pjesëtoni 100 me numrin e kilometrave për litër. Një makinë që bën 12,5 km me një litër konsumon ${formatearNumero(ctx, 100 / 12.5, 1)} litra për 100 km.`,
      },
      {
        pregunta: "A përfshihen tarifat rrugore?",
        respuesta: "Jo. Kalkulatori mbulon vetëm karburantin. Shtoni veçmas vinjetën, tarifat e urave dhe parkimin.",
      },
      {
        pregunta: "Pse makina konsumon më shumë në qytet?",
        respuesta: "Ndalesat dhe nisjet e përsëritura kërkojnë më shumë energji se ecja e qëndrueshme në autostradë, prandaj në qytet konsumi është zakonisht më i lartë.",
      },
    ],
    glosario: [
      { termino: "Konsum", definicion: "Sa karburant përdor një makinë për një distancë të caktuar." },
      { termino: "Litra për 100 km", definicion: "Sa litra konsumon makina për 100 km. Sa më i ulët, aq më mirë." },
    ],
  };
};
