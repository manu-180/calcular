import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosEl: TextosUi<UiMetrosCuadrados> = {
  slug: "ypologismos-tetragonikon-metron",
  ui: () => ({
    forma: (n) => `Επιφάνεια ${n}: σχήμα`,
    formaAyuda: "Αν ο χώρος έχει σχήμα Γ ή είναι ακανόνιστος, χωρίστε τον σε τμήματα και προσθέστε τα.",
    ninguna: "Δεν χρησιμοποιείται",
    rectangulo: "Ορθογώνιο ή τετράγωνο",
    triangulo: "Τρίγωνο",
    circulo: "Κύκλος",
    medidaA: (n, u) => `Επιφάνεια ${n}: μήκος, βάση ή διάμετρος (${u})`,
    medidaAAyuda: "Ορθογώνιο: μήκος και πλάτος. Τρίγωνο: βάση και ύψος. Κύκλος: μόνο η διάμετρος.",
    medidaB: (n, u) => `Επιφάνεια ${n}: πλάτος ή ύψος (${u})`,
    total: (u) => `Συνολικό εμβαδόν (${u})`,
    equivale: (u) => `Αντιστοιχεί σε ${u}`,
    parcial: (n, u) => `Επιφάνεια ${n} (${u})`,
    errorMedida: "Αυτή η διάσταση λείπει ή είναι 0.",
  }),
};
