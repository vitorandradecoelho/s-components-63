import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Input, 
  Select, 
  TextField, 
  RadioButton, 
  CheckBox, 
  DataTable, 
  ComboBox, 
  FileUpload,
  LightBox,
  FormModal,
  Alert,
  Toast,
  useToastHelper,
  SweetAlert,
  useSweetAlert,
  type SelectOption,
  type RadioOption,
  type ComboOption,
  type TableColumn
} from "@/components/library";
import { LinhaTrajetoSelector, type Linha, type Trajeto } from "@/components/library/LinhaTrajetoSelector";
import { Search, Code, Palette, Zap, Plus, RotateCcw, Search as SearchIcon, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data for demonstrations
const selectOptions: SelectOption[] = [
  { label: "React", value: "react" },
  { label: "Vue.js", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" }
];

const radioOptions: RadioOption[] = [
  { label: "Opção 1", value: "option1", description: "Primeira opção disponível" },
  { label: "Opção 2", value: "option2", description: "Segunda opção disponível" },
  { label: "Opção 3", value: "option3", description: "Terceira opção disponível" }
];

const comboOptions: ComboOption[] = [
  { label: "JavaScript", value: "js", description: "Linguagem de programação web" },
  { label: "TypeScript", value: "ts", description: "JavaScript com tipagem estática" },
  { label: "Python", value: "py", description: "Linguagem versátil e poderosa" },
  { label: "Java", value: "java", description: "Linguagem orientada a objetos" },
  { label: "C#", value: "csharp", description: "Linguagem da Microsoft" },
  { label: "Go", value: "go", description: "Linguagem moderna do Google" }
];

interface SampleUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

const sampleUsers: SampleUser[] = [
  { id: 1, name: "Ana Silva", email: "ana@email.com", role: "Admin", status: "active", createdAt: "2024-01-15" },
  { id: 2, name: "Bruno Santos", email: "bruno@email.com", role: "User", status: "active", createdAt: "2024-01-20" },
  { id: 3, name: "Carla Oliveira", email: "carla@email.com", role: "Moderator", status: "inactive", createdAt: "2024-02-01" },
  { id: 4, name: "Diego Costa", email: "diego@email.com", role: "User", status: "active", createdAt: "2024-02-10" },
  { id: 5, name: "Elena Rodrigues", email: "elena@email.com", role: "Admin", status: "active", createdAt: "2024-02-15" }
];

const userColumns: TableColumn<SampleUser>[] = [
  { 
    key: "name", 
    header: "Nome", 
    sortable: true 
  },
  { 
    key: "email", 
    header: "Email", 
    sortable: true 
  },
  { 
    key: "role", 
    header: "Função",
    render: (value) => (
      <Badge variant={value === "Admin" ? "default" : "secondary"}>
        {value}
      </Badge>
    )
  },
  {
    key: "status",
    header: "Status",
    render: (value) => (
      <Badge variant={value === "active" ? "default" : "destructive"}>
        {value === "active" ? "Ativo" : "Inativo"}
      </Badge>
    )
  },
  {
    key: "createdAt",
    header: "Criado em",
    sortable: true
  }
];

// Sample data for LinhaTrajetoSelector
const sampleLinhas: Linha[] = [
  {
    "_id": "5e8e3bbf4be5542e43e539eb",
    "clienteId": 1314,
    "id_migracao": 3210,
    "descr": "01 - Esperança / Taboão",
    "numero": "01",
    "trajetos": [
      {
        "_id": "5e8e3bbf4be5542e43e539e9",
        "id_migracao": 8639,
        "externalId": "0",
        "nome": "01 - Esperança / Sentido Taboão",
        "colorIdx": 7,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 90,
        "toleranciaArrasto": 5,
        "kmTrajeto": 17.51,
        "tempoMedioViagem": 80,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "N",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": true,
        "ativo": true,
        "sentido": "ida",
        "codigosIntegracao": ["1"],
        "raioTrajeto": 100,
        "id": "5e8e3bbf4be5542e43e539e9"
      },
      {
        "_id": "5e8e3bbf4be5542e43e539ea",
        "id_migracao": 8640,
        "externalId": "0",
        "nome": "01 - Taboão / Sentido Esperança",
        "colorIdx": 3,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 70,
        "toleranciaArrasto": 5,
        "kmTrajeto": 17.99,
        "tempoMedioViagem": 80,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "S",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": true,
        "ativo": true,
        "sentido": "volta",
        "codigosIntegracao": ["1"],
        "raioTrajeto": 80,
        "id": "5e8e3bbf4be5542e43e539ea"
      }
    ],
    "id": "5e8e3bbf4be5542e43e539eb"
  },
  {
    "_id": "5e8e3bbf4be5542e43e539ec",
    "clienteId": 1314,
    "id_migracao": 3211,
    "descr": "02 - Centro / Vila Nova",
    "numero": "02",
    "trajetos": [
      {
        "_id": "5e8e3bbf4be5542e43e539ed",
        "id_migracao": 8641,
        "externalId": "0",
        "nome": "02 - Centro / Sentido Vila Nova",
        "colorIdx": 2,
        "qtdTransmisoesInicial": 1,
        "qtdTransmisoesFinal": 1,
        "percentConclusao": 85,
        "toleranciaArrasto": 3,
        "kmTrajeto": 12.8,
        "tempoMedioViagem": 65,
        "sentidoTipo": "P",
        "headwayCopiloto": 0,
        "orientacao": "N",
        "consorcioSinoticoUnificado": [],
        "garagem": [],
        "despachoSemCor": false,
        "ativo": true,
        "sentido": "ida",
        "codigosIntegracao": ["2"],
        "raioTrajeto": 90,
        "id": "5e8e3bbf4be5542e43e539ed"
      }
    ],
    "id": "5e8e3bbf4be5542e43e539ec"
  }
];

const Index = () => {
  const { t } = useLanguage();
  const { success, error, warning, info } = useToastHelper();
  const { fire, SweetAlert: SweetAlertComponent } = useSweetAlert();
  const [inputValue, setInputValue] = React.useState("");
  const [selectValue, setSelectValue] = React.useState("");
  const [textValue, setTextValue] = React.useState("");
  const [radioValue, setRadioValue] = React.useState("");
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [comboValue, setComboValue] = React.useState<string[]>([]);
  const [tableSort, setTableSort] = React.useState<{ key: keyof SampleUser; direction: "asc" | "desc" }>();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedLinhaId, setSelectedLinhaId] = React.useState<string>("");
  const [selectedTrajetoIds, setSelectedTrajetoIds] = React.useState<string[]>([]);

  const handleFileChange = (files: File[]) => {
    console.log("Arquivos selecionados:", files);
  };

  const handleTableSort = (key: keyof SampleUser, direction: "asc" | "desc") => {
    setTableSort({ key, direction });
  };

  const sortedUsers = React.useMemo(() => {
    if (!tableSort) return sampleUsers;
    
    return [...sampleUsers].sort((a, b) => {
      const aValue = a[tableSort.key];
      const bValue = b[tableSort.key];
      
      if (tableSort.direction === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [tableSort]);

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* Header */}
        <div className="flex items-center justify-end mb-8">
          <LanguageSwitcher />
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t('home.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
              <Code className="h-4 w-4" />
              {t('home.typescript')}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full">
              <Palette className="h-4 w-4" />
              {t('home.design')}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full">
              <Zap className="h-4 w-4" />
              {t('home.performance')}
            </div>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/docs">
                <BookOpen className="h-4 w-4" />
                {t('home.viewDocs')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Component */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('component.input.title')}
                <Badge>{t('common.basic')}</Badge>
              </CardTitle>
              <CardDescription>
                {t('component.input.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Input Padrão"
                placeholder="Digite algo..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helper="Texto de ajuda opcional"
              />
              
              <Input
                label="Com Ícone"
                placeholder="Buscar..."
                leftIcon={<Search className="h-4 w-4" />}
                variant="filled"
              />
              
              <Input
                label="Com Erro"
                placeholder="Campo obrigatório"
                error="Este campo é obrigatório"
              />
            </CardContent>
          </Card>

          {/* Select Component */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('component.select.title')}
                <Badge>{t('common.basic')}</Badge>
              </CardTitle>
              <CardDescription>
                {t('component.select.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Framework Favorito"
                options={selectOptions}
                value={selectValue}
                onValueChange={setSelectValue}
                placeholder="Escolha um framework"
                helper="Selecione sua opção preferida"
              />
              
              <Select
                label="Desabilitado"
                options={selectOptions}
                disabled
                placeholder="Seleção desabilitada"
              />
            </CardContent>
          </Card>

          {/* TextField Component */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('component.textfield.title')}
                <Badge>{t('common.basic')}</Badge>
              </CardTitle>
              <CardDescription>
                {t('component.textfield.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextField
                label="Descrição"
                placeholder="Escreva uma descrição detalhada..."
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                helper="Mínimo de 50 caracteres"
                rows={4}
              />
              
              <TextField
                label="Comentário"
                placeholder="Seu comentário..."
                variant="filled"
                success="Formato válido"
                rows={3}
              />
            </CardContent>
          </Card>

          {/* RadioButton Component */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('component.radiobutton.title')}
                <Badge>{t('common.basic')}</Badge>
              </CardTitle>
              <CardDescription>
                {t('component.radiobutton.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioButton
                label="Escolha uma opção"
                name="demo-radio"
                options={radioOptions}
                value={radioValue}
                onValueChange={setRadioValue}
                helper="Selecione apenas uma opção"
              />
              
              <RadioButton
                label="Variante Card"
                name="demo-radio-card"
                options={radioOptions.slice(0, 2)}
                variant="card"
              />
            </CardContent>
          </Card>

          {/* CheckBox Component */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('component.checkbox.title')}
                <Badge>{t('common.basic')}</Badge>
              </CardTitle>
              <CardDescription>
                {t('component.checkbox.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CheckBox
                label="Aceito os termos e condições"
                description="Leia os termos completos antes de aceitar"
                checked={checkboxValue}
                onChange={(e) => setCheckboxValue(e.target.checked)}
              />
              
              <CheckBox
                label="Receber notificações"
                variant="card"
                description="Receba updates sobre novos recursos"
              />
              
              <CheckBox
                label="Estado indeterminado"
                indeterminate={true}
                description="Exemplo de estado indeterminado"
              />
            </CardContent>
          </Card>

          {/* ComboBox Component */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('component.combobox.title')}
                <Badge>{t('common.advanced')}</Badge>
              </CardTitle>
              <CardDescription>
                {t('component.combobox.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ComboBox
                label="Linguagens de Programação"
                options={comboOptions}
                value={comboValue}
                onValueChange={setComboValue}
                multiple={true}
                searchable={true}
                clearable={true}
                placeholder="Selecione linguagens..."
                helper="Você pode selecionar múltiplas opções"
              />
              
              <ComboBox
                label="Usuários da API"
                fetchUrl="https://jsonplaceholder.typicode.com/users"
                labelKey="name"
                valueKey="id"
                descriptionKey="email"
                placeholder="Buscar usuários..."
                helper="Dados carregados automaticamente da API"
              />
            </CardContent>
          </Card>

          {/* Alert Component */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('component.alert.title')}
                <Badge>{t('common.basic')}</Badge>
              </CardTitle>
              <CardDescription>
                {t('component.alert.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="default" title="Informação">
                Este é um alerta informativo padrão para comunicar informações importantes.
              </Alert>
              
              <Alert variant="success" title="Sucesso">
                Operação realizada com sucesso! Seus dados foram salvos.
              </Alert>
              
              <Alert variant="warning" title="Atenção">
                Verifique as informações antes de continuar com o processo.
              </Alert>
              
              <Alert variant="destructive" title="Erro">
                Ocorreu um erro ao processar sua solicitação. Tente novamente.
              </Alert>
            </CardContent>
          </Card>

          {/* Toast Component */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('component.toast.title')}
                <Badge>{t('common.intermediate')}</Badge>
              </CardTitle>
              <CardDescription>
                {t('component.toast.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">
                  Clique nos botões abaixo para testar as diferentes variantes de toast:
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => success("Dados salvos com sucesso!")}
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    Sucesso
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => error("Erro ao processar dados!")}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Erro
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => warning("Atenção aos campos obrigatórios!")}
                    className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                  >
                    Aviso
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => info("Nova versão disponível")}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    Info
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    💡 Toast personalizado também disponível usando Toast.show() com opções avançadas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SweetAlert Component */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('component.sweetalert.title')}
                <Badge>{t('common.advanced')}</Badge>
              </CardTitle>
              <CardDescription>
                {t('component.sweetalert.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">
                  Clique nos botões abaixo para testar os diferentes tipos de SweetAlert:
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fire({
                      title: t('sweetalert.example.success.title'),
                      text: t('sweetalert.example.success.text'),
                      type: 'success',
                      showCancelButton: false,
                      confirmButtonText: 'OK'
                    })}
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    Sucesso
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fire({
                      title: t('sweetalert.example.error.title'),
                      text: t('sweetalert.example.error.text'),
                      type: 'error',
                      showCancelButton: false,
                      confirmButtonText: 'OK'
                    })}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Erro
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fire({
                      title: t('sweetalert.example.warning.title'),
                      text: t('sweetalert.example.warning.text'),
                      type: 'warning',
                      showCancelButton: false,
                      confirmButtonText: 'OK'
                    })}
                    className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                  >
                    Aviso
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fire({
                      title: t('sweetalert.example.info.title'),
                      text: t('sweetalert.example.info.text'),
                      type: 'info',
                      showCancelButton: false,
                      confirmButtonText: 'OK'
                    })}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    Info
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fire({
                      title: t('sweetalert.example.basic.title'),
                      text: t('sweetalert.example.basic.text'),
                      type: 'question',
                      onConfirm: () => {
                        fire({
                          title: t('sweetalert.example.confirmed.title'),
                          type: 'success',
                          showCancelButton: false
                        });
                      }
                    })}
                    className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  >
                    Confirmação
                  </Button>

                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fire({
                      title: t('sweetalert.example.input.title'),
                      text: t('sweetalert.example.input.text'),
                      showInput: true,
                      inputPlaceholder: t('sweetalert.example.input.placeholder'),
                      onConfirm: (inputValue) => {
                        if (inputValue) {
                          fire({
                            title: t('sweetalert.example.input.success'),
                            text: `${t('sweetalert.example.input.entered')}: ${inputValue}`,
                            type: 'success',
                            showCancelButton: false
                          });
                        }
                      }
                    })}
                    className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                  >
                    Com Input
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    ✨ SweetAlert suporta operações assíncronas, diferentes tipos visuais e entradas personalizadas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Novos Botões Corporativos */}
        <Card className="gradient-card border-card-border shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Botões Corporativos
              <Badge>Novo</Badge>
            </CardTitle>
            <CardDescription>
              Estilos de botões baseados em interfaces corporativas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Variantes Corporativas</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="crear" className="uppercase text-xs px-6 py-3">
                    Crear Vehículo
                  </Button>
                  <Button variant="limpiar" className="uppercase text-xs px-6 py-3">
                    Limpiar
                  </Button>
                  <Button variant="consultar" className="uppercase text-xs px-6 py-3">
                    Consultar
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Tamanhos Diferentes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="crear" size="sm" className="uppercase text-xs">
                    Pequeno
                  </Button>
                  <Button variant="limpiar" size="default" className="uppercase text-xs">
                    Padrão
                  </Button>
                  <Button variant="consultar" size="lg" className="uppercase text-xs">
                    Grande
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Com Ícones</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="crear" className="uppercase text-xs px-6 py-3">
                    <Plus className="h-4 w-4" />
                    Crear Vehículo
                  </Button>
                  <Button variant="limpiar" className="uppercase text-xs px-6 py-3">
                    <RotateCcw className="h-4 w-4" />
                    Limpiar
                  </Button>
                  <Button variant="consultar" className="uppercase text-xs px-6 py-3">
                    <SearchIcon className="h-4 w-4" />
                    Consultar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Full Width Components */}
        <div className="space-y-8">
          
          {/* DataTable Component */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                DataTable
                <Badge>Avançado</Badge>
              </CardTitle>
              <CardDescription>
                Tabela de dados com paginação, ordenação e filtragem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={sortedUsers}
                columns={userColumns}
                pageSize={3}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                sortKey={tableSort?.key}
                sortDirection={tableSort?.direction}
                onSort={handleTableSort}
                variant="striped"
              />
            </CardContent>
          </Card>

          {/* FileUpload Component */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                FileUpload
                <Badge>Arquivo</Badge>
              </CardTitle>
              <CardDescription>
                Upload de arquivos com drag & drop e preview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Dropzone</h4>
                  <FileUpload
                    label="Upload de Imagens"
                    accept="image/*"
                    multiple={true}
                    maxFiles={3}
                    onFilesChange={handleFileChange}
                    helper="Arraste imagens aqui ou clique para selecionar"
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Botão</h4>
                  <FileUpload
                    label="Documentos"
                    variant="button"
                    accept=".pdf,.doc,.docx"
                    onFilesChange={handleFileChange}
                    helper="Apenas documentos PDF e Word"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LightBox Component */}
          <Card className="gradient-card border-card-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                LightBox / Modal
                <Badge>Novo</Badge>
              </CardTitle>
              <CardDescription>
                Modal corporativo com formulário completo baseado na interface de referência
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-4">Modal Corporativo</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Exemplo de modal com formulário de registro de viagens, seguindo o padrão da interface corporativa.
                  </p>
                  <Button 
                    variant="crear" 
                    className="uppercase text-xs px-6 py-3"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Abrir Modal de Registro
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <h5 className="font-medium text-sm mb-2">Tamanhos</h5>
                    <p className="text-xs text-muted-foreground">sm, md, lg, xl, full</p>
                  </div>
                  <div className="text-center">
                    <h5 className="font-medium text-sm mb-2">Funcionalidades</h5>
                    <p className="text-xs text-muted-foreground">Overlay, ESC key, Outside click</p>
                  </div>
                  <div className="text-center">
                    <h5 className="font-medium text-sm mb-2">Animações</h5>
                    <p className="text-xs text-muted-foreground">Fade + Scale suaves</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground">
            Biblioteca de Componentes • Construída com ❤️ usando React e Tailwind CSS
          </p>
        </div>
      </div>

      {/* Modal Instance */}
      <FormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* LinhaTrajetoSelector Component */}
      <Card className="gradient-card border-card-border shadow-medium lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t('component.linhatrajeto.title')}
            <Badge>{t('common.advanced')}</Badge>
          </CardTitle>
          <CardDescription>
            {t('component.linhatrajeto.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LinhaTrajetoSelector
            linhas={sampleLinhas}
            selectedLinhaId={selectedLinhaId}
            selectedTrajetoIds={selectedTrajetoIds}
            onLinhaChange={(linha) => {
              setSelectedLinhaId(linha?._id || '');
              success(`Linha selecionada: ${linha?.descr || 'Nenhuma'}`);
            }}
            onTrajetoChange={(trajetos) => {
              setSelectedTrajetoIds(trajetos.map(t => t._id));
              success(`${trajetos.length} trajeto(s) selecionado(s)`);
            }}
            linhaPlaceholder="Selecione uma linha de ônibus..."
            trajetoPlaceholder="Selecione trajetos..."
            linhaLabel="Linha de Ônibus"
            trajetoLabel="Trajetos"
            size="md"
            className="space-y-4"
            multiSelectTrajeto={true}
          />
          
          {selectedLinhaId && selectedTrajetoIds.length > 0 && (
            <Alert variant="success" title="Seleção Completa">
              Linha e {selectedTrajetoIds.length} trajeto(s) selecionados com sucesso!
            </Alert>
          )}
        </CardContent>
      </Card>
      
      {/* SweetAlert Instance */}
      <SweetAlertComponent />
    </div>
  );
};

export default Index;