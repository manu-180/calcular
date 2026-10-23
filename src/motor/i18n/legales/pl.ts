import type { DiccionarioLegal } from "./tipos";

export const pl: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "O nas | CalcularYa",
      description: "CalcularYa tworzy kalkulatory do pracy, pieniędzy i codziennych spraw w każdym kraju, z danymi z oficjalnych źródeł.",
      h1: "O nas",
      bajada: "Kalkulatory dla każdego kraju, każdy z własnymi danymi oficjalnymi.",
      bloques: [
        {
          parrafos: [
            "CalcularYa to strona z kalkulatorami do codziennych pytań: wynagrodzenie, kredyty, podatki, daty i wiele więcej.",
            "Tworzy ją Manuel Navarro, autor calcular.ar, strony z kalkulatorami dla Argentyny.",
          ],
        },
        {
          titulo: "Jak pracujemy",
          parrafos: [
            "Gdy obliczenie zależy od przepisu (płacy minimalnej, stawki składki, limitu), bierzemy wartość z oficjalnego źródła danego kraju: dziennika urzędowego, ministerstwa, banku centralnego albo urzędu skarbowego.",
            "Zapisujemy link i datę sprawdzenia i pokazujemy je przy każdym kalkulatorze.",
            "Jeśli wartości nie da się potwierdzić w oficjalnym źródle, kalkulator, który z niej korzysta, nie zostaje opublikowany.",
            "Gdy zmienia się przepis, zmienia się też kalkulator, a zmiana trafia do rejestru zmian danego kraju.",
          ],
        },
        { titulo: "Za darmo", parrafos: ["Kalkulatory są darmowe i działają bez zakładania konta."] },
      ],
    },
    contacto: {
      title: "Kontakt | CalcularYa",
      description: "Napisz do nas, jeśli jakaś wartość jest nieaktualna, wynik się nie zgadza albo brakuje ci kalkulatora lub kraju.",
      h1: "Kontakt",
      bajada: `Nasz adres e-mail to ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Chętnie się dowiemy, jeśli jakaś wartość jest nieaktualna, wynik różni się od oczekiwanego albo brakuje kalkulatora lub kraju.",
            "Jeśli chodzi o wartość, podaj kraj i stronę, na której ją widzisz.",
            "Odpowiada prawdziwy człowiek. Może to potrwać kilka dni.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Prywatność | CalcularYa",
      description: "Jakie dane wykorzystuje CalcularYa: to, co wpisujesz w kalkulatorze, przetwarza przeglądarka i niczego nie zapisujemy.",
      h1: "Prywatność",
      bajada: `Ostatnia aktualizacja: ${actualizado}.`,
      bloques: [
        {
          titulo: "Co wpisujesz w kalkulatorze",
          parrafos: ["Obliczenia odbywają się w przeglądarce. Wpisane wartości nie trafiają na żaden serwer i ich nie zapisujemy."],
        },
        {
          titulo: "Kraj odwiedzin",
          parrafos: [
            "Żeby zaproponować kalkulatory właściwego kraju, sprawdzamy, z jakiego kraju pochodzą odwiedziny. Nasz dostawca hostingu ustala to na podstawie adresu IP.",
            "Nie zapisujemy ani adresu IP, ani kraju. Odpowiedź zostaje w przeglądarce do końca wizyty.",
          ],
        },
        {
          titulo: "Co zapisuje przeglądarka",
          parrafos: [
            "W pamięci sesji przeglądarki zapamiętujemy wybrany kraj i to, czy komunikat z tą propozycją został zamknięty. Wszystko znika po zamknięciu karty.",
            "Nie używamy plików cookie reklamowych ani śledzących.",
          ],
        },
        {
          titulo: "Hosting strony",
          parrafos: ["Strona działa na serwerach Vercel. Jak każdy serwer, zapisują one dane techniczne odwiedzin (adres IP i przeglądarkę), żeby strona działała i była bezpieczna."],
        },
        {
          titulo: "Zmiany i pytania",
          parrafos: [
            "Jeśli coś się tu zmieni (na przykład pojawią się reklamy), napiszemy o tym na tej stronie, zanim zmiana wejdzie w życie.",
            `W sprawie danych osobowych napisz na ${mail}.`,
          ],
        },
      ],
    },
    terminos: {
      title: "Warunki korzystania | CalcularYa",
      description: "Kalkulatory CalcularYa dają szacunek na podstawie obowiązujących danych oficjalnych. Są narzędziem, a nie poradą.",
      h1: "Warunki korzystania",
      bajada: `Ostatnia aktualizacja: ${actualizado}.`,
      bloques: [
        {
          titulo: "Do czego służą kalkulatory",
          parrafos: [
            "Wyniki to szacunek na podstawie obowiązujących danych oficjalnych. Mają charakter orientacyjny.",
            "Nie zastępują obliczeń pracodawcy, księgowego ani prawnika, ani tego, co mówi właściwy urząd.",
          ],
        },
        {
          titulo: "Skąd pochodzą dane",
          parrafos: [
            "Każdy kalkulator pokazuje oficjalne źródło swoich wartości i datę, kiedy je sprawdziliśmy.",
            "Dbamy o aktualność, ale przepis może się zmienić, zanim zdążymy go wprowadzić.",
          ],
        },
        {
          titulo: "Korzystanie ze strony",
          parrafos: ["Strona jest darmowa. Można z niej korzystać i udostępniać linki. Nie wolno masowo kopiować treści ani podszywać się pod CalcularYa."],
        },
        {
          titulo: "Odpowiedzialność",
          parrafos: ["Nie odpowiadamy za decyzje oparte wyłącznie na wyniku z tej strony. Zanim coś podpiszesz, zapłacisz albo zgłosisz roszczenie, potwierdź obliczenie u właściwej osoby lub w urzędzie."],
        },
        { titulo: "Kontakt", parrafos: [`Nasz adres e-mail to ${mail}.`] },
      ],
    },
  },
});
