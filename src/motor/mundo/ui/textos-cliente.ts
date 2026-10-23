import type { TextosMundo } from "../../i18n/mundo";

// Los textos que usa el navegador, ya resueltos y sin funciones (una función no cruza a un Client
// Component). Lo variable queda como {marca} y lo rellena `rellenar`. Lo que depende de la gramática
// del país («en Portugal», «au Portugal», «in der Schweiz») se arma acá, una vez por país.

// Números centinela para las funciones que reciben números: se llaman con ellos y se reemplazan por la
// marca. Valores que ningún texto escribe solo.
const N = 987654;
const T = 876543;
const P = "\u0007pct\u0007";

const conMarcas = (s: string) => s.replaceAll(String(N), "{n}").replaceAll(String(T), "{total}").replaceAll(P, "{pct}");

export function rellenar(plantilla: string, valores: Readonly<Record<string, string | number>>): string {
  return plantilla.replace(/\{(\w+)\}/g, (todo, clave: string) => (clave in valores ? String(valores[clave]) : todo));
}

// Parte una frase en la fecha: [antes, después]. La fecha se dibuja aparte, grande.
function partir(f: (fecha: string) => string): readonly [string, string] {
  const marca = "\u0006";
  const [a = "", d = ""] = f(marca).split(marca);
  return [a.trimEnd(), d.trimStart()];
}

export function textosCliente(t: TextosMundo, paises: readonly { iso: string; nombre: string }[]) {
  const porPais = (f: (pais: string) => string) => Object.fromEntries(paises.map((p) => [p.iso, f(p.nombre)]));
  return {
    form: t.form,
    heroe: {
      hasta: partir(t.heroe.hasta),
      tasa: t.heroe.tasa("{pct}"),
      dias: conMarcas(t.heroe.dias(N, T)),
      enMano: t.heroe.enMano,
      porMes: t.heroe.porMes,
      anio: conMarcas(t.heroe.anio(N - 1, N, T)).replaceAll(String(N - 1), "{anio}"),
      resto: t.heroe.resto,
    },
    ranking: {
      ...t.ranking,
      verTodos: conMarcas(t.ranking.verTodos(N)),
      sinResultados: t.ranking.sinResultados("{q}"),
      abrir: porPais(t.ranking.abrir),
      mas: t.ranking.mas("{pct}"),
      menos: t.ranking.menos("{pct}"),
      puesto: conMarcas(t.ranking.puesto(N, T)),
    },
    tarjeta: {
      titulo: t.tarjeta.titulo,
      bajada: t.tarjeta.bajada,
      hasta: partir(t.tarjeta.hasta),
      tasa: t.tarjeta.tasa("{pct}"),
      mejor: porPais((nombre) => conMarcas(t.tarjeta.mejor(nombre, P))),
      mejorPropio: porPais(t.tarjeta.mejorPropio),
      yVos: t.tarjeta.yVos,
      cta: t.tarjeta.cta,
      compartir: t.tarjeta.compartir,
      compartirDuelo: t.tarjeta.compartirDuelo,
      descargar: t.tarjeta.descargar,
      copiado: t.tarjeta.copiado,
      compartido: t.tarjeta.compartido,
      error: t.tarjeta.error,
      texto: t.tarjeta.texto("{fecha}"),
      alt: t.tarjeta.alt,
      titulo2: t.nombre,
    },
    duelo: {
      amigo: partir(t.duelo.amigo),
      yVos: t.duelo.yVos,
      invitacion: t.duelo.invitacion,
      vos: t.duelo.vos,
      elAmigo: t.duelo.elAmigo,
      dia: t.duelo.dia,
      tasa: t.duelo.tasa,
      mejorPais: t.duelo.mejorPais,
      antes1: t.duelo.antes(1),
      antes: conMarcas(t.duelo.antes(N)),
      despues1: t.duelo.despues(1),
      despues: conMarcas(t.duelo.despues(N)),
      empate: t.duelo.empate,
      desde: porPais(t.duelo.desde),
    },
  };
}

export type TextosCliente = ReturnType<typeof textosCliente>;
