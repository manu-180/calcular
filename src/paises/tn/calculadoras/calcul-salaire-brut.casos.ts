import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-salaire-brut";

export default definirCasos(calculadora, [
  {
    nombre: "1 544,136 DT net, chef de famille, 2 enfants : 2 000 DT brut",
    origen: { tipo: "recalculado", detalle: "Inverse du cas 2 000 DT brut du calcul du salaire net (CNSS 183,6 ; IRPP 256,183 ; CSS 16,081)." },
    fecha: "2026-10-24",
    entrada: { net: 1544.136, chef: true, enfants: 2, etudiants: 0, infirmes: 0 },
    esperado: { brut: 2000, cnss: 183.6, irpp: 256.183, css: 16.081 },
    tolerancia: 0.005,
  },
  {
    nombre: "684,435 DT net, sans charges de famille : 800 DT brut",
    origen: { tipo: "recalculado", detalle: "Inverse du cas 800 DT brut du calcul du salaire net." },
    fecha: "2026-10-24",
    entrada: { net: 684.435, chef: false, enfants: 0, etudiants: 0, infirmes: 0 },
    esperado: { brut: 800, cnss: 73.44 },
    tolerancia: 0.005,
  },
  {
    nombre: "Net nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-24",
    entrada: { net: 0, chef: false, enfants: 0, etudiants: 0, infirmes: 0 },
    esperaError: true,
  },
]);
