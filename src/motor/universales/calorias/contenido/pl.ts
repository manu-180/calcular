import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Mężczyzna w wieku 35 lat, który waży 180 lb i ma 5 ft 10 in wzrostu, ma podstawową przemianę materii około ${n(basal)} kcal.`,
          `Przy niewielkiej aktywności utrzymuje wagę, jedząc około ${n(basal * FACTORES.sedentaria)} kcal dziennie.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Kobieta w wieku 30 lat, która waży 60 kg i ma 165 cm wzrostu, ma podstawową przemianę materii około ${n(basal)} kcal.`,
          `Przy umiarkowanej aktywności utrzymuje wagę, jedząc około ${n(basal * FACTORES.moderada)} kcal dziennie.`,
        ];
      })();
  return {
    h1: "Kalkulator kalorii: dzienne zapotrzebowanie",
    title: tituloQueEntre(
      `Kalkulator kalorii: zapotrzebowanie kaloryczne | ${ctx.nombrePais}`,
      `Kalkulator kalorii | ${ctx.nombrePais}`,
      "Kalkulator kalorii",
    ),
    description: "Oblicz dzienne zapotrzebowanie kaloryczne na podstawie wieku, wagi, wzrostu i aktywności. Zobacz, ile jeść, żeby utrzymać wagę, schudnąć albo przytyć.",
    intro: [
      "Wpisz swoje dane i poziom aktywności. Zobaczysz podstawową przemianę materii (PPM) i ile kalorii spalasz w zwykły dzień.",
      "To orientacyjny szacunek. Nie zastępuje konsultacji z lekarzem ani dietetykiem.",
    ],
    comoSeCalcula: [
      `Podstawowa przemiana materii (wzór Mifflina-St Jeora): 10 × masa ciała w kg + ${n(6.25, 2)} × wzrost w cm − 5 × wiek, plus 5 u mężczyzn albo minus 161 u kobiet.`,
      `Kalorie na utrzymanie wagi = PPM × współczynnik aktywności, od ${n(1.2, 1)} (niewielka aktywność) do ${n(1.9, 1)} (bardzo wysoka).`,
      `Przy odchudzaniu odejmujemy ${DEFICIT} kcal dziennie, a przy przybieraniu na wadze dodajemy ${SUPERAVIT}. To umiarkowana zmiana, którą da się utrzymać.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Co to jest podstawowa przemiana materii?",
        respuesta: "To energia, którą organizm zużywa w całkowitym spoczynku, żeby oddychać, utrzymać temperaturę i zapewnić pracę narządów.",
      },
      {
        pregunta: "Ile kalorii jeść, żeby schudnąć?",
        respuesta: `Często zaczyna się od około ${DEFICIT} kcal dziennie mniej niż zapotrzebowanie na utrzymanie wagi. Najlepiej ustalić to z dietetykiem.`,
      },
      {
        pregunta: "Na ile dokładny jest ten wzór?",
        respuesta: "Wzór Mifflina-St Jeora jest jednym z najczęściej stosowanych, ale daje średnią. Geny, masa mięśniowa i stan zdrowia zmieniają to, ile naprawdę spalasz.",
      },
    ],
    glosario: [
      { termino: "Kaloria (kcal)", definicion: "Jednostka energii w jedzeniu i w tym, co spala organizm." },
      { termino: "PPM", definicion: "Podstawowa przemiana materii: kalorie spalane przez organizm w całkowitym spoczynku." },
      { termino: "CPM", definicion: "Całkowita przemiana materii: PPM powiększona o energię zużytą na codzienną aktywność." },
    ],
  };
};
