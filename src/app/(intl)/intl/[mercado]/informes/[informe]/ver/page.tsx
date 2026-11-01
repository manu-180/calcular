import { coma } from "@/motor/i18n/direccion";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { dentroDelCupoEntrega, ipDelPedido, numeroDeInforme } from "@/lib/acceso-entrega";
import { proveedor } from "@/lib/pagos";
import { leerReferenciaIntl, productoIntlDe } from "@/lib/pagos/catalogo-intl";
import { rutaLandingIntl, rutaVerInformeIntl } from "@/lib/pagos/flujo-intl";
import { calcularEscenarios, estadoDelInforme } from "@/lib/pagos/informe-intl";
import { familiaPorClave } from "@/lib/pagos/ofertas-intl";
import { textosFamilia } from "@/lib/pagos/textos";
import { calculadorasDeProducto, validarDatosDeProducto } from "@/lib/pagos/ofertas-servidor";
import { ID_PAYPAL } from "@/lib/pagos/paypal";
import { pagoCubre, type PagoVerificado } from "@/lib/pagos/tipos";
import { leerDatosCheckoutIntl } from "@/lib/pagos/ventas-intl";
import { crudosDeEntrada } from "@/lib/prefill/intl-cliente";
import type { DatosIntl } from "@/lib/prefill/intl";
import { claveServicio, servicio } from "@/lib/supabase/servicio";
import { formatearFecha } from "@/motor/formato";
import { valoresIniciales } from "@/motor/formulario";
import { modoPublicacion } from "@/motor/sitio";
import { textosMotor } from "@/motor/textos";
import type { CodigoMercado, FechaISO } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { fechaEnZona, hoyEn } from "@/motor/vigencia";
import { registro } from "@/paises";
import { textosInforme, textosVer } from "../../_textos";
import { InformeVivo } from "./_informe-vivo";
import "@/motor/ui/estilos-oferta.css";

// Cada carga re-verifica el pago con el proveedor: nunca se cachea ni se indexa.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false, nocache: true }, referrer: "no-referrer" };

