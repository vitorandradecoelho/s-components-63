# Exemplos de Importação - @formify/essentials v0.1

Este documento contém exemplos práticos de como importar e usar os componentes da biblioteca @formify/essentials na versão 0.1.

## 📦 Instalação

```bash
npm install @formify/essentials@0.1.0
```

## 🎯 Importações Básicas

### Componentes individuais

```tsx
// Importar componentes específicos
import { Input } from '@formify/essentials';
import { Select, type SelectOption } from '@formify/essentials';
import { DataTable, type TableColumn } from '@formify/essentials';
import { ComboBox, type ComboOption } from '@formify/essentials';
import { Toast, useToastHelper } from '@formify/essentials';
import { SweetAlert, useSweetAlert } from '@formify/essentials';
```

### Importação múltipla

```tsx
// Importar vários componentes de uma vez
import { 
  Input, 
  Select, 
  TextField,
  RadioButton,
  CheckBox,
  Alert,
  type SelectOption,
  type TableColumn
} from '@formify/essentials';
```

### Importação com alias

```tsx
// Usar alias para evitar conflitos
import { 
  Input as FormifyInput,
  Select as FormifySelect,
  Alert as FormifyAlert
} from '@formify/essentials';
```

## 🧩 Exemplos por Componente

### 1. Input

```tsx
import React, { useState } from 'react';
import { Input } from '@formify/essentials';
import { User, Mail, Lock } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="space-y-4">
      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<Mail className="h-4 w-4" />}
        required
      />
      
      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<Lock className="h-4 w-4" />}
        required
      />
    </form>
  );
}
```

### 2. Select

```tsx
import React, { useState } from 'react';
import { Select, type SelectOption } from '@formify/essentials';

function PreferenciasForm() {
  const [categoria, setCategoria] = useState('');
  
  const categorias: SelectOption[] = [
    { label: 'Tecnologia', value: 'tech' },
    { label: 'Design', value: 'design' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Vendas', value: 'sales' }
  ];

  return (
    <Select
      label="Categoria de Interesse"
      options={categorias}
      value={categoria}
      onValueChange={setCategoria}
      placeholder="Escolha uma categoria"
      helper="Selecione a categoria que mais te interessa"
    />
  );
}
```

### 3. ComboBox

```tsx
import React, { useState } from 'react';
import { ComboBox, type ComboOption } from '@formify/essentials';

function CidadesSelector() {
  const [cidades, setCidades] = useState<string[]>([]);
  
  const opcoesCidades: ComboOption[] = [
    { label: 'São Paulo', value: 'sp', description: 'São Paulo - SP' },
    { label: 'Rio de Janeiro', value: 'rj', description: 'Rio de Janeiro - RJ' },
    { label: 'Belo Horizonte', value: 'bh', description: 'Belo Horizonte - MG' },
    { label: 'Porto Alegre', value: 'poa', description: 'Porto Alegre - RS' }
  ];

  return (
    <ComboBox
      label="Cidades"
      options={opcoesCidades}
      value={cidades}
      onValueChange={setCidades}
      placeholder="Busque por cidades"
      multiple
      searchable
      clearable
      emptyMessage="Nenhuma cidade encontrada"
    />
  );
}
```

### 4. DataTable

```tsx
import React from 'react';
import { DataTable, type TableColumn } from '@formify/essentials';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  estoque: number;
  ativo: boolean;
}

function ProdutosTable() {
  const produtos: Produto[] = [
    { id: 1, nome: 'Notebook Dell', preco: 2500, categoria: 'Informática', estoque: 10, ativo: true },
    { id: 2, nome: 'Mouse Logitech', preco: 150, categoria: 'Informática', estoque: 25, ativo: true },
    { id: 3, nome: 'Teclado Mecânico', preco: 350, categoria: 'Informática', estoque: 5, ativo: false }
  ];

  const colunas: TableColumn<Produto>[] = [
    {
      key: 'id',
      title: 'ID',
      width: '80px',
      sortable: true
    },
    {
      key: 'nome',
      title: 'Nome do Produto',
      sortable: true
    },
    {
      key: 'preco',
      title: 'Preço',
      align: 'right',
      sortable: true,
      render: (preco) => `R$ ${preco.toFixed(2)}`
    },
    {
      key: 'categoria',
      title: 'Categoria',
      sortable: true
    },
    {
      key: 'estoque',
      title: 'Estoque',
      align: 'center',
      sortable: true,
      render: (estoque) => (
        <span className={estoque < 10 ? 'text-red-600' : 'text-green-600'}>
          {estoque}
        </span>
      )
    },
    {
      key: 'ativo',
      title: 'Status',
      align: 'center',
      render: (ativo) => (
        <span className={`px-2 py-1 rounded text-xs ${
          ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {ativo ? 'Ativo' : 'Inativo'}
        </span>
      )
    }
  ];

  return (
    <DataTable
      data={produtos}
      columns={colunas}
      pagination={{
        pageSize: 10,
        showTotal: true,
        showSizeChanger: true,
        showQuickJumper: true
      }}
      hover
      striped
      onRowClick={(produto) => console.log('Produto clicado:', produto)}
    />
  );
}
```

### 5. Toast

```tsx
import React from 'react';
import { Toast, useToastHelper } from '@formify/essentials';

