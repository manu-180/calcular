# Informe: Catar (`qa`, en-QA) y edición `qa-ar` (ar-QA)

Rama `claude/pais-qa` (base origin/main). Commits locales: ver `git log origin/main..claude/pais-qa`.
**El push falló** (ver Riesgos): todo está commiteado en local, nada subió.

## Resumen

- `qa` (inglés, trato tu, QAR, Asia/Qatar, escala 4, `estado: "interno"`): **20 locales + 40 universales = 60 calculadoras**. 29 datos, 29 tramos verificados, 0 sin verificar. 64 casos.
- `qa-ar` (árabe, trato usted, `ar-QA-u-ca-gregory-nu-latn`, `interno`): traduce las 20 locales (textos y contenido escritos en árabe) + 40 universales = 60.
- Sin IVA en Catar: la universal `vat` se cae sola (pide datos y no hay ajuste). Ninguna otra universal excluida.
- `mundo` declarado en `take-home-pay` (persona qatarí, como `sa` y `kw`): entra en la grilla con tasa efectiva 7,0 % / 7,0 % / 7,0 % (solo el aporte GRSIA; el tope de 100.000 QAR no se alcanza en la grilla).

## Calculadoras locales

| slug | concepto | publicable | por qué |
|---|---|---|---|
| take-home-pay | sueldo-neto | sí | Ley 1/2022 art. 11-12 (7 %, topes); Ley 24/2018 art. 2 de la ley de emisión excluye sueldos del impuesto |
| grsia-contribution-calculator | aportes-seguridad-social | sí | Ley 1/2022 art. 11-12, vigente 3/1/2023 (Gaceta) |
| employer-cost-calculator | costo-empleador | sí | 14 % GRSIA o provisión de gratificación (art. 54) |
| gratuity-calculator | indemnizacion-despido | sí | Ley del Trabajo art. 54 (3 semanas por año, básico) |
| annual-leave | vacaciones | sí | art. 79-81 (3 o 4 semanas) |
| notice-period | preaviso | sí | art. 49 reformado (1 mes hasta 2 años, 2 meses después) |
| overtime-calculator | horas-extra | sí | art. 73-74 (+25 %, +50 % de 21 a 3 h) |
| final-settlement | liquidacion-final | sí | art. 49, 54, 61, 81 |
| sick-leave-pay | propio | sí | art. 82 (2 semanas completas, 4 a medio sueldo) |
| maternity-leave-pay | propio | sí | art. 96 (50 días con un año de servicio) |
| minimum-wage | salario-minimo | sí | Decisión Ministerial 25/2020 (1.000 + 500 + 300, desde 20/3/2021) |
| pension-calculator | jubilacion | sí | Ley 1/2022 art. 24, 29, 34, 36 |
| ramadan-working-hours | propio | sí | art. 73 (6 h/día, 36 h/semana) |
| domestic-worker-gratuity | trabajo-domestico | sí | Ley 15/2017 art. 15 (3 semanas por año) |
| excise-tax-calculator | propio | sí | GTA: tabaco, energéticas y especiales 100 % |
| sugar-tax-calculator | propio | sí | GTA: bebidas azucaradas por litro desde 6/7/2026 (0,77 y 1,06 QAR) |
| corporate-tax-calculator | propio | sí | Ley 24/2018 art. 9 (10 %) y art. 4 inc. 14 (parte qatarí exenta) |
| withholding-tax-calculator | propio | sí | Ley 24/2018 art. 9(2), 5 %; plazo del día 16 (GTA) |
| property-registration-fee | propio | sí | Decisión MJ 5/2026, tabla 2 (0,25 %, 500 QAR, 0,25 ‰ hipoteca), desde 16/1/2026 |
| qar-usd-converter | tipo-de-cambio | sí | Decreto 34/2001 (3,64 QAR por USD) |

Ninguna en borrador.

## Datos

Todos `verificado`, `verificadoEl: 2026-10-26`, leídos en fuente primaria https:

- **Al Meezan (portal legal del Ministerio de Justicia)**, texto consolidado vía su API pública: Ley del Trabajo 14/2004 (con la reforma 9/2026), Decisión 25/2020 de salario mínimo, Ley 1/2022 de seguros sociales, Ley 15/2017 de trabajo doméstico, Decreto 34/2001 de paridad.
- **Gaceta Oficial (PDF en files.almeezan.gov.qa)**: fecha de vigencia de la Ley 1/2022 (art. 4: seis meses después de publicarse, o sea 3/1/2023), art. 2 de la Ley 24/2018 (sueldos fuera del impuesto a la renta) y tabla 2 de la Decisión MJ 5/2026. Escaneados: los leí como imagen.
- **GTA** (gta.gov.qa/en/taxes-info): 10 %, retención 5 %, impuesto selectivo y su escala por azúcar.

