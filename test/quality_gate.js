/**
 * Quality Gate & Security Test Suite - Site IBNS (Sprint 2)
 * Executado por Diego (QA) e Murilo (DevSecOps)
 * Cobertura de Templates Litúrgicos, Integração Holyrics, JSON Enriquecido e Visão da Equipe
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

console.log('====================================================');
console.log('⛪ QUALITY GATE & SECURITY AUDIT · SITE IBNS (SPRINT 2)');
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

// ========================================================
// 1. Verificação de Arquivos e Assets
// ========================================================
test('Arquivo index.html existe e possui integridade estrutural', () => {
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

// ========================================================
// 2. Elementos Estruturais e IDs Obrigatórios do DOM (Sprint 2)
// ========================================================
const requiredIds = [
  // Navegação e Telas
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

  // Autenticação e Segurança
  'senha-overlay',
  'senha-input',
  'senha-err',
  'admin-content',
  'modal-senha',

  // Integração Litúrgica & Holyrics (Sprint 2)
  'integracao-section',
  'integracao-tab-json',
  'integracao-tab-holyrics',
  'integracao-tab-backup',
  'tab-btn-json',
  'tab-btn-holyrics',
  'tab-btn-backup',
  'json-import-input',
  'btn-importar-json',
  'json-file-input',
  'json-import-log',
  'holyrics-api-key',
  'holyrics-token',
  'btn-testar-holyrics',
  'btn-sync-holyrics-repertorio',
  'holyrics-status-card',
  'holyrics-status-indicator',
  'holyrics-status-msg',
  'holyrics-live-preview',
  'holyrics-live-widget',
  'holyrics-live-text',

  // Formulário do Evento & Templates
  'btn-open-form',
  'event-form',
  'form-alert',
  'f-data',
  'f-hora',
  'f-template',
  'f-tipo',
  'f-tema',
  'f-serie',
  'f-pregador',
  'ordem-list',
  'ordem-total-min',
  'escala-list',
  'event-actions',

  // Ordem de Culto & Visão da Equipe
  'btn-visao-equipe',
  'badge-visao-equipe',
  'culto-ordem-container',

  // Listagem e Notificações
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

// ========================================================
// 3. Funções JavaScript Centrais (Sprint 1 + Sprint 2)
// ========================================================
const requiredFunctions = [
  // Utilitários de String e Formatação
  'normalizeString',
  'generateEventoId',
  'findEventsByDate',
  'findEventById',
  'formatDate',
  'formatMin',
  'initials',
  'esc',

  // Navegação e Painel Admin
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

  // Culto, Ordem e Visão da Equipe (Sprint 2)
  'renderCulto',
  'renderCultoOrderItems',
  'toggleCheck',
  'toggleReorder',
  'saveCultoOrder',
  'toggleVisaoEquipe',

  // Escala e Calendário
  'renderEscala',
  'initCalendar',
  'toggleCalendar',
  'changeMonth',
  'renderCalendar',

  // Templates Litúrgicos & Horários (Sprint 2)
  'getTipoIcon',
  'calcularHorarios',
  'recalcularHorariosAdmin',
  'sugerirTemplatePorData',
  'aplicarTemplateSelecionado',

  // Integração JSON & Holyrics (Sprint 2)
  'integracaoTabSwitch',
  'importarJSONPlanejamento',
  'carregarArquivoJSON',
  'preencherExemploJSON',
  'baixarTemplateCultoJSON',
  'getHolyricsConfig',
  'holyricsRequest',
  'testarConexaoHolyrics',
  'sincronizarRepertorioHolyrics',
  'atualizarHolyricsAoVivo',

  // Drag and Drop (Desktop + Mobile Touch)
  'setupDragAndDrop',
  'setupCultoDragAndDrop'
];

requiredFunctions.forEach(fn => {
  test(`Função JavaScript "${fn}()" implementada`, () => {
    const regex = new RegExp(`function\\s+${fn}\\s*\\(`, 'g');
    assert(regex.test(content), `Função "${fn}()" não encontrada no script`);
  });
});

// ========================================================
// 4. Execução e Validação Algorítmica via Node VM
// ========================================================
const scriptMatch = content.match(/<script>\s*(\/\/ ======== TEMPLATES LITÚRGICOS[\s\S]*?)<\/script>/);
assert(scriptMatch, 'Script principal não encontrado');
const jsCode = scriptMatch[1];

const vmContext = {
  window: {
    eventos: [],
    checklist: {},
    fbSaveEventos: () => {},
    fbSaveChecklist: () => {}
  },
  document: {
    addEventListener: () => {},
    querySelectorAll: () => [],
    getElementById: (id) => ({
      value: '',
      textContent: '',
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      dataset: {}
    })
  },
  localStorage: {
    store: {},
    getItem(k) { return this.store[k] || null; },
    setItem(k, v) { this.store[k] = String(v); }
  },
  fetch: () => Promise.resolve(),
  setInterval: () => 1,
  setTimeout: () => 1,
  clearTimeout: () => {},
  console: console
};
vm.createContext(vmContext);
vm.runInContext(jsCode, vmContext);

// 4.1 Testes dos Templates Oficiais IBNS
test('Templates oficiais IBNS definidos no escopo global', () => {
  assert(vmContext.window.IBNS_TEMPLATES, 'IBNS_TEMPLATES não exportado em window');
});

test('Template "Culto Regular" possui exatamente 11 momentos litúrgicos canônicos', () => {
  const t = vmContext.window.IBNS_TEMPLATES.culto_regular;
  assert.strictEqual(t.itens.length, 11);
  assert.strictEqual(t.itens[0].etapa, 'Música 1 (Entrada)');
  assert.strictEqual(t.itens[1].etapa, 'Boas-vindas, Leitura Bíblica e Oração');
  assert.strictEqual(t.itens[2].etapa, 'Louvor 1');
  assert.strictEqual(t.itens[3].etapa, 'Louvor 2 — Dízimos e Ofertas');
  assert.strictEqual(t.itens[4].etapa, 'Louvor 3');
  assert.strictEqual(t.itens[5].etapa, 'Oração de Transição');
  assert.strictEqual(t.itens[6].etapa, 'Mensagem');
  assert.strictEqual(t.itens[7].etapa, 'Avisos');
  assert.strictEqual(t.itens[8].etapa, 'Louvor Final');
  assert.strictEqual(t.itens[9].etapa, 'Bênção Apostólica');
  assert.strictEqual(t.itens[10].etapa, 'Encerramento');
});

test('Template "Santa Ceia (1º Domingo)" possui 12 momentos incluindo Momento de Santa Ceia', () => {
  const t = vmContext.window.IBNS_TEMPLATES.santa_ceia;
  assert.strictEqual(t.itens.length, 12);
  const ceia = t.itens.find(x => x.tipo === 'ceia');
  assert(ceia, 'Item de Santa Ceia não encontrado');
  assert.strictEqual(ceia.min, 10);
});

test('Template "Sião Kids (4º Domingo)" possui 12 momentos incluindo Sião Kids', () => {
  const t = vmContext.window.IBNS_TEMPLATES.siao_kids;
  assert.strictEqual(t.itens.length, 12);
  const kids = t.itens.find(x => x.tipo === 'especial');
  assert(kids, 'Item de Sião Kids não encontrado');
  assert.strictEqual(kids.min, 10);
});

test('Template "Mini Vigília" possui estrutura própria para vigílias (15 etapas)', () => {
  const t = vmContext.window.IBNS_TEMPLATES.mini_vigilia;
  assert.strictEqual(t.itens.length, 15);
  assert.strictEqual(t.hora_padrao, '19:30');
});

// 4.2 Testes do Motor de Cálculo de Horários
test('Função calcularHorarios() calcula horários sequenciais corretamente a partir das 10:00', () => {
  const itens = [
    { etapa: 'A', min: 5 },
    { etapa: 'B', min: 7 },
    { etapa: 'C', min: 40 }
  ];
  const res = vmContext.calcularHorarios('10:00', itens);
  assert.strictEqual(res[0].hora, '10:00');
  assert.strictEqual(res[1].hora, '10:05');
  assert.strictEqual(res[2].hora, '10:12');
});

test('Função calcularHorarios() trata overflow de minutos e virada de hora', () => {
  const itens = [
    { etapa: 'A', min: 45 },
    { etapa: 'B', min: 20 }
  ];
  const res = vmContext.calcularHorarios('10:30', itens);
  assert.strictEqual(res[0].hora, '10:30');
  assert.strictEqual(res[1].hora, '11:15');
});

test('Função calcularHorarios() possui fallback seguro para hora vazia ou inválida', () => {
  const res = vmContext.calcularHorarios(null, [{ etapa: 'A', min: 5 }]);
  assert.strictEqual(res[0].hora, '10:00');
});

// 4.3 Testes dos Ícones Litúrgicos
test('Função getTipoIcon() mapeia ícones corretos por tipo litúrgico', () => {
  assert.strictEqual(vmContext.getTipoIcon('musica'), '🎵');
  assert.strictEqual(vmContext.getTipoIcon('liturgia'), '📖');
  assert.strictEqual(vmContext.getTipoIcon('oracao'), '🙏');
  assert.strictEqual(vmContext.getTipoIcon('mensagem'), '🎤');
  assert.strictEqual(vmContext.getTipoIcon('ceia'), '🍞');
  assert.strictEqual(vmContext.getTipoIcon('especial'), '⭐');
  assert.strictEqual(vmContext.getTipoIcon('aviso'), '📢');
  assert.strictEqual(vmContext.getTipoIcon('bencao'), '✝️');
  assert.strictEqual(vmContext.getTipoIcon('encerramento'), '🏁');
});

// 4.4 Testes de Sugestão de Template por Data
test('Função sugerirTemplatePorData() sugere Santa Ceia para 1º domingo do mês', () => {
  const elements = {};
  vmContext.document.getElementById = (id) => {
    if (!elements[id]) elements[id] = { value: '' };
    return elements[id];
  };
  vmContext.sugerirTemplatePorData('2026-11-01'); // 1º domingo de novembro
  assert.strictEqual(elements['f-template'].value, 'santa_ceia');
  assert.strictEqual(elements['f-hora'].value, '10:00');
});

test('Função sugerirTemplatePorData() sugere Sião Kids para 4º domingo do mês', () => {
  const elements = {};
  vmContext.document.getElementById = (id) => {
    if (!elements[id]) elements[id] = { value: '' };
    return elements[id];
  };
  vmContext.sugerirTemplatePorData('2026-11-22'); // 4º domingo de novembro
  assert.strictEqual(elements['f-template'].value, 'siao_kids');
  assert.strictEqual(elements['f-hora'].value, '10:00');
});

// 4.5 Testes de Configuração e Relay do Holyrics
test('Função getHolyricsConfig() carrega credenciais do plano Advanced', () => {
  const cfg = vmContext.getHolyricsConfig();
  assert(cfg.apiKey, 'apiKey não configurada');
  assert(cfg.token, 'token não configurado');
  assert.strictEqual(cfg.apiKey, 'HXHSJKJuL5hDxHoxCYOnuUmtW1sqSLONOPWFDaaj6nbJqJPfAcIN8Q3KMRgiu8Lc');
  assert.strictEqual(cfg.token, '92UDttLU8196OFX5');
});

test('Função holyricsRequest() envia headers api_key e token conforme doc oficial Holyrics', async () => {
  let calledUrl = '';
  let calledHeaders = {};
  vmContext.fetch = (url, opts) => {
    calledUrl = url;
    calledHeaders = opts.headers;
    return Promise.resolve({
      json: () => Promise.resolve({ status: 'ok', response_status: 'ok', response: { status: 'ok', data: { text: 'Santo, Santo' } } })
    });
  };
  const res = await vmContext.holyricsRequest('GetCPInfo');
  assert(calledUrl.includes('GetCPInfo'), 'URL Holyrics não contém a ação GetCPInfo');
  assert.strictEqual(calledHeaders['api_key'], 'HXHSJKJuL5hDxHoxCYOnuUmtW1sqSLONOPWFDaaj6nbJqJPfAcIN8Q3KMRgiu8Lc');
  assert.strictEqual(calledHeaders['token'], '92UDttLU8196OFX5');
  assert.strictEqual(calledHeaders['Content-Type'], 'application/json');
  assert.strictEqual(res.status, 'ok');
  assert.strictEqual(res.ok, true);
});

test('Rótulo do progresso litúrgico alterado para "Progresso do Culto" conforme item 4', () => {
  assert(content.includes('Progresso do Culto'), '"Progresso do Culto" não encontrado no index.html');
  assert(!content.includes('Progresso Litúrgico'), '"Progresso Litúrgico" legado ainda presente no index.html');
});

test('Remoção do badge geográfico "São Bernardo" no topo conforme item 3', () => {
  assert(!content.includes('São Bernardo'), 'Elemento "São Bernardo" ainda presente no index.html');
});

test('Painel Admin: Overlay de autenticação posicionado no topo da tela conforme item 1', () => {
  assert(content.includes('justify-start pt-8'), 'Overlay de senha não está alinhado ao topo com justify-start');
  assert(content.includes('sticky top-20') || content.includes('sticky top-24'), 'Container de senha não possui posicionamento sticky no topo');
});

test('Brand 2026: Nova Logo oficial IBNS presente em assets e embutida no header', () => {
  assert(fs.existsSync(path.join(__dirname, '..', 'assets', 'logo-ibns.png')), 'logo-ibns.png ausente');
  assert(fs.existsSync(path.join(__dirname, '..', 'assets', 'logo-ibns-branco.svg')), 'logo-ibns-branco.svg ausente');
  assert(fs.existsSync(path.join(__dirname, '..', 'assets', 'logo-ibns-preto.svg')), 'logo-ibns-preto.svg ausente');
  const pngStat = fs.statSync(path.join(__dirname, '..', 'assets', 'logo-ibns.png'));
  assert(pngStat.size > 50000, `Nova logo PNG deve ser de alta resolução (>50KB): ${pngStat.size} bytes`);
});

// 4.6 Teste de Importação de JSON Enriquecido com Músicas e Tom
test('Função importarJSONPlanejamento() processa JSON com repertório e calcula horários', () => {
  const mockJson = {
    data: '2026-11-15',
    hora: '10:00',
    tipo: 'Culto da Família',
    tema: 'Amigos para Sempre',
    ordem: [
      { etapa: 'Música 1 (Entrada)', min: 5, tipo: 'musica', musica: { titulo: 'Teu Amor Não Falha', tom: 'Am', bpm: 114, youtube: 'https://youtu.be/xxx' } },
      { etapa: 'Boas-vindas', min: 5, tipo: 'liturgia' },
      { etapa: 'Mensagem', min: 40, tipo: 'mensagem' }
    ]
  };

  vmContext.document.getElementById = (id) => {
    if (id === 'json-import-input') return { value: JSON.stringify(mockJson) };
    return { classList: { remove: () => {}, add: () => {} }, innerHTML: '' };
  };

  vmContext.importarJSONPlanejamento();
  const ev = vmContext.window.eventos.find(x => x.data === '2026-11-15');
  assert(ev, 'Evento não importado');
  assert.strictEqual(ev.ordem.length, 3);
  assert.strictEqual(ev.ordem[0].hora, '10:00');
  assert.strictEqual(ev.ordem[1].hora, '10:05');
  assert.strictEqual(ev.ordem[2].hora, '10:10');
  assert.strictEqual(ev.ordem[0].musica.tom, 'Am');
  assert.strictEqual(ev.ordem[0].musica.bpm, 114);
});

// 4.7 Teste do Toggle de Visão da Equipe
test('Função toggleVisaoEquipe() alterna o estado booleano da visão da equipe', () => {
  const initial = vmContext.window.visaoEquipeAtiva;
  vmContext.toggleVisaoEquipe();
  assert.strictEqual(vmContext.window.visaoEquipeAtiva, !initial);
  vmContext.toggleVisaoEquipe();
  assert.strictEqual(vmContext.window.visaoEquipeAtiva, initial);
});

// ========================================================
// 5. Testes de Conformidade Apple HIG & Safe-Areas
// ========================================================
test('CSS inclui suporte estrito a Safe-Areas do iPhone e Android', () => {
  assert(content.includes('env(safe-area-inset-top)'), 'Safe area inset top ausente');
  assert(content.includes('env(safe-area-inset-bottom)'), 'Safe area inset bottom ausente');
  assert(content.includes('viewport-fit=cover'), 'Meta tag viewport-fit=cover ausente');
});

test('Design Tokens oficiais da IBNS aplicados (#0c4786, #037fba)', () => {
  assert(content.includes('#0c4786'), 'Cor Navy oficial IBNS (#0c4786) ausente');
  assert(content.includes('#037fba'), 'Cor Azul Vibrante IBNS (#037fba) ausente');
  assert(content.includes('backdrop-filter: blur'), 'Glassmorphism backdrop-blur ausente');
});

// ========================================================
// 6. Auditoria de Segurança (Murilo - DevSecOps)
// ========================================================
test('Auditoria SEC: Ausência de credenciais privadas ou service_role', () => {
  assert(!content.includes('service_role'), 'Chave privada service_role detectada!');
  assert(!content.includes('private_key'), 'Chave privada detectada!');
});

test('Auditoria SEC: Controle de acesso protegido com senha padrão (0573)', () => {
  assert(content.includes("const SENHA = '0573'"), 'Constante de senha operacional ausente');
  assert(content.includes('modal-senha'), 'Modal de senha ausente');
});

test('Auditoria SEC: Drag & Drop protegido com manipulação segura de índices numéricos', () => {
  assert(content.includes('parseInt(el.dataset.index, 10)'), 'ParseInt estrito ausente no DnD');
});

console.log('\n====================================================');
console.log(`TOTAL DE TESTES: ${passCount + failCount}`);
console.log(`APROVADOS: ${passCount}`);
console.log(`FALHAS: ${failCount}`);
console.log('====================================================');

if (failCount === 0) {
  console.log('\n🌟 LAUDO DUPLO OFICIAL: QA-PASS 100% & SEC-PASS HOMOLOGADO (SPRINT 2)!');
  process.exit(0);
} else {
  console.error('\n🚫 QUALITY GATE REPROVADO. Corrija as falhas antes do merge.');
  process.exit(1);
}
