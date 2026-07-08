/**
 * PC Station - Full API Test Suite
 * Run: node scripts/fullTest.mjs
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

const BASE = 'http://localhost:5000/api';
let pass = 0, fail = 0, token = '', loginToken = '', buildId = '';

function log(ok, label, extra = '') {
  const icon = ok ? 'PASS' : 'FAIL';
  console.log(`  [${icon}] ${label}${extra ? '  →  ' + extra : ''}`);
  ok ? pass++ : fail++;
}

async function req(method, path, body, authToken) {
  const headers = { 'Content-Type': 'application/json' };
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  try {
    const r = await fetch(`${BASE}${path}`, opts);
    const data = await r.json().catch(() => ({}));
    return { status: r.status, data };
  } catch (e) {
    return { status: 0, data: {}, error: e.message };
  }
}

async function runTests() {
  console.log('\n================================================');
  console.log('       PC STATION - Full API Test Suite         ');
  console.log('================================================\n');

  // ── 1. Health ─────────────────────────────────────────────
  console.log('--- Backend Health ---');
  const h = await req('GET', '/health');
  log(h.status === 200, 'GET /api/health', `status=${h.data.status}`);

  // ── 2. Products ───────────────────────────────────────────
  console.log('\n--- Products API ---');
  const allP = await req('GET', '/products');
  log(allP.status === 200, 'GET /api/products', `count=${allP.data.count ?? allP.data.length}`);

  const cpuP = await req('GET', '/products/cpu');
  log(cpuP.status === 200, 'GET /api/products/cpu (path param)', `count=${cpuP.data.count}`);

  const gpuP = await req('GET', '/products/gpu');
  log(gpuP.status === 200, 'GET /api/products/gpu (path param)', `count=${gpuP.data.count}`);

  const ramP = await req('GET', '/products/ram');
  log(ramP.status === 200, 'GET /api/products/ram (path param)', `count=${ramP.data.count}`);

  const badCat = await req('GET', '/products/invalid_category');
  log(badCat.status === 400, 'GET /api/products/invalid_category (-> 400)', badCat.data.message?.slice(0,40));

  // ── 3. Register ───────────────────────────────────────────
  console.log('\n--- Authentication ---');
  const reg = await req('POST', '/auth/register', {
    name: 'QA Tester', email: 'qa_auto@pcstation.dev', password: 'QaTest@999'
  });
  log(reg.status === 201, 'POST /api/auth/register (new user)', `token=${reg.data.token ? 'received' : 'MISSING'}`);
  token = reg.data.token || '';

  // ── 4. Duplicate register ─────────────────────────────────
  const dup = await req('POST', '/auth/register', {
    name: 'QA Tester', email: 'qa_auto@pcstation.dev', password: 'QaTest@999'
  });
  log(dup.status === 409, 'POST /api/auth/register (duplicate -> 409)', dup.data.message);

  // ── 5. Invalid register (short password) ──────────────────
  const badReg = await req('POST', '/auth/register', {
    name: 'X', email: 'bad@x.com', password: '123'
  });
  log(badReg.status === 400, 'POST /api/auth/register (validation -> 400)', badReg.data.message);

  // ── 6. Login ──────────────────────────────────────────────
  const login = await req('POST', '/auth/login', {
    email: 'qa_auto@pcstation.dev', password: 'QaTest@999'
  });
  log(login.status === 200, 'POST /api/auth/login (correct credentials)', `token=${login.data.token ? 'received' : 'MISSING'}`);
  loginToken = login.data.token || '';

  // ── 7. Wrong password ─────────────────────────────────────
  const badLogin = await req('POST', '/auth/login', {
    email: 'qa_auto@pcstation.dev', password: 'WrongPass123'
  });
  log(badLogin.status === 401, 'POST /api/auth/login (wrong password -> 401)', badLogin.data.message);

  // ── 8. Get me (authenticated) ─────────────────────────────
  const me = await req('GET', '/auth/me', null, loginToken);
  log(me.status === 200, 'GET /api/auth/me (with token)', `name="${me.data.user?.name}"`);

  // ── 9. Get me (unauthenticated) ───────────────────────────
  const meNoAuth = await req('GET', '/auth/me');
  log(meNoAuth.status === 401, 'GET /api/auth/me (no token -> 401)');

  // ── 10. Save build ────────────────────────────────────────
  console.log('\n--- Builds (Cloud Save) ---');
  const savedBuild = await req('POST', '/builds', {
    name: 'QA Test Build',
    totalPrice: 184786,
    selections: {
      cpu: { id: 'cpu-001', name: 'AMD Ryzen 9 7950X', price: 45000, specs: { cores: 16, tdp: 170 } },
      gpu: { id: 'gpu-001', name: 'NVIDIA RTX 4090', price: 150000, specs: { vram: '24 GB GDDR6X', tdp: 450 } },
      motherboard: null, ram: null, storage: null, pccase: null, psu: null,
    },
  }, loginToken);
  log(savedBuild.status === 201, 'POST /api/builds (save build)', `id=${savedBuild.data.build?._id}`);
  buildId = savedBuild.data.build?._id || '';

  // ── 11. Get builds ────────────────────────────────────────
  const getBuilds = await req('GET', '/builds', null, loginToken);
  log(getBuilds.status === 200, 'GET /api/builds (my builds)', `count=${getBuilds.data.builds?.length ?? getBuilds.data.count ?? 0}`);

  // ── 12. Save build without auth ───────────────────────────
  const noAuthBuild = await req('POST', '/builds', { name: 'Test', totalPrice: 0, components: [] });
  log(noAuthBuild.status === 401, 'POST /api/builds (no token -> 401)');

  // ── 13. Delete build ──────────────────────────────────────
  if (buildId) {
    const del = await req('DELETE', `/builds/${buildId}`, null, loginToken);
    log(del.status === 200, `DELETE /api/builds/:id (delete build)`, del.data.message);
  }

  // ── 14. Cleanup ───────────────────────────────────────────
  console.log('\n--- Cleanup ---');
  const { default: mongoose } = await import('mongoose');
  const { default: User } = await import('../models/User.js');
  await mongoose.connect(process.env.MONGO_URI);
  const del = await User.deleteOne({ email: 'qa_auto@pcstation.dev' });
  log(del.deletedCount === 1, 'Cleanup: delete QA test user from MongoDB');
  await mongoose.disconnect();

  // ── Summary ───────────────────────────────────────────────
  console.log('\n================================================');
  const allOk = fail === 0;
  console.log(`  RESULTS: ${pass} passed  |  ${fail} failed`);
  console.log(allOk ? '  STATUS: ALL TESTS PASSED' : '  STATUS: SOME TESTS FAILED');
  console.log('================================================\n');
}

runTests().catch(e => { console.error('Test runner error:', e); process.exit(1); });
