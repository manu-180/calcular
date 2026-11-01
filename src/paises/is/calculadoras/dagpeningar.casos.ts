import { definirCasos } from "@/motor/calculo";
import calc from "./dagpeningar";

export default definirCasos(calc, [
  {
    nombre: "Fæði þrjá heila daga í júlí",
    origen: { tipo: "oficial", url: "https://www.skatturinn.is/einstaklingar/helstutolur/2026/helstu-tolur-og-prosentur-2026", detalle: "18.100 kr. frá júní til september; x 3 = 54.300." },
    fecha: "2026-07-01",
    entrada: { tegund: "heill", fjoldi: 3 },
    esperado: { a: 18100, samtals: 54300 },
  },
  {
    nombre: "Gisting og fæði í nóvember",
    origen: { tipo: "oficial", url: "https://www.skatturinn.is/einstaklingar/helstutolur/2026/helstu-tolur-og-prosentur-2026", detalle: "42.100 kr. frá október." },
    fecha: "2026-11-01",
    entrada: { tegund: "gisting-faedi", fjoldi: 1 },
    esperado: { samtals: 42100 },
  },
  {
    nombre: "Síðasti dagur í maí",
    origen: { tipo: "oficial", url: "https://www.skatturinn.is/einstaklingar/helstutolur/2026/helstu-tolur-og-prosentur-2026", detalle: "39.700 kr. til 31. maí." },
    fecha: "2026-05-31",
    entrada: { tegund: "gisting-faedi", fjoldi: 1 },
    esperado: { samtals: 39700 },
  },
]);
