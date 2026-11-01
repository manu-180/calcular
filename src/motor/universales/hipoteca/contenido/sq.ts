import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Kalkulator kredie për shtëpi",
    title: tituloQueEntre(`Kalkulator kredie për shtëpi: ${ctx.nombrePais}`, "Kalkulator kredie për shtëpi: kësti dhe interesi", "Kalkulator kredie për shtëpi"),
    description: "Llogaritni këstin mujor të kredisë për shtëpi sipas çmimit, parapagimit, interesit dhe afatit. Shikoni totalin e interesit dhe si ulet teprica çdo vit.",
    intro: [
      "Kredia për shtëpi është borxhi më i madh që marrin shumica e familjeve. Ia vlen të shikoni të gjitha shifrat para bisedës me bankën.",
      "Vendosni çmimin e shtëpisë, parapagimin, interesin dhe afatin. Nëse paguani sigurimin ose taksën e pronës bashkë me këstin, shtojini dhe shikoni këstin real.",
    ],
    comoSeCalcula: [
      "Shuma e huazuar = çmimi i shtëpisë − parapagimi.",
      "Kësti është i barabartë (anuitet): i njëjti çdo muaj, me interesin vjetor të pjesëtuar me 12 dhe afatin në muaj.",
      "Për çdo vit mblidhen interesi i paguar dhe principali i shlyer dhe tregohet teprica e mbetur.",
    ],
    ejemplo: [
      `Një shtëpi prej ${m(precio)} me një parapagim prej 20% kërkon një kredi prej ${m(prestado)}. Me një interes prej 7% në vit, për 30 vjet, kësti mujor është ${m(cuota30)}.`,
      `Në 30 vjet paguani interes prej ${m(interesesTotales(prestado, 7, 360))}. Për 15 vjet kësti ngjitet në ${m(cuota15)}, por interesi bie në ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Çfarë parapagimi duhet për një kredi për shtëpi?",
        respuesta:
          "Varet nga banka dhe nga programi i kreditimit. Sa më i madh parapagimi, aq më të vogla janë shuma e huazuar, kësti dhe interesi total. Lini mënjanë edhe para për kostot e dhënies së kredisë.",
      },
      {
        pregunta: "Pse borxhi ulet kaq pak në vitet e para?",
        respuesta:
          "Interesi llogaritet mbi tepricën e mbetur. Në fillim teprica është e madhe, prandaj pothuajse i gjithë kësti shkon për interes. Me kohën, pjesa e principalit në këst rritet.",
      },
      {
        pregunta: "A është më mirë një kredi me afat më të shkurtër?",
        respuesta:
          "Nëse e përballoni një këst më të lartë, po: paguani shumë më pak interes. Nëse jo, një afat i gjatë me shlyerje të parakohshme kur keni para shtesë mund të jetë një zgjidhje.",
      },
      {
        pregunta: "A mund të ndryshojë kësti i kredisë për shtëpi?",
        respuesta: "Me interes fiks, kësti mbetet i njëjtë. Me interes të ndryshueshëm, mund të ndryshojë. Kalkulatori supozon se interesi nuk ndryshon gjatë gjithë afatit.",
      },
    ],
    glosario: [
      { termino: "Parapagim", definicion: "Pjesa e çmimit të shtëpisë që paguani me paratë tuaja." },
      { termino: "Principal", definicion: "Shuma e huazuar që keni ende për të shlyer." },
      { termino: "Teprica", definicion: "Sa i keni ende borxh bankës në këtë moment." },
    ],
  };
};