function NotificacoesExample() {
  const { success, error, warning, info } = useToastHelper();

  const handleSuccess = () => {
    Toast.success('Operação realizada com sucesso!');
    // ou usando o hook
    // success('Operação realizada com sucesso!');
  };

  const handleError = () => {
    Toast.error('Erro ao processar solicitação');
  };

  const handleWarning = () => {
    Toast.warning('Atenção: Esta ação não pode ser desfeita');
  };

  const handleCustom = () => {
    Toast.show({
      variant: 'success',
      title: 'Upload Completo',
      description: 'Arquivo enviado com sucesso para o servidor',
      duration: 5000
    });
  };

  return (
    <div className="space-x-2">
      <button onClick={handleSuccess}>Sucesso</button>
      <button onClick={handleError}>Erro</button>
      <button onClick={handleWarning}>Aviso</button>
      <button onClick={handleCustom}>Personalizado</button>
    </div>
  );
}
```

### 6. SweetAlert

```tsx
import React from 'react';
import { useSweetAlert } from '@formify/essentials';

function ConfirmacaoExample() {
  const { fire, SweetAlert } = useSweetAlert();

  const handleDelete = () => {
    fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
      onConfirm: async () => {
        // Simular API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        fire({
          title: 'Deletado!',
          text: 'O registro foi removido com sucesso.',
          type: 'success',
          showCancelButton: false
        });
      }
    });
  };

  const handleInput = () => {
    fire({
      title: 'Digite seu nome',
      type: 'question',
      showInput: true,
      inputPlaceholder: 'Seu nome aqui...',
      onConfirm: (inputValue) => {
        if (inputValue) {
          fire({
            title: `Olá, ${inputValue}!`,
            type: 'success'
          });
        }
      }
    });
  };

  return (
    <div className="space-x-2">
      <button onClick={handleDelete}>Deletar Item</button>
      <button onClick={handleInput}>Inserir Nome</button>
      <SweetAlert />
    </div>
  );
}
```

### 7. LinhaTrajetoSelector

```tsx
import React, { useState } from 'react';
import { LinhaTrajetoSelector, type Linha, type Trajeto } from '@formify/essentials';

