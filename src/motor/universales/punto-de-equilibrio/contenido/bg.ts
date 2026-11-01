import { GRAMATICA } from "../../../i18n/gramatica";
import { formaBg } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoBg: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  const g = GRAMATICA.bg;
  const broi = (n: number) => `${formatearNumero(ctx, n)} ${formaBg(n, "брой", "броя")}`;
  return {
    h1: "Калкулатор за точка на безубитъчност",
    title: tituloQueEntre(`Точка на безубитъчност ${g.para(ctx.nombrePais)}`, "Калкулатор за точка на безубитъчност", "Точка на безубитъчност"),
    description: "Разберете колко броя трябва да продавате и какви приходи са Ви нужни всеки месец, за да покриете разходите и да стигнете желаната печалба.",
    intro: [
      "Точката на безубитъчност е обемът продажби, при който бизнесът нито печели, нито губи. Под нея има загуба, над нея започва печалбата.",
      "Въведете постоянните разходи, цената и разхода за всеки брой. Ще видите колко трябва да продадете, за да покриете разходите и да стигнете целта си.",
    ],
    comoSeCalcula: [
      "Принос на брой = цена − променлив разход на брой.",
      "Брой за безубитъчност = постоянни разходи ÷ принос на брой, закръглено нагоре.",
      "Приходи за безубитъчност = постоянни разходи ÷ (принос на брой ÷ цена).",
      "За желана печалба я добавете към постоянните разходи и сметката е същата.",
    ],
    ejemplo: [
      `При постоянни разходи ${m(fijos)}, цена ${m(precio)} и променлив разход ${m(variable)} всяка продажба оставя ${m(precio - variable)}.`,
      `Трябва да продадете ${broi(base.unidades)} (${m(base.facturacion)}), за да покриете разходите, и ${broi(meta.unidades)}, за да печелите ${m(objetivo)} на месец.`,
    ],
    faq: [
      {
        pregunta: "Какво са постоянни и променливи разходи?",
        respuesta: "Постоянните разходи остават същите, дори да не продадете нищо: наем, фиксирани заплати, сметки. Променливите растат с всяка продажба: стока, материали, комисионни, доставка.",
      },
      {
        pregunta: "Как да сваля точката на безубитъчност?",
        respuesta: "Има три начина: да вдигнете цената, да намалите променливия разход на брой или да съкратите постоянните разходи. Обикновено цената има най-голям ефект.",
      },
      {
        pregunta: "Става ли за бизнес с услуги?",
        respuesta: "Да. Един брой може да е час, сесия или клиент на месец. Като променлив разход въведете колко Ви струва да предоставите всеки от тях.",
      },
    ],
    glosario: [
      { termino: "Точка на безубитъчност", definicion: "Обемът продажби, при който приходите са равни на разходите." },
      { termino: "Принос", definicion: "Колко оставя всяка продажба за покриване на постоянните разходи." },
    ],
  };
};
