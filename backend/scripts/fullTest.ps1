Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   PC STATION — Full API Test Suite" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$base = "http://localhost:5000/api"
$pass = 0
$fail = 0

function Test-API {
  param($label, $method, $url, $body, $expectedStatus, $token)
  try {
    $headers = @{ "Content-Type" = "application/json" }
    if ($token) { $headers["Authorization"] = "Bearer $token" }
    $params = @{ Uri=$url; Method=$method; ContentType="application/json" }
    if ($body) { $params["Body"] = ($body | ConvertTo-Json) }
    if ($token) { $params["Headers"] = @{ Authorization = "Bearer $token" } }
    $r = Invoke-WebRequest @params -ErrorAction Stop
    $status = $r.StatusCode
    $ok = $status -eq $expectedStatus
    $icon = if ($ok) { "✅" } else { "❌" }
    Write-Host "$icon  $label → HTTP $status"
    if ($ok) { $script:pass++ } else { $script:fail++ }
    return $r.Content | ConvertFrom-Json
  } catch {
    $status = $_.Exception.Response.StatusCode.value__
    $ok = $status -eq $expectedStatus
    $icon = if ($ok) { "✅" } else { "❌" }
    Write-Host "$icon  $label → HTTP $status"
    if ($ok) { $script:pass++ } else { $script:fail++ }
    try { return $_.ErrorDetails.Message | ConvertFrom-Json } catch { return $null }
  }
}

# ── 1. Health Check ──────────────────────────────────────────
Write-Host "─── Backend Health ──────────────────────" -ForegroundColor Yellow
$health = Test-API "GET /api/health" GET "$base/health" $null 200 $null
Write-Host "    Status: $($health.status)"

# ── 2. Auth: Register ────────────────────────────────────────
Write-Host "`n─── Authentication ──────────────────────" -ForegroundColor Yellow

# Clean up any leftover test user first
$null = Invoke-WebRequest -Uri "$base/health" -ErrorAction SilentlyContinue

$regBody = @{ name="QA Tester"; email="qa_test_auto@pcstation.dev"; password="QaTest@999" }
$regResult = Test-API "POST /api/auth/register" POST "$base/auth/register" $regBody 201 $null
$token = $regResult.token
Write-Host "    User: $($regResult.user.name) | Token: $(if($token){'OK'}else{'MISSING'})"

# ── 3. Auth: Duplicate Register ──────────────────────────────
$dupResult = Test-API "POST /api/auth/register (duplicate → 409)" POST "$base/auth/register" $regBody 409 $null

# ── 4. Auth: Login ───────────────────────────────────────────
$loginBody = @{ email="qa_test_auto@pcstation.dev"; password="QaTest@999" }
$loginResult = Test-API "POST /api/auth/login" POST "$base/auth/login" $loginBody 200 $null
$loginToken = $loginResult.token
Write-Host "    Token via login: $(if($loginToken){'OK'}else{'MISSING'})"

# ── 5. Auth: Wrong password ──────────────────────────────────
$badLogin = @{ email="qa_test_auto@pcstation.dev"; password="WrongPass" }
Test-API "POST /api/auth/login (wrong pw → 401)" POST "$base/auth/login" $badLogin 401 $null | Out-Null

# ── 6. Auth: /me (protected) ─────────────────────────────────
$meResult = Test-API "GET /api/auth/me (with token)" GET "$base/auth/me" $null 200 $loginToken
Write-Host "    Me: $($meResult.user.name) <$($meResult.user.email)>"

# ── 7. Auth: /me (no token → 401) ───────────────────────────
Test-API "GET /api/auth/me (no token → 401)" GET "$base/auth/me" $null 401 $null | Out-Null

# ── 8. Products API ──────────────────────────────────────────
Write-Host "`n─── Products API ────────────────────────" -ForegroundColor Yellow
$products = Test-API "GET /api/products" GET "$base/products" $null 200 $null
Write-Host "    Total products returned: $($products.count)"

$cpus = Test-API "GET /api/products?category=cpu" GET "$base/products?category=cpu" $null 200 $null
Write-Host "    CPUs: $($cpus.count)"

$gpus = Test-API "GET /api/products?category=gpu" GET "$base/products?category=gpu" $null 200 $null
Write-Host "    GPUs: $($gpus.count)"

# ── 9. Builds: Save ──────────────────────────────────────────
Write-Host "`n─── Builds (Cloud Save) ─────────────────" -ForegroundColor Yellow
$buildBody = @{
  name = "QA Test Build"
  totalPrice = 99999
  components = @(
    @{ category="cpu"; productId="cpu-001"; name="AMD Ryzen 9 7950X"; price=45000; specs=@{} }
    @{ category="gpu"; productId="gpu-001"; name="NVIDIA RTX 4090"; price=150000; specs=@{} }
  )
}
$savedBuild = Test-API "POST /api/builds (save build)" POST "$base/builds" $buildBody 201 $loginToken
Write-Host "    Build ID: $($savedBuild.build._id)"
$buildId = $savedBuild.build._id

# ── 10. Builds: Get all ──────────────────────────────────────
$builds = Test-API "GET /api/builds (my builds)" GET "$base/builds" $null 200 $loginToken
Write-Host "    Builds in DB: $($builds.count)"

# ── 11. Builds: Delete ───────────────────────────────────────
if ($buildId) {
  Test-API "DELETE /api/builds/$buildId" DELETE "$base/builds/$buildId" $null 200 $loginToken | Out-Null
}

# ── 12. Cleanup: delete QA user ──────────────────────────────
Write-Host "`n─── Cleanup ─────────────────────────────" -ForegroundColor Yellow
& node scripts/deleteUser.js qa_test_auto@pcstation.dev
Write-Host "    QA test user cleaned up"

# ── Summary ──────────────────────────────────────────────────
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  RESULTS: $pass passed  |  $fail failed" -ForegroundColor $(if($fail -eq 0){"Green"}else{"Red"})
Write-Host "========================================`n" -ForegroundColor Cyan
