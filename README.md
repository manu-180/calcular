# CalculAR

Sitio de calculadoras gratuitas para la Argentina (Línea 2 del portfolio). Next.js 16 + Tailwind 4, deploy en Vercel.

- **Hipótesis de ingreso y kill criteria:** [HIPOTESIS.md](./HIPOTESIS.md)
- **Research que respalda el nicho:** [docs/research/2026-06-11-keyword-research-L2.md](../docs/research/2026-06-11-keyword-research-L2.md)

## Herramientas

| Ruta | Herramienta | Estado |
|---|---|---|
| `/monotributo` | Calculadora de categoría y cuota | ✅ v1 |
| `/monotributo/categorias` | Tabla completa de categorías 2026 | ✅ v1 |
| `/monotributo/recategorizacion` | Guía de recategorización | ✅ v1 |
| aguinaldo, vacaciones, indemnización | — | Roadmap (ver HIPOTESIS.md) |

## Datos

Los valores oficiales viven en `src/data/monotributo.ts` con su vigencia y fuente.
**Actualización semestral obligatoria (febrero y agosto)** desde ARCA — nunca desde blogs.
Próxima: **agosto 2026** (escalas nuevas + ventana de recategorización hasta el 5/8).

## Desarrollo

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # verificación antes de deploy
```

Deploy: `vercel deploy --prod --yes` (proyecto Vercel `calcular-ar`).
