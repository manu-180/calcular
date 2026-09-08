// Verificación de los derechohabientes de la muerte laboral (Ley 24.557 art. 18 + Ley 24.241 art. 53).
// Correr con: npx tsx scripts/check_derechohabientes_art.ts
//
// LO QUE ESTE CHECK EXISTE PARA IMPEDIR:
//
//   1. **Que se colapsen las dos listas en una.** Es el error que la página existe para corregir:
//      la lista del art. 248 (empleador) y la del art. 18 (ART) NO son la misma, y hay casos donde
//      alguien cobra una y no la otra. El check exige que el motor produzca divergencias en los
//      casos donde las normas efectivamente divergen — si alguien "simplifica" el motor haciendo
//      que las dos listas coincidan, esto se pone rojo.
//   2. **Que se pierda la extensión de edad de la LRT.** El art. 53 corta en 18 y el art. 18 ap. 2
//      extiende a 21, o 25 para el estudiante a cargo exclusivo. Publicar el tope de 18 le saca la
//      prestación a un hijo de 20 que la ley sí le da.
//   3. **Que el plazo de convivencia se aplique al revés.** Son 5 años, que bajan a 2 SÓLO cuando
//      hay descendencia reconocida por ambos convivientes. Invertirlo deja afuera a quien entra.
//   4. **Que los tres escalones dejen de ser excluyentes.** Los padres cobran sólo «en ausencia de
//      las personas enumeradas» en el art. 53, y los familiares a cargo sólo «en caso de
//      fallecimiento de ambos padres». Hacerlos concurrir reparte la prestación entre gente que la
//      norma no llamó.
//   5. **Que el caso que la ley no resuelve salga como certeza.** Cónyuge no culpable + conviviente
//      que califica + sin alimentos ni causa: el art. 53 no lo resuelve. El motor tiene que
//      devolver `discutido`, no `si` ni `no`.
//   6. **Que las citas textuales se parafraseen.** La página muestra el texto entre comillas: si
//      alguien lo "mejora", deja de ser una cita.
//
// MUTACIONES MUERTAS (cambios plausibles que este check tiene que atrapar):
//   · tope de edad 21 → 18 · plazo de convivencia 5 ↔ 2 · escalones concurrentes en vez de
//     excluyentes · `discutido` colapsado a `si` · el conviviente sin el requisito previo del
//     causante separado/soltero.

