import { GRAMATICA } from "../gramatica";
import { pluralPl } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.pl;

const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Jesteś ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} z obowiązującymi wartościami oficjalnymi.`,
    ultimoDato: "Ostatnio wczytana wartość",
    ir: (pais) => `Przejdź do kalkulatorów ${g.para(pais)}`,
    otro: "Wybierz inny kraj",
    argentina: "Twoje kalkulatory są na calcular.ar, z oficjalnymi danymi Argentyny.",
    argentinaIr: "Przejdź do calcular.ar",
    neutroTitulo: (paises) => `Kraje: ${paises}. Każdy z własnymi przepisami i własną walutą`,
    neutroTexto: "Oficjalne źródła sprawdzamy codziennie.",
    neutroIr: "Zobacz kraje",
  },
  selector: {
    buscar: "Szukaj kraju",
    sinResultados: (q) => `Nie znaleziono kraju dla „${q}”`,
    ubicacion: "Obecna lokalizacja",
    mismaCalculadora: "Ten sam kalkulator",
    paises: "Kraje",
  },
  aviso: { mismaCalculadora: (pais) => `Oblicz to z danymi ${g.de(pais)}` },
  vivo: {
    titulo: "Oficjalne dane aktualizowane automatycznie",
    vigilado: "Automatyczny proces codziennie sprawdza oficjalne źródła. Zmienione przepisy wprowadzamy po weryfikacji.",
    sinVigilar: "Przy każdej wartości podajemy oficjalne źródło i datę, kiedy ją sprawdziliśmy.",
    verificado: "Ostatnie sprawdzenie przepisów",
    automatico: "Ostatnia automatyczna wartość",
    fuentes: "Oficjalne źródła",
    nFuentes: (n) => pluralPl(n, "oficjalny dokument", "oficjalne dokumenty", "oficjalnych dokumentów"),
    verFuentes: "Zobacz źródła",
    verNovedades: "Zobacz zmiany",
    hoy: "dziś",
    ayer: "wczoraj",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Dane sprawdzone w oficjalnym źródle: ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: aktualizacja ${cuando}, z najnowszą wartością z ${organismo}.`,
    diario: "Oficjalne źródła sprawdzamy automatycznie każdego dnia.",
    actualizado: "Zaktualizowano",
  },
  novedades: {
    pildora: "Zmiany",
    titulo: (pais) => `Co się zmieniło w oficjalnych danych ${g.de(pais)}`,
    acento: "w dniu zmiany",
    bajada: "Każdą nową wartość, która trafia do kalkulatorów, zapisujemy tutaj: co się zmieniło, od kiedy obowiązuje i skąd pochodzi.",
    ultimoCambio: "Ostatnia zmiana",
    revision: "Sprawdzanie źródeł",
    diaria: "Codziennie",
    porNorma: "Przy każdym nowym przepisie",
    siguiendo: "Źródła, które śledzimy",
    masOrganismos: (n) => `i jeszcze ${n}`,
    proximos: "Opublikowane, wkrótce obowiązują",
    proximosTexto: "Oficjalne wartości już wczytane, które zaczną obowiązywać w najbliższych dniach.",
    registro: "Rejestr zmian",
    rss: "Obserwuj przez RSS",
    vacio: "Dla tego kraju nie ma jeszcze zapisanych zmian.",
    etiqueta: { editorial: "Przepis", dato: "Nowa wartość", proximo: "Wkrótce obowiązuje", serie: "Automatycznie", revision: "Sprawdzenie" },
    rige: (fecha) => `Obowiązuje od ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Obowiązuje od ${desde} do ${hasta}`,
    antes: (valor, fecha) => `Wcześniej: ${valor} (${fecha})`,
    revisados: (n) => (Number(n) === 1 ? "Sprawdziliśmy 1 wartość w oficjalnym źródle" : `Sprawdziliśmy wartości w oficjalnym źródle: ${n}`),
    revisadosTexto: (organismos) => `Obowiązujące wartości potwierdzono u źródła: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Zobacz wartość" : `Zobacz wszystkie wartości (${n})`),
    calculadoras: "Korzystają z niej",
    rango: (min, max, zonas) => `od ${min} do ${max} zależnie od regionu (regiony: ${zonas})`,
    tabla: (filas) => `tabela z progami: ${filas}`,
    valores: (n) => pluralPl(n, "wartość", "wartości", "wartości"),
    pasosTitulo: "Jak dbamy o aktualność",
    pasos: [
      { titulo: "Instytucja publikuje", texto: "W oficjalnym źródle pojawia się rozporządzenie, wskaźnik albo kurs waluty." },
      { titulo: "Sprawdzamy przed użyciem", texto: "Wskaźniki i kursy trafiają do nas automatycznie, z kontrolą zakresu. Przepisy wprowadzamy razem z oficjalnym dokumentem." },
      { titulo: "Kalkulatory się dostosowują", texto: "Kalkulatory korzystają z nowej wartości, a zmiana trafia tutaj razem ze źródłem." },
    ],
    feedTitulo: (pais) => `Zmiany ${g.en(pais)} w CalcularYa`,
    feedSubtitulo: (pais) => `Zmiany oficjalnych danych, na których opierają się kalkulatory ${g.para(pais)}, z datą wejścia w życie i źródłem.`,
  },
};

export const pl: Diccionario<TextosInicio> = { base };
