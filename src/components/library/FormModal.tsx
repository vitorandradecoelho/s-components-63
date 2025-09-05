import React from "react";
import { LightBox } from "./LightBox";
import { Button } from "@/components/ui/button";
import { Input } from "./Input";
import { Select } from "./Select";
import { TextField } from "./TextField";
import { CheckBox } from "./CheckBox";
import { Calendar, Clock } from "lucide-react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = React.useState({
    servicio: "",
    ruta: "",
    fechaInicio: "",
    horaInicio: "",
    fechaFin: "",
    horaFin: "",
    vehiculo: "",
    conductor: "",
    llegadaParadero: "",
    horaLlegada: "",
    numeroPassageiros: "",
    causasPredefinidas: "",
    observacion: "",
    asignarViaje: false
  });

  const servicioOptions = [
    { label: "Consulte por el Servicio", value: "consulte" },
    { label: "Servicio Ejecutivo", value: "ejecutivo" },
    { label: "Servicio Regular", value: "regular" },
    { label: "Servicio Express", value: "express" }
  ];

  const rutaOptions = [
    { label: "Consulte por la Ruta", value: "consulte" },
    { label: "Ruta Centro", value: "centro" },
    { label: "Ruta Norte", value: "norte" },
    { label: "Ruta Sur", value: "sur" }
  ];

  const vehiculoOptions = [
    { label: "Seleccione", value: "" },
    { label: "Bus 001", value: "bus001" },
    { label: "Bus 002", value: "bus002" },
    { label: "Van 001", value: "van001" }
  ];

  const conductorOptions = [
    { label: "Seleccione un Co.", value: "" },
    { label: "João Silva", value: "joao" },
    { label: "Maria Santos", value: "maria" },
    { label: "Carlos Oliveira", value: "carlos" }
  ];

  const causasOptions = [
    { label: "Seleccione", value: "" },
    { label: "Tráfico Pesado", value: "trafico" },
    { label: "Condições Climáticas", value: "clima" },
    { label: "Manutenção", value: "manutencao" }
  ];

  const handleSubmit = (action: 'save' | 'saveAndAssign') => {
    console.log(`${action}:`, formData);
    onClose();
  };

  const footer = (
    <div className="flex gap-3">
      <Button 
        variant="crear" 
        className="uppercase text-xs px-6"
        onClick={() => handleSubmit('saveAndAssign')}
      >
        Guardar y Asignar
      </Button>
      <Button 
        variant="consultar" 
        className="uppercase text-xs px-6"
        onClick={() => handleSubmit('save')}
      >
        Guardar
      </Button>
      <Button 
        variant="limpiar" 
        className="uppercase text-xs px-6"
        onClick={onClose}
      >
        Cancelar
      </Button>
    </div>
  );

  return (
    <LightBox
      isOpen={isOpen}
      onClose={onClose}
      title="REGISTRAR VIAJES"
      size="lg"
      footer={footer}
    >
      <form className="space-y-6">
        {/* Primeira linha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Servicio *"
            options={servicioOptions}
            value={formData.servicio}
            onValueChange={(value) => setFormData(prev => ({ ...prev, servicio: value }))}
            placeholder="Consulte por el Servicio"
          />
          
          <Select
            label="Ruta *"
            options={rutaOptions}
            value={formData.ruta}
            onValueChange={(value) => setFormData(prev => ({ ...prev, ruta: value }))}
            placeholder="Consulte por la Ruta"
          />
        </div>

        {/* Data e Hora */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Fecha Inicio:</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                value={formData.fechaInicio}
                onChange={(e) => setFormData(prev => ({ ...prev, fechaInicio: e.target.value }))}
                leftIcon={<Calendar className="h-4 w-4" />}
              />
              <Input
                type="time"
                value={formData.horaInicio}
                onChange={(e) => setFormData(prev => ({ ...prev, horaInicio: e.target.value }))}
                leftIcon={<Clock className="h-4 w-4" />}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm">Fecha Fin:</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                value={formData.fechaFin}
                onChange={(e) => setFormData(prev => ({ ...prev, fechaFin: e.target.value }))}
                leftIcon={<Calendar className="h-4 w-4" />}
              />
              <Input
                type="time"
                value={formData.horaFin}
                onChange={(e) => setFormData(prev => ({ ...prev, horaFin: e.target.value }))}
                leftIcon={<Clock className="h-4 w-4" />}
              />
            </div>
          </div>
        </div>

        {/* Vehículo e Conductor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Vehículo"
            options={vehiculoOptions}
            value={formData.vehiculo}
            onValueChange={(value) => setFormData(prev => ({ ...prev, vehiculo: value }))}
            placeholder="Seleccione"
          />
          
          <Select
            label="Conductor"
            options={conductorOptions}
            value={formData.conductor}
            onValueChange={(value) => setFormData(prev => ({ ...prev, conductor: value }))}
            placeholder="Seleccione un Co."
          />
        </div>

        {/* Llegada al paradero */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Llegada al paradero:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="date"
              value={formData.llegadaParadero}
              onChange={(e) => setFormData(prev => ({ ...prev, llegadaParadero: e.target.value }))}
              leftIcon={<Calendar className="h-4 w-4" />}
            />
            <Input
              type="time"
              value={formData.horaLlegada}
              onChange={(e) => setFormData(prev => ({ ...prev, horaLlegada: e.target.value }))}
              leftIcon={<Clock className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Switch e Número de passageiros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <CheckBox
            label="Asignar viaje"
            checked={formData.asignarViaje}
            onChange={(e) => setFormData(prev => ({ ...prev, asignarViaje: e.target.checked }))}
          />
          
          <Input
            label="Número de Pasajeros"
            type="number"
            placeholder="Número de Pasajeros"
            value={formData.numeroPassageiros}
            onChange={(e) => setFormData(prev => ({ ...prev, numeroPassageiros: e.target.value }))}
          />
        </div>

        {/* Causas Predefinidas */}
        <Select
          label="Causas Predefinidas"
          options={causasOptions}
          value={formData.causasPredefinidas}
          onValueChange={(value) => setFormData(prev => ({ ...prev, causasPredefinidas: value }))}
          placeholder="Seleccione"
        />

        {/* Observación */}
        <TextField
          label="Observación"
          placeholder="Observación"
          value={formData.observacion}
          onChange={(e) => setFormData(prev => ({ ...prev, observacion: e.target.value }))}
          rows={4}
        />

        <p className="text-xs text-muted-foreground">* Campos Obligatorios</p>
      </form>
    </LightBox>
  );
};

export { FormModal };