# ASCII-only a proposito: PS 5.1 sin BOM rompe el parseo con acentos.
# Lo corre la tarea programada "CalculAR-Soporte" cada 5 min. Sincroniza el buzon y, solo si hay
# hilos pendientes, lanza claude con scripts/soporte/AGENTE.md en un worktree propio (HEAD suelto
# en origin/main). Sin pendientes no gasta un token.

param([int]$TimeoutMin = 50)

$ErrorActionPreference = "Continue"
$REPO  = "C:\MisProyectos\Armagedon\libre_albedrio\calcular-ar"
$WT    = "C:\MisProyectos\Armagedon\calcular-soporte-agente"
$BASE  = Join-Path $env:LOCALAPPDATA "calcular-soporte"
$LOGS  = Join-Path $BASE "logs"
$FLAG  = Join-Path $BASE "corriendo.flag"
New-Item -ItemType Directory -Force $LOGS | Out-Null
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$WLOG  = Join-Path $LOGS "despachar.log"
function L($m) { Add-Content -Path $WLOG -Value ("[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $m) -Encoding UTF8 }

if (Test-Path $FLAG) {
    $viejoPid = Get-Content $FLAG -ErrorAction SilentlyContinue
    if ($viejoPid -and (Get-Process -Id $viejoPid -ErrorAction SilentlyContinue)) { exit 0 }
    Remove-Item $FLAG -Force -ErrorAction SilentlyContinue
}
Set-Content -Path $FLAG -Value $PID -Encoding ASCII

try {
    if (-not (Test-Path $WT)) {
        git -C $REPO fetch -q origin main
        git -C $REPO worktree add -q --detach $WT origin/main
        L "worktree creado en $WT"
    }
    Set-Location $WT
    # El worktree es exclusivo del agente: si un tick anterior quedo a mitad, se descarta.
    git fetch -q origin main
    git checkout -q --detach -f origin/main
    git clean -fdq
    # La tarea corre una copia fuera del worktree; se refresca sola con lo que haya en main.
    Copy-Item (Join-Path $WT "scripts\soporte\despachar.ps1") (Join-Path $BASE "despachar.ps1") -Force -ErrorAction SilentlyContinue
    $lock = (Get-FileHash package-lock.json).Hash
    $lockMarca = Join-Path $BASE "lock.hash"
    if (-not (Test-Path node_modules) -or ((Get-Content $lockMarca -ErrorAction SilentlyContinue) -ne $lock)) {
        L "npm ci"
        npm ci --no-audit --no-fund --loglevel=error | Out-Null
        Set-Content -Path $lockMarca -Value $lock -Encoding ASCII
    }

    # PowerShell se come un -- suelto: envkit recibiria "run npx" y fallaria con su ayuda.
    envkit run '--' npx tsx scripts/soporte/soporte.ts sincronizar 2>&1 | Out-Null
    $pend = (envkit run '--' npx tsx scripts/soporte/soporte.ts pendientes 2>$null) -join "`n"
    if ($LASTEXITCODE -ne 0) { L "pendientes fallo: $pend"; exit 1 }
    if ($pend.Trim() -eq "[]") { exit 0 }

    $CANDIDATOS = @("$env:USERPROFILE\.local\bin\claude.exe", "$env:APPDATA\npm\claude.cmd") | Where-Object { Test-Path $_ }
    $CLAUDE = $null; $VER = $null
    foreach ($c in $CANDIDATOS) {
        $s = & $c --version 2>$null
        if ("$s" -match '(\d+)\.(\d+)\.(\d+)') {
            $v = [version]("{0}.{1}.{2}" -f $Matches[1], $Matches[2], $Matches[3])
            if ($null -eq $VER -or $v -gt $VER) { $VER = $v; $CLAUDE = $c }
        }
    }
    if (-not $CLAUDE) { L "claude no encontrado"; exit 1 }

    Remove-Item Env:\CLAUDECODE -ErrorAction SilentlyContinue
    Remove-Item Env:\CLAUDE_CODE_ENTRYPOINT -ErrorAction SilentlyContinue
    $LOG = Join-Path $LOGS "agente-$stamp.log"
    L "pendientes -> lanzando claude $VER (log $LOG)"
    $proc = Start-Process -FilePath $CLAUDE `
        -ArgumentList '--dangerously-skip-permissions', '--model', 'opus', '-p' `
        -RedirectStandardInput (Join-Path $WT "scripts\soporte\AGENTE.md") `
        -RedirectStandardOutput $LOG -RedirectStandardError "$LOG.err" `
        -WorkingDirectory $WT -NoNewWindow -PassThru
    try { $null = $proc.Handle } catch { }
    if (-not $proc.WaitForExit($TimeoutMin * 60 * 1000)) {
        L "timeout de $TimeoutMin min, se corta pid $($proc.Id)"
        Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
    } else {
        L "claude termino exit=$($proc.ExitCode)"
    }
    Get-ChildItem $LOGS -Filter "agente-*" | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) } | Remove-Item -Force -ErrorAction SilentlyContinue
} catch {
    L "ERROR: $_"
} finally {
    Remove-Item $FLAG -Force -ErrorAction SilentlyContinue
}
