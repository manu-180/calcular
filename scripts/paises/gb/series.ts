import { writeFileSync } from "node:fs";
import path from "node:path";

const UA = { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120" };
const CPI = "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7bt/mm23";
const BANK = "https://www.bankofengland.co.uk/boeapps/database/_iadb-fromshowcolumns.asp?csv.x=yes&Datefrom=01/Jan/2026&Dateto=now&SeriesCodes=IUDBEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N";
const MESES: Record<string, string> = { JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06", JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12" };

async function main() {
  const hoy = new Date().toISOString().slice(0, 10);
  const cpi = (await (await fetch(`${CPI}/data`, { headers: UA })).json()) as { months: { date: string; value: string }[] };
  const puntosCpi = cpi.months
    .map((m): [string, number] => {
      const [anio, mes] = m.date.split(" ");
      return [`${anio}-${MESES[mes]}-01`, Number(m.value)];
    })
    .filter(([f]) => f >= "2000-01-01");
  const csv = await (await fetch(BANK, { headers: UA })).text();
  const puntosBank = csv
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((l): [string, number] => {
      const [d, v] = l.split(",");
      const [dia, mes, anio] = d.split(" ");
      return [`${anio}-${MESES[mes.toUpperCase()]}-${dia.padStart(2, "0")}`, Number(v)];
    });
  const ultimo = puntosCpi.at(-1)!;
  const json = {
    mercado: "gb",
    series: [
      {
        id: "gb.cpi",
        nombre: "Consumer Prices Index (CPI), all items, 2015 = 100",
        unidad: "numero",
        frecuencia: "mensual",
        maxAntiguedadDias: 100,
        fuente: {
          organismo: "Office for National Statistics",
          titulo: "CPI INDEX 00: ALL ITEMS 2015=100 (series D7BT, dataset MM23)",
          url: CPI,
          tipo: "primaria",
          verificadoEl: hoy,
          nota: `Último mes publicado: ${ultimo[0].slice(0, 7)} = ${ultimo[1]}.`,
        },
        puntos: puntosCpi,
      },
      {
        id: "gb.bank-rate",
        nombre: "Bank Rate",
        unidad: "%",
        frecuencia: "diaria",
        maxAntiguedadDias: 10,
        fuente: {
          organismo: "Bank of England",
          titulo: "Official Bank Rate, daily (series IUDBEDR, Bank of England Database)",
          url: BANK,
          tipo: "primaria",
          verificadoEl: hoy,
        },
        puntos: puntosBank,
      },
    ],
  };
  const texto = JSON.stringify(json, null, 2).replace(/\[\n\s+("\d{4}-\d{2}-\d{2}"),\n\s+([\d.]+)\n\s+\]/g, "[$1, $2]");
  writeFileSync(path.join(process.cwd(), "src/paises/gb/series.json"), `${texto}\n`);
  console.log(`CPI: ${puntosCpi.length} meses, último ${ultimo.join(" = ")}. Bank Rate: ${puntosBank.length} días, último ${puntosBank.at(-1)!.join(" = ")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