type Props = { params: Promise<{ mercado: string; informe: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

const uno = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

function Aviso({ titulo, texto, href, volver }: { titulo: string; texto: string; href: string; volver: string }) {
  return (
    <div className="cy-pagina">
      <header className="cy-heroe cy-heroe-chico">
        <h1 className="cy-titular">{titulo}</h1>
        <p className="cy-bajada">{texto}</p>
      </header>
      <p>
        <a href={href}>{volver}</a>
      </p>
    </div>
  );
}

export default async function VerInformeIntl({ params, searchParams }: Props) {
  const { mercado, informe } = await params;
  const sp = await searchParams;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  const producto = ctx ? productoIntlDe(ctx.mercado.codigo, informe) : null;
  if (!ctx || !producto || producto.tipo !== "informe") notFound();
  const m = ctx.mercado;
  const tv = textosVer(m.idioma, m.trato, m.locale);
  const landing = rutaLandingIntl(producto);
  const volver = producto.titulo;

  const prov = proveedor(uno(sp.proveedor));
  const id = uno(sp.pago);
  if (!prov || prov.nombre === "mercadopago" || !ID_PAYPAL.test(id)) return <Aviso titulo={tv.errorTitulo} texto={tv.error} href={landing} volver={volver} />;
  if (!(await dentroDelCupoEntrega(ipDelPedido(await headers())))) return <Aviso titulo={tv.errorTitulo} texto={tv.cupo} href={landing} volver={volver} />;

  let pago: PagoVerificado | null = null;
  try {
    pago = await prov.consultarPago(id);
  } catch (e) {
    console.error("[informes/ver intl] no pude verificar el pago", prov.nombre, id, e);
    return <Aviso titulo={tv.errorTitulo} texto={tv.verificar} href={landing} volver={volver} />;
  }
  const ref = leerReferenciaIntl(pago?.referencia);
  // Otro producto, otro país, rechazado o inexistente: el mismo mensaje, para no confirmar qué ids
  // existen ni de qué son.
  if (!pago || !ref || ref.producto.id !== producto.id || !pagoCubre(pago, ref.producto)) {
    console.warn(`[informes/ver intl] no habilita · ${prov.nombre} ${id} · ${pago?.estadoProveedor ?? "sin pago"} · ${pago?.referencia ?? "?"}`);
    return <Aviso titulo={tv.errorTitulo} texto={tv.error} href={landing} volver={volver} />;
  }

  const familia = familiaPorClave(producto.familia ?? "");
  const permitidas = calculadorasDeProducto(producto);
  if (!familia || !permitidas.length) notFound();

  // Los valores oficiales del día de la compra: el informe que se abre en un año dice lo mismo que el
  // del primer día. Si ese día ya no resuelve (un dato que se corrigió), los de hoy.
  const fechaCompra: FechaISO = pago.fecha ? fechaEnZona(new Date(pago.fecha), m.zonaHoraria) : hoyEn(m);
  let datos: DatosIntl | null = null;
  if (process.env.SUPABASE_URL && claveServicio()) {
    const crudo = await leerDatosCheckoutIntl(servicio(), ref.checkoutId, producto);
    if (crudo !== null) datos = validarDatosDeProducto(producto, crudo, fechaCompra) ?? validarDatosDeProducto(producto, crudo);
  }
  const pedido = uno(sp.calc);
  const slug = datos?.calc ?? (permitidas.includes(pedido) ? pedido : permitidas[0]);
  const modo = modoPublicacion();
  let fecha = fechaCompra;
  let pagina = registro.pagina(m.codigo, slug, fecha, modo);
  if (!pagina) {
    fecha = hoyEn(m);
    pagina = registro.pagina(m.codigo, slug, fecha, modo);
  }
  const entrada = registro.calculadora(m.codigo, slug);
  if (!pagina || !entrada) notFound();
  const def = entrada.definicion;
  const props = { ...pagina.props, avisos: pagina.props.avisos.filter((a) => a.nivel === "bloquea") };
  const base = valoresIniciales(def.campos, props.contexto, props.opcionesDinamicas);
  const crudos = datos && datos.calc === slug ? crudosDeEntrada(def.campos, datos.entrada, m.locale, base) : base;
  const motor = textosMotor(m.idioma, m.trato);
  const estado = estadoDelInforme(def, crudos, props, motor);
  const escenarios = familia.escenarios ? calcularEscenarios(def, familia.escenarios, crudos, props, motor) : null;
  const textos = textosInforme(m.idioma, m.trato, familia.clave, m.locale);
  const tf = textosFamilia(familia.clave, m.idioma, m.trato, m.locale);
  const otras = permitidas.length > 1 && !datos;

  const medio = (
    <>
      <section>
        <h2>{tv.comoSeCalcula}</h2>
        <ol>
          {pagina.contenido.comoSeCalcula.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </section>
      {tf.pasos ? (
        <section>
          <h2>{tf.pasos.titulo}</h2>
          <ul className="cy-informe-lista">
            {tf.pasos.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );

  return (
    <div className="cy-informe">
      {otras ? (
        <nav className="cy-informe-pantalla cy-informe-elegir" aria-label={tv.elegir}>
          {permitidas.map((s) => {
            const p = registro.pagina(m.codigo, s, hoyEn(m), modo);
            return p ? (
              <a key={s} href={`${rutaVerInformeIntl(producto, prov.nombre, pago.id)}&calc=${s}`} aria-current={s === slug ? "page" : undefined}>
                {p.contenido.h1}
              </a>
            ) : null;
          })}
        </nav>
      ) : null}
      <article className="cy-informe-papel">
        <header className="cy-informe-membrete">
          <span className="cy-informe-marca">
            Calcular<b>Ya</b>
          </span>
          <span className="cy-informe-meta">
            <span>
              {tv.numero} {numeroDeInforme(`paypal:${pago.id}`)}
            </span>
            <span>
              {tv.emitido} {formatearFecha(hoyEn(m), m.locale)}
            </span>
            <span>
              {tv.valores} {formatearFecha(fecha, m.locale)}
            </span>
          </span>
        </header>
        <h1>{producto.titulo}</h1>
        <p className="cy-informe-sub">{pagina.contenido.h1}</p>
        <InformeVivo
          mercado={m.codigo}
          slug={slug}
          {...(pagina.universal ? { universal: pagina.universal } : {})}
          permitidas={permitidas}
          producto={producto.id}
          definicion={{ id: def.id, campos: def.campos, resultado: def.resultado, tablas: def.tablas }}
          props={props}
          crudosIniciales={crudos}
          conDatos={!!datos}
          estadoInicial={estado}
          escenariosIniciales={escenarios}
          escenario={familia.escenarios}
          textos={textos}
          medio={medio}
        />
        {pagina.sello.fuentes.length ? (
          <section>
            <h2>{tv.fuentes}</h2>
            <ul className="cy-informe-fuentes">
              {pagina.sello.fuentes.map((f) => (
                <li key={f.url}>
                  <strong>{f.organismo}</strong>{m.idioma === "hy" ? "։" : "."} {f.titulo}
                  {coma(m.idioma)}
                  {tv.verificado} {formatearFecha(f.verificadoEl, m.locale)}
                  {/* En armenio la fecha de Intl ya cierra con «թ.» (ADR 0002, D30). */}
                  {m.idioma === "hy" ? "" : "."}{" "}
                  <a href={f.url} rel="noopener" target="_blank">
                    {f.url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {tf.aviso ? <p className="cy-informe-legal">{tf.aviso}</p> : null}
        <p className="cy-informe-legal">{pagina.sello.fuentes.length ? tv.legal : tv.legalSinFuentes}</p>
      </article>
    </div>
  );
}
