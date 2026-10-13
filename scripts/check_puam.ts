// Verificación de la PUAM (src/data/puam.ts + src/lib/puam.ts).
// Correr con: npx tsx scripts/check_puam.ts
//
// EL ANCLA QUE IMPORTA: acá no hay un solo monto escrito a mano. El haber se DERIVA del haber
// mínimo garantizado (80%, art. 14 de la Ley 27.260) y se cruza contra `prestacionesVigentes().puam`,
// que se transcribe del artículo 5 de la resolución mensual de ANSES. Son dos caminos
// independientes hacia el mismo número: si alguien rota el haber mínimo y se equivoca en un
// dígito, o toca el porcentaje sin norma, los dos caminos dejan de coincidir y esto sale rojo.
//
// El segundo ancla es la diferencia contra la pensión no contributiva a la vejez: tiene que ser
// exactamente diez puntos del haber mínimo (80% − 70%), porque el bono es plano y se cancela.

import { PUAM, PUAM_CARACTERES, puamFuentes, PUAM_REQUISITOS } from "../src/data/puam";
import { bonoVigente, prestacionesVigentes } from "../src/data/prestaciones";
import { PRESTACIONES_PNC } from "../src/data/pnc";
import {
  compararConMinima,
  compararConVejez,
  evaluarPuam,
  montoPuam,
  topeEmbargoAlimentos,
  type SituacionPuam,
} from "../src/lib/puam";

const V = prestacionesVigentes();

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const casi = (a: number, b: number, tol = 0.01) => Math.abs(a - b) <= tol;

// ===========================================================================
// 1 · Parámetros contra el texto de la ley
// ===========================================================================
check("la edad mínima son 65 años (art. 13)", PUAM.edadMinima === 65);
check("el haber es el 80% del mínimo (art. 14)", PUAM.proporcionHaberMinimo === 0.8);
check(
  "residencias del art. 13 inc. 1: 10 al naturalizado, 20 al extranjero con 10 inmediatos",
  PUAM.residenciaNaturalizadoAnios === 10 &&
    PUAM.residenciaExtranjeroAnios === 20 &&
    PUAM.residenciaExtranjeroInmediatosAnios === 10,
);
check("el embargo por alimentos tope al 20% (art. 15 inc. d)", PUAM.embargoMaximoPorAlimentos === 0.2);

// ===========================================================================
// 2 · ANCLA DOBLE — la derivación tiene que dar lo que publica la resolución
// ===========================================================================
const M = montoPuam();
check(
  "el haber derivado (80% del mínimo) coincide con el de la resolución de ANSES",
  casi(M.haber, V.puam),
  { derivado: M.haber, resolucion: V.puam, haberMinimo: V.haberMinimo },
);
check(
  "el haber de la PUAM está por debajo del haber mínimo",
  M.haber < V.haberMinimo,
  { puam: M.haber, minimo: V.haberMinimo },
);
check(
  "como está por debajo del mínimo, le corresponde el bono completo",
  casi(M.bono, bonoVigente().monto),
  { bono: M.bono, decreto: bonoVigente().monto },
);
check("el total es haber + bono", casi(M.total, M.haber + M.bono), M);

// ===========================================================================
// 3 · La brecha real contra la mínima (lo que la página afirma)
// ===========================================================================
const C = compararConMinima();
// La tolerancia no es 0 a propósito: el haber se redondea a dos decimales (el 80% de
// $419.775,93 son $335.820,744 y se liquidan $335.820,74), así que el cociente da 0,8 menos unos
// pocos milmillonésimos. Lo que se verifica es que no haya OTRA diferencia además del redondeo.
check("la proporción del haber es 0,8 salvo el redondeo al centavo", casi(C.proporcionHaber, 0.8, 1e-6));
check(
  "sobre el total depositado la proporción es MAYOR que 0,8 (el bono es plano)",
  C.proporcionTotal > C.proporcionHaber && C.proporcionTotal < 1,
  { proporcionTotal: C.proporcionTotal },
);
check(
  "la brecha del haber es el 20% del haber mínimo",
  casi(C.brechaHaber, V.haberMinimo * 0.2),
  { brecha: C.brechaHaber },
);
check(
  "la brecha del total es la misma que la del haber (el bono se cancela)",
  casi(C.brechaTotal, C.brechaHaber),
  { brechaTotal: C.brechaTotal, brechaHaber: C.brechaHaber },
);

