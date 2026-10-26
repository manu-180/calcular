import { pluralPl } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const sztuk = (x: number) => `${formatearNumero(ctx, x)} ${pluralPl(x, "sztukę", "sztuki", "sztuk").slice(String(x).length + 1)}`;
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Kalkulator progu rentowności",
    title: tituloQueEntre(
      `Kalkulator progu rentowności: ile trzeba sprzedać | ${ctx.nombrePais}`,
      `Kalkulator progu rentowności | ${ctx.nombrePais}`,
      "Kalkulator progu rentowności",
    ),
    description: "Sprawdź, ile sztuk musisz sprzedać i jaki przychód osiągnąć co miesiąc, żeby pokryć koszty, a także żeby osiągnąć docelowy zysk.",
    intro: [
      "Próg rentowności to poziom sprzedaży, przy którym firma ani nie zarabia, ani nie traci. Poniżej jest strata, powyżej zaczyna się zysk.",
      "Wpisz koszty stałe, cenę i koszt jednej sztuki. Powiemy ci, ile sprzedać, żeby pokryć koszty i osiągnąć swój cel.",
    ],
    comoSeCalcula: [
      "Marża na pokrycie = cena − koszt zmienny na sztukę.",
      "Sztuki do progu rentowności = koszty stałe ÷ marża na pokrycie, w górę do pełnej sztuki.",
      "Przychód w progu rentowności = koszty stałe ÷ (marża na pokrycie ÷ cena).",
      "Dla docelowego zysku dodajemy go do kosztów stałych i liczymy tak samo.",
    ],
    ejemplo: [
      `Przy kosztach stałych ${m(fijos)}, cenie ${m(precio)} i koszcie zmiennym ${m(variable)} każda sprzedaż zostawia ${m(precio - variable)}.`,
      `Żeby pokryć koszty, musisz sprzedać ${sztuk(base.unidades)} (${m(base.facturacion)}), a żeby zarabiać ${m(objetivo)} miesięcznie, ${sztuk(meta.unidades)}.`,
    ],
    faq: [
      {
        pregunta: "Czym są koszty stałe, a czym zmienne?",
        respuesta: "Koszty stałe są takie same, nawet jeśli nic nie sprzedasz: najem, stałe pensje, media. Koszty zmienne rosną z każdą sprzedażą: towar, materiały, prowizje, wysyłka.",
      },
      {
        pregunta: "Jak obniżyć próg rentowności?",
        respuesta: "Masz trzy dźwignie: podnieść cenę, obniżyć koszt zmienny na sztukę albo ograniczyć koszty stałe. Cena zwykle zmienia najwięcej.",
      },
      {
        pregunta: "Czy kalkulator działa przy usługach?",
        respuesta: "Tak. Sztuką może być godzina, sesja albo klient w miesiącu. Jako koszt zmienny wpisz to, ile kosztuje cię wykonanie każdej z nich.",
      },
    ],
    glosario: [
      { termino: "Próg rentowności", definicion: "Poziom sprzedaży, przy którym przychody są równe kosztom." },
      { termino: "Marża na pokrycie", definicion: "Ile każda sprzedaż zostawia na pokrycie kosztów stałych." },
    ],
  };
};
