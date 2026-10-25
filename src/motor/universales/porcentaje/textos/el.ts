import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

// Α και Β (griegas) en lugar de X e Y: así lo escriben los libros de texto en griego y no se mezclan
// letras latinas en la frase.
export const textosEl: TextosUi<UiPorcentaje> = {
  slug: "ypologismos-posostou",
  ui: () => ({
    modo: "Τι θέλετε να υπολογίσετε;",
    modoParte: "Πόσο είναι το Α% του Β;",
    modoProporcion: "Τι ποσοστό του Β είναι το Α;",
    modoAumento: "Το Β συν Α%",
    modoRebaja: "Το Β μείον Α%",
    x: "Αριθμός Α",
    xAyuda: "Το ποσοστό. Αν επιλέξετε «Τι ποσοστό του Β είναι το Α;», είναι το μέρος.",
    y: "Αριθμός Β",
    resultado: "Αποτέλεσμα",
    porcentaje: "Ποσοστό",
    diferencia: "Ποσό που προστίθεται ή αφαιρείται",
    errorYCero: "Το Β δεν μπορεί να είναι 0: δεν υπάρχει ποσοστό του μηδενός.",
    fraseParte: (x, y, r) => `Το ${x}% του ${y} είναι ${r}.`,
    fraseProporcion: (x, y, p) => `Το ${x} είναι το ${p}% του ${y}.`,
    fraseAumento: (x, y, r, d) => `Το ${y} συν ${x}% κάνει ${r}: προστίθεται ${d}.`,
    fraseRebaja: (x, y, r, d) => `Το ${y} μείον ${x}% κάνει ${r}: αφαιρείται ${d}.`,
  }),
};
