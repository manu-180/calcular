"use server";

import { cookies } from "next/headers";
import { after } from "next/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { servicio } from "@/lib/supabase/servicio";
import { clienteServidor } from "@/lib/supabase/servidor";
import { registrarEvento } from "@/lib/rastreo-servidor";
import { esAdminEmail } from "@/lib/auth/admin";
import { COOKIE_ALTA, OPCIONES_ALTA, ponerPista } from "@/lib/auth/cookies";
import { destinoSeguro, inicioTrasEntrar } from "@/lib/auth/destino";
import { MAX_CLAVE, MIN_CLAVE, type EstadoForm } from "@/lib/auth/estado";
import { mandarEnlaceEntrada, mandarMail, mandarSinCuenta, urlConfirmar } from "@/lib/auth/mails";
import { huellaAlta, limitePorEmail, limitePorIp, normalizarEmail, origenAlta, sitioDelPedido } from "@/lib/auth/pedido";
import { PERFILES, asegurarPerfil, perfilPorEmail, verificadoPrevio, vincularCompras } from "@/lib/auth/perfil";
import { textosDe, type TextosCuenta } from "@/lib/cuenta/textos";

type Textos = TextosCuenta["acciones"];

// El sitio sale del Host del pedido (calcular.ar o calcularya), nunca de un campo del formulario.
async function delPedido() {
  const sitio = await sitioDelPedido();
  return { sitio, t: textosDe(sitio).acciones };
}

const texto = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" ? v : "";
};

function errorClave(clave: string, t: Textos): string | undefined {
  if (clave.length < MIN_CLAVE) return t.claveCorta(MIN_CLAVE);
  if (new TextEncoder().encode(clave).length > MAX_CLAVE) return t.claveLarga(MAX_CLAVE);
  return undefined;
}

// ─── Registro ────────────────────────────────────────────────────────────────

export async function registrar(_prev: EstadoForm, fd: FormData): Promise<EstadoForm> {
  const crudo = texto(fd, "email").trim();
  const enviado: EstadoForm = { estado: "enviado", email: crudo };
  if (texto(fd, "sitio")) return enviado;

  const { sitio, t } = await delPedido();
  const email = normalizarEmail(crudo);
  const clave = texto(fd, "clave");
  const next = destinoSeguro(texto(fd, "next"), "/cuenta", sitio);
  const origen = origenAlta(sitio, texto(fd, "desde") || texto(fd, "next"));
  const errores: EstadoForm["errores"] = {};
  if (!email) errores.email = t.emailMal;
  const eClave = errorClave(clave, t);
  if (eClave) errores.clave = eClave;
  if (fd.get("terminos") !== "si") errores.terminos = t.terminos;
  if (!email || Object.keys(errores).length) return { estado: "error", errores, email: crudo };

  if (!(await limitePorIp("registro"))) return { estado: "error", mensaje: t.muchosIntentos, email: crudo };
  if (!(await limitePorEmail("registro", email))) return enviado;

  // Si el mail ya tiene cuenta, la pantalla dice lo mismo (anti-enumeración) y al buzón le llega
  // un enlace para entrar, no un alta que no puede prosperar.
  const previo = await perfilPorEmail(email);
  if (previo.existe) {
    await mandarEnlaceEntrada(email, "ya-tenias", next);
    return enviado;
  }

  const { data, error } = await servicio().auth.admin.generateLink({
    type: "signup",
    email,
    password: clave,
    options: { data: { terminos_aceptados_at: new Date().toISOString() } },
  });

  if (error) {
    if (error.code === "weak_password") {
      return { estado: "error", errores: { clave: t.claveDebil }, email: crudo };
    }
    if (error.code === "email_exists" || error.code === "user_already_exists") {
      const r = await mandarEnlaceEntrada(email, "ya-tenias", next);
      if (r.userId) await asegurarPerfil(r.userId, email, false, origen);
      return enviado;
    }
    console.error("[auth] generateLink signup:", error.code ?? error.status, error.message);
    return { estado: "error", mensaje: t.fallaNuestra, email: crudo };
  }

  const usuario = data.user;
  if (usuario) await asegurarPerfil(usuario.id, email, false, origen);

  // generateLink('signup') con un usuario ya creado y sin confirmar no le cambia la clave: si el
  // alta es vieja, la clave que acaba de escribir no es la que quedó, y se lo decimos por mail.
  const creadoHace = usuario?.created_at ? Date.now() - Date.parse(usuario.created_at) : 0;
  if (creadoHace > 2 * 60_000) {
    await mandarEnlaceEntrada(email, "ya-tenias", next);
    return enviado;
  }

  const url = await urlConfirmar(data.properties.hashed_token, "signup", next);
  if (!(await mandarMail("alta", email, url))) {
    return { estado: "error", mensaje: t.altaSinMail, email: crudo };
  }
  // Sólo este navegador puede confirmar el alta conservando la clave que se escribió acá.
  (await cookies()).set(COOKIE_ALTA, huellaAlta(data.properties.hashed_token), OPCIONES_ALTA);
  return enviado;
}

