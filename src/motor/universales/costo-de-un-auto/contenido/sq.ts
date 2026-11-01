import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "milje" : "kilometër";
  const distancia = imperial ? `${formatearNumero(ctx, g.distancia)} milje` : `${formatearNumero(ctx, g.distancia)} km`;
  return {
    h1: "Kalkulator i kostos së makinës",
    title: tituloQueEntre(`Kosto e makinës: ${ctx.nombrePais}`, "Kalkulator i kostos së makinës", "Kosto e makinës"),
    description: `Llogaritni sa ju kushton në të vërtetë makina në muaj, në vit dhe për ${unidad}: karburant, sigurim, mirëmbajtje, parkim dhe vlera që humbet.`,
    intro: [
      "Shumë njerëz e dinë sa shpenzojnë për karburant. Pak i mbledhin sigurimin, mirëmbajtjen, parkimin dhe, mbi të gjitha, vlerën që makina humbet çdo vit.",
      "Plotësoni kostot dhe ju tregojmë sa ju kushton vërtet makina. Ju ndihmon të vendosni nëse do ta blini, do ta ndërroni apo do të lëvizni ndryshe.",
    ],
    comoSeCalcula: [
      imperial
        ? "Karburanti në muaj = milje në muaj ÷ milje për gallon × çmimi për gallon."
        : "Karburanti në muaj = kilometra në muaj × litra për 100 km ÷ 100 × çmimi për litër.",
      "Vlera e humbur në muaj = vlera e makinës × humbja vjetore ÷ 12.",
      "Kostoja reale = karburant + sigurim + mirëmbajtje + parkim + kosto të tjera + vlerë e humbur.",
      `Kosto për ${unidad} = kostoja reale mujore ÷ distanca e përshkuar në muaj.`,
    ],
    ejemplo: [
      `Një makinë prej ${m(g.precio)} me të cilën përshkoni ${distancia} në muaj kushton ${m(mensual)} në muaj, bashkë me vlerën që humbet.`,
      `Kjo do të thotë ${m(mensual * 12)} në vit dhe ${formatearMonto(ctx, mensual / g.distancia)} për ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Çfarë është amortizimi i makinës?",
        respuesta: "Është vlera që makina humbet me kohën. Nuk e paguani çdo muaj, por e ndieni kur e shitni. Te një makinë e re, shpesh është kostoja më e madhe.",
      },
      {
        pregunta: "Pse nuk shtohet kësti i kredisë për makinën?",
        respuesta:
          "Një pjesë e këstit paguan vetë makinën, e cila është llogaritur tashmë si vlerë e humbur. Po t'i mblidhnim të dyja, makina do të numërohej dy herë. Interesi i kredisë është një kosto shtesë.",
      },
      {
        pregunta: "Si mund ta ul koston e makinës?",
        respuesta:
          "Krahasoni ofertat e sigurimit çdo vit, mbani në rregull presionin e gomave dhe serviset dhe mos e ndërroni makinën shpesh: në vitet e para humbet pjesën më të madhe të vlerës.",
      },
    ],
    glosario: [
      { termino: "Amortizim", definicion: "Vlera që makina humbet me kohën dhe me përdorimin." },
      { termino: `Kosto për ${unidad}`, definicion: `Kostoja mesatare për ${unidad} të përshkuar, me të gjitha kostot të përfshira.` },
    ],
  };
};
