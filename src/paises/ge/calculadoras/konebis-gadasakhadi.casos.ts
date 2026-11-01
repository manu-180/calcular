import { definirCasos } from "@/motor/calculo";
import konebisGadasakhadi from "./konebis-gadasakhadi";

const KOD = "https://infohub.rs.ge/ka/workspace/document/800cbef0-32bf-4f06-94fe-8afd2bf144a0";

export default definirCasos(konebisGadasakhadi, [
  {
    nombre: "შემოსავალი ზღვრის ზემოთ",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 202.5: 200 000 × 1% = 2000; ქვედა ზღვარი 0,8% = 1600." },
    fecha: "2026-11-01",
    entrada: { ghirebuleba: 200000, ojakhi: 150000, ganakveti: 1, tve: 12 },
    esperado: { gadasakhadi: 2000, minimumi: 1600, maximumi: 2000, statusi: "იბეგრება" },
  },
  {
    nombre: "შემოსავალი ზღვრის ფარგლებში",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 206.1 „ა“: 100 000 ლარამდე თავისუფალია." },
    fecha: "2026-11-01",
    entrada: { ghirebuleba: 200000, ojakhi: 100000, ganakveti: 1, tve: 12 },
    esperado: { gadasakhadi: 0, statusi: "გათავისუფლებულია" },
  },
  {
    nombre: "ექვსი თვე ფლობა",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 202.9: 200 000 × 0,8% × 6/12 = 800." },
    fecha: "2026-11-01",
    entrada: { ghirebuleba: 200000, ojakhi: 150000, ganakveti: 0.8, tve: 6 },
    esperado: { gadasakhadi: 800 },
  },
  {
    nombre: "განაკვეთი ფარგლებს გარეთ",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 202.5: 0,5% დაუშვებელია." },
    fecha: "2026-11-01",
    entrada: { ghirebuleba: 200000, ojakhi: 150000, ganakveti: 0.5, tve: 12 },
    esperaError: true,
  },
]);
