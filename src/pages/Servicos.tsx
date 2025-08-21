import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Scissors, Clock, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  active: boolean;
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Corte Masculino",
    description: "Corte de cabelo masculino tradicional",
    price: 30,
    duration: 30,
    active: true,
  },
  {
    id: "2",
    name: "Barba",
    description: "Aparar e modelar barba",
    price: 20,
    duration: 20,
    active: true,
  },
  {
    id: "3",
    name: "Corte + Barba",
    description: "Combo completo de corte e barba",
    price: 45,
    duration: 45,
    active: true,
  },
  {
    id: "4",
    name: "Sobrancelha",
    description: "Design de sobrancelha masculina",
    price: 15,
    duration: 15,
    active: true,
  },
];

export default function Servicos() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  const { toast } = useToast();

  const handleSaveService = () => {
    if (!formData.name || !formData.price || !formData.duration) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const serviceData = {
      id: editingService?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      active: true,
    };

    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? serviceData : s));
      toast({
        title: "Sucesso",
        description: "Serviço atualizado com sucesso!",
      });
    } else {
      setServices([...services, serviceData]);
      toast({
        title: "Sucesso",
        description: "Serviço criado com sucesso!",
      });
    }

    setIsDialogOpen(false);
    setEditingService(null);
    setFormData({ name: "", description: "", price: "", duration: "" });
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(s => s.id !== serviceId));
    toast({
      title: "Sucesso",
      description: "Serviço removido com sucesso!",
    });
  };

  const handleNewService = () => {
    setEditingService(null);
    setFormData({ name: "", description: "", price: "", duration: "" });
    setIsDialogOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Serviços</h2>
                <p className="text-muted-foreground">
                  Gerencie os serviços oferecidos pela barbearia
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleNewService}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Serviço
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingService ? "Editar Serviço" : "Novo Serviço"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingService 
                        ? "Edite as informações do serviço" 
                        : "Adicione um novo serviço à sua barbearia"
                      }
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome do Serviço</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Ex: Corte Masculino"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Descrição do serviço"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Preço (R$)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          placeholder="30.00"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="duration">Duração (min)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          placeholder="30"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveService}>
                      {editingService ? "Salvar" : "Criar"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      <Scissors className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">
                        {service.name}
                      </CardTitle>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <CardDescription className="text-xs">
                        {service.description}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3 text-green-600" />
                          <span className="text-sm font-medium text-green-600">
                            R$ {service.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-blue-600" />
                          <span className="text-sm text-blue-600">
                            {service.duration}min
                          </span>
                        </div>
                      </div>
                      <Badge 
                        variant={service.active ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {service.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {services.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Scissors className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhum serviço cadastrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Comece adicionando os primeiros serviços da sua barbearia
                  </p>
                  <Button onClick={handleNewService}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Primeiro Serviço
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}