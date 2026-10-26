import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoEl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const g = GRAMATICA.el;
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  const nombre = imperial ? "Υπολογισμός τετραγωνικών ποδιών" : "Υπολογισμός τετραγωνικών μέτρων";
  return {
    h1: nombre,
    title: tituloQueEntre(`${nombre} ${g.en(ctx.nombrePais)}`, nombre),
    description: "Υπολογίστε το εμβαδόν ενός δωματίου, ενός δαπέδου ή ενός οικοπέδου: ορθογώνια, τρίγωνα και κύκλοι, έως πέντε σχήματα μαζί.",
    intro: [
      "Επιλέξτε ένα σχήμα και εισάγετε τις διαστάσεις του. Αν ο χώρος δεν είναι απλό ορθογώνιο, χωρίστε τον σε τμήματα και ο υπολογισμός τα προσθέτει.",
      imperial ? "Δείχνει επίσης το αποτέλεσμα σε τετραγωνικά μέτρα." : "Δείχνει επίσης το αποτέλεσμα σε τετραγωνικά πόδια.",
    ],
    comoSeCalcula: [
      "Ορθογώνιο: μήκος × πλάτος.",
      "Τρίγωνο: βάση × ύψος ÷ 2.",
      `Κύκλος: π × ακτίνα × ακτίνα, όπου η ακτίνα είναι η μισή διάμετρος. 1 m² ισούται με ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Ένα σαλόνι σε σχήμα Γ χωρίζεται σε ένα ορθογώνιο 16 × 12 ft και ένα 10 × 6 ft. Συνολικά ${n(enL, 0)} ft².`
        : `Ένα σαλόνι σε σχήμα Γ χωρίζεται σε ένα ορθογώνιο 5 × 4 m και ένα 3 × 2 m. Συνολικά ${n(enL, 0)} m².`,
      `Ένα στρογγυλό τραπέζι με διάμετρο 2 ${u} καλύπτει ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: "Πώς υπολογίζω τα τετραγωνικά ενός δωματίου;",
        respuesta: imperial
          ? "Μετρήστε το μήκος και το πλάτος σε πόδια και πολλαπλασιάστε τα. Ένα δωμάτιο 12 × 10 ft έχει 120 ft²."
          : "Μετρήστε το μήκος και το πλάτος σε μέτρα και πολλαπλασιάστε τα. Ένα δωμάτιο 4 × 3 m έχει 12 m².",
      },
      {
        pregunta: "Τι κάνω αν οι διαστάσεις μου είναι σε εκατοστά;",
        respuesta: imperial
          ? `Μετατρέψτε τις πρώτα: διαιρέστε τις ίντσες με το 12 για να πάρετε πόδια. 42 ίντσες είναι ${n(3.5, 1)} ft.`
          : `Μετατρέψτε τα πρώτα: διαιρέστε τα εκατοστά με το 100 για να πάρετε μέτρα. 350 cm είναι ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "Πώς μετατρέπω τα τετραγωνικά μέτρα σε τετραγωνικά πόδια;",
        respuesta: `Πολλαπλασιάστε με ${n(FT2_POR_M2)}. 20 m² είναι ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Τετραγωνικό μέτρο (m²)", definicion: "Το εμβαδόν ενός τετραγώνου με πλευρά 1 μέτρο." },
      { termino: "Τετραγωνικό πόδι (ft²)", definicion: "Το εμβαδόν ενός τετραγώνου με πλευρά 1 πόδι." },
    ],
  };
};
