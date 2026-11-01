import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosBs: TextosUi<UiFondoDeEmergencia> = {
  slug: "fond-za-hitne-slucajeve",
  ui: () => ({
    gastos: "Nužni mjesečni troškovi",
    gastosAyuda: "Ono što ne možete prestati plaćati: stanovanje, hrana, računi, prevoz, zdravlje i rate kredita.",
    meses: "Za koliko mjeseci troškova",
    mesesAyuda: "Uz stabilna primanja 3 do 6 mjeseci. Više ako primanja variraju ili u domaćinstvu radi samo jedna osoba.",
    actual: "Koliko ste već uštedjeli (neobavezno)",
    aporte: "Koliko možete odvajati mjesečno (neobavezno)",
    meta: "Preporučeni fond za hitne slučajeve",
    falta: "Preostaje uštedjeti",
    mesesParaLlegar: "Mjeseci do ciljnog iznosa",
    cobertura: "Za koliko vam mjeseci ušteđevina danas dostaje",
    errorGastos: "Unesite svoje nužne mjesečne troškove.",
    yaCubierto: "Fond za hitne slučajeve već imate. Ono što budete dalje odvajali možete usmjeriti na druge ciljeve.",
    sinAporte: "Unesite koliko možete odvajati mjesečno i prikazat ćemo koliko će to trajati.",
    observacionDonde: "Držite ovaj novac na posebnom računu s kojeg ga možete podići istog dana i gdje ne gubi vrijednost, na primjer na štednom računu po viđenju.",
  }),
};
