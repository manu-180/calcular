import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Izračun navadnih obresti",
    title: tituloQueEntre(`Navadne obresti: izračun ${GRAMATICA.sl.para(ctx.nombrePais)}`, "Izračun navadnih obresti", "Navadne obresti"),
    description: "Izračunajte navadne obresti na glavnico pri letni obrestni meri za dneve, mesece ali leta. Izberite leto s 365 ali 360 dnevi in videli boste skupni znesek.",
    intro: [
      "Navadne obresti se vedno računajo od začetne glavnice: med obdobjem se obresti ne prištevajo k glavnici.",
      "Uporabljajo se pri kratkoročnih depozitih, posojilih med znanci in v številnih šolskih nalogah.",
    ],
    comoSeCalcula: [
      "Obresti = glavnica × letna obrestna mera × obdobje v letih.",
      "Pri obdobju v mesecih se deli z 12. Pri obdobju v dnevih se deli s 365 ali 360, odvisno od tega, katero leto uporablja banka.",
      "Skupaj = glavnica + obresti.",
    ],
    ejemplo: [
      `Znesek ${m(capital)} pri obrestni meri 10 % na leto v 6 mesecih prinese ${m(capital * 0.1 * 0.5)} obresti.`,
      `Ista glavnica v 90 dneh prinese ${m((capital * 0.1 * 90) / 365)} pri letu s 365 dnevi in ${m((capital * 0.1 * 90) / 360)} pri letu s 360 dnevi.`,
    ],
    faq: [
      {
        pregunta: "Kakšna je formula za navadne obresti?",
        respuesta: `O = G × r × t. G je glavnica, r letna obrestna mera kot decimalno število (10 % je ${formatearNumero(ctx, 0.1, 2)}), t pa obdobje v letih.`,
      },
      {
        pregunta: "Kakšna je razlika med navadnimi obrestmi in obrestnim obrestovanjem?",
        respuesta: "Navadne obresti se vedno računajo od iste glavnice. Pri obrestnem obrestovanju se obresti pripišejo glavnici in same prinašajo nove obresti.",
      },
      {
        pregunta: "Zakaj nekatere banke računajo leto s 360 dnevi?",
        respuesta: "To je bančna navada, ki poenostavi izračun. Pri 360 dneh so obresti nekoliko višje. Preverite, katero leto uporablja vaša banka.",
      },
    ],
    glosario: [
      { termino: "Glavnica", definicion: "Denar, ki si ga izposodite ali ga naložite, brez obresti." },
      { termino: "Bančno leto", definicion: "Leto s 360 dnevi, v katerem ima vsak mesec 30 dni." },
    ],
  };
};