No verificados: ninguno. Lo que no pude leer en fuente oficial quedó afuera, sin calculadora:
- Tarifas de Kahramaa (luz y agua): la página carga las tarifas por JS y no las expone.
- IPC (inflación): psa.gov.qa no responde (timeout).
- mol.gov.qa rechaza la conexión y hukoomi.gov.qa devuelve 403: por eso todo lo laboral sale del texto legal.

## Detectores (`fuentes.ts`) y prueba

Seis detectores de norma; script `scripts/paises/qa/probar_detectores.ts`:

- `qa.almeezan-labour-law`, `-minimum-wage`, `-social-insurance`, `-taxes`, `-property-fees`: buscador JSON de Al Meezan, filtrado desde la fecha de verificación y por título.
- `qa.gta-excise-page`: HTML de la GTA; avisa si cambian las cadenas de las tasas.

Prueba real: con la fecha de hoy los seis devuelven `[]`. Con la fecha corrida hacia atrás (cambio temporal, ya revertido) encuentran normas verdaderas: Ley 9/2026 de reforma laboral, Ley 2/2026 de impuesto selectivo, Decisión de Gabinete 3/2025 (reglamento de seguros sociales), Decisión de Gabinete 21/2024 (comité del salario mínimo) y Decisión MJ 5/2026.

## Checks (corridos, con `qa` y `qa-ar` registrados en local; `index.ts` sin commitear)

- `npx tsc --noEmit`: OK (salida 0).
- `check_paises qa`: ✅ 29 datos, 60 calculadoras. `check_paises qa-ar`: ✅ 60 calculadoras, 1 aviso.
- `check_paises_casos qa`: 64 casos en 20 archivos OK. `qa-ar`: 64 casos corridos con la edición, OK.
- `check_textos_paises qa`: 825 textos, 0 avisos. `qa-ar`: 618 textos, 0 avisos.
- `check_eol`: OK.
- `check_motor`: 3855 pruebas OK.
- `check_mundo` (con `qa` pasado a `publicado` solo para la prueba, ya revertido): QA entra, declarado. TODO OK.
- `check_fronteras`: **1 falla que no es mía**: `src/motor/compartir/AlCelu.tsx` importa `uqr` (viene de main, commit 53e3b2f9). Mis carpetas no tienen fallas.
- `next dev` (puerto 3102, apagado al terminar): `/qa`, `/qa/take-home-pay`, `/qa/loan`, `/qa/sugar-tax-calculator` y `/qa-ar/gratuity-calculator` dan 200 con su título y los marcadores resueltos. Hizo falta `--webpack` (Turbopack rechaza el `node_modules` en junction) y `NEXT_PUBLIC_SITIO_INTL_URL=http://calcularya.localhost:3102`.

## Riesgos y dudas para el coordinador

1. **Push bloqueado**: `git push` da 403. La cuenta activa de gh es `developers-insights`, sin permiso en `manu-180/calcular`, y el token de `manu-180` está vencido. Hay que reautenticar y correr `git push -u origin claude/pais-qa`.
2. **Conversión de mensual a semanal o diario**: la ley fija gratificación, vacaciones y licencias en semanas o días, pero no dice cómo convertir el sueldo. Se le pregunta a la persona (÷30×7 o ×12÷52; ÷30 o ×12÷365). En horas extra el divisor es ×12÷52÷jornada, y la provisión del costo empleador usa ×12÷52. Los dos están explicados en los textos.
3. **Preaviso**: los días se cuentan a 30 por mes. Con exactamente 2 años corresponde 1 mes («durante el primer y segundo año»).
4. **Recargo por día de descanso** (art. 75): el texto árabe dice «زيادة تعادل 150%». Va en una FAQ con la redacción literal y no se calcula.
5. **Pensión**: supone que todos los años aportados son de servicio efectivo y pide la edad en años enteros (el art. 35 redondea fracciones). La reducción del 2,5 % por año usa como referencia 60 años (hombres) y 55 (mujeres), según el art. 36.
6. **`mundo`**: se eligió la persona qatarí, como en `sa` y `kw`. Para un expatriado el neto es igual al bruto. Si el coordinador prefiere el caso del expatriado, se cambia `entrada.qatari` a `false`.
7. Los ciudadanos del CCG que trabajan en Catar tienen un régimen de extensión propio (Ley 4/2007). No se calcula; solo se menciona.
8. Las URL `https://almeezan.qa/legislations/<id>` llevan a una SPA: resuelven en el navegador, pero un curl recibe la carcasa. El dato viene de `api.moj.gov.qa`.
