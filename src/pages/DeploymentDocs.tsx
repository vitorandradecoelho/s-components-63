import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ArrowLeft,
  Cloud,
  Package,
  Server,
  Database,
  Shield,
  Zap,
  CheckCircle,
  AlertTriangle,
  Code
} from 'lucide-react';

const DeploymentDocs = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/docs">
                <ArrowLeft className="h-4 w-4" />
                Voltar para Docs
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-3xl font-bold">Deployment & Repositórios</h1>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center space-y-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Cloud className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Guia de Deployment
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Melhores práticas para deployment de bibliotecas e uso de repositórios na AWS
            </p>
          </div>
        </div>

        {/* AWS S3 para Repositórios */}
        <div className="space-y-8">
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="h-6 w-6 text-primary" />
                AWS S3 como Repositório de Bibliotecas
              </CardTitle>
              <CardDescription>
                Estratégias e melhores práticas para usar S3 como repositório de pacotes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Abordagem Recomendada */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Abordagem Recomendada: AWS CodeArtifact
                </h3>
                <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-sm text-green-800 dark:text-green-200 mb-3">
                    Para repositórios npm privados, use <strong>AWS CodeArtifact</strong>:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-green-700 dark:text-green-300">
                    <li>Suporte nativo para npm, Maven, PyPI</li>
                    <li>Integração com IAM para controle de acesso</li>
                    <li>Cache automático de repositórios upstream</li>
                    <li>Versionamento e dependências gerenciadas</li>
                  </ul>
                  
                  <div className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded border">
                    <code className="text-xs">
                      # Configurar CodeArtifact<br/>
                      aws codeartifact create-repository --domain my-domain --repository my-repo<br/>
                      npm config set registry https://my-domain-123456789012.d.codeartifact.region.amazonaws.com/npm/my-repo/
                    </code>
                  </div>
                </div>
              </div>

              {/* S3 para Assets Estáticos */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-500" />
                  S3 + CloudFront para Assets Estáticos
                </h3>
                <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                    Use S3 + CloudFront para servir builds estáticos (bundles UMD/ESM):
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">Estrutura de Diretórios:</h4>
                      <div className="mt-2 p-3 bg-white/50 dark:bg-black/20 rounded border font-mono text-xs">
                        my-lib-bucket/<br/>
                        ├── v1.0.0/<br/>
                        │   ├── my-lib.umd.js<br/>
                        │   ├── my-lib.esm.js<br/>
                        │   └── my-lib.css<br/>
                        ├── v1.1.0/<br/>
                        └── latest/ → symlink para versão atual
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">Configuração de Cache:</h4>
                      <div className="mt-2 p-3 bg-white/50 dark:bg-black/20 rounded border font-mono text-xs">
                        # Cache-Control headers no S3<br/>
                        versioned files: Cache-Control: public, max-age=31536000, immutable<br/>
                        /latest/*: Cache-Control: public, max-age=300
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Problemas do S3 como Registry NPM */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Por que NÃO usar S3 como Registry NPM
                </h3>
                <div className="bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-1 text-sm text-orange-700 dark:text-orange-300">
                    <li>Não suporta resolução de dependências transitivas</li>
                    <li>Sem suporte nativo para npm install/publish</li>
                    <li>Gerenciamento manual de metadados (package.json, versions)</li>
                    <li>Sem controle de acesso granular por pacote</li>
                    <li>Não integra com ferramentas padrão do ecossistema</li>
                  </ul>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Estratégias de CI/CD */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-primary" />
                Automação com CI/CD
              </CardTitle>
              <CardDescription>
                Pipeline automatizado para publicação de bibliotecas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-3">
                <h4 className="font-medium">GitHub Actions para S3 Static Assets:</h4>
                <div className="p-4 bg-muted rounded-lg">
                  <pre className="text-xs overflow-x-auto"><code>{`name: Deploy Library to S3
on:
  push:
    tags: ['v*']

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build library
        run: |
          npm ci
          npm run build
          
      - name: Deploy to S3
        run: |
          VERSION=\${GITHUB_REF#refs/tags/v}
          aws s3 sync ./dist s3://my-lib-bucket/v$VERSION/
          
          # Update latest symlink
          aws s3 sync ./dist s3://my-lib-bucket/latest/
          
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}`}</code></pre>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">CDN URLs para consumo:</h4>
                <div className="p-4 bg-muted rounded-lg">
                  <pre className="text-xs"><code>{`<!-- Versão específica (cache longo) -->
<script src="https://cdn.mydomain.com/my-lib/v1.2.0/my-lib.umd.js"></script>

<!-- Sempre a versão mais recente (cache curto) -->
<script src="https://cdn.mydomain.com/my-lib/latest/my-lib.umd.js"></script>

<!-- ESM para bundlers modernos -->
import MyLib from 'https://cdn.mydomain.com/my-lib/v1.2.0/my-lib.esm.js';`}</code></pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                Considerações de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Use HTTPS sempre (CloudFront com certificado SSL)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Configure CORS adequadamente no bucket S3</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Use IAM roles específicas para CI/CD (não chaves root)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Implemente versionamento de bucket para recuperação</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Configure logs do CloudTrail para auditoria</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Alternativas */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Server className="h-6 w-6 text-primary" />
                Outras Alternativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Registry NPM Privado:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• AWS CodeArtifact (recomendado)</li>
                    <li>• Verdaccio (self-hosted)</li>
                    <li>• GitHub Packages</li>
                    <li>• JFrog Artifactory</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">CDN para Assets:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• jsDelivr (GitHub releases)</li>
                    <li>• unpkg (npm packages)</li>
                    <li>• CDN próprio (S3 + CloudFront)</li>
                    <li>• Netlify/Vercel Edge</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeploymentDocs;