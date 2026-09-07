"use client";

import { useMemo, useState } from "react";
import { PEA } from "@/data/edad-avanzada";
import { BONO_VIGENTE, PRESTACIONES_VIGENTES as V } from "@/data/prestaciones";
import { evaluarPea, pensionDerivada, type CondicionPea } from "@/lib/edad-avanzada";
import { formatARS, formatPct, parseMonto } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const CONDICIONES: { valor: CondicionPea; label: string }[] = [
  { valor: "dependencia", label: "En relación de dependencia" },
  { valor: "autonomo", label: "Autónomo o monotributista" },
];

const campo =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

export function CalculadoraEdadAvanzada() {
  const [edadInput, setEdadInput] = useState("70");
  const [aportesInput, setAportesInput] = useState("10");
  const [antesSijpInput, setAntesSijpInput] = useState("0");
  const [ventanaInput, setVentanaInput] = useState("5");
  const [condicion, setCondicion] = useState<CondicionPea>("dependencia");
  const [antiguedadInput, setAntiguedadInput] = useState("5");
  const [domestico, setDomestico] = useState(false);
  const [cobraOtro, setCobraOtro] = useState(false);
  const [promedioInput, setPromedioInput] = useState("");

  const soloDigitos = (s: string) => Number(s.replace(/\D/g, "")) || 0;

  const res = useMemo(
    () =>
      evaluarPea({
        edad: soloDigitos(edadInput),
        aniosAportes: soloDigitos(aportesInput),
        aniosAnterioresAlSijp: soloDigitos(antesSijpInput),
        aniosEnLaVentana: soloDigitos(ventanaInput),
        condicion,
        antiguedadAfiliacionAnios: soloDigitos(antiguedadInput),
        serviciosDomesticos: domestico,
        cobraOtroBeneficio: cobraOtro,
        promedioRemuneraciones: parseMonto(promedioInput),
      }),
    [
      edadInput,
      aportesInput,
      antesSijpInput,
      ventanaInput,
      condicion,
      antiguedadInput,
      domestico,
      cobraOtro,
      promedioInput,
    ],
  );

  const h = res.haber;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="edad" className="block text-sm font-semibold text-zinc-800">
            ¿Qué edad tenés?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Se pide desde los {PEA.edadMinima}, sin distinción de género.
          </p>
          <input
            id="edad"
            inputMode="numeric"
            value={edadInput}
            onChange={(e) => setEdadInput(e.target.value)}
            className={campo}
          />
        </div>

        <div>
          <label htmlFor="aportes" className="block text-sm font-semibold text-zinc-800">
            Años de aportes en total
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Se piden {PEA.aniosServiciosConAportes}. Suman dependencia, autónomo y monotributo.
          </p>
          <input
            id="aportes"
            inputMode="numeric"
            value={aportesInput}
            onChange={(e) => setAportesInput(e.target.value)}
            className={campo}
          />
        </div>

        <div>
          <label htmlFor="ventana" className="block text-sm font-semibold text-zinc-800">
            De esos años, ¿cuántos caen en los últimos {PEA.ventanaAniosAnteriores} antes del cese?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Tienen que ser al menos {PEA.aniosDentroDeLaVentana}. Es el requisito que más
            solicitudes voltea.
          </p>
          <input
            id="ventana"
            inputMode="numeric"
            value={ventanaInput}
            onChange={(e) => setVentanaInput(e.target.value)}
            className={campo}
          />
        </div>

        <div>
          <label htmlFor="antes" className="block text-sm font-semibold text-zinc-800">
            ¿Cuántos de esos años son anteriores a 1994?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Solo los anteriores al SIJP dan prestación compensatoria. Si no tenés ninguno, dejá 0.
          </p>
          <input
            id="antes"
            inputMode="numeric"
            value={antesSijpInput}
            onChange={(e) => setAntesSijpInput(e.target.value)}
            className={campo}
          />
        </div>

        <div>
          <label htmlFor="condicion" className="block text-sm font-semibold text-zinc-800">
            ¿Cómo aportaste?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Al autónomo le piden además antigüedad en la afiliación.
          </p>
          <select
            id="condicion"
            value={condicion}
            onChange={(e) => setCondicion(e.target.value as CondicionPea)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {CONDICIONES.map((c) => (
              <option key={c.valor} value={c.valor}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {condicion === "autonomo" && (
          <div>
            <label htmlFor="antiguedad" className="block text-sm font-semibold text-zinc-800">
              Años de antigüedad en la afiliación
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              Se exigen {PEA.antiguedadAfiliacionAutonomoAnios}. No es lo mismo que los aportes
              pagos.
            </p>
            <input
              id="antiguedad"
              inputMode="numeric"
              value={antiguedadInput}
              onChange={(e) => setAntiguedadInput(e.target.value)}
              className={campo}
            />
          </div>
        )}

        <div className={condicion === "autonomo" ? "sm:col-span-2" : ""}>
          <label htmlFor="promedio" className="block text-sm font-semibold text-zinc-800">
            Promedio de tus sueldos de los últimos {PEA.aniosDelPromedio} años (opcional)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Actualizados, como los computa ANSES. Si lo dejás vacío ves solo el piso garantizado,
            que es lo que cobra la enorme mayoría.
          </p>
          <input
            id="promedio"
            inputMode="numeric"
            placeholder="Ej.: 900.000"
            value={promedioInput}
            onChange={(e) => setPromedioInput(e.target.value)}
            className={campo}
          />
        </div>

        <label
          htmlFor="domestico"
          className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 p-3 text-sm text-zinc-700"
        >
          <input
            id="domestico"
            type="checkbox"
            checked={domestico}
            onChange={(e) => setDomestico(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span>
            Mis años son de casas particulares
            <span className="block text-xs text-zinc-500">
              Servicio doméstico. ANSES lo excluye en su cartilla.
            </span>
          </span>
        </label>

        <label
          htmlFor="otro"
          className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 p-3 text-sm text-zinc-700"
        >
          <input
            id="otro"
            type="checkbox"
            checked={cobraOtro}
            onChange={(e) => setCobraOtro(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span>
            Ya cobro otra jubilación, pensión o retiro
            <span className="block text-xs text-zinc-500">
              De cualquier caja, nacional, provincial o municipal.
            </span>
          </span>
        </label>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <p className="text-sm text-zinc-600">
          {res.cumpleRequisitosObjetivos
            ? "Cumplís los requisitos con número. Esto es lo que se deposita este mes"
            : "Hoy hay un requisito que no se cumple. Si se destrabara, este es el monto del mes"}
        </p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
          {formatARS(h.total, 2)}
        </p>

        <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">
              70% de la PBU (lo que publica todo el mundo)
            </dt>
            <dd className="font-medium text-zinc-900">{formatARS(h.componentePbu, 2)}</dd>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">
              Compensatoria ({h.aniosPc} {h.aniosPc === 1 ? "año" : "años"} antes del SIJP)
            </dt>
            <dd className="font-medium text-zinc-900">{formatARS(h.componentePc, 2)}</dd>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">
              Adicional por permanencia ({h.aniosPap} {h.aniosPap === 1 ? "año" : "años"})
            </dt>
            <dd className="font-medium text-zinc-900">{formatARS(h.componentePap, 2)}</dd>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">Total de la fórmula</dt>
            <dd className="font-medium text-zinc-900">{formatARS(h.haberFormula, 2)}</dd>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">Haber mínimo garantizado (art. 125)</dt>
            <dd className="font-medium text-zinc-900">{formatARS(h.haberMinimo, 2)}</dd>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">Bono ({BONO_VIGENTE.norma})</dt>
            <dd className="font-medium text-zinc-900">{formatARS(h.bono, 0)}</dd>
          </div>
        </dl>

        <div
          className={`mt-4 rounded-lg border px-3 py-2 text-sm ${
            h.mandaElPiso ? TONOS.ok : TONOS.atencion
          }`}
        >
          {h.mandaElPiso ? (
            <>
              <strong>Manda el piso, no la fórmula.</strong> La cuenta del art. 34 bis da{" "}
              {formatARS(h.haberFormula, 2)}, o sea{" "}
              {formatARS(h.haberMinimo - h.haberFormula, 2)} menos que el mínimo garantizado. Lo que
              se cobra es el mínimo: {formatARS(h.haber, 2)}.
              {res.promedioUmbral !== null && (
                <>
                  {" "}
                  Con tus años de aportes, la fórmula recién le ganaría al piso con un sueldo
                  promedio actualizado de <strong>{formatARS(res.promedioUmbral, 0)}</strong> por
                  mes.
                </>
              )}
            </>
          ) : (
            <>
              <strong>Acá la fórmula sí supera al piso.</strong> Con ese promedio y esos años, el
              haber del art. 34 bis ({formatARS(h.haberFormula, 2)}) queda por encima del mínimo
              garantizado de {formatARS(h.haberMinimo, 2)}.
              {h.mandaElTecho && (
                <>
                  {" "}
                  Pero se aplica el tope máximo del art. 17: {formatARS(h.haberMaximo, 2)}.
                </>
              )}
            </>
          )}
        </div>

        <ul className="mt-4 space-y-2">
          {res.observaciones.map((o, i) => (
            <li key={i} className={`rounded-lg border px-3 py-2 text-sm ${TONOS[o.tono]}`}>
              {o.texto}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs text-zinc-500">
          El haber sale de aplicar el art. 34 bis de la Ley 24.241 a lo que declaraste, con la PBU (
          {formatARS(V.pbu, 2)}) y el haber mínimo ({formatARS(V.haberMinimo, 2)}) de {V.vigencia}{" "}
          fijados por la {V.resolucion}. Esta prestación deja pensión por fallecimiento:{" "}
          {formatPct(PEA.proporcionPensionDerivada * 100, 0)} de tu haber, hoy{" "}
          {formatARS(pensionDerivada(h.haber), 2)} (ap. 5). No otorga ni liquida beneficios: el
          cómputo final lo hace ANSES sobre tu certificación de servicios.
        </p>
      </div>
    </div>
  );
}
