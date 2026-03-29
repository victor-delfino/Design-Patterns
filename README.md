# Design Patterns — React + TypeScript

Projeto de estudos para implementação dos 12 Design Patterns clássicos com demos interativas, construído com React 18, TypeScript strict e Tailwind CSS v4.

---

## 🚀 Como rodar
```bash
git clone https://github.com/seu-usuario/design-patterns-react
cd design-patterns-react
npm install
npm run dev
```

---

## 🧠 Patterns implementados

### Creacionais
| Pattern | Descrição | Demo |
|---|---|---|
| Singleton | Instância única compartilhada entre sessões | Duas sessões compartilhando a mesma conexão com banco |
| Factory Method | Criação de objetos via enum + switch | Fábrica de veículos (Carro, Caminhão, Moto) |
| Builder | Construção passo a passo | Query SQL montada dinamicamente |

### Estruturais
| Pattern | Descrição | Demo |
|---|---|---|
| Adapter | Interface unificada para serviços externos | Gateways de pagamento Stripe e PayPal |
| Decorator | Comportamentos empilháveis sem modificar a base | HTTP Client com Logger, Cache e Auth |
| Facade | Simplifica sistemas complexos | Sistema de pedidos coordenando 3 serviços |

### Comportamentais
| Pattern | Descrição | Demo |
|---|---|---|
| Observer | Notificação automática de subscribers | Stock market com Logger, Alerta e Portfólio |
| Strategy | Algoritmos intercambiáveis em tempo de execução | Calculadora de frete (Correios, Transportadora, Retirada) |
| Command | Ações encapsuladas com undo/redo | Editor de texto com histórico de comandos |

### React-Specific
| Pattern | Descrição | Demo |
|---|---|---|
| HOC | Componente de ordem superior | withAuth protegendo rotas por role |
| Render Props | Renderização delegada via função | DataFetcher com loading, erro e sucesso |
| Compound Components | Estado compartilhado via Context | Accordion sem props drilling |

---

## 🛠️ Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite 8**
- **Tailwind CSS v4** (insiders)
- **React Router DOM v6**
- **React Hook Form**
- **React Compiler**

---

## 📁 Estrutura
```
src/
├── components/
│   ├── Layout.tsx        # Sidebar + Outlet
│   └── Sidebar.tsx       # Navegação com NavLink
└── patterns/
    ├── creational/
    │   ├── singleton/
    │   ├── factory/
    │   └── builder/
    ├── structural/
    │   ├── adapter/
    │   ├── decorator/
    │   └── facade/
    ├── behavioral/
    │   ├── observer/
    │   ├── strategy/
    │   └── command/
    └── react-specific/
        ├── hoc/
        ├── render-props/
        └── compound/
```

---

## 🎨 Design System

Todas as demos seguem um design system consistente com classes utilitárias definidas em `index.css`:
```css
.cartao         /* card padrão */
.cartao-titulo  /* título de card */
.entrada        /* inputs e selects */
.botao-primario /* botão de ação principal */
.botao-secundario /* botão de ação secundária */
.rotulo         /* label de formulário */
.terminal       /* área de log estilo terminal */
```

---

## 💡 Aprendizados

- Entender o **problema** que cada pattern resolve é mais importante que a implementação
- **TypeScript strict** força contratos claros e elimina bugs silenciosos
- **Lifting state up** é a solução mais simples antes de recorrer a Context ou libs externas
- **useRef** preserva instâncias entre renders sem causar re-renders desnecessários
- **Tailwind com @layer components** elimina repetição e cria um design system consistente