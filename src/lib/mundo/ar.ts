// Argentina en «Tu sueldo en el mundo»: corre la misma cuenta de calcular.ar/sueldo-neto (aportes con
// tope SIPA y la estimación anual de Ganancias de lib/ganancias) con los supuestos de la grilla. Vive
// en src/lib y no en el motor porque check_fronteras no deja que src/motor importe código argentino.
import { IPC_SERIE } from "@/data/ipc-serie";
import { GANANCIAS_FUENTES } from "@/data/ganancias";
import { SUELDO_FUENTES } from "@/data/sueldo";
import { estimarGananciasAnual } from "@/lib/ganancias";
import { hoyAR } from "@/lib/hoy";
import { anioMinimoPpa, type CandidatoMundo, type Corrida, type ExclusionMundo, type TablaPpa } from "@/motor/mundo/grilla";
import { serieDe, type Registro } from "@/motor/registro";

export const PAGAS_AR = 13;

const MESES: Record<string, string> = {
  enero: "01",
  febrero: "02",
  marzo: "03",
  abril: "04",
  mayo: "05",
  junio: "06",
  julio: "07",
  agosto: "08",
  septiembre: "09",
  octubre: "10",
  noviembre: "11",
  diciembre: "12",
};

function fechaDeTexto(texto: string): string | null {
  const m = /^(\d{1,2}) de ([a-záéíóú]+) de (\d{4})$/i.exec(texto.trim());
  const mes = m && MESES[m[2].toLowerCase()];
  return m && mes ? `${m[3]}-${mes}-${m[1].padStart(2, "0")}` : null;
}

export interface PpaAr {
  valor: number;
  anio: number;
  // Solo si hubo que llevarla con la inflación: mes al que se llevó y año del dato del Banco Mundial.
  llevada?: { mes: string; anioBase: number; base: number; ipcAr: number; cpiUs: number };
}

// El Banco Mundial dejó de extrapolar la PPA de Argentina después de 2021 (consultado el 2026-10-23) y
// con la inflación de estos años ese valor ya no sirve. Mientras siga atrasada se lleva al último mes
// con IPC del INDEC y CPI-U del BLS publicados, con la inflación relativa, que es como el Banco Mundial
// extrapola entre rondas del ICP: PPA = PPA base × (IPC AR del mes / promedio del año base) /
// (CPI US del mes / promedio del año base). Si el Banco Mundial vuelve a publicarla al día, se usa la suya.
export function ppaArgentina(registro: Registro, tabla: TablaPpa): PpaAr | string {
  const dato = tabla.paises.AR;
  if (!dato) return "el Banco Mundial no tiene PPA de consumo privado para Argentina";
  if (dato.anio >= anioMinimoPpa(tabla)) return { valor: dato.valor, anio: dato.anio };
  const us = registro.pais("us");
  const cpi = us && serieDe(us, "us.cpi-u");
  if (!cpi) return "falta la serie us.cpi-u del registro para llevar la PPA de Argentina";
  const cpiPorMes = new Map(cpi.puntos.map(([f, v]) => [f.slice(0, 7), v]));
  const ipcPorMes = new Map(IPC_SERIE.map(([m, v]) => [m, v]));
  const promedio = (mapa: Map<string, number>, anio: number) => {
    const valores = Array.from({ length: 12 }, (_, i) => mapa.get(`${anio}-${String(i + 1).padStart(2, "0")}`));
    return valores.every((v): v is number => typeof v === "number") ? valores.reduce((a, b) => a + b, 0) / 12 : null;
  };
  const ipcBase = promedio(ipcPorMes, dato.anio);
  const cpiBase = promedio(cpiPorMes, dato.anio);
  if (!ipcBase || !cpiBase) return `faltan meses de ${dato.anio} en el IPC del INDEC o en el CPI-U`;
  const mes = [...ipcPorMes.keys()].filter((m) => cpiPorMes.has(m)).sort().at(-1);
  if (!mes) return "el IPC del INDEC y el CPI-U no tienen ningún mes en común";
  const ipcAr = ipcPorMes.get(mes)!;
  const cpiUs = cpiPorMes.get(mes)!;
  return {
    valor: (dato.valor * (ipcAr / ipcBase)) / (cpiUs / cpiBase),
    anio: Number(mes.slice(0, 4)),
    llevada: { mes, anioBase: dato.anio, base: dato.valor, ipcAr, cpiUs },
  };
}

export function candidatoAr(registro: Registro, tabla: TablaPpa): CandidatoMundo | ExclusionMundo {
  const base = { mercado: "ar", iso: "AR", calculadora: "ar.sueldo-neto", metodo: "ar" as const };
  const fechas = [fechaDeTexto(GANANCIAS_FUENTES.consultadoEl), fechaDeTexto(SUELDO_FUENTES.consultadoEl)];
  if (fechas.some((f) => f === null)) return { ...base, motivo: `no se pudo leer la fecha de verificación de los datos (${GANANCIAS_FUENTES.consultadoEl} / ${SUELDO_FUENTES.consultadoEl})` };
  const ppa = ppaArgentina(registro, tabla);
  if (typeof ppa === "string") return { ...base, motivo: ppa };
  return {
    ...base,
    moneda: "ARS",
    ruta: "/sueldo-neto",
    sitio: "ar" as const,
    datosVerificadosEl: (fechas as string[]).sort()[0],
    fecha: hoyAR(),
    zonaHoraria: "America/Argentina/Buenos_Aires",
    pagas: PAGAS_AR,
    nota: `13 pagas con el SAC. Aportes del 17 % con tope SIPA y Ganancias estimada sobre el año, sin cuota sindical.${ppa.llevada ? ` PPA del Banco Mundial de ${ppa.llevada.anioBase} llevada a ${ppa.llevada.mes} con el IPC del INDEC y el CPI-U del BLS.` : ""}`,
    ppa: { valor: ppa.valor, anio: ppa.anio },
    netoAnual: (brutoAnual: number): Corrida => {
      if (!(brutoAnual > 0)) return { ok: false, motivo: "bruto no positivo" };
      const g = estimarGananciasAnual({ brutoMensual: brutoAnual / PAGAS_AR });
      if (!Number.isFinite(g.aportesAnual) || !Number.isFinite(g.impuestoAnual)) return { ok: false, motivo: "la estimación de Ganancias no devolvió números" };
      return { ok: true, neto: g.gananciaBrutaAnual - g.aportesAnual - g.impuestoAnual };
    },
  };
}
