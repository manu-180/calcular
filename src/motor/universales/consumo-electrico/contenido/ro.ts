import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Calculator consum energie electrică",
    title: tituloQueEntre(`Calculator consum energie electrică: ${ctx.nombrePais}`, "Calculator consum energie electrică", "Calculator consum energie"),
    description: "Calculați câtă energie electrică folosește un aparat și cât costă pe zi, pe lună și pe an, după putere, orele de folosire și prețul pe kWh.",
    intro: [
      "Introduceți puterea aparatului, câte ore îl folosiți și prețul pe kWh de pe factură. Vedeți consumul și costul.",
      "Așa aflați ce aparat apasă cel mai mult pe factură: aerul condiționat, un radiator, frigiderul sau calculatorul.",
    ],
    comoSeCalcula: [
      "kWh pe zi = wați × ore de folosire ÷ 1000.",
      "kWh pe lună = kWh pe zi × zilele de folosire. Pentru un an, luna înmulțită cu 12.",
      "Cost = kWh × prețul pe kWh.",
    ],
    ejemplo: [
      `Un aparat de 1000 W folosit 4 ore pe zi consumă 4 kWh pe zi și ${formatearNumero(ctx, kwhMes)} kWh pe lună.`,
      `La ${m(precio)} pe kWh, costă ${m(kwhMes * precio)} pe lună.`,
    ],
    faq: [
      {
        pregunta: "Ce este un kWh?",
        respuesta: "Un kilowatt-oră este energia pe care o folosește un aparat de 1000 W care funcționează o oră. Este unitatea de pe factura de energie electrică.",
      },
      {
        pregunta: "Frigiderul merge la putere maximă toată ziua?",
        respuesta: "Nu. Compresorul pornește și se oprește. Pentru astfel de aparate, folosiți între 8 și 10 ore pe zi în loc de 24.",
      },
      {
        pregunta: "De ce factura nu iese exact la fel?",
        respuesta: "Factura adaugă abonamentul, taxele și uneori prețuri pe tranșe de consum. Calculatorul arată doar ce consumă aparatul.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "Unitate de putere: câtă energie folosește un aparat în fiecare secundă." },
      { termino: "Kilowatt-oră (kWh)", definicion: "1000 W timp de o oră. Este ce plătiți pe factură." },
    ],
  };
};
