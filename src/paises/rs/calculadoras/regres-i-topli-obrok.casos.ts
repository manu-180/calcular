import { definirCasos } from "@/motor/calculo";
import regresITopliObrok from "./regres-i-topli-obrok";

const RAD = "https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/2005/24/1/reg";

export default definirCasos(regresITopliObrok, [
  {
    nombre: "Bruto 100.000, obrok 7.010 neto, regres 14.020 neto",
    origen: { tipo: "recalculado", url: RAD, detalle: "Svaki neto dinar traži 1 / 0,701 bruto: 7.010 = 10.000 bruto, trošak 11.515; 14.020 = 20.000 bruto, trošak 23.030; godišnje 138.180 + 23.030 = 161.210." },
    fecha: "2026-10-31",
    entrada: { bruto: 100000, topliObrok: 7010, regres: 14020 },
    esperado: { obrokBruto: 10000, obrokTrosak: 11515, regresBruto: 20000, regresTrosak: 23030, godisnjiTrosak: 161210 },
    tolerancia: 0.05,
  },
]);
