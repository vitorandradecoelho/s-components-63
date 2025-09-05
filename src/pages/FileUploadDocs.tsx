import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Code2 } from 'lucide-react';

const FileUploadDocs = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/docs">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Docs
            </Link>
          </Button>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-3xl font-bold">FileUpload Component</h1>
        </div>
        
        <Card className="gradient-card border-card-border shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Code2 className="h-5 w-5 text-primary" />
              Componente FileUpload
            </CardTitle>
            <CardDescription>
              Documentação detalhada em desenvolvimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A documentação completa para o componente FileUpload será adicionada em breve.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FileUploadDocs;