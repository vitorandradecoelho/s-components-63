# Configuração do BitBucket para @formify/essentials

Este guia explica como configurar e publicar a biblioteca @formify/essentials no BitBucket.

## 📋 Pré-requisitos

1. Conta no BitBucket
2. Repositório criado no BitBucket
3. Node.js 18+ instalado
4. npm ou yarn configurado

## 🚀 Configuração Inicial

### 1. Clone ou configure o repositório

```bash
# Se ainda não clonou
git clone https://seu-usuario@bitbucket.org/seu-usuario/formify-essentials.git
cd formify-essentials

# Ou se já está no projeto
git remote add origin https://seu-usuario@bitbucket.org/seu-usuario/formify-essentials.git
```

### 2. Instale as dependências

```bash
cd lib
npm install
```

### 3. Configure o package.json

Atualize o `lib/package.json` com as informações corretas:

```json
{
  "name": "@formify/essentials",
  "version": "0.1.0",
  "repository": {
    "type": "git",
    "url": "https://bitbucket.org/seu-usuario/formify-essentials.git"
  },
  "homepage": "https://bitbucket.org/seu-usuario/formify-essentials#readme"
}
```

## 🔧 Scripts de Build e Publicação

### Build da biblioteca

```bash
cd lib
npm run build
```

### Versionamento

```bash
# Para versão patch (0.1.0 -> 0.1.1)
npm run version:patch

# Para versão minor (0.1.0 -> 0.2.0) 
npm run version:minor

# Para versão major (0.1.0 -> 1.0.0)
npm run version:major
```

### Publicação completa

```bash
# Build + versão patch + publicação
npm run release:patch

# Build + versão minor + publicação
npm run release:minor

# Build + versão major + publicação
npm run release:major
```

## 📦 Publicação Manual

### 1. Build
```bash
npm run build
```

### 2. Atualizar versão
```bash
npm version patch # ou minor/major
```

### 3. Commit e tag
```bash
git add .
git commit -m "chore: release v0.1.1"
git tag v0.1.1
git push origin main --tags
```

### 4. Publicar no npm
```bash
npm publish
```

## 🌿 Workflow com Branches

### Branch de desenvolvimento
```bash
git checkout -b feature/novo-componente
# ... fazer alterações
git commit -m "feat: adicionar novo componente"
git push origin feature/novo-componente
```

### Pull Request
1. Abra pull request no BitBucket
2. Faça code review
3. Merge para main

### Release
```bash
git checkout main
git pull origin main
npm run release:patch
```

## 📁 Estrutura de Arquivos para Distribuição

```
lib/
├── dist/                 # Arquivos compilados (não commitar)
│   ├── index.js         # Build CommonJS
│   ├── index.esm.js     # Build ES Modules
│   ├── index.d.ts       # Definições TypeScript
│   └── styles.css       # CSS compilado
├── src/                 # Código fonte
│   ├── components/      # Componentes React
│   ├── lib/            # Utilitários
│   └── styles/         # Estilos CSS
├── package.json        # Configuração do pacote
├── README.md          # Documentação
├── CHANGELOG.md       # Histórico de mudanças
└── rollup.config.js   # Configuração do build
```

## 🔍 Verificação de Build

Antes de publicar, sempre verifique:

```bash
# Build
npm run build

# Verificar arquivos gerados
ls -la dist/

# Testar importação local
npm pack
```

## 🚫 Arquivos Ignorados

Certifique-se que o `.gitignore` contém:

```gitignore
# Build outputs
dist/
*.tgz

# Dependencies
node_modules/
.npm

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

## 📝 Convenções de Commit

Use conventional commits:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação de código
- `refactor:` refatoração de código
- `test:` testes
- `chore:` tarefas de manutenção

Exemplo:
```bash
git commit -m "feat: adicionar componente DataTable com paginação"
git commit -m "fix: corrigir problema de importação no ComboBox"
git commit -m "docs: atualizar README com exemplos de uso"
```

## 🔧 Troubleshooting

### Problema: "npm publish" falha

**Solução:**
```bash
# Verificar se está logado
npm whoami

# Fazer login
npm login

# Verificar se o nome do pacote está disponível
npm search @formify/essentials
```

### Problema: Build falha

**Solução:**
```bash
# Limpar cache
npm run clean # se existir o script
rm -rf dist node_modules
npm install
npm run build
```

### Problema: Versão não atualiza

**Solução:**
```bash
# Verificar se há mudanças não commitadas
git status

# Commit antes de versionar
git add .
git commit -m "feat: suas mudanças"
npm version patch
```

## 📋 Checklist de Release

- [ ] Código revisado e testado
- [ ] Documentação atualizada
- [ ] CHANGELOG.md atualizado
- [ ] Build executado com sucesso
- [ ] Versão atualizada corretamente
- [ ] Commit e tag criados
- [ ] Push para BitBucket realizado
- [ ] Publicação no npm executada
- [ ] Verificação da publicação

## 📞 Suporte

Para problemas relacionados ao BitBucket ou publicação, consulte:
- [Documentação oficial do BitBucket](https://support.atlassian.com/bitbucket-cloud/)
- [Documentação do npm](https://docs.npmjs.com/)