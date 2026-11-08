# DOC-02 · Design System, Apple HIG & Claro Design Studio AI

| Metadado | Detalhe |
| :--- | :--- |
| **Código** | DOC-02-DESIGN-SYSTEM |
| **Projeto** | Site IBNS |
| **Responsável** | Camila (UX/UI Designer) & Equipe Claro Design Studio AI |
| **Data** | 08/11/2026 |
| **Status** | Aprovado para Implementação |

---

## 1. Princípios de Design (Claro Design Studio AI & Apple HIG)
1. **Baixa Carga Cognitiva**: O usuário e o voluntário no púlpito entendem a tela em menos de 3 segundos sem esforço.
2. **Escaneabilidade Superior**: Hierarquia visual clara com tipografia em escala, badges de status luminosos e ordenação lógica.
3. **Padrão Apple Human Interface Guidelines**:
   - Superfícies translúcidas em Glassmorphism (`backdrop-blur-md bg-white/85`).
   - *Segmented Controls* táteis no topo com transição deslizante fluida.
   - Cantos arredondados contínuos (`rounded-2xl` e `rounded-3xl` com curvatura estilo iOS).
   - *Safe-Areas* obrigatórias com `env(safe-area-inset-top)` e `env(safe-area-inset-bottom)` contra entalhes e barras de navegação em iPhones e Androids.
4. **Microinterações Vivas**: Feedback tátil em botões (`active:scale-[0.98]`), checkboxes animados e pulse indicador de conexão live.

---

## 2. Design Tokens Oficiais IBNS

### Paleta de Cores Institucional
| Token | Cor Hex | Uso Canônico |
| :--- | :--- | :--- |
| `--ibns-navy` | `#0c4786` | Azul Marinho Profundo; cabeçalhos principais, hero banners e autoridade institucional. |
| `--ibns-blue` | `#037fba` | Azul Vibrante Oficial; botões primários, itens ativos e destaques. |
| `--ibns-petrol` | `#1f4c66` | Azul Petróleo Escuro; títulos secundários e textos de alto contraste. |
| `--ibns-mist` | `#8dafc0` | Azul Névoa; metadados, durações, linhas de divisão sutis e badges secundários. |
| `--ibns-surface` | `#f0f7fb` | Azul Claro Superfície; cartões destacados, fundos de chips e hover states. |
| `--ibns-bg` | `#f8fafc` | Slate Off-White; plano de fundo geral do sistema contra fadiga visual. |

### Cores Semânticas de Estado
- **Sucesso / Ao Vivo / Concluído**: `#22c55e` (Verde Esmeralda Apple)
- **Em Andamento / Atenção**: `#f59e0b` (Âmbar Caloroso)
- **Alerta / Remoção / Bloqueio**: `#ef4444` (Vermelho Suave)
- **Neutro / Standby**: `#94a3b8` (Slate 400)

### Tipografia
- **Família Primária**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `SF Pro Display`, `sans-serif`.
- **Pesos**: Regular (400) para corpo de texto, Medium (500) para rótulos e metadados, Semibold (600) para títulos de seções, Bold (700) para métricas e destaques.
- **Números Tabulares**: `font-variant-numeric: tabular-nums` para cronômetros, horários e listas numeradas.

---

## 3. Componentes Centrais

### 3.1. Segmented Control de Navegação (iOS/macOS Style)
- Fundo cinza translúcido encapsulado (`bg-slate-100/90 p-1 rounded-xl`).
- Botões de aba com cantos suaves (`rounded-lg text-xs font-semibold py-2 px-4`).
- Aba ativa iluminada com fundo branco puro, sombra sutil (`shadow-sm`) e cor primária IBNS (`text-[#0c4786]`).

### 3.2. Hero Card do Culto (Executive Banner)
- Gradiente diagonal em 135º: `from-[#0c4786] via-[#085a9c] to-[#037fba]`.
- Cápsula com borda translúcida suave (`border border-white/20`).
- Sombra de elevação Apple: `box-shadow: 0 14px 34px -8px rgba(12, 71, 134, 0.28)`.

### 3.3. Checklist Run Sheet & Drag Handle
- Checkbox circular com anel de foco e transição elástica.
- Item concluído com fade suave de opacidade (70%) e tachado elegante.
- Drag handle com ícone de 6 pontos para reordenação instantânea em desktop e mobile.

### 3.4. Modal de Proteção (Cofre Seguro Admin)
- Backdrop blur fosco (`backdrop-blur-xl bg-slate-900/60`).
- Card central estilo Apple Security Alert com campo de senha centralizado com tracking espaçado (`tracking-widest`).
