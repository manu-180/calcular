import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "pirkšana" : "īre");
  return {
    h1: "Īrēt vai pirkt mājokli: kalkulators",
    title: tituloQueEntre(`Īrēt vai pirkt mājokli: kalkulators (${ctx.nombrePais})`, "Īrēt vai pirkt mājokli: kalkulators", "Īrēt vai pirkt"),
    description: "Salīdziniet īri un mājokļa pirkšanu ar kredītu izvēlētajā periodā. Uzziniet, kas ir izdevīgāk, no kura gada un par cik.",
    intro: [
      "Salīdzināt kredīta maksājumu ar īri nepietiek. Īpašnieks maksā procentus, uzturēšanu un nekustamā īpašuma nodokli, bet beigās viņam pieder mājoklis. Īrnieks pirmo iemaksu var turpināt turēt ieguldītu.",
      "Kalkulators to visu aprēķina katram gadam un parāda, kurš variants jums atstās lielāku īpašumu.",
    ],
    comoSeCalcula: [
      "Pirkšana: katru mēnesi maksājat kredīta maksājumu un īpašnieka izmaksas. Jūsu īpašums ir mājokļa vērtība mīnus kredīta atlikums.",
      "Īre: pirmā iemaksa un pirkuma izmaksas paliek ieguldītas un nopelna alternatīvo ienesīgumu, bet īre katru gadu sadārdzinās.",
      "Katru mēnesi lētākais variants iegulda starpību, tāpēc abi balstās uz vienu un to pašu budžetu.",
      "Izdevīgāks ir tas variants, kuram beigās īpašums ir lielāks.",
    ],
    ejemplo: [
      `Mājoklis maksā ${m(precio)}, pirmā iemaksa ir 20%, kredīta procentu likme 7%, termiņš 25 gadi, bet līdzīga mājokļa īre maksā ${m(alquiler)} mēnesī.`,
      `Pēc 10 gadiem izdevīgāks variants ir ${quien(a10)}, starpība ${m(Math.abs(a10.comprar - a10.alquilar))}. Pēc 3 gadiem izdevīgāks variants ir ${quien(a3)}, starpība ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Vai īre ir izmesta nauda?",
        respuesta:
          "Ne gluži. Arī īpašnieks maksā to, kas nekad neatgriežas: procentus, nekustamā īpašuma nodokli un uzturēšanu. Svarīgi ir tas, kas jums būs beigās katrā gadījumā.",
      },
      {
        pregunta: "Kāpēc rezultāts ir atkarīgs no gadu skaita?",
        respuesta:
          "Pirkuma sākuma izmaksas ir lielas (komisijas un pirmo gadu procenti) un uzreiz neatmaksājas. Ja drīz plānojat pārcelties, īre parasti ir izdevīgāka.",
      },
      {
        pregunta: "Kas rezultātu ietekmē visvairāk?",
        respuesta:
          "Mājokļa cenas un īres attiecība, kredīta procentu likme un tas, cik ātri mājokļi sadārdzinās. Mainiet cenu pieaugumu un ieguldījumu ienesīgumu, un redzēsiet, kā mainās atbilde.",
      },
    ],
    glosario: [
      { termino: "Īpašums", definicion: "Tas, kas jums pieder, atskaitot to, ko esat parādā." },
      { termino: "Mājokļa cenas pieaugums", definicion: "Par cik mājoklis sadārdzinās katru gadu." },
      { termino: "Alternatīvās izmaksas", definicion: "Cik nopelnītu pirmā iemaksa, ja to ieguldītu." },
    ],
  };
};
