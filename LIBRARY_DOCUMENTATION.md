# 📚 Documentação: Criando e Publicando uma Biblioteca de Componentes React

Este guia explica como transformar um projeto de componentes React em uma biblioteca reutilizável e publicá-la no NPM.

## 🏗️ Estrutura do Projeto

### Organização de Diretórios

```
projeto/
├── src/                          # Projeto principal (documentação/demo)
│   ├── components/
│   │   └── library/             # Componentes da biblioteca
│   └── pages/                   # Páginas de documentação
├── lib/                         # 📦 Biblioteca para publicação
│   ├── src/
│   │   ├── components/          # Componentes da biblioteca
│   │   ├── lib/                 # Utilitários
│   │   ├── styles/              # Estilos CSS
│   │   └── index.ts             # Ponto de entrada
│   ├── scripts/
│   │   └── version.js           # Script de versionamento
│   ├── package.json             # Configuração da biblioteca
│   ├── rollup.config.js         # Build configuration
│   ├── tsconfig.json            # TypeScript config
│   ├── README.md                # Documentação
│   └── CHANGELOG.md             # Histórico de versões
└── dist/                        # Arquivos compilados (gerado)
```

## ⚙️ Configuração da Biblioteca

### 1. package.json

```json
{
  "name": "@formify/essentials",
  "version": "1.0.0",
  "description": "Biblioteca de componentes React reutilizáveis",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "src"],
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

### 2. rollup.config.js

Configuração para gerar builds otimizados:

```javascript
export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.js', format: 'cjs' },
      { file: 'dist/index.esm.js', format: 'esm' }
    ],
    plugins: [
      peerDepsExternal(),
      resolve({ browser: true }),
      commonjs(),
      typescript()
    ],
    external: ['react', 'react-dom']
  }
];
```

### 3. src/index.ts

Ponto de entrada que exporta todos os componentes:

```typescript
// Utilitários
export { cn } from './lib/utils';

// Componentes
export { Input } from './components/Input';
export { Select, type SelectOption } from './components/Select';
export { Alert, type AlertProps } from './components/Alert';
// ... outros componentes

// Estilos
export { default as styles } from './styles/index.css';
```

## 🔢 Sistema de Versionamento

### Semantic Versioning (SemVer)

- **PATCH** (1.0.X): Correções de bugs compatíveis
- **MINOR** (1.X.0): Novas funcionalidades compatíveis
- **MAJOR** (X.0.0): Mudanças incompatíveis na API

### Scripts de Versionamento

```bash
# Versionamento manual
npm run version:patch    # 1.0.0 → 1.0.1
npm run version:minor    # 1.0.0 → 1.1.0
npm run version:major    # 1.0.0 → 2.0.0

# Versionamento + Publicação
npm run release:patch    # Versiona e publica
npm run release:minor    # Versiona e publica
npm run release:major    # Versiona e publica
```

### Script Automático (scripts/version.js)

O script automatiza:
1. ✅ Atualização da versão no package.json
2. ✅ Atualização do CHANGELOG.md
3. ✅ Commit das mudanças
4. ✅ Criação de tag Git
5. ✅ Preparação para publicação

## 🚀 Processo de Build e Publicação

### 1. Desenvolvimento

```bash
# No diretório lib/
npm run build:watch     # Build contínuo durante desenvolvimento
```

### 2. Build de Produção

```bash
npm run build          # Gera dist/ com arquivos otimizados
```

### 3. Publicação no NPM

```bash
# Publicação manual
npm run build
npm publish

# Publicação automática (recomendado)
npm run release:patch   # Para correções
npm run release:minor   # Para novas features
npm run release:major   # Para breaking changes
```

## 📦 Uso da Biblioteca em Outros Projetos

### 1. Instalação

```bash
npm install @formify/essentials
# ou
yarn add @formify/essentials
```

### 2. Configuração do Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@formify/essentials/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        }
        // ... outros tokens de design
      }
    }
  }
}
```