// ─── Ingreso con clave ───────────────────────────────────────────────────────

export async function ingresarConClave(_prev: EstadoForm, fd: FormData): Promise<EstadoForm> {
  const crudo = texto(fd, "email").trim();
  const email = normalizarEmail(crudo);
  const clave = texto(fd, "clave");
  const nextCrudo = texto(fd, "next");
  const { sitio, t } = await delPedido();
  const errores: EstadoForm["errores"] = {};
  if (!email) errores.email = t.emailMal;
  if (!clave) errores.clave = t.escribiClave;
  if (!email || Object.keys(errores).length) return { estado: "error", errores, email: crudo };

  if (!(await limitePorIp("clave")) || !(await limitePorEmail("clave", email))) {
    return { estado: "error", mensaje: t.muchosIntentos, email: crudo };
  }

  let supabase;
  try {
    supabase = await clienteServidor();
  } catch (e) {
    console.error("[auth] ingresarConClave", e);
    return { estado: "error", mensaje: t.fallaNuestra, email: crudo };
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: clave });

  if (error || !data.user) {
    // Supabase recién dice «sin confirmar» después de validar la clave: no revela que el mail
    // existe a quien no la sabe.
    if (error?.code === "email_not_confirmed") {
      return { estado: "error", sinConfirmar: true, mensaje: t.sinConfirmar, email: crudo };
    }
    if (error?.code === "over_request_rate_limit") return { estado: "error", mensaje: t.muchosIntentos, email: crudo };
    if (error && error.code !== "invalid_credentials") console.error("[auth] signInWithPassword:", error.code ?? error.status, error.message);
    return { estado: "error", mensaje: t.noCoinciden, email: crudo };
  }

  const userId = data.user.id;
  const origen = origenAlta(sitio, texto(fd, "desde") || nextCrudo);
  await asegurarPerfil(userId, email, false, origen);
  const verificado = await verificadoPrevio(userId, email);
  if (verificado) await vincularCompras(supabase);
  ponerPista(await cookies());
  after(() => registrarEvento({ tipo: "login", path: "/login", userId, props: { via: "clave" }, origen }));

  redirect(destinoSeguro(nextCrudo, inicioTrasEntrar(sitio, verificado && esAdminEmail(email)), sitio));
}

// ─── Enlace al mail (entrar sin clave, o confirmar una cuenta pendiente) ─────

async function enlaceAlMail(email: string, next: string, tipoMail: "entrar" | "confirmar", t: Textos): Promise<EstadoForm | null> {
  const perfil = await perfilPorEmail(email);
  if (perfil.error) return { estado: "error", mensaje: t.fallaNuestra, email };
  if (perfil.existe) {
    const r = await mandarEnlaceEntrada(email, tipoMail, next);
    if (!r.ok) return { estado: "error", mensaje: t.fallaNuestra, email };
  } else {
    await mandarSinCuenta(email);
  }
  return null;
}

export async function pedirEnlace(_prev: EstadoForm, fd: FormData): Promise<EstadoForm> {
  const crudo = texto(fd, "email").trim();
  const email = normalizarEmail(crudo);
  const { sitio, t } = await delPedido();
  if (!email) return { estado: "error", errores: { email: t.emailMal }, email: crudo };
  const next = destinoSeguro(texto(fd, "next"), "/cuenta", sitio);
  const tipoMail = texto(fd, "motivo") === "confirmar" ? "confirmar" : "entrar";

  if (!(await limitePorIp("enlace"))) return { estado: "error", mensaje: t.muchosIntentos, email: crudo };
  const enviado: EstadoForm = { estado: "enviado", email: crudo };
  if (!(await limitePorEmail("enlace", email))) return enviado;

  return (await enlaceAlMail(email, next, tipoMail, t)) ?? enviado;
}

