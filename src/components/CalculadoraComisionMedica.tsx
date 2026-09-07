"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calcularComisionMedica } from "@/lib/comision-medica";
import {
  DIAS_ILT_EFECTIVOS,
  DIAS_PAGO_HOMOLOGACION,
  PLAZO_DICTAMEN_HABILES,
} from "@/data/comision-medica";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function fechaLarga(iso: string): string {
  const [a, m, d] = iso.split("-");
  return `${Number(d)} de ${MESES[Number(m) - 1]} de ${a}`;
}

const HOY = new Date().toISOString().slice(0, 10);

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-950",
  atencion: "border-amber-200 bg-amber-50 text-amber-950",
  bloqueante: "border-rose-200 bg-rose-50 text-rose-950",
} as const;

export function CalculadoraComisionMedica() {
  const [presentacion, setPresentacion] = useState(HOY);
  const [hoy, setHoy] = useState(HOY);
  const [noRegistrado, setNoRegistrado] = useState(false);
  const [manifestacion, setManifestacion] = useState("");
  const [huboRecaida, setHuboRecaida] = useState(false);
  const [diasBaja, setDiasBaja] = useState("");
  const [homologacion, setHomologacion] = useState("");

  const res = useMemo(
    () =>
      calcularComisionMedica({
        presentacionISO: presentacion,
        hoyISO: hoy,
        noRegistrado,
        ...(manifestacion ? { primeraManifestacionISO: manifestacion } : {}),
        huboRecaida,
        diasEfectivosAcumulados: Number(diasBaja) || 0,
        ...(homologacion ? { homologacionISO: homologacion } : {}),
      }),
    [presentacion, hoy, noRegistrado, manifestacion, huboRecaida, diasBaja, homologacion],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cm-pres" className="block text-sm font-semibold text-zinc-800">
            Fecha de la primera presentación
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La del art. 3°: la primera presentación «debidamente cumplimentada» ante la comisión
            médica jurisdiccional.
          </p>
          <input
            id="cm-pres"
            type="date"
            value={presentacion}
            onChange={(ev) => setPresentacion(ev.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="cm-hoy" className="block text-sm font-semibold text-zinc-800">
            Fecha que querés consultar
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Por defecto es hoy. Sirve para ver en qué día exacto se vence el plazo.
          </p>
          <input
            id="cm-hoy"
            type="date"
            value={hoy}
            onChange={(ev) => setHoy(ev.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="cm-manif" className="block text-sm font-semibold text-zinc-800">
            Primera manifestación invalidante <span className="font-normal text-zinc-500">(opcional)</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El día del accidente, o aquel en que la enfermedad se manifestó. Con esto se calcula el
            tope de la incapacidad temporaria.
          </p>
          <input
            id="cm-manif"
            type="date"
            value={manifestacion}
            onChange={(ev) => setManifestacion(ev.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="cm-homo" className="block text-sm font-semibold text-zinc-800">
            Notificación de la homologación <span className="font-normal text-zinc-500">(opcional)</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Si ya se homologó el acuerdo, cargá la fecha en que te notificaron el acto: la plata
            tiene plazo.
          </p>
          <input
            id="cm-homo"
            type="date"
            value={homologacion}
            onChange={(ev) => setHomologacion(ev.target.value)}
            className={claseInput}
          />
        </div>

        <div className="flex items-start gap-3 sm:col-span-2">
          <input
            id="cm-negro"
            type="checkbox"
            checked={noRegistrado}
            onChange={(ev) => setNoRegistrado(ev.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="cm-negro" className="text-sm text-zinc-700">
            El trabajo <strong>no estaba registrado</strong> y el empleador no tenía ART
            <span className="block text-xs text-zinc-500">
              Art. 1°, párrafo 3: en ese caso la instancia administrativa no es obligatoria y la
              vía judicial está expedita.
            </span>
          </label>
        </div>

        <div className="flex items-start gap-3 sm:col-span-2">
          <input
            id="cm-recaida"
            type="checkbox"
            checked={huboRecaida}
            onChange={(ev) => setHuboRecaida(ev.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="cm-recaida" className="text-sm text-zinc-700">
            Me reincorporé y <strong>volví a estar de baja por la misma contingencia</strong>
            <span className="block text-xs text-zinc-500">
              Art. 7° ap. 3: ahí el tope deja de ser calendario y pasa a ser de {DIAS_ILT_EFECTIVOS}{" "}
              días efectivos de baja, sumando todos los períodos.
            </span>
          </label>
        </div>

        {huboRecaida && (
          <div className="sm:col-span-2">
            <label htmlFor="cm-dias" className="block text-sm font-semibold text-zinc-800">
              Días efectivos de baja ya acumulados por esta contingencia
            </label>
            <input
              id="cm-dias"
              type="number"
              min={0}
              inputMode="numeric"
              value={diasBaja}
              onChange={(ev) => setDiasBaja(ev.target.value)}
              className={claseInput}
              placeholder="Por ejemplo: 240"
            />
          </div>
        )}
      </div>

      {res === null ? (
        <p className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Revisá las fechas: la de la presentación no puede ser posterior a la que querés
          consultar.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          <div
            className={`rounded-xl border px-4 py-3 ${
              res.vencido ? TONOS.atencion : TONOS.ok
            }`}
          >
            <p className="text-sm font-semibold">
              {res.vencido ? (
                <>
                  El plazo de la comisión médica venció el {fechaLarga(res.vencimientoISO)}: la vía
                  judicial está expedita desde el {fechaLarga(res.viaExpeditaISO)}.
                </>
              ) : (
                <>
                  La comisión médica tiene tiempo hasta el {fechaLarga(res.vencimientoISO)} —
                  quedan {res.habilesRestantes} día(s) hábil(es) administrativo(s).
                </>
              )}
            </p>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Días hábiles transcurridos
              </dt>
              <dd className="mt-1 text-lg font-bold text-zinc-900">
                {res.habilesTranscurridos} de {PLAZO_DICTAMEN_HABILES}
              </dd>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Vía judicial expedita desde
              </dt>
              <dd className="mt-1 text-lg font-bold text-zinc-900">
                {fechaLarga(res.viaExpeditaISO)}
              </dd>
            </div>
          </dl>

          <p className="text-xs text-zinc-500">
            El art. 3° dice «contados a partir de la primera presentación» y no aclara si ese día
            cuenta. Acá se cuenta desde el día hábil siguiente, que es la lectura conservadora. Con
            la otra lectura el plazo vencería el{" "}
            <strong>{fechaLarga(res.vencimientoAlternativoISO)}</strong>, un día hábil antes.
          </p>

          {res.pagoHomologacionISO && res.pagoHomologacionHabilesISO && (
            <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-zinc-900">
                La indemnización tiene que estar a disposición
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                El Anexo I da {DIAS_PAGO_HOMOLOGACION} días desde la notificación del acto y no
                aclara si son corridos o hábiles. Contados corridos: el{" "}
                <strong>{fechaLarga(res.pagoHomologacionISO)}</strong>. Contados hábiles
                administrativos: el <strong>{fechaLarga(res.pagoHomologacionHabilesISO)}</strong>.
                Va a tu cuenta sueldo (art. 17).
              </p>
            </div>
          )}

          {res.ilt && (
            <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-zinc-900">
                El otro reloj: la incapacidad laboral temporaria
              </p>
              {res.ilt.huboRecaida ? (
                <p className="mt-1 text-sm text-zinc-600">
                  Como hubo recaída, el tope se mide en días efectivos de baja:{" "}
                  <strong>{res.ilt.diasEfectivosAcumulados}</strong> acumulados de{" "}
                  {DIAS_ILT_EFECTIVOS}, o sea que te quedan{" "}
                  <strong>{res.ilt.diasEfectivosRestantes}</strong> día(s) efectivo(s). No hay
                  fecha de cese posible: depende de cuántos días más estés de baja. La ILT también
                  cesa antes por alta médica, por declaración de incapacidad permanente o por
                  fallecimiento.
                </p>
              ) : (
                <p className="mt-1 text-sm text-zinc-600">
                  Sin recaídas, la ILT cesa como máximo el{" "}
                  <strong>{fechaLarga(res.ilt.topeCalendarioISO)}</strong> —dos años desde la
                  primera manifestación invalidante—{" "}
                  {res.ilt.diasHastaTope >= 0 ? (
                    <>y faltan {res.ilt.diasHastaTope} día(s)</>
                  ) : (
                    <>y ese tope ya se cumplió hace {Math.abs(res.ilt.diasHastaTope)} día(s)</>
                  )}
                  . También cesa antes por alta médica, por declaración de incapacidad permanente o
                  por fallecimiento.
                </p>
              )}
            </div>
          )}

          <ul className="space-y-2">
            {res.avisos.map((a) => (
              <li
                key={a.texto}
                className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}
              >
                {a.texto}
              </li>
            ))}
          </ul>

          <p className="text-sm text-zinc-600">
            Cuánto se cobra al final de este trámite se calcula aparte, con los pisos que la SRT
            actualiza por RIPTE:{" "}
            <Link href="/indemnizacion-art" className="text-emerald-700 underline">
              indemnización por accidente de trabajo
            </Link>
            .
          </p>

          <p className="text-xs text-zinc-500">
            Los días hábiles se cuentan sin sábados, domingos, feriados nacionales, días no
            laborables ni días no laborables con fines turísticos. No se descuentan feriados
            provinciales ni asuetos administrativos: cada uno de ellos corre la fecha hacia
            adelante, así que la calculada es la más temprana posible.
          </p>
        </div>
      )}
    </div>
  );
}
