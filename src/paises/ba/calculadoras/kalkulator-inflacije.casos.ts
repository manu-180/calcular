import { definirCasos } from "@/motor/calculo";
import kalkulatorInflacije from "./kalkulator-inflacije";

export default definirCasos(kalkulatorInflacije, [
  {
    nombre: "Septembar 2025. do septembra 2026.",
    origen: { tipo: "oficial", url: "https://www.rzs.rs.ba/static/uploads/saopstenja/cijene/indeksi_potrosackih_cijena/2026/IndeksiPotrosackihCijena_sep_2026.pdf", detalle: "137,1 / 129,4 = 1,0595; RZS objavljuje 106,0 za istu godinu. 1.000 KM je 1.059,51 KM." },
    fecha: "2026-11-01",
    entrada: { iznos: 1000, od: "2025-09-15", do: "2026-09-15" },
    esperado: { danas: 1059.51 },
  },
  {
    nombre: "Januar 2024. do decembra 2025.",
    origen: { tipo: "recalculado", url: "https://www.rzs.rs.ba/static/uploads/saopstenja/cijene/indeksi_potrosackih_cijena/2026/IndeksiPotrosackihCijena_sep_2026.pdf", detalle: "130,5 / 123,1 = 1,06011; 1.000 KM je 1.060,11 KM." },
    fecha: "2026-11-01",
    entrada: { iznos: 1000, od: "2024-01-01", do: "2025-12-01" },
    esperado: { danas: 1060.11 },
  },
  {
    nombre: "Krajnji mjesec poslije zadnjeg podatka",
    origen: { tipo: "recalculado", url: "https://www.rzs.rs.ba/static/uploads/saopstenja/cijene/indeksi_potrosackih_cijena/2026/IndeksiPotrosackihCijena_sep_2026.pdf", detalle: "Zadnji mjesec je septembar 2026.; računa se do njega." },
    fecha: "2026-11-01",
    entrada: { iznos: 1000, od: "2026-09-01", do: "2026-11-01" },
    esperado: { danas: 1000 },
  },
  {
    nombre: "Obrnut redoslijed je greška",
    origen: { tipo: "recalculado", url: "https://www.rzs.rs.ba/static/uploads/saopstenja/cijene/indeksi_potrosackih_cijena/2026/IndeksiPotrosackihCijena_sep_2026.pdf", detalle: "Početak poslije kraja nema smisla." },
    fecha: "2026-11-01",
    entrada: { iznos: 1000, od: "2026-05-01", do: "2025-05-01" },
    esperaError: true,
  },
]);
