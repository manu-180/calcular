import { definirCasos } from "@/motor/calculo";
import irtisanomisaika from "./irtisanomisaika";

const TSL = "https://www.finlex.fi/fi/lainsaadanto/2001/55";

export default definirCasos(irtisanomisaika, [
  {
    nombre: "Työntekijä, alle viisi vuotta: 14 päivää",
    origen: { tipo: "recalculado", url: TSL, detalle: "6 luvun 3 §: enintään viisi vuotta → 14 päivää. Irtisanominen 1.10.2026, päättyy 15.10.2026 (laki 150/1930, 2 §)." },
    fecha: "2026-10-24",
    entrada: { irtisanoja: "tyontekija", alku: "2023-05-01", irtisanominen: "2026-10-01" },
    esperado: { paivat: 14, kuukaudet: null, paattyy: "2026-10-15" },
  },
  {
    nombre: "Työntekijä, yli viisi vuotta: kuukausi",
    origen: { tipo: "recalculado", url: TSL, detalle: "6 luvun 3 §: yli viisi vuotta → yksi kuukausi. 31.1.2026 + 1 kk = 28.2.2026 (laki 150/1930, 3 §)." },
    fecha: "2026-10-24",
    entrada: { irtisanoja: "tyontekija", alku: "2015-01-01", irtisanominen: "2026-01-31" },
    esperado: { kuukaudet: 1, paattyy: "2026-02-28" },
  },
  {
    nombre: "Työnantaja, kuusi vuotta: kaksi kuukautta",
    origen: { tipo: "recalculado", url: TSL, detalle: "6 luvun 3 §: yli neljä ja enintään kahdeksan vuotta → kaksi kuukautta. 10.9.2026 + 2 kk = 10.11.2026." },
    fecha: "2026-10-24",
    entrada: { irtisanoja: "tyonantaja", alku: "2020-06-15", irtisanominen: "2026-09-10" },
    esperado: { kuukaudet: 2, paattyy: "2026-11-10" },
  },
  {
    nombre: "Työnantaja, yli 12 vuotta: kuusi kuukautta",
    origen: { tipo: "recalculado", url: TSL, detalle: "6 luvun 3 §: yli 12 vuotta → kuusi kuukautta. 1.10.2026 + 6 kk = 1.4.2027." },
    fecha: "2026-10-24",
    entrada: { irtisanoja: "tyonantaja", alku: "2010-01-01", irtisanominen: "2026-10-01" },
    esperado: { kuukaudet: 6, paattyy: "2027-04-01" },
  },
  {
    nombre: "Työnantaja, alle vuosi: 14 päivää",
    origen: { tipo: "recalculado", url: TSL, detalle: "6 luvun 3 §: enintään vuosi → 14 päivää." },
    fecha: "2026-10-24",
    entrada: { irtisanoja: "tyonantaja", alku: "2026-03-01", irtisanominen: "2026-10-20" },
    esperado: { paivat: 14, paattyy: "2026-11-03" },
  },
  {
    nombre: "Irtisanomispäivä ennen alkua",
    origen: { tipo: "recalculado", url: TSL, detalle: "Päivämäärät väärin päin." },
    fecha: "2026-10-24",
    entrada: { irtisanoja: "tyonantaja", alku: "2026-03-01", irtisanominen: "2026-01-20" },
    esperaError: true,
  },
]);
