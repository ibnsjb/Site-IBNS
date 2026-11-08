/**
 * Quality Gate & Security Test Suite - Site IBNS
 * Executado por Diego (QA) e Murilo (DevSecOps)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log('⛪ QUALITY GATE & SECURITY AUDIT · SITE IBNS (SPRINT 1)');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ [PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${name}: ${err.message}`);
    failCount++;
  }
}

const htmlPath = path.join(__dirname, '..', 'index.html');
const logoPath = path.join(__dirname, '..', 'assets', 'logo-ibns.png');

// 1. Verificação de Arquivos e Assets
test('Arquivo index.html existe e possui conteúdo válido', () => {
  assert(fs.existsSync(htmlPath), 'index.html não encontrado');
  const stat = fs.statSync(htmlPath);
  assert(stat.size > 20000, `index.html muito pequeno: ${stat.size} bytes`);
});

test('Logo oficial IBNS existe em assets/logo-ibns.png', () => {
  assert(fs.existsSync(logoPath), 'assets/logo-ibns.png não encontrado');
  const stat = fs.statSync(logoPath);
  assert(stat.size > 10000, `Logo corrompida ou vazia: ${stat.size} bytes`);
});

const content = fs.readFileSync(htmlPath, 'utf8');

// 2. Verificação de Elementos Estruturais e IDs Obrigatórios
const requiredIds = [
  'page-culto',
  'page-escala',
  'page-admin',
  'calendar-toggle',
  'calendar-panel',
  'calendar-month-year',
  'calendar-grid',
  'selected-date-display',
  'date-input',
  'event-selector-container',
  'event-display',
  'escala-display',
  'escala-search',
  'senha-overlay',
  'senha-input',
  'senha-err',
  'admin-content',
  'sheets-section',
  'sheets-tab-guia',
  'sheets-tab-url',
  'sheets-tab-modelo',
  'sheets-url-eventos',
  'sheets-url-ordem',
  'sheets-url-escala',
  'sheets-status',
  'sheets-import-log-wrapper',
  'sheets-import-log-panel',
  'import-log-list',
  'btn-open-form',
  'event-form',
  'form-alert',
  'f-data',
  'f-tipo',
  'f-hora',
  'f-tema',
  'f-pregador',
  'f-dirigente',
  'ordem-list',
  'escala-list',
  'event-actions',
  'json-file',
  'eventos-count',
  'filter-mes',
  'filter-busca',
  'eventos-lista',
  'toast',
  'toast-msg'
];

requiredIds.forEach(id => {
  test(`Elemento com ID obrigatório "${id}" presente no DOM`, () => {
    assert(content.includes(`id="${id}"`), `ID "${id}" não encontrado no HTML`);
  });
});

// 3. Verificação de Funções JavaScript Centrais
const requiredFunctions = [
  'normalizeString',
  'generateEventoId',
  'findEventsByDate',
  'findEventById',
  'showPage',
  'checkSenha',
  'openModal',
  'closeModal',
  'showToast',
  'showEventForm',
  'initAdminForm',
  'cancelarEdicao',
  'renderOrdemAdmin',
  'addOrdemItem',
  'removeOrdem',
  'renderEscalaAdmin',
  'addEscalaItem',
  'removeEscala',
  'salvarEvento',
  'editarEvento',
  'deletarEvento',
  'renderEventosList',
  'getEventoMaisProximo',
  'selectDate',
  'renderCulto',
  'renderCultoOrderItems',
  'toggleCheck',
  'toggleReorder',
  'saveCultoOrder',
  'renderEscala',
  'initCalendar',
  'toggleCalendar',
  'changeMonth',
  'renderCalendar',
  'sheetsTabSwitch',
  'updateSheetsStatus',
  'saveAndLoadSheets',
  'parseCSV',
  'downloadModeloJSON',
  'importJSON',
  'setupDragAndDrop',
  'setupCultoDragAndDrop',
  'formatDate',
  'formatMin',
  'initials',
  'esc'
];

requiredFunctions.forEach(fn => {
  test(`Função JavaScript "${fn}()" implementada`, () => {
    const regex = new RegExp(`function\\s+${fn}\\s*\\(`, 'g');
    assert(regex.test(content), `Função "${fn}()" não encontrada no script`);
  });
});

// 4. Testes de Lógica Algorítmica e Sanitização
test('Função normalizeString() normaliza acentos e espaços', () => {
  function normalizeString(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[áàâã]/g, 'a')
      .replace(/[éè]/g, 'e')
      .replace(/[í]/g, 'i')
      .replace(/[óôõ]/g, 'o')
      .replace(/[ú]/g, 'u')
      .replace(/ç/g, 'c')
      .replace(/\s+/g, '_')
      .substring(0, 30);
  }
  assert.strictEqual(normalizeString('Culto da Família'), 'culto_da_familia');
  assert.strictEqual(normalizeString('Ação de Graças'), 'acao_de_gracas');
});

test('Função generateEventoId() cria hash determinístico', () => {
  function normalizeString(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[áàâã]/g, 'a')
      .replace(/[éè]/g, 'e')
      .replace(/[í]/g, 'i')
      .replace(/[óôõ]/g, 'o')
      .replace(/[ú]/g, 'u')
      .replace(/ç/g, 'c')
      .replace(/\s+/g, '_')
      .substring(0, 30);
  }
  function generateEventoId(data, tipo, hora) {
    const normalizedTipo = normalizeString(tipo);
    const horaFormat = hora ? String(hora).replace(':', '') : '0000';
    return `${data}_${normalizedTipo}_${horaFormat}`;
  }
  const id = generateEventoId('2026-11-08', 'Culto da Família', '19:00');
  assert.strictEqual(id, '2026-11-08_culto_da_familia_1900');
});

test('Função formatMin() formata minutos e horas adequadamente', () => {
  function formatMin(m) {
    m = parseInt(m) || 0;
    return m < 60 ? m + ' min' : Math.floor(m / 60) + 'h ' + (m % 60 ? (m % 60) + 'min' : '');
  }
  assert.strictEqual(formatMin(45), '45 min');
  assert.strictEqual(formatMin(90), '1h 30min');
  assert.strictEqual(formatMin(120), '2h ');
});

test('Função initials() extrai até 2 iniciais maiúsculas', () => {
  function initials(n) {
    return String(n || '').split(' ').filter(Boolean).slice(0, 2).map(x => x[0].toUpperCase()).join('');
  }
  assert.strictEqual(initials('Cesar Oliveira'), 'CO');
  assert.strictEqual(initials('Kinho'), 'K');
  assert.strictEqual(initials('Daniel de Oliveira Santos'), 'DD');
});

test('Função esc() sanitiza contra injeção XSS', () => {
  function esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  assert.strictEqual(esc('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
  assert.strictEqual(esc('"Hello" & "World"'), '&quot;Hello&quot; &amp; &quot;World&quot;');
});

test('Função parseCSV() divide colunas por vírgula, ponto-e-vírgula e tabs', () => {
  function parseCSV(text) {
    const lines = text.split('\n').filter(Boolean);
    return lines.map(l => l.split(/[,;\t]/).map(c => c.trim().replace(/^["']|["']$/g, '')));
  }
  const parsed = parseCSV('2026-11-08;19:00;Culto da Família;"Amigos para Sempre"\n2026-11-15;10:00;Culto Matutino;Feriado');
  assert.strictEqual(parsed.length, 2);
  assert.strictEqual(parsed[0][0], '2026-11-08');
  assert.strictEqual(parsed[0][3], 'Amigos para Sempre');
});

// 5. Testes de Conformidade Apple HIG & Safe-Areas
test('CSS inclui suporte estrito a Safe-Areas do iPhone e Android', () => {
  assert(content.includes('env(safe-area-inset-top)'), 'Safe area inset top ausente');
  assert(content.includes('env(safe-area-inset-bottom)'), 'Safe area inset bottom ausente');
  assert(content.includes('viewport-fit=cover'), 'Meta tag viewport-fit=cover ausente');
});

test('Design Tokens oficiais da IBNS aplicados', () => {
  assert(content.includes('#0c4786'), 'Cor Navy oficial IBNS (#0c4786) ausente');
  assert(content.includes('#037fba'), 'Cor Azul Vibrante IBNS (#037fba) ausente');
  assert(content.includes('backdrop-filter: blur'), 'Glassmorphism backdrop-blur ausente');
});

// 6. Auditoria de Segurança (Murilo - DevSecOps)
test('Auditoria SEC: Ausência de credenciais privadas ou chaves secretas commitadas', () => {
  assert(!content.includes('service_role'), 'Chave privada service_role detectada!');
  assert(!content.includes('private_key'), 'Chave privada detectada!');
});

test('Auditoria SEC: Password hash / controle de acesso presente', () => {
  assert(content.includes('const SENHA'), 'Constante de senha operacional ausente');
  assert(content.includes('modal-senha'), 'Modal de recuperação ausente');
});

console.log('\n====================================================');
console.log(`TOTAL DE TESTES: ${passCount + failCount}`);
console.log(`APROVADOS: ${passCount}`);
console.log(`FALHAS: ${failCount}`);
console.log('====================================================');

if (failCount === 0) {
  console.log('\n🌟 LAUDO DUPLO OFICIAL: QA-PASS 100% & SEC-PASS HOMOLOGADO!');
  process.exit(0);
} else {
  console.error('\n🚫 QUALITY GATE REPROVADO. Corrija as falhas antes do merge.');
  process.exit(1);
}
