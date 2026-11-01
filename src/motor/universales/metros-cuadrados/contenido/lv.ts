import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Kvadrātpēdu kalkulators" : "Kvadrātmetru kalkulators",
    title: imperial
      ? tituloQueEntre(`Kvadrātpēdu kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "Kvadrātpēdu kalkulators")
      : tituloQueEntre(`Kvadrātmetru kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "Kvadrātmetru kalkulators", "m² kalkulators"),
    description: "Aprēķiniet telpas, grīdas vai zemes gabala laukumu: taisnstūri, trijstūri un apļi, saskaitot līdz piecām formām.",
    intro: [
      "Izvēlieties formu un ievadiet tās izmērus. Ja telpa nav vienkāršs taisnstūris, sadaliet to daļās, un kalkulators tās saskaitīs.",
      imperial ? "Rezultāts tiks parādīts arī kvadrātmetros." : "Rezultāts tiks parādīts arī kvadrātpēdās.",
    ],
    comoSeCalcula: [
      "Taisnstūris: garums × platums.",
      "Trijstūris: pamats × augstums ÷ 2.",
      `Aplis: π × rādiuss × rādiuss, kur rādiuss ir puse no diametra. 1 m² ir ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `L formas viesistabu var sadalīt taisnstūrī 16 × 12 ft un taisnstūrī 10 × 6 ft. Kopā tie ir ${n(enL, 0)} ft².`
        : `L formas viesistabu var sadalīt taisnstūrī 5 × 4 m un taisnstūrī 3 × 2 m. Kopā tie ir ${n(enL, 0)} m².`,
      `Apaļš galds ar diametru 2 ${u} aizņem ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "Kā aprēķināt telpas laukumu pēdās?" : "Kā aprēķināt telpas kvadrātmetrus?",
        respuesta: imperial
          ? "Izmēriet garumu un platumu pēdās un sareiziniet tos. Ja telpas izmēri ir 12 × 10 ft, laukums ir 120 ft²."
          : "Izmēriet garumu un platumu metros un sareiziniet tos. Ja istabas izmēri ir 4 × 3 m, laukums ir 12 m².",
      },
      {
        pregunta: "Ko darīt, ja izmēri ir centimetros?",
        respuesta: `Vispirms tos pārrēķiniet: centimetrus daliet ar 100 un iegūsiet metrus (collas daliet ar 12 un iegūsiet pēdas). 350 cm ir ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Kā kvadrātmetrus pārvērst kvadrātpēdās?",
        respuesta: `Reiziniet tos ar ${n(FT2_POR_M2)}. 20 m² ir ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Kvadrātmetrs (m²)", definicion: "Tāda kvadrāta laukums, kura mala ir 1 metrs." },
      { termino: "Kvadrātpēda (ft²)", definicion: "Tāda kvadrāta laukums, kura mala ir 1 pēda." },
    ],
  };
};