// ===========================================================================
// 4 · PUAM vs pensión no contributiva a la vejez (la cuenta que nadie publica)
// ===========================================================================
const VJ = compararConVejez();
const VEJEZ_DATA = PRESTACIONES_PNC.find((p) => p.clave === "vejez");
check("la pensión a la vejez sigue cargada al 70%", VEJEZ_DATA?.proporcionHaberMinimo === 0.7);
check(
  "la diferencia mensual es exactamente 10 puntos del haber mínimo",
  casi(VJ.diferenciaMensual, V.haberMinimo * 0.1),
  { diferencia: VJ.diferenciaMensual, esperado: V.haberMinimo * 0.1 },
);
check("la diferencia anual son 12 diferencias mensuales", casi(VJ.diferenciaAnual, VJ.diferenciaMensual * 12));
check("la PUAM paga más que la pensión a la vejez", VJ.totalVejez < M.total);

// ===========================================================================
// 5 · Tope de embargo por alimentos
// ===========================================================================
check(
  "el tope embargable es el 20% del haber",
  casi(topeEmbargoAlimentos(), M.haber * 0.2),
  { tope: topeEmbargoAlimentos() },
);

// ===========================================================================
// 6 · Motor de elegibilidad — los bloqueos objetivos del art. 13 y 16
// ===========================================================================
const BASE: SituacionPuam = {
  edad: 70,
  ciudadania: "nativo",
  aniosResidencia: 70,
  cobraOtroBeneficio: false,
  cobraDesempleo: false,
  trabajo: "no",
};

const ok = evaluarPuam(BASE);
check("caso limpio: cumple los requisitos objetivos", ok.cumpleRequisitosObjetivos);
check("caso limpio: no le faltan años para la edad", ok.aniosParaLaEdad === 0);

const joven = evaluarPuam({ ...BASE, edad: 62 });
check("62 años: bloqueado por edad", !joven.cumpleRequisitosObjetivos);
check("62 años: le faltan 3 años", joven.aniosParaLaEdad === 3);

const nat = evaluarPuam({ ...BASE, ciudadania: "naturalizado", aniosResidencia: 8 });
check("naturalizado con 8 años de residencia: bloqueado", !nat.cumpleRequisitosObjetivos);
const natOk = evaluarPuam({ ...BASE, ciudadania: "naturalizado", aniosResidencia: 10 });
check("naturalizado con 10 años: pasa", natOk.cumpleRequisitosObjetivos);

const ext = evaluarPuam({ ...BASE, ciudadania: "extranjero", aniosResidencia: 19 });
check("extranjero con 19 años: bloqueado", !ext.cumpleRequisitosObjetivos);
const extOk = evaluarPuam({ ...BASE, ciudadania: "extranjero", aniosResidencia: 20 });
check("extranjero con 20 años: pasa", extOk.cumpleRequisitosObjetivos);
check(
  "extranjero que pasa igual recibe el aviso de los 10 años inmediatos",
  extOk.observaciones.some((o) => o.tono === "atencion" && /inmediatamente anteriores/.test(o.texto)),
);

const desempleo = evaluarPuam({ ...BASE, cobraDesempleo: true });
check("cobrando desempleo (Ley 24.013): bloqueado (art. 13 inc. 3)", !desempleo.cumpleRequisitosObjetivos);

for (const trabajo of ["dependencia", "autonomo", "monotributo"] as const) {
  const r = evaluarPuam({ ...BASE, trabajo });
  check(`trabajo "${trabajo}": bloqueado por el art. 16`, !r.cumpleRequisitosObjetivos);
}
const efector = evaluarPuam({ ...BASE, trabajo: "efector" });
check(
  "monotributista del Registro de Efectores: NO bloqueado (única excepción del art. 16)",
  efector.cumpleRequisitosObjetivos,
);

