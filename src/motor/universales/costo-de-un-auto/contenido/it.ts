import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperiale = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 50),
    distancia: 1000,
    consumo: imperiale ? 28 : 6,
    precioCombustible: montoEjemplo(ctx, imperiale ? 3.5 : 1.8),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensile = costoMensual(g, imperiale);
  const unita = imperiale ? "miglio" : "chilometro";
  return {
    h1: "Quanto costa mantenere un'auto",
    title: tituloQueEntre(`Quanto costa mantenere un'auto al mese | ${ctx.nombrePais}`, `Costo di mantenimento dell'auto | ${ctx.nombrePais}`, "Costo di mantenimento dell'auto"),
    description: `Calcola quanto ti costa davvero l'auto al mese, all'anno e per ${unita}: carburante, assicurazione, manutenzione, parcheggio e valore perso.`,
    intro: [
      "Quasi tutti sanno quanto spendono di benzina. Pochi sommano assicurazione, manutenzione, parcheggio e soprattutto il valore che l'auto perde ogni anno.",
      "Inserisci le tue spese e ti mostriamo quanto ti costa davvero l'auto. Ti aiuta a decidere se comprarla, cambiarla o muoverti in un altro modo.",
    ],
    comoSeCalcula: [
      imperiale
        ? "Carburante al mese = miglia al mese ÷ miglia per gallone × prezzo al gallone."
        : "Carburante al mese = chilometri al mese × litri ogni 100 km ÷ 100 × prezzo al litro.",
      "Valore perso al mese = valore dell'auto × perdita annua ÷ 12.",
      "Costo reale = carburante + assicurazione + manutenzione + parcheggio + altre spese + valore perso.",
      `Costo per ${unita} = costo reale al mese ÷ distanza percorsa nel mese.`,
    ],
    ejemplo: [
      `Un'auto che vale ${m(g.precio)} e fa ${formatearNumero(ctx, g.distancia)} ${imperiale ? "miglia" : "km"} al mese costa ${m(mensile)} al mese, contando il valore che perde.`,
      `Sono ${m(mensile * 12)} all'anno e ${formatearMonto(ctx, mensile / g.distancia)} per ${unita}.`,
    ],
    faq: [
      {
        pregunta: "Cos'è il deprezzamento dell'auto?",
        respuesta: "È il valore che l'auto perde con il tempo. Non lo paghi ogni mese, ma lo senti quando la vendi. Spesso è il costo più grande di un'auto nuova.",
      },
      {
        pregunta: "Perché la rata del finanziamento non si somma?",
        respuesta:
          "Una parte della rata paga l'auto stessa, che è già contata come valore perso. Sommarle tutte e due vorrebbe dire contare l'auto due volte. Gli interessi del finanziamento sono un costo in più.",
      },
      {
        pregunta: "Come posso spendere meno per l'auto?",
        respuesta:
          "Confronta ogni anno i preventivi dell'assicurazione, tieni in ordine gomme e tagliandi ed evita di cambiare auto spesso: è nei primi anni che perde più valore.",
      },
    ],
    glosario: [
      { termino: "Deprezzamento", definicion: "Il valore che l'auto perde con il tempo e con l'uso." },
      { termino: `Costo per ${unita}`, definicion: `Il costo medio di ogni ${unita} percorso, con tutte le spese comprese.` },
    ],
  };
};
