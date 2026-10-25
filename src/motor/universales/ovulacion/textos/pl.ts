import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosPl: TextosUi<UiOvulacion> = {
  slug: "kalkulator-owulacji",
  ui: () => ({
    fum: "Pierwszy dzień ostatniej miesiączki",
    fumAyuda: "Pierwszy dzień krwawienia, a nie ostatni.",
    ciclo: "Długość cyklu (dni)",
    cicloAyuda: "Od pierwszego dnia jednej miesiączki do dnia przed następną. Jeśli się zmienia, wpisz średnią.",
    ovulacion: "Przewidywana owulacja",
    fertilDesde: "Dni płodne od",
    fertilHasta: "Dni płodne do",
    proxima: "Następna miesiączka",
    tabla: "Kolejne cykle",
    colRegla: "Miesiączka",
    colDesde: "Dni płodne od",
    colHasta: "Dni płodne do",
    colOvulacion: "Owulacja",
    errorCiclo: "Długość cyklu musi wynosić od 21 do 45 dni.",
    aviso: "To szacunek dla regularnych cykli. Nie jest metodą antykoncepcji i nie zastępuje konsultacji z lekarzem ani położną.",
  }),
};
