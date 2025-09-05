#!/usr/bin/env node

/**
 * Script para versionamento automático
 * Uso: npm run version:patch | npm run version:minor | npm run version:major
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packagePath = path.join(__dirname, '../package.json');
const changelogPath = path.join(__dirname, '../CHANGELOG.md');

function getCurrentVersion() {
  const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  return package.version;
}

function updateVersion(type) {
  console.log(`🚀 Iniciando versionamento ${type}...`);
  
  // Atualiza a versão no package.json
  execSync(`npm version ${type} --no-git-tag-version`, { 
    cwd: path.dirname(packagePath),
    stdio: 'inherit' 
  });
  
  const newVersion = getCurrentVersion();
  console.log(`📦 Nova versão: ${newVersion}`);
  
  // Atualiza o CHANGELOG.md
  updateChangelog(newVersion);
  
  // Commit das mudanças
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "chore: release v${newVersion}"`, { stdio: 'inherit' });
  execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
  
  console.log(`✅ Versão ${newVersion} criada com sucesso!`);
  console.log(`📝 Não esqueça de atualizar o CHANGELOG.md manualmente`);
  console.log(`🚀 Para publicar: npm run publish`);
}

function updateChangelog(version) {
  if (!fs.existsSync(changelogPath)) {
    console.log('⚠️  CHANGELOG.md não encontrado, pulando atualização');
    return;
  }
  
  const changelog = fs.readFileSync(changelogPath, 'utf8');
  const today = new Date().toISOString().split('T')[0];
  
  const updatedChangelog = changelog.replace(
    '## [Unreleased]',
    `## [Unreleased]\n\n## [${version}] - ${today}`
  );
  
  fs.writeFileSync(changelogPath, updatedChangelog);
  console.log('📝 CHANGELOG.md atualizado');
}

// Obter o tipo de versão dos argumentos
const versionType = process.argv[2];

if (!versionType || !['patch', 'minor', 'major'].includes(versionType)) {
  console.error('❌ Tipo de versão inválido. Use: patch, minor ou major');
  process.exit(1);
}

updateVersion(versionType);