const otro = evaluarPuam({ ...BASE, cobraOtroBeneficio: true });
check(
  "cobrar otra prestación NO es bloqueo absoluto: el inc. 4 deja optar",
  otro.cumpleRequisitosObjetivos &&
    otro.observaciones.some((o) => o.tono === "atencion" && /optar/.test(o.texto)),
);

check(
  "toda situación devuelve al menos una observación",
  [ok, joven, nat, ext, desempleo, efector, otro].every((r) => r.observaciones.length > 0),
);
check(
  "los montos no dependen de la situación declarada",
  [joven, nat, desempleo].every((r) => casi(r.monto.total, M.total)),
);

// ===========================================================================
// 7 · Contenido: requisitos, caracteres y fuentes citan norma
// ===========================================================================
check("hay al menos 6 requisitos cargados", PUAM_REQUISITOS.length >= 6);
check(
  "cada requisito cita un artículo con número",
  PUAM_REQUISITOS.every((r) => /\d/.test(r.norma) && r.texto.length > 30),
);
check(
  "los caracteres cubren las dos direcciones",
  PUAM_CARACTERES.some((c) => c.signo === "en contra") &&
    PUAM_CARACTERES.some((c) => c.signo === "a favor"),
);
check(
  "está la incompatibilidad del art. 16 y su norma sustitutiva",
  PUAM_CARACTERES.some(
    (c) => c.signo === "en contra" && /27\.467/.test(c.norma) && /incompatible/i.test(c.texto),
  ),
);
check(
  "está el «no genera derecho a pensión» del art. 15 inc. a",
  PUAM_CARACTERES.some((c) => /art\. 15 inc\. a/.test(c.norma) && /no genera derecho a pensión/i.test(c.texto)),
);
// ── Lo que la cartilla de ANSES agrega y la Ley 27.260 no dice (regla de s81, aplicada el 15/8) ──
// Estos dos anclas existen porque son el diferencial de la página: si un refactor los borra, la
// página vuelve a decir lo mismo que cualquier nota que copie sólo la ley.
check(
  "el plazo de 90 días corridos de ausencia está cargado como número, no como frase",
  PUAM.diasAusenciaQuePierdenLaResidencia === 90,
  PUAM.diasAusenciaQuePierdenLaResidencia,
);
check(
  "y aparece en los requisitos, atribuido a la cartilla / Res. ANSES 918/24 (NO a la Ley 27.260)",
  PUAM_REQUISITOS.some(
    (r) =>
      /90 días corridos/.test(r.texto) &&
      /918\/24|cartilla/i.test(r.norma) &&
      !/Ley 27\.260/.test(r.norma),
  ),
  PUAM_REQUISITOS.map((r) => r.norma),
);
check(
  "el Subsidio de Contención Familiar está como contrapeso del «no deja pensión»",
  PUAM_CARACTERES.some(
    (c) => c.signo === "a favor" && /Subsidio de Contención Familiar/i.test(c.texto),
  ),
);
check(
  "la cartilla oficial de ANSES figura entre las fuentes",
  puamFuentes().lista.some((f) => f.url.includes("anses.gob.ar/sites/default/files/cartilla/")),
);

check("hay al menos 4 fuentes", puamFuentes().lista.length >= 4);
check(
  "todas las fuentes son oficiales (infoleg, boletinoficial o la cartilla de ANSES) y con detalle",
  puamFuentes().lista.every(
    (f) =>
      /^https:\/\/(servicios\.infoleg\.gob\.ar|www\.boletinoficial\.gob\.ar|www\.anses\.gob\.ar\/sites\/default\/files\/)/.test(
        f.url,
      ) &&
      f.detalle.length > 40,
  ),
  puamFuentes().lista.map((f) => f.url),
);
check(
  "la fecha de consulta tiene formato AAAA-MM-DD",
  /^\d{4}-\d{2}-\d{2}$/.test(puamFuentes().consultadoEl),
);
check(
  "las fuentes incluyen el texto actualizado de la Ley 27.260",
  puamFuentes().lista.some((f) => f.url.includes("263691") && f.url.endsWith("texact.htm")),
);

console.log("");
if (fallas > 0) {
  console.error(`❌ ${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log("Todos los checks de la PUAM OK (haber derivado del mínimo y cruzado contra la resolución).");