export async function reenviarConfirmacion(_prev: EstadoForm, _fd: FormData): Promise<EstadoForm> {
  void _fd;
  const supabase = await clienteServidor();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  if (!email) redirect("/login?next=%2Fcuenta");
  if (!(await limitePorEmail("enlace", email))) return { estado: "enviado", email };
  const r = await mandarEnlaceEntrada(email, "confirmar", "/cuenta");
  return r.ok ? { estado: "enviado", email } : { estado: "error", mensaje: (await delPedido()).t.fallaNuestra };
}

// ─── Recuperar la clave ──────────────────────────────────────────────────────

export async function recuperar(_prev: EstadoForm, fd: FormData): Promise<EstadoForm> {
  const crudo = texto(fd, "email").trim();
  const email = normalizarEmail(crudo);
  const { t } = await delPedido();
  if (!email) return { estado: "error", errores: { email: t.emailMal }, email: crudo };

  if (!(await limitePorIp("recuperar"))) return { estado: "error", mensaje: t.muchosIntentos, email: crudo };
  const enviado: EstadoForm = { estado: "enviado", email: crudo };
  if (!(await limitePorEmail("recuperar", email))) return enviado;

  const { data, error } = await servicio().auth.admin.generateLink({ type: "recovery", email });
  if (error) {
    if (error.code === "user_not_found" || error.status === 404) {
      await mandarSinCuenta(email);
      return enviado;
    }
    console.error("[auth] generateLink recovery:", error.code ?? error.status, error.message);
    return { estado: "error", mensaje: t.fallaNuestra, email: crudo };
  }
  const url = await urlConfirmar(data.properties.hashed_token, "recovery", "/cuenta");
  if (!(await mandarMail("recuperar", email, url))) return { estado: "error", mensaje: t.fallaNuestra, email: crudo };
  return enviado;
}

// ─── Dentro de la cuenta ─────────────────────────────────────────────────────

export async function cambiarClave(_prev: EstadoForm, fd: FormData): Promise<EstadoForm> {
  const clave = texto(fd, "clave");
  const clave2 = texto(fd, "clave2");
  const { t } = await delPedido();
  const errores: EstadoForm["errores"] = {};
  const eClave = errorClave(clave, t);
  if (eClave) errores.clave = eClave;
  else if (clave !== clave2) errores.clave2 = t.noCoincidenClaves;
  if (Object.keys(errores).length) return { estado: "error", errores };

  const supabase = await clienteServidor();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login?next=%2Fcuenta%2Fclave");

  const { error } = await supabase.auth.updateUser({ password: clave });
  if (error) {
    if (error.code === "same_password") return { estado: "error", errores: { clave: t.mismaClave } };
    if (error.code === "weak_password") return { estado: "error", errores: { clave: t.claveDebil } };
    if (error.code === "reauthentication_needed") return { estado: "error", mensaje: t.reautenticar };
    console.error("[auth] updateUser password:", error.code ?? error.status, error.message);
    return { estado: "error", mensaje: t.fallaNuestra };
  }
  redirect("/cuenta?aviso=clave-nueva");
}

export async function guardarPerfil(_prev: EstadoForm, fd: FormData): Promise<EstadoForm> {
  const supabase = await clienteServidor();
  const { data: auth } = await supabase.auth.getUser();
  const usuario = auth.user;
  if (!usuario?.email) redirect("/login?next=%2Fcuenta");
  const email = usuario.email.toLowerCase();
  const { t } = await delPedido();

  const nombre = texto(fd, "nombre").replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 80);
  const perfilCrudo = texto(fd, "perfil");
  const perfil = (PERFILES as readonly string[]).includes(perfilCrudo) ? perfilCrudo : null;
  const novedades = fd.get("novedades") === "si";
  const valores = { nombre, perfil, novedades };

  const actualizar = () =>
    supabase
      .from("ca_perfiles")
      .update({ nombre: nombre || null, perfil, novedades })
      .eq("user_id", usuario.id)
      .select("user_id");

  let r = await actualizar();
  if (!r.error && !r.data?.length && (await asegurarPerfil(usuario.id, email, false))) {
    r = await actualizar();
  }
  if (r.error || !r.data?.length) {
    if (r.error) console.error("[auth] guardarPerfil:", r.error.code, r.error.message);
    return { estado: "error", mensaje: t.perfilError, valores };
  }
  revalidatePath("/cuenta");
  return { estado: "ok", mensaje: t.perfilOk, valores };
}
