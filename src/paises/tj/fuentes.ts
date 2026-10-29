import { esFechaISO } from "@/motor/vigencia";
import type { Detector, DetectorSerie, Http, PuntoSerie } from "@/motor/tipos";

// Лента RSS НБТ отдает курсы на последнюю зарегистрированную дату: <pubDate>29.10.2026</pubDate> и по каждой
// валюте строку «CURRENCY CODE: 840 | UNIT: 1 | RATE: 9.2174» (UNIT: 1, 10 или 100 единиц за курс).
// Лента с параметром date (export_xml.php) без даты отвечает ошибкой, поэтому берем RSS.
async function kursNbt(http: Http, url: string, kod: number): Promise<readonly PuntoSerie[] | null> {
  const xml = await http.texto(url);
  const data = /<pubDate>(\d\d)\.(\d\d)\.(\d{4})<\/pubDate>/.exec(xml);
  const m = new RegExp(`CURRENCY CODE:\\s*${kod}\\s*\\|\\s*UNIT:\\s*(\\d+)\\s*\\|\\s*RATE:\\s*([\\d]+\\.[\\d]+)`).exec(xml);
  if (!data || !m) return null;
  const fecha = `${data[3]}-${data[2]}-${data[1]}`;
  const valor = Number(m[2]) / Number(m[1]);
  if (!esFechaISO(fecha) || !Number.isFinite(valor) || valor <= 0) return null;
  return [{ fecha, valor: Math.round(valor * 1e6) / 1e6 }];
}

function detectorKursa(iso: string, kod: number, banda: DetectorSerie["banda"]): Detector {
  return {
    id: `tj.${iso.toLowerCase()}-nbt`,
    carril: "serie",
    serie: `tj.${iso.toLowerCase()}`,
    metodo: "api-xml",
    url: "https://nbt.tj/ru/kurs/rss.php",
    banda,
    traer(http) {
      return kursNbt(http, this.url, kod);
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorKursa("USD", 840, { min: 7, max: 12, saltoRelativoMax: 0.05 }),
  detectorKursa("EUR", 978, { min: 8, max: 14, saltoRelativoMax: 0.06 }),
  detectorKursa("RUB", 810, { min: 0.07, max: 0.18, saltoRelativoMax: 0.08 }),
  detectorKursa("CNY", 156, { min: 1, max: 1.9, saltoRelativoMax: 0.06 }),
  detectorKursa("KZT", 398, { min: 0.012, max: 0.032, saltoRelativoMax: 0.06 }),
];