function RouteSelector() {
  const [selectedLinha, setSelectedLinha] = useState<string>('');
  const [selectedTrajetos, setSelectedTrajetos] = useState<string[]>([]);

  // Dados de exemplo
  const linhas: Linha[] = [
    {
      _id: 'linha1',
      id: 'linha1',
      clienteId: 1,
      id_migracao: 1,
      descr: 'Linha Azul - Centro/Periferia',
      numero: '001',
      trajetos: [
        {
          _id: 'traj1',
          id: 'traj1',
          nome: 'Centro → Periferia Sul',
          sentido: 'Ida',
          kmTrajeto: 25.5,
          id_migracao: 1,
          externalId: 'ext1',
          colorIdx: 1,
          qtdTransmisoesInicial: 0,
          qtdTransmisoesFinal: 0,
          percentConclusao: 100,
          toleranciaArrasto: 5,
          tempoMedioViagem: 45,
          sentidoTipo: 'ida',
          headwayCopiloto: 10,
          orientacao: 'sul',
          consorcioSinoticoUnificado: [],
          garagem: [],
          despachoSemCor: false,
          ativo: true,
          codigosIntegracao: [],
          raioTrajeto: 5
        },
        {
          _id: 'traj2',
          id: 'traj2',
          nome: 'Periferia Sul → Centro',
          sentido: 'Volta',
          kmTrajeto: 25.5,
          id_migracao: 2,
          externalId: 'ext2',
          colorIdx: 1,
          qtdTransmisoesInicial: 0,
          qtdTransmisoesFinal: 0,
          percentConclusao: 100,
          toleranciaArrasto: 5,
          tempoMedioViagem: 45,
          sentidoTipo: 'volta',
          headwayCopiloto: 10,
          orientacao: 'norte',
          consorcioSinoticoUnificado: [],
          garagem: [],
          despachoSemCor: false,
          ativo: true,
          codigosIntegracao: [],
          raioTrajeto: 5
        }
      ]
    }
  ];

  const handleLinhaChange = (linha: Linha | null) => {
    setSelectedLinha(linha?._id || '');
    console.log('Linha selecionada:', linha);
  };

  const handleTrajetoChange = (trajetos: Trajeto[]) => {
    setSelectedTrajetos(trajetos.map(t => t._id));
    console.log('Trajetos selecionados:', trajetos);
  };

  return (
    <div className="max-w-md">
      <LinhaTrajetoSelector
        linhas={linhas}
        selectedLinhaId={selectedLinha}
        selectedTrajetoIds={selectedTrajetos}
        onLinhaChange={handleLinhaChange}
        onTrajetoChange={handleTrajetoChange}
        linhaLabel="Linha de Ônibus"
        trajetoLabel="Trajetos Disponíveis"
        linhaPlaceholder="Selecione uma linha"
        trajetoPlaceholder="Selecione os trajetos"
        multiSelectTrajeto={true}
        size="md"
      />
    </div>
  );
}
```

## 🎨 Utilitários

### Função cn (className merge)

```tsx
import { cn } from '@formify/essentials';

// Combinar classes condicionalmente
const buttonClasses = cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500 text-white',
  isDisabled && 'opacity-50 cursor-not-allowed'
);
```

## 🚀 Exemplo Completo

```tsx
import React, { useState } from 'react';
import { 
  Input, 
  Select, 
  ComboBox,
  DataTable,
  Toast,
  Alert,
  type SelectOption,
  type ComboOption,
  type TableColumn 
} from '@formify/essentials';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cidade: string;
  categoria: string;
}

function AppCompleto() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cidades, setCidades] = useState<string[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const categorias: SelectOption[] = [
    { label: 'Desenvolvedor', value: 'dev' },
    { label: 'Designer', value: 'design' },
    { label: 'Gerente', value: 'manager' }
  ];

  const cidadesOpcoes: ComboOption[] = [
    { label: 'São Paulo', value: 'sp' },
    { label: 'Rio de Janeiro', value: 'rj' },
    { label: 'Belo Horizonte', value: 'bh' }
  ];

  const colunas: TableColumn<Usuario>[] = [
    { key: 'id', title: 'ID', width: '80px' },
    { key: 'nome', title: 'Nome', sortable: true },
    { key: 'email', title: 'E-mail', sortable: true },
    { key: 'cidade', title: 'Cidade' },
    { key: 'categoria', title: 'Categoria' }
  ];

  const handleSubmit = () => {
    if (!nome || !email || !categoria || cidades.length === 0) {
      Toast.error('Preencha todos os campos!');
      return;
    }

    const novoUsuario: Usuario = {
      id: usuarios.length + 1,
      nome,
      email,
      cidade: cidades[0],
      categoria
    };

    setUsuarios([...usuarios, novoUsuario]);
    Toast.success('Usuário cadastrado com sucesso!');
    
    // Limpar formulário
    setNome('');
    setEmail('');
    setCategoria('');
    setCidades([]);
  };

  return (
    <div className="p-6 space-y-6">
      <Alert variant="info">
        Exemplo completo da biblioteca @formify/essentials v0.1
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
        />

        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
        />

        <Select
          label="Categoria"
          options={categorias}
          value={categoria}
          onValueChange={setCategoria}
          placeholder="Selecione a categoria"
        />

        <ComboBox
          label="Cidade"
          options={cidadesOpcoes}
          value={cidades}
          onValueChange={setCidades}
          placeholder="Busque por cidades"
          searchable
        />
      </div>

      <button 
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Cadastrar Usuário
      </button>

      {usuarios.length > 0 && (
        <DataTable
          data={usuarios}
          columns={colunas}
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
}

export default AppCompleto;
```

## 🔗 Links Úteis

- [Repositório no BitBucket](https://bitbucket.org/seu-usuario/formify-essentials)
- [Documentação Completa](./README.md)
- [Guia de Configuração do BitBucket](./BITBUCKET_SETUP.md)
- [Changelog](./CHANGELOG.md)