import { definirCasos } from "@/motor/calculo";
import prime from "./prime-de-precarite";

const F40 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F40";

export default definirCasos(prime, [
  {
    nombre: "CDD de 6 mois à 2 000 € par mois",
    origen: { tipo: "oficial", url: F40, detalle: "Au minimum 10 % de la rémunération brute totale : 12 000 × 10 % = 1 200 €. Congés : 10 % au minimum, 1 200 €." },
    fecha: "2026-10-14",
    entrada: { brutTotal: 12000, taux: "normal", congesNonPris: true },
    esperado: { taux: 10, prime: 1200, conges: 1200, total: 2400 },
  },
  {
    nombre: "Taux réduit de 6 % par convention",
    origen: { tipo: "oficial", url: F40, detalle: "Le pourcentage peut être limité à 6 % par convention collective : 8 500 × 6 % = 510 €." },
    fecha: "2026-10-14",
    entrada: { brutTotal: 8500, taux: "reduit", congesNonPris: false },
    esperado: { taux: 6, prime: 510, conges: 0, total: 510 },
  },
  {
    nombre: "Sans rémunération",
    origen: { tipo: "recalculado", detalle: "Il faut une rémunération pour calculer l'indemnité." },
    fecha: "2026-10-14",
    entrada: { brutTotal: 0, taux: "normal", congesNonPris: true },
    esperaError: true,
  },
]);
