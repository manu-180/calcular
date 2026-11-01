import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  return {
    h1: "Kalkulator mesatareje të ponderuar",
    title: tituloQueEntre(`Kalkulator mesatareje të ponderuar: ${ctx.nombrePais}`, "Kalkulator mesatareje të ponderuar dhe aritmetike", "Kalkulator mesatareje"),
    description: "Llogaritni mesataren e notave, aritmetike ose të ponderuar, me deri në 10 vlera dhe peshën e secilës: përqindje, kredite ose numër herësh.",
    intro: [
      "Vendosni çdo notë dhe sa peshon. Shikoni mesataren e ponderuar dhe, pranë saj, mesataren e thjeshtë aritmetike.",
      "Është e dobishme për notat e shkollës ose të universitetit dhe për çdo mesatare ku disa vlera peshojnë më shumë se të tjerat.",
    ],
    comoSeCalcula: [
      "Mesatarja aritmetike = shuma e vlerave ÷ numri i vlerave.",
      "Mesatarja e ponderuar = shuma e prodhimeve (vlerë × peshë) ÷ shuma e peshave.",
      "Peshat nuk duhet të mblidhen domosdo në 100: rezultati pjesëtohet me totalin e tyre.",
    ],
    ejemplo: [
      `Me një 7 që peshon 20%, një 8 që peshon 30% dhe një 9 që peshon 50%, mesatarja e ponderuar është ${n(8.3)}.`,
      `Mesatarja aritmetike e tri notave është ${n(8)}: nota 9 ka peshë më të madhe dhe e ngre mesataren e ponderuar.`,
    ],
    faq: [
      {
        pregunta: "Si llogaritet mesatarja e ponderuar?",
        respuesta: "Shumëzoni çdo vlerë me peshën e saj, mblidhni rezultatet dhe pjesëtoni shumën me totalin e peshave.",
      },
      {
        pregunta: "Çfarë ndodh nëse peshat nuk mblidhen në 100%?",
        respuesta: "Nuk është problem. Nëse një lëndë ka 6 kredite dhe një tjetër 4, përdorni 6 dhe 4. Shuma pjesëtohet me totalin e peshave.",
      },
      {
        pregunta: "Cili është ndryshimi midis mesatares aritmetike dhe mesatares së ponderuar?",
        respuesta: "Te mesatarja aritmetike të gjitha vlerat kanë të njëjtën rëndësi. Te mesatarja e ponderuar çdo vlerë llogaritet sipas peshës së saj.",
      },
    ],
    glosario: [
      { termino: "Peshë", definicion: "Sa llogaritet një vlerë në mesataren përfundimtare." },
      { termino: "Mesatare e ponderuar", definicion: "Një mesatare ku çdo vlerë shumëzohet me peshën e saj." },
    ],
  };
};
