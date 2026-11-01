import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosSr: TextosUi<UiFondoDeEmergencia> = {
  slug: "fond-za-hitne-slucajeve",
  ui: () => ({
    gastos: "Neophodni mesečni troškovi",
    gastosAyuda: "Ono što ne možete prestati da plaćate: stanovanje, hrana, računi, prevoz, zdravlje i rate kredita.",
    meses: "Za koliko meseci troškova",
    mesesAyuda: "Uz stabilna primanja 3 do 6 meseci. Više ako primanja variraju ili u domaćinstvu radi samo jedna osoba.",
    actual: "Koliko ste već uštedeli (nije obavezno)",
    aporte: "Koliko možete da odvajate mesečno (nije obavezno)",
    meta: "Preporučeni fond za hitne slučajeve",
    falta: "Preostaje da uštedite",
    mesesParaLlegar: "Meseci do ciljnog iznosa",
    cobertura: "Za koliko meseci vam ušteđevina danas dostaje",
    errorGastos: "Unesite svoje neophodne mesečne troškove.",
    yaCubierto: "Fond za hitne slučajeve već imate. Ono što budete dalje odvajali možete usmeriti na druge ciljeve.",
    sinAporte: "Unesite koliko možete da odvajate mesečno i prikazaćemo koliko će to trajati.",
    observacionDonde: "Držite ovaj novac na posebnom računu sa kojeg ga možete podići istog dana i gde ne gubi vrednost, na primer na štednom računu po viđenju.",
  }),
};
