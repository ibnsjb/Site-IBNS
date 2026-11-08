# DOC-05 · Persistência, Modelagem & Transição Futura ao Supabase

| Metadado | Detalhe |
| :--- | :--- |
| **Código** | DOC-05-PERSISTENCIA |
| **Projeto** | Site IBNS |
| **Responsável** | Otávio (DBA Architect) |
| **Data** | 08/11/2026 |
| **Status** | Homologado · Sprint 1 |

---

## 1. Modelo de Dados JSON Atual (Firebase & LocalStorage)

```json
{
  "evento_id": "2026-11-08_culto_da_familia_1900",
  "data": "2026-11-08",
  "hora": "19:00",
  "tipo": "Culto da Família",
  "tema": "Série Amigos para Sempre",
  "pregador": "Pr. Daniel Santos",
  "dirigente": "Kinho",
  "ordem": [
    { "etapa": "Prelúdio Instrumental", "min": 5, "responsavel": "Equipe de Louvor" },
    { "etapa": "Oração Inicial", "min": 5, "responsavel": "Dirigente" },
    { "etapa": "Cânticos Congregacionais", "min": 20, "responsavel": "Ministério de Música" }
  ],
  "escala": [
    { "funcao": "Pregador", "nome": "Pr. Daniel Santos" },
    { "funcao": "Dirigente", "nome": "Kinho" },
    { "funcao": "Transmissão YouTube", "nome": "Equipe de Mídia" }
  ]
}
```

---

## 2. Roteiro de Transição para o Supabase (Fase Futura)
Conforme definido no refinamento (Q3), a Fase 1 mantém o Firebase Realtime ativo sem interrupção operacional. Para a Fase 2, as tabelas relacionais no Supabase IBNS (`Projetos-IBNS` ou `Orbit`) seguirão o seguinte DDL normatizado:

```sql
CREATE TABLE public.ibns_eventos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evento_id TEXT UNIQUE NOT NULL,
  data DATE NOT NULL,
  hora TIME NOT NULL DEFAULT '19:00',
  tipo TEXT NOT NULL,
  tema TEXT,
  pregador TEXT,
  dirigente TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.ibns_ordem (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evento_id TEXT REFERENCES public.ibns_eventos(evento_id) ON DELETE CASCADE,
  etapa TEXT NOT NULL,
  min INT NOT NULL DEFAULT 5,
  responsavel TEXT,
  ordem_idx INT NOT NULL DEFAULT 0
);

CREATE TABLE public.ibns_escalas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evento_id TEXT REFERENCES public.ibns_eventos(evento_id) ON DELETE CASCADE,
  funcao TEXT NOT NULL,
  nome TEXT NOT NULL
);

CREATE TABLE public.ibns_checklist (
  evento_id TEXT NOT NULL,
  etapa_idx INT NOT NULL,
  is_done BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (evento_id, etapa_idx)
);
```
