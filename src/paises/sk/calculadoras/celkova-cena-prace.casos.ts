import { definirCasos } from "@/motor/calculo";
import celkovaCenaPrace from "./celkova-cena-prace";

const SP = "https://www.socpoist.sk/socialne-poistenie/platenie-poistneho/tabulky-platenia-poistneho/tabulky-platenia-poistneho-od-1-6";

export default definirCasos(celkovaCenaPrace, [
  {
    nombre: "1 800 eur: odvody zamestnávateľa",
    origen: { tipo: "recalculado", url: SP, detalle: "Sociálne 25,2 % = 453,60; zdravotné 11 % = 198; cena práce 2 451,60." },
    fecha: "2026-06-15",
    entrada: { hruba: 1800 },
    esperado: { cena: 2451.6, socialneFirma: 453.6, zdravotneFirma: 198, rocne: 29419.2 },
  },
  {
    nombre: "Minimálna mzda: zaokrúhlenie každého fondu nadol",
    origen: { tipo: "recalculado", url: SP, detalle: "12,81 + 128,10 + 27,45 + 9,15 + 2,28 + 43,46 + 7,32 = 230,57; zdravotné 100,65; spolu 1 246,22." },
    fecha: "2026-06-15",
    entrada: { hruba: 915 },
    esperado: { socialneFirma: 230.57, zdravotneFirma: 100.65, cena: 1246.22 },
  },
  {
    nombre: "20 000 eur: úrazové bez stropu",
    origen: { tipo: "oficial", url: SP, detalle: "Zo stropu 16 764 eur je to 4 090,41 eura; úrazové 0,8 % z celých 20 000 je 160 eur; spolu 4 250,41." },
    fecha: "2026-06-15",
    entrada: { hruba: 20000 },
    esperado: { socialneFirma: 4250.41 },
  },
]);