import {
  ANIOS_CONVIVENCIA,
  ANIOS_CONVIVENCIA_CON_HIJOS,
  DH_FUENTES,
  DH_TEXTOS,
  EDAD_TOPE_LRT,
  EDAD_TOPE_LRT_ESTUDIANTE,
  EDAD_TOPE_SIPA,
  ESCALONES,
  INCISOS_ART53,
  VIGENCIA_ART18,
} from "../src/data/derechohabientes-art";
import {
  aniosExigidos,
  calcularDerechohabientes,
  convivienteCalifica,
  familiaArt248,
  hijoCalificaLrt,
  topeEdadLrt,
  type Caso,
  type Persona,
} from "../src/lib/derechohabientes-art";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FALLA ${nombre}`, detalle ?? "");
  }
}

const casoBase = (personas: Persona[], extra: Partial<Caso> = {}): Caso => ({
  personas,
  causanteSeparadoOSoltero: false,
  conyugeDeclaradoCulpable: false,
  huboAlimentosOCausa: false,
  ...extra,
});

// --- 1. Las constantes son las de la ley ------------------------------------------------------
check("el tope del art. 53 es 18", EDAD_TOPE_SIPA === 18, EDAD_TOPE_SIPA);
check("la LRT lo extiende a 21", EDAD_TOPE_LRT === 21, EDAD_TOPE_LRT);
check("y a 25 para el estudiante", EDAD_TOPE_LRT_ESTUDIANTE === 25, EDAD_TOPE_LRT_ESTUDIANTE);
check("la extensión es hacia arriba, nunca hacia abajo", EDAD_TOPE_LRT > EDAD_TOPE_SIPA);
check("el estudiante tiene más plazo que el que no estudia", EDAD_TOPE_LRT_ESTUDIANTE > EDAD_TOPE_LRT);
check("la convivencia general es de 5 años", ANIOS_CONVIVENCIA === 5, ANIOS_CONVIVENCIA);
check(
  "con hijos en común baja a 2, no sube",
  ANIOS_CONVIVENCIA_CON_HIJOS === 2 && ANIOS_CONVIVENCIA_CON_HIJOS < ANIOS_CONVIVENCIA,
  [ANIOS_CONVIVENCIA_CON_HIJOS, ANIOS_CONVIVENCIA],
);
check("el art. 53 tiene sus cinco incisos", INCISOS_ART53.length === 5, INCISOS_ART53.length);
check("los incisos van de la a) a la e)", INCISOS_ART53.map((i) => i.inciso).join("") === "abcde");
check("los escalones del art. 18 ap. 2 son tres", ESCALONES.length === 3, ESCALONES.length);

// --- 2. Las citas son citas, no resúmenes -----------------------------------------------------
check(
  "el art. 18 ap. 2 remite al art. 53 de la Ley 24.241",
  DH_TEXTOS.art18ap2Remision.includes("artículo 53 de la Ley Nº 24.241") &&
    DH_TEXTOS.art18ap2Remision.includes("orden de prelación"),
);
check(
  "la cita de la extensión de edad dice 21 y 25 con todas las letras",
  DH_TEXTOS.art18ap2Edad.includes("VEINTIUN (21)") &&
    DH_TEXTOS.art18ap2Edad.includes("VEINTICINCO (25)") &&
    DH_TEXTOS.art18ap2Edad.includes("a cargo exclusivo"),
);
check(
  "la cita de los padres conserva el «íntegramente por el otro»",
  DH_TEXTOS.art18ap2Padres.includes("partes iguales") &&
    DH_TEXTOS.art18ap2Padres.includes("percibida íntegramente por el otro"),
);
check(
  "la delegación incumplida está citada textual",
  DH_TEXTOS.art18ap2Delegacion.includes("grado de parentesco requerido") &&
    DH_TEXTOS.art18ap2Delegacion.includes("familiar a cargo"),
);
check(
  "el reglamento dice «cualquiera fuera el régimen» — es el hallazgo, no puede diluirse",
  DH_TEXTOS.decreto334art7.includes("cualquiera fuera el régimen al que el damnificado estuviera afiliado"),
);
check(
  "la cita de la convivencia trae los dos plazos y la condición previa",
  DH_TEXTOS.art53Convivencia.includes("cinco (5) años") &&
    DH_TEXTOS.art53Convivencia.includes("dos (2) años") &&
    DH_TEXTOS.art53Convivencia.includes("descendencia reconocida por ambos") &&
    DH_TEXTOS.art53Convivencia.includes("separado de hecho o legalmente"),
);
check(
  "la regla de exclusión conserva los DOS supuestos",
  DH_TEXTOS.art53Exclusion.includes("declarado culpable") &&
    DH_TEXTOS.art53Exclusion.includes("partes iguales"),
);
check(
  "la cita del art. 248 conserva la independencia de los dos regímenes",
  DH_TEXTOS.art248Independencia.includes("independiente") &&
    DH_TEXTOS.art248Independencia.includes("Sistema de Riesgos del Trabajo"),
);
check(
  "el art. 18 ap. 1 conserva la remisión al art. 15 ap. 2 y al art. 11 ap. 4",
  DH_TEXTOS.art18ap1.includes("segundo párrafo del apartado 2 del artículo 15") &&
    DH_TEXTOS.art18ap1.includes("artículo 11, apartado cuarto"),
);
check(
  "el art. 18 vigente es el del Decreto 1278/2000, no el original de 1995",
  VIGENCIA_ART18.sustituidoPor.includes("1278/2000") && VIGENCIA_ART18.boletin.includes("2001"),
);

// --- 3. Tope de edad de los hijos -------------------------------------------------------------
const hijo = (edad: number, extra: Partial<Persona> = {}): Persona => ({
  id: `h${edad}`,
  nombre: `Hijo de ${edad}`,
  vinculo: "hijo",
  edad,
  ...extra,
});
check("un hijo de 17 entra", hijoCalificaLrt(hijo(17)));
check("un hijo de 20 entra (la LRT extendió a 21)", hijoCalificaLrt(hijo(20)));
check("un hijo de 21 ya no entra", !hijoCalificaLrt(hijo(21)));
check("un hijo de 22 no entra", !hijoCalificaLrt(hijo(22)));
check("un estudiante a cargo de 24 entra", hijoCalificaLrt(hijo(24, { estudianteACargo: true })));
check("un estudiante a cargo de 25 ya no entra", !hijoCalificaLrt(hijo(25, { estudianteACargo: true })));
check(
  "el que estudia tiene más tope que el que no",
  topeEdadLrt(hijo(30, { estudianteACargo: true })) > topeEdadLrt(hijo(30)),
);
check("el incapacitado entra sin importar la edad", hijoCalificaLrt(hijo(47, { incapacitado: true })));

// --- 4. Convivencia ---------------------------------------------------------------------------
const conviviente = (anios: number, extra: Partial<Persona> = {}): Persona => ({
  id: "conv",
  nombre: "Conviviente",
  vinculo: "conviviente",
  aniosConvivencia: anios,
  ...extra,
});
const separado = { causanteSeparadoOSoltero: true };
check(
  "5 años alcanzan",
  convivienteCalifica(conviviente(5), casoBase([conviviente(5)], separado)),
);
check(
  "4 años no alcanzan",
  !convivienteCalifica(conviviente(4), casoBase([conviviente(4)], separado)),
);
check(
  "2 años alcanzan si hay descendencia reconocida por ambos",
  convivienteCalifica(
    conviviente(2, { hijosEnComun: true }),
    casoBase([conviviente(2, { hijosEnComun: true })], separado),
  ),
);
check(
  "1 año no alcanza ni con hijos en común",
  !convivienteCalifica(
    conviviente(1, { hijosEnComun: true }),
    casoBase([conviviente(1, { hijosEnComun: true })], separado),
  ),
);
check(
  "sin el requisito previo del causante separado o soltero, 10 años no alcanzan",
  !convivienteCalifica(conviviente(10), casoBase([conviviente(10)])),
);
check(
  "los años exigidos bajan sólo por la descendencia en común",
  aniosExigidos(conviviente(0, { hijosEnComun: true })) === ANIOS_CONVIVENCIA_CON_HIJOS &&
    aniosExigidos(conviviente(0)) === ANIOS_CONVIVENCIA,
);

// --- 5. Los tres escalones son EXCLUYENTES ----------------------------------------------------
const conyuge: Persona = { id: "c", nombre: "Cónyuge", vinculo: "conyuge" };
const madre: Persona = { id: "m", nombre: "Madre", vinculo: "padre", aCargo: true };
const padre: Persona = { id: "p", nombre: "Padre", vinculo: "padre", aCargo: true };
const hermana: Persona = { id: "f", nombre: "Hermana", vinculo: "familiar", aCargo: true };

const conConyugeYPadres = calcularDerechohabientes(casoBase([conyuge, madre, padre]));
check("con cónyuge, el escalón es el del art. 53", conConyugeYPadres.escalonLrt === "art53");
check(
  "los padres NO concurren con el cónyuge",
  conConyugeYPadres.veredictos.filter((v) => v.vinculo === "padre").every((v) => v.lrt === "no"),
);
check("y el cónyuge sí cobra", conConyugeYPadres.veredictos[0]?.lrt === "si");

const soloPadres = calcularDerechohabientes(casoBase([madre, padre, hermana]));
check("sin nadie del art. 53, cobran los padres", soloPadres.escalonLrt === "padres");
check("y son dos titulares", soloPadres.titularesLrt === 2, soloPadres.titularesLrt);
check(
  "la hermana a cargo NO concurre con los padres vivos",
  soloPadres.veredictos.find((v) => v.id === "f")?.lrt === "no",
);

const unPadreVivo = calcularDerechohabientes(casoBase([{ ...madre, fallecido: true }, padre]));
check("si uno falleció, el otro cobra íntegramente", unPadreVivo.titularesLrt === 1, unPadreVivo.titularesLrt);

const ambosPadresMuertos = calcularDerechohabientes(
  casoBase([{ ...madre, fallecido: true }, { ...padre, fallecido: true }, hermana]),
);
check(
  "muertos ambos padres, se abre el escalón de los familiares a cargo",
  ambosPadresMuertos.escalonLrt === "familiares",
);
check("y la hermana a cargo cobra", ambosPadresMuertos.titularesLrt === 1);
check(
  "ese escalón avisa que la ley lo dejó sin reglamentar",
  ambosPadresMuertos.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("334/96")),
);
check(
  "un familiar que NO estaba a cargo no abre el tercer escalón",
  calcularDerechohabientes(
    casoBase([
      { ...madre, fallecido: true },
      { ...padre, fallecido: true },
      { ...hermana, aCargo: false },
    ]),
  ).escalonLrt === "sin-derechohabientes",
);

// --- 6. Cónyuge contra conviviente ------------------------------------------------------------
const convHabil = conviviente(6);
const culpable = calcularDerechohabientes(
  casoBase([conyuge, convHabil], { ...separado, conyugeDeclaradoCulpable: true }),
);
check(
  "el cónyuge declarado culpable queda excluido por el conviviente",
  culpable.veredictos.find((v) => v.id === "c")?.lrt === "no",
);
check("y el conviviente cobra", culpable.veredictos.find((v) => v.id === "conv")?.lrt === "si");

const conAlimentos = calcularDerechohabientes(
  casoBase([conyuge, convHabil], { ...separado, huboAlimentosOCausa: true }),
);
check(
  "con alimentos o causa, concurren los dos",
  conAlimentos.titularesLrt === 2,
  conAlimentos.titularesLrt,
);

const zonaGris = calcularDerechohabientes(casoBase([conyuge, convHabil], separado));
check(
  "fuera de esos dos supuestos, el cónyuge queda DISCUTIDO — no se resuelve por default",
  zonaGris.veredictos.find((v) => v.id === "c")?.lrt === "discutido",
);
check("y se avisa que lo define un juez", zonaGris.avisos.some((a) => a.tono === "bloqueante"));
check(
  "el conviviente que no califica no dispara la zona gris",
  calcularDerechohabientes(casoBase([conyuge, conviviente(1)], separado)).veredictos.find(
    (v) => v.id === "c",
  )?.lrt === "si",
);

// --- 7. Las DOS listas divergen: es el producto de la página ----------------------------------
const hijoDe23 = hijo(23);
const soloHijoMayor = calcularDerechohabientes(casoBase([hijoDe23]));
check(
  "un hijo de 23 sin CUD cobra la del empleador (en subsidio) y NO la de la ART",
  soloHijoMayor.veredictos[0]?.lct === "si" && soloHijoMayor.veredictos[0]?.lrt === "no",
);
check("y el motor lo marca como divergente", soloHijoMayor.divergencias.length === 1);

const convDeTres = calcularDerechohabientes(casoBase([conviviente(3)], separado));
check(
  "un conviviente de 3 años cobra la del empleador y NO la de la ART",
  convDeTres.veredictos[0]?.lct === "si" && convDeTres.veredictos[0]?.lrt === "no",
);
check("también es divergencia", convDeTres.divergencias.length === 1);

// Con un hijo de 20 SOLO, el art. 248 lo llama en subsidio y cobra las dos. La divergencia inversa
// aparece cuando hay cónyuge: el primer grupo del art. 248 lo desplaza, y la LRT igual lo llama
// porque el art. 18 ap. 2 extendió el límite a 21.
const hijoDe20Solo = calcularDerechohabientes(casoBase([hijo(20)]));
check(
  "un hijo de 20 solo cobra las dos: la ART por la extensión a 21 y el empleador en subsidio",
  hijoDe20Solo.veredictos[0]?.lrt === "si" && hijoDe20Solo.veredictos[0]?.lct === "si",
);
const hijoDe20ConConyuge = calcularDerechohabientes(casoBase([conyuge, hijo(20)]));
const v20 = hijoDe20ConConyuge.veredictos.find((v) => v.id === "h20");
check(
  "con cónyuge presente, el hijo de 20 cobra la de la ART y NO la del empleador",
  v20?.lrt === "si" && v20?.lct === "no",
);
check("la divergencia va para los dos lados", hijoDe20ConConyuge.divergencias.length === 1);

const menor = calcularDerechohabientes(casoBase([hijo(10)]));
check("un hijo menor cobra las dos: no hay divergencia", menor.divergencias.length === 0);

// --- 8. El lado LCT no se reimplementa: sale de la fuente única -------------------------------
const familia = familiaArt248(casoBase([conyuge, hijo(10), hijo(25), hijo(30, { cud: true }), madre]));
check("los menores se cuentan por edad < 18", familia.hijosMenores === 1, familia.hijosMenores);
check("el hijo de 30 con CUD va al inciso c)", familia.hijosMayoresConCUD === 1);
check("el de 25 sin CUD queda como hijo mayor", familia.hijosMayores === 1);
check("el cónyuge cuenta como el inciso a)", familia.conyugeOConviviente === true);
check("la madre a cargo se cuenta", familia.padresACargo === 1);
const repartoLct = calcularDerechohabientes(
  casoBase([conyuge, hijo(10), hijo(25), hijo(30, { cud: true }), madre]),
).lct;
check("el art. 248 llama al primer grupo", repartoLct.grupo === "primer-grupo");
check("y son 3 titulares (cónyuge + menor + mayor con CUD)", repartoLct.titulares === 3, repartoLct.titulares);

// --- 9. Cada veredicto trae la regla que lo decide --------------------------------------------
const completo = calcularDerechohabientes(
  casoBase([conyuge, convHabil, hijo(19), hijo(23), madre, hermana], separado),
);
check(
  "ningún veredicto sale sin motivo en los dos regímenes",
  completo.veredictos.every((v) => v.motivoLrt.trim().length > 0 && v.motivoLct.trim().length > 0),
);
check(
  "los veredictos son uno por persona",
  completo.veredictos.length === completo.veredictos.length &&
    new Set(completo.veredictos.map((v) => v.id)).size === completo.veredictos.length,
);
check(
  "el hijo de 19 entra a la ART y el de 23 no",
  completo.veredictos.find((v) => v.id === "h19")?.lrt === "si" &&
    completo.veredictos.find((v) => v.id === "h23")?.lrt === "no",
);

// --- 10. Caso vacío ---------------------------------------------------------------------------
const vacio = calcularDerechohabientes(casoBase([]));
check("sin personas no hay derechohabientes", vacio.escalonLrt === "sin-derechohabientes");
check("ni titulares del art. 248", vacio.lct.titulares === 0);
check("y se avisa que la del empleador se rige aparte", vacio.avisos.some((a) => a.tono === "atencion"));

// --- 11. Fuentes ------------------------------------------------------------------------------
check("hay al menos 4 fuentes", DH_FUENTES.length >= 4, DH_FUENTES.length);
check(
  "todas por https y de infoleg",
  DH_FUENTES.every((f) => f.url.startsWith("https://") && f.url.includes("infoleg.gob.ar")),
);
check("ninguna fuente se publica sin detalle", DH_FUENTES.every((f) => f.detalle.trim().length > 30));
check(
  "el reglamento está entre las fuentes: es el hallazgo",
  DH_FUENTES.some((f) => f.nombre.includes("334/96")),
);
check(
  "la fecha de consulta está declarada",
  VIGENCIA_ART18.consultadoEl.includes("2026"),
  VIGENCIA_ART18.consultadoEl,
);

if (fallas > 0) {
  console.error(`\n❌ ${fallas} falla(s) en los checks de derechohabientes de la ART.`);
  process.exit(1);
}
console.log(
  "\n✅ Todos los checks de derechohabientes OK (Ley 24.557 art. 18 · Ley 24.241 art. 53 · Decreto 334/96 art. 7º · LCT art. 248).",
);