### 3. Importação dos Estilos CSS

```css
/* index.css */
@import '@formify/essentials/dist/styles.css';
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Variáveis CSS obrigatórias */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... outras variáveis */
}
```

### 4. Uso dos Componentes

```tsx
import React from 'react';
import { Input, Button, Alert } from '@formify/essentials';

function App() {
  return (
    <div>
      <Input 
        label="Nome"
        placeholder="Digite seu nome"
      />
      
      <Alert variant="success">
        Componente funcionando!
      </Alert>
    </div>
  );
}
```

## 🔄 Fluxo de Trabalho Recomendado

### 1. Desenvolvimento de Novos Componentes

1. **Criar o componente** em `src/components/library/`
2. **Testar no projeto principal** (páginas de documentação)
3. **Copiar para a biblioteca** em `lib/src/components/`
4. **Exportar no index.ts** da biblioteca
5. **Atualizar documentação**

### 2. Correções e Melhorias

1. **Fazer alterações** em `lib/src/`
2. **Testar localmente** com `npm run build`
3. **Versionar** com `npm run version:patch`
4. **Publicar** com `npm run publish:npm`

### 3. Novas Funcionalidades

1. **Desenvolver feature** em `lib/src/`
2. **Atualizar CHANGELOG.md**
3. **Versionar** com `npm run version:minor`
4. **Publicar** com `npm run publish:npm`

## 📋 Checklist de Publicação

### Antes de Publicar

- [ ] ✅ Todos os componentes estão funcionando
- [ ] ✅ TypeScript sem erros
- [ ] ✅ Build executando sem problemas
- [ ] ✅ README.md atualizado
- [ ] ✅ CHANGELOG.md atualizado
- [ ] ✅ Versão incrementada corretamente

### Pós-Publicação

- [ ] ✅ Verificar instalação: `npm install @formify/essentials`
- [ ] ✅ Testar importação dos componentes
- [ ] ✅ Verificar se estilos estão aplicados
- [ ] ✅ Confirmar compatibilidade com diferentes projetos

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
cd lib/
npm run build:watch        # Build contínuo
npm run build              # Build único

# Versionamento
npm run version:patch       # Correção (1.0.0 → 1.0.1)
npm run version:minor       # Feature (1.0.0 → 1.1.0)
npm run version:major       # Breaking (1.0.0 → 2.0.0)

# Publicação
npm run publish:npm         # Publicar versão atual
npm run release:patch       # Versionar + publicar (patch)
npm run release:minor       # Versionar + publicar (minor)
npm run release:major       # Versionar + publicar (major)

# Verificação
npm pack                    # Simular publicação
npm publish --dry-run       # Testar publicação
```

## 🔧 Manutenção e Evolução

### Atualizações de Dependências

```bash
npm outdated                # Verificar dependências desatualizadas
npm update                  # Atualizar dependências
npm audit                   # Verificar vulnerabilidades
```

### Compatibilidade

- **React**: Manter compatibilidade com versões >=18.0.0
- **TypeScript**: Garantir tipos atualizados
- **Tailwind CSS**: Usar apenas features estáveis

### Documentação

- Manter README.md sempre atualizado
- Documentar breaking changes no CHANGELOG.md
- Incluir exemplos de uso para novos componentes

## 📝 Exemplo de CHANGELOG.md

```markdown
# Changelog

## [Unreleased]
### Adicionado
- Novos componentes em desenvolvimento

## [1.1.0] - 2024-01-20
### Adicionado
- Componente DatePicker
- Suporte a temas customizados

### Alterado
- Melhorias de performance no Input
- Atualização de dependências

### Corrigido
- Bug no Select com muitas opções

## [1.0.0] - 2024-01-15
### Adicionado
- Versão inicial da biblioteca
- 13 componentes fundamentais
- Design system completo
```

---

**📌 Nota**: Esta documentação deve ser mantida atualizada conforme a evolução da biblioteca.