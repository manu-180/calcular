import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Áramfogyasztás kalkulátor",
    title: tituloQueEntre(`Áramfogyasztás kalkulátor (${ctx.nombrePais})`, "Áramfogyasztás kalkulátor háztartási gépekhez", "Áramfogyasztás kalkulátor"),
    description: "Számold ki, mennyi áramot fogyaszt egy készülék, és mennyibe kerül naponta, havonta és évente, a teljesítmény, a használat és a kWh-ár alapján.",
    intro: [
      "Add meg a készülék teljesítményét, hány órát használod naponta, és a villanyszámládon szereplő kWh-árat. Látod a fogyasztást és azt, mennyibe kerül.",
      "Így könnyen kiderül, melyik készülék növeli a legjobban a villanyszámlát: a klíma, a hősugárzó, a hűtő vagy a számítógép.",
    ],
    comoSeCalcula: [
      "Napi kWh = watt × használati órák ÷ 1000.",
      "Havi kWh = napi kWh × használati napok. Az éves fogyasztás a havi fogyasztás tizenkétszerese.",
      "Költség = kWh × egy kWh ára.",
    ],
    ejemplo: [
      `Egy 1000 W teljesítményű készülék, amely naponta 4 órát működik, naponta 4 kWh, havonta ${formatearNumero(ctx, kwhMes)} kWh áramot fogyaszt.`,
      `Ha egy kWh ára ${m(precio)}, a havi költség: ${m(kwhMes * precio)}.`,
    ],
    faq: [
      {
        pregunta: "Mi az a kWh?",
        respuesta: "Kilowattóra: az az energia, amelyet egy 1000 W teljesítményű készülék egy óra alatt elhasznál. A villanyszámlán ebben az egységben számlázzák az áramot.",
      },
      {
        pregunta: "A hűtő egész nap teljes teljesítménnyel megy?",
        respuesta: "Nem. A kompresszor be- és kikapcsol. Ilyen készülékeknél napi 24 óra helyett 8 és 10 óra közötti értéket adj meg.",
      },
      {
        pregunta: "Miért nem egyezik az eredmény a villanyszámlával?",
        respuesta: "A számlán alapdíj, rendszerhasználati díjak és adók is szerepelnek, néha sávos árazás is. Ez a számítás csak magának a készüléknek a fogyasztását mutatja.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "A teljesítmény mértékegysége: mennyi energiát vesz fel a készülék másodpercenként." },
      { termino: "Kilowattóra (kWh)", definicion: "1000 W egy órán át. A villanyszámlán ezért az egységért fizetsz." },
    ],
  };
};
