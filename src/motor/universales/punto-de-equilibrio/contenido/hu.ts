import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Fedezeti pont kalkulátor",
    title: tituloQueEntre(`Fedezeti pont kalkulátor (${ctx.nombrePais})`, `Fedezeti pont számítás (${ctx.nombrePais})`, "Fedezeti pont kalkulátor"),
    description: "Fedezeti pont számítás: hány darabot kell eladnod és mekkora havi árbevétel kell ahhoz, hogy fedezd a költségeidet és elérd a kívánt nyereséget.",
    intro: [
      "A fedezeti pont az az eladási szint, ahol a vállalkozás se nem nyer, se nem veszít. Alatta veszteséges, felette nyereséges.",
      "Írd be a fix költségeidet, az eladási árat és egy darab változó költségét. Megmondjuk, mennyit kell eladnod a költségek fedezéséhez és a célod eléréséhez.",
    ],
    comoSeCalcula: [
      "Fedezeti hozzájárulás = eladási ár − változó költség darabonként.",
      "Darabszám a fedezeti ponthoz = fix költségek ÷ fedezeti hozzájárulás, felfelé kerekítve.",
      "Árbevétel a fedezeti ponthoz = fix költségek ÷ (fedezeti hozzájárulás ÷ eladási ár).",
      "A kívánt nyereséghez add hozzá a nyereséget a fix költségekhez, és számolj ugyanígy.",
    ],
    ejemplo: [
      `Fix költségek: ${m(fijos)}, eladási ár: ${m(precio)}, változó költség: ${m(variable)}. Minden eladásból ennyi marad: ${m(precio - variable)}.`,
      `A költségek fedezéséhez ennyi darabot kell eladnod: ${formatearNumero(ctx, base.unidades)} (árbevétel: ${m(base.facturacion)}). Havi ${m(objetivo)} nyereséghez ennyit: ${formatearNumero(ctx, meta.unidades)}.`,
    ],
    faq: [
      {
        pregunta: "Mik a fix és a változó költségek?",
        respuesta: "A fix költségek akkor is ugyanannyiak, ha semmit nem adsz el: bérleti díj, fix bérek, rezsi. A változó költségek minden eladással nőnek: áru, anyag, jutalék, szállítás.",
      },
      {
        pregunta: "Hogyan csökkenthetem a fedezeti pontot?",
        respuesta: "Három eszközöd van: emeld az árat, csökkentsd a darabonkénti változó költséget, vagy faragj le a fix költségekből. Általában az ár mozdít a legtöbbet.",
      },
      {
        pregunta: "Szolgáltató vállalkozásnál is működik?",
        respuesta: "Igen. Egy darab lehet egy óra, egy alkalom vagy egy ügyfél havonta. Változó költségként azt add meg, amennyibe egy-egy teljesítése kerül.",
      },
    ],
    glosario: [
      { termino: "Fedezeti pont", definicion: "Az az eladási szint, ahol az árbevétel megegyezik a költségekkel." },
      { termino: "Fedezeti hozzájárulás", definicion: "Amennyi minden eladásból a fix költségek fedezésére jut." },
    ],
  };
};
