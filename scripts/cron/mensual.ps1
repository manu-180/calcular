# ASCII-only a proposito: PS 5.1 sin BOM rompe el parseo con acentos.
# Lo corre la tarea programada "CalcularYa-Mensual" el dia 1 (registrar-tarea.ps1). Deja un worktree
# propio en origin/main limpio y corre scripts/cron/mensual.ts, que refresca precios de horas y la foto
# de rankings, valida y pushea a main solo esos datos. Mismo patron que scripts/soporte/despachar.ps1.

param([switch]$Dry)

$ErrorActionPreference = "Continue"
$REPO  = "C:\MisProyectos\Armagedon\libre_albedrio\calcular-ar"
$WT    = "C:\MisProyectos\Armagedon\calcular-cron-mensual"
$BASE  = Join-Path $env:LOCALAPPDATA "calcularya-cron"
$LOGS  = Join-Path $BASE "logs"
$FLAG  = Join-Path $BASE "corriendo.flag"
New-Item -ItemType Directory -Force $LOGS | Out-Null
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$WLOG  = Join-Path $LOGS "mensual-ps.log"
function L($m) { Add-Content -Path $WLOG -Value ("[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $m) -Encoding UTF8 }

if (Test-Path $FLAG) {
    $viejoPid = Get-Content $FLAG -ErrorAction SilentlyContinue
    if ($viejoPid -and (Get-Process -Id $viejoPid -ErrorAction SilentlyContinue)) { L "ya hay una ronda corriendo (pid $viejoPid)"; exit 0 }
    Remove-Item $FLAG -Force -ErrorAction SilentlyContinue
}
Set-Content -Path $FLAG -Value $PID -Encoding ASCII

$codigo = 1
try {
    if (-not (Test-Path $WT)) {
        git -C $REPO fetch -q origin main
        git -C $REPO worktree add -q --detach $WT origin/main
        L "worktree creado en $WT"
    }
    Set-Location $WT
    # El worktree es exclusivo de la ronda: lo que haya quedado de una corrida anterior se descarta.
    git fetch -q origin main
    if ($LASTEXITCODE -ne 0) { throw "git fetch fallo" }
    git checkout -q --detach -f origin/main
    git clean -fdq
    # La tarea corre una copia fuera del worktree; se refresca sola con lo que haya en main.
    Copy-Item (Join-Path $WT "scripts\cron\mensual.ps1") (Join-Path $BASE "mensual.ps1") -Force -ErrorAction SilentlyContinue
    $lock = (Get-FileHash package-lock.json).Hash
    $lockMarca = Join-Path $BASE "lock.hash"
    if (-not (Test-Path node_modules) -or ((Get-Content $lockMarca -ErrorAction SilentlyContinue) -ne $lock)) {
        L "npm ci"
        npm ci --no-audit --no-fund --loglevel=error | Out-Null
        if ($LASTEXITCODE -ne 0) { throw "npm ci fallo" }
        Set-Content -Path $lockMarca -Value $lock -Encoding ASCII
    }
    $env:CALCULARYA_CRON_LOG = Join-Path $LOGS "mensual-$stamp.log"
    $extra = @()
    if ($Dry) { $extra = @("--dry") }
    L "ronda -> $($env:CALCULARYA_CRON_LOG)"
    npx tsx scripts/cron/mensual.ts @extra | Out-Null
    $codigo = $LASTEXITCODE
    L "mensual.ts termino exit=$codigo"
    Get-ChildItem $LOGS -Filter "mensual-2*" | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-400) } | Remove-Item -Force -ErrorAction SilentlyContinue
} catch {
    L "ERROR: $_"
    $codigo = 1
} finally {
    Remove-Item $FLAG -Force -ErrorAction SilentlyContinue
}
exit $codigo
