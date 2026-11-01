import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Kalkulator ciąży: termin porodu",
    title: tituloQueEntre(
      `Kalkulator ciąży: termin porodu i tydzień ciąży | ${ctx.nombrePais}`,
      `Kalkulator ciąży | ${ctx.nombrePais}`,
      "Kalkulator ciąży",
    ),
    description: "Oblicz przewidywany termin porodu na podstawie ostatniej miesiączki albo daty poczęcia i sprawdź, który to tydzień ciąży.",
    intro: [
      "Wpisz pierwszy dzień ostatniej miesiączki (albo datę poczęcia, jeśli ją znasz). Zobaczysz przewidywany termin porodu, tydzień ciąży i trymestr.",
      "To orientacyjny szacunek. Nie zastępuje konsultacji z lekarzem ani położną: najdokładniejszą datę daje USG i wizyty kontrolne.",
    ],
    comoSeCalcula: [
      "Kalkulator stosuje regułę Naegelego: termin porodu to pierwszy dzień ostatniej miesiączki plus 280 dni (40 tygodni).",
      "Jeśli cykl jest dłuższy albo krótszy niż 28 dni, termin przesuwa się o tę różnicę.",
      "Od daty poczęcia dodajemy 266 dni (38 tygodni).",
      "Tygodnie ciąży liczy się od ostatniej miesiączki, a nie od poczęcia.",
    ],
    ejemplo: [
      `Przy ostatniej miesiączce ${f(fum)} r. i cyklu 28-dniowym przewidywany termin porodu to ${f(fpp)} r.`,
      `Przy cyklu 32-dniowym termin przesuwa się o 4 dni, na ${f(fpp32)} r.`,
    ],
    faq: [
      {
        pregunta: "Jak oblicza się termin porodu?",
        respuesta: "Do pierwszego dnia ostatniej miesiączki dodaje się 280 dni. Szybki sposób, który daje prawie tę samą datę: dodaj 7 dni, odejmij 3 miesiące i dodaj rok.",
      },
      {
        pregunta: "Dlaczego tygodnie liczy się od ostatniej miesiączki?",
        respuesta: "Bo tę datę zna prawie każda kobieta. Dlatego w 2. tygodniu ciąży do poczęcia jeszcze nie doszło.",
      },
      {
        pregunta: "Ile dzieci rodzi się w wyznaczonym terminie?",
        respuesta: "Niewiele. Większość rodzi się między 37. a 42. tygodniem, więc termin jest wskazówką, a nie dokładnym dniem.",
      },
    ],
    glosario: [
      { termino: "OM", definicion: "Ostatnia miesiączka: pierwszy dzień ostatniego krwawienia." },
      { termino: "Reguła Naegelego", definicion: "Sposób szacowania terminu porodu przez dodanie 280 dni do daty OM." },
    ],
  };
};
