import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-salaire-net";

const CODE = "https://jibaya.tn/wp-content/uploads/2026/03/Code_IRPP_IS_2026_fr.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "2 000 DT brut, chef de famille, 2 enfants",
    origen: {
      tipo: "recalculado",
      url: CODE,
      detalle:
        "Annuel 24 000 ; CNSS 9,18 % = 2 203,2 ; reste 21 796,8 ; frais plafonnés 2 000 ; déductions 300 + 2 × 100 ; base 19 296,8. IRPP 750 + 9 296,8 × 25 % = 3 074,2 ; CSS 1 % = 192,968. Mensuel : 183,6 + 256,183 + 16,081.",
    },
    fecha: "2026-10-24",
    entrada: { brut: 2000, chef: true, enfants: 2, etudiants: 0, infirmes: 0 },
    esperado: { cnss: 183.6, irpp: 256.183, css: 16.081, net: 1544.136, netAnnuel: 18529.632 },
  },
  {
    nombre: "800 DT brut, sans charges de famille",
    origen: { tipo: "recalculado", url: CODE, detalle: "Annuel 9 600 ; CNSS 881,28 ; frais 10 % = 871,872 ; base 7 846,848 ; IRPP 15 % × 2 846,848 = 427,027 ; CSS 78,468." },
    fecha: "2026-10-24",
    entrada: { brut: 800, chef: false, enfants: 0, etudiants: 0, infirmes: 0 },
    esperado: { cnss: 73.44, irpp: 35.586, css: 6.539, net: 684.435 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-24",
    entrada: { brut: 0, chef: false, enfants: 0, etudiants: 0, infirmes: 0 },
    esperaError: true,
  },
]);
