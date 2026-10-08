import type { Hoja } from "./marco";

export function siOpcion(ref: string, casos: readonly [string, string][], otro: string): string {
  return casos.reduceRight((acc, [etiqueta, valor]) => `IF(${ref}="${etiqueta}",${valor},${acc})`, otro);
}

export function aniversario(ingreso: string, anios: string): string {
  const anio = `YEAR(${ingreso})+${anios}`;
  return `DATE(${anio},MONTH(${ingreso}),MIN(DAY(${ingreso}),DAY(EOMONTH(DATE(${anio},MONTH(${ingreso}),1),0))))`;
}

export interface Antiguedad {
  aniosCompletos: string;
  diasDesdeAniversario: string;
  diasEnElAnio: string;
  anios: string;
  dias: string;
}

// Espejo de la antigüedad por aniversario de src/paises/mx/nomina.ts: cuenta los dos días y un 29 de
// febrero cumple años el 28 en los años no bisiestos.
export function antiguedadPorAniversario(h: Hoja, ingreso: string, salida: string): Antiguedad {
  const k0 = `(YEAR(${salida})-YEAR(${ingreso}))`;
  const aniosCompletos = h.paso("Años completos de servicio", `IF(AND(${k0}>0,${aniversario(ingreso, k0)}>${salida}+1),${k0}-1,${k0})`, "entero");
  const diasDesdeAniversario = h.paso("Días desde el último aniversario", `${salida}+1-${aniversario(ingreso, aniosCompletos)}`, "entero");
  const diasEnElAnio = h.paso("Días trabajados este año", `${salida}-MAX(${ingreso},DATE(YEAR(${salida}),1,1))+1`, "entero");
  const anios = h.paso("Antigüedad en años", `${aniosCompletos}+${diasDesdeAniversario}/365`, "factor");
  const dias = h.paso("Días de servicio", `${salida}-${ingreso}+1`, "entero");
  return { aniosCompletos, diasDesdeAniversario, diasEnElAnio, anios, dias };
}

const ultimoDia = (f: string) => `DAY(EOMONTH(${f},0))`;
const mesAbs = (f: string) => `(YEAR(${f})*12+MONTH(${f}))`;

// mesesCalendarioCompletos de src/paises/pe/fechas.ts: solo cuentan los meses trabajados del primero al último día.
export function mesesCalendarioCompletos(desde: string, hasta: string): string {
  const primero = `IF(DAY(${desde})=1,${mesAbs(desde)},${mesAbs(desde)}+1)`;
  const ultimo = `IF(DAY(${hasta})=${ultimoDia(hasta)},${mesAbs(hasta)},${mesAbs(hasta)}-1)`;
  return `IF(${hasta}<${desde},0,MAX(0,${ultimo}-${primero}+1))`;
}

// mesesCalendarioYDias de src/paises/pe/fechas.ts: meses completos y los días sueltos de las puntas como treintavos.
export function mesesCalendarioYDias(h: Hoja, etiqueta: string, desde: string, hasta: string): { meses: string; dias: string } {
  const mismoMes = `AND(YEAR(${desde})=YEAR(${hasta}),MONTH(${desde})=MONTH(${hasta}))`;
  const completo = `AND(DAY(${desde})=1,DAY(${hasta})=${ultimoDia(hasta)})`;
  const sueltos = h.paso(
    `${etiqueta}: días sueltos de las puntas`,
    `IF(DAY(${desde})=1,0,${ultimoDia(desde)}-DAY(${desde})+1)+IF(DAY(${hasta})=${ultimoDia(hasta)},0,DAY(${hasta}))`,
    "entero",
  );
  const mesesPuntas = `IF(DAY(${desde})=1,1,0)+IF(DAY(${hasta})=${ultimoDia(hasta)},1,0)+MAX(0,${mesAbs(hasta)}-${mesAbs(desde)}-1)+INT(${sueltos}/30)`;
  const meses = h.paso(`${etiqueta}: meses`, `IF(${hasta}<${desde},0,IF(${mismoMes},IF(${completo},1,0),${mesesPuntas}))`, "entero");
  const dias = h.paso(
    `${etiqueta}: días`,
    `IF(${hasta}<${desde},0,IF(${mismoMes},IF(${completo},0,DAY(${hasta})-DAY(${desde})+1),MOD(${sueltos},30)))`,
    "entero",
  );
  return { meses, dias };
}

// aniosMesesDias de src/paises/pe/fechas.ts: por aniversario, con el día siguiente al último trabajado como fin.
export function aniosMesesDias(h: Hoja, etiqueta: string, desde: string, hasta: string): { anios: string; meses: string; dias: string } {
  const fin = `(${hasta}+1)`;
  const total = h.paso(
    `${etiqueta}: meses de servicio`,
    `IF(${hasta}<${desde},0,(YEAR(${fin})-YEAR(${desde}))*12+MONTH(${fin})-MONTH(${desde})-IF(DAY(${fin})<DAY(${desde}),1,0))`,
    "entero",
  );
  const mesBase = `DATE(YEAR(${desde}),MONTH(${desde})+${total},1)`;
  const base = `DATE(YEAR(${mesBase}),MONTH(${mesBase}),MIN(DAY(${desde}),${ultimoDia(mesBase)}))`;
  const anios = h.paso(`${etiqueta}: años`, `INT(${total}/12)`, "entero");
  const meses = h.paso(`${etiqueta}: meses`, `MOD(${total},12)`, "entero");
  const dias = h.paso(`${etiqueta}: días`, `IF(${hasta}<${desde},0,MIN(${fin}-${base},29))`, "entero");
  return { anios, meses, dias };
}

// Años, meses y días contando por meses calendario desde el inicio (sumarMeses recorta al último día
// del mes, igual que EDATE): antiguedad de src/paises/cl/lib/fechas.ts y tiempoTrabajado de
// src/paises/ec/lib/fechas.ts, que pasa como fin el día siguiente al último trabajado.
export function tiempoPorMeses(h: Hoja, etiqueta: string, inicio: string, fin: string): { anios: string; meses: string; dias: string } {
  const k0 = `(YEAR(${fin})-YEAR(${inicio}))`;
  const anios = h.paso(`${etiqueta}: años completos`, `IF(EDATE(${inicio},12*${k0})>${fin},${k0}-1,${k0})`, "entero");
  const anualidad = h.paso(`${etiqueta}: último aniversario`, `EDATE(${inicio},12*${anios})`, "fecha");
  const m0 = `((YEAR(${fin})-YEAR(${anualidad}))*12+MONTH(${fin})-MONTH(${anualidad}))`;
  const meses = h.paso(`${etiqueta}: meses`, `MIN(12,IF(EDATE(${anualidad},${m0})>${fin},${m0}-1,${m0}))`, "entero");
  const dias = h.paso(`${etiqueta}: días`, `${fin}-EDATE(${anualidad},${meses})`, "entero");
  return { anios, meses, dias };
}

// dias360 de src/paises/co/reglas.ts: año comercial, cuenta el primer y el último día, el 31 vale 30 y
// el último día de febrero vale 30 cuando cierra el período.
export function dias360(desde: string, hasta: string): string {
  const ultimoFebrero = `AND(MONTH(${hasta})=2,DAY(${hasta})=DAY(EOMONTH(${hasta},0)))`;
  const dia2 = `IF(${ultimoFebrero},30,MIN(DAY(${hasta}),30))`;
  return `((YEAR(${hasta})-YEAR(${desde}))*360+(MONTH(${hasta})-MONTH(${desde}))*30+(${dia2}-MIN(DAY(${desde}),30))+1)`;
}
