import { definirCasos } from "@/motor/calculo";
import calc from "./prispevki-sp";

export default definirCasos(calc, [
  { nombre: "Najnižja osnova", origen: { tipo: "oficial", url: "https://www.fu.gov.si/fileadmin/Internet/Davki_in_druge_dajatve/Podrocja/Prispevki_za_socialno_varnost/Samozaposleni/SZ_10_2026.xlsx", detalle: "Preglednica FURS za oktober 2026: prispevki skupaj 651,04" }, fecha: "2026-10-31", entrada: { dobicek: 0 }, esperado: { skupaj: 651.04, piz: 370.51, zz: 244.02, dolg: 30.43, drugi: 6.08 } },
  { nombre: "30.000", origen: { tipo: "recalculado", detalle: "30000 / 12 × 0,75 = 1875; prispevki 793,14" }, fecha: "2026-10-31", entrada: { dobicek: 30000 }, esperado: { osnova: 1875, skupaj: 793.14 } },
  { nombre: "Najvišja osnova", origen: { tipo: "oficial", url: "https://www.fu.gov.si/fileadmin/Internet/Davki_in_druge_dajatve/Podrocja/Prispevki_za_socialno_varnost/Samozaposleni/SZ_10_2026.xlsx", detalle: "Preglednica FURS: osnova 8876,11, skupaj 3607,57" }, fecha: "2026-10-31", entrada: { dobicek: 500000 }, esperado: { osnova: 8876.11, skupaj: 3607.57 } },
]);
