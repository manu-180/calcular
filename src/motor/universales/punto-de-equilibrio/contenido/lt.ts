import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLt } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const vienetai = (n: number) => `${formatearNumero(ctx, n)} ${formaLt(n, "vienetas", "vienetai", "vienetų")}`;
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Lūžio taško skaičiuoklė",
    title: tituloQueEntre(`Lūžio taško skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`, "Kaip apskaičiuoti lūžio tašką: skaičiuoklė", "Lūžio taško skaičiuoklė"),
    description: "Sužinokite, kiek vienetų reikia parduoti ir kokių pajamų reikia kas mėnesį, kad padengtumėte išlaidas ir pasiektumėte siekiamą pelną.",
    intro: [
      "Lūžio taškas yra pardavimų apimtis, kai įmonė neuždirba, bet ir nepatiria nuostolio. Žemiau jo veikiate nuostolingai, aukščiau jo pradedate uždirbti.",
      "Įveskite pastoviąsias išlaidas, kainą ir vieno vieneto išlaidas. Parodysime, kiek reikia parduoti, kad padengtumėte išlaidas ir pasiektumėte savo tikslą.",
    ],
    comoSeCalcula: [
      "Padengimo marža = kaina − kintamosios išlaidos vienetui.",
      "Lūžio taškas vienetais = pastoviosios išlaidos ÷ padengimo marža, suapvalinta į didesnę pusę.",
      "Lūžio taškas pajamomis = pastoviosios išlaidos ÷ (padengimo marža ÷ kaina).",
      "Siekiamą pelną pridėkite prie pastoviųjų išlaidų ir skaičiuokite taip pat.",
    ],
    ejemplo: [
      `Kai pastoviosios išlaidos yra ${m(fijos)}, kaina ${m(precio)}, o kintamosios išlaidos ${m(variable)}, kiekvienas pardavimas palieka ${m(precio - variable)}.`,
      `Išlaidoms padengti pardavimų apimtis turi būti ${vienetai(base.unidades)} (pajamos ${m(base.facturacion)}), o ${m(objetivo)} mėnesio pelnui ${vienetai(meta.unidades)}.`,
    ],
    faq: [
      {
        pregunta: "Kas yra pastoviosios ir kintamosios išlaidos?",
        respuesta:
          "Pastoviosios išlaidos nesikeičia, net jei nieko neparduodate: nuoma, fiksuoti atlyginimai, komunaliniai mokesčiai. Kintamosios išlaidos auga su kiekvienu pardavimu: prekės, medžiagos, komisiniai, transportas.",
      },
      {
        pregunta: "Kaip sumažinti lūžio tašką?",
        respuesta: "Galimi trys būdai: pakelti kainą, sumažinti kintamąsias išlaidas vienetui arba apkarpyti pastoviąsias išlaidas. Daugiausia paprastai lemia kaina.",
      },
      {
        pregunta: "Ar tai tinka ir paslaugoms?",
        respuesta: "Taip. Vienetas gali būti valanda, konsultacija arba klientas per mėnesį. Kaip kintamąsias išlaidas įveskite, kiek kainuoja kiekvienas iš jų.",
      },
    ],
    glosario: [
      { termino: "Lūžio taškas", definicion: "Pardavimų apimtis, kai pajamos lygios išlaidoms." },
      { termino: "Padengimo marža", definicion: "Kiek kiekvienas pardavimas palieka pastoviosioms išlaidoms padengti." },
    ],
  };
};
