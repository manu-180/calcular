import { esFechaISO } from "@/motor/vigencia";
import type { Detector, FechaISO, HallazgoNorma, Http, PuntoSerie } from "@/motor/tipos";

const NBS = "https://nbs.sk/export/sk/exchange-rate/latest/csv";

// NBS da un CSV de una fila por día: cabecera «Dátum;USD;...» y valores con coma decimal.
async function kurzNbs(http: Http, url: string, kod: string): Promise<readonly PuntoSerie[] | null> {
  const riadky = (await http.texto(url)).replace(/^﻿/, "").trim().split(/\r?\n/);
  const hlavicka = riadky[0]?.split(";") ?? [];
  const i = hlavicka.indexOf(kod);
  const hodnoty = riadky[1]?.split(";") ?? [];
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(hodnoty[0] ?? "");
  if (i < 0 || !m) return null;
  const fecha = `${m[3]}-${m[2]}-${m[1]}`;
  const valor = Number((hodnoty[i] ?? "").replace(/["\s]/g, "").replace(",", "."));
  if (!esFechaISO(fecha) || !Number.isFinite(valor) || valor <= 0) return null;
  return [{ fecha, valor }];
}

function detectorKurzu(kod: string, min: number, max: number): Detector {
  const m = kod.toLowerCase();
  return {
    id: `sk.${m}-nbs`,
    carril: "serie",
    serie: `sk.${m}`,
    metodo: "html",
    url: NBS,
    banda: { min, max, saltoRelativoMax: 0.05 },
    traer(http) {
      return kurzNbs(http, this.url, kod);
    },
  };
}

// La versión estática de Slov-Lex lista una página por cada redacción de la ley («AAAAMMDD.html»): una
// fecha posterior a la última leída es una novela que hay que leer.
async function novelaZakona(http: Http, url: string, nazov: string, overene: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url);
  const verzie = [...html.matchAll(/(\d{8})\.html/g)].map((m) => m[1]);
  if (!verzie.length) return null;
  const nove = [...new Set(verzie)].filter((v) => v > overene).sort();
  return nove.map((v) => {
    const fecha = `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}` as FechaISO;
    return { titulo: `${nazov}: nové znenie od ${fecha}`, url: `${url}${v}.html`, fecha };
  });
}

function detectorZakona(id: string, cislo: string, nazov: string, overene: string, datos: readonly string[]): Detector {
  return {
    id,
    carril: "norma",
    datos,
    metodo: "html",
    url: `https://static.slov-lex.sk/static/SK/ZZ/${cislo}/`,
    traer(http) {
      return novelaZakona(http, this.url, nazov, overene);
    },
  };
}

export const detectores: readonly Detector[] = [
  detectorKurzu("USD", 0.8, 1.6),
  detectorKurzu("CZK", 20, 30),
  detectorKurzu("GBP", 0.7, 1),
  detectorKurzu("HUF", 300, 450),
  detectorKurzu("PLN", 3.8, 5.2),
  detectorKurzu("CHF", 0.8, 1.2),
  detectorZakona("sk.zakon-dan-z-prijmov", "2003/595", "Zákon o dani z príjmov", "20260101", ["sk.dan-z-prijmov", "sk.nezdanitelna-cast", "sk.danovy-bonus"]),
  detectorZakona("sk.zakonnik-prace", "2001/311", "Zákonník práce", "20260901", ["sk.dovolenka", "sk.odstupne", "sk.vypovedna-doba", "sk.nadcas", "sk.priplatky"]),
  detectorZakona("sk.zakon-dph", "2004/222", "Zákon o DPH", "20260101", ["sk.dph"]),
  detectorZakona("sk.zakon-zdravotne", "2004/580", "Zákon o zdravotnom poistení", "20260701", ["sk.zdravotne-odvody"]),
  detectorZakona("sk.zakon-socialne", "2003/461", "Zákon o sociálnom poistení", "20260901", ["sk.odvody-zamestnanec", "sk.odvody-zamestnavatel", "sk.odvody-szco", "sk.adh"]),
];
