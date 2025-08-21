import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Edit2, Trash2, UserCheck, Phone, Mail, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  bio: string;
  avatar?: string;
  active: boolean;
  joinDate: string;
}

const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@bobbarber.com",
    phone: "(11) 99999-9999",
    specialties: ["Corte Masculino", "Barba"],
    bio: "Barbeiro experiente com mais de 10 anos no ramo",
    active: true,
    joinDate: "2024-01-15",
  },
  {
    id: "2", 
    name: "Pedro Santos",
    email: "pedro@bobbarber.com",
    phone: "(11) 88888-8888",
    specialties: ["Corte Feminino", "Sobrancelha"],
    bio: "Especialista em cortes modernos e design de sobrancelhas",
    active: true,
    joinDate: "2024-02-01",
  },
];

const availableSpecialties = [
  "Corte Masculino",
  "Corte Feminino", 
  "Barba",
  "Sobrancelha",
  "Bigode",
  "Corte + Barba",
  "Tratamentos Capilares"
];

export default function Profissionais() {
  const [professionals, setProfessionals] = useState<Professional[]>(mockProfessionals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialties: [] as string[],
    bio: "",
  });
  const { toast } = useToast();

  const handleSaveProfessional = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const professionalData = {
      id: editingProfessional?.id || Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      specialties: formData.specialties,
      bio: formData.bio,
      active: true,
      joinDate: editingProfessional?.joinDate || new Date().toISOString().split('T')[0],
    };

    if (editingProfessional) {
      setProfessionals(professionals.map(p => p.id === editingProfessional.id ? professionalData : p));
      toast({
        title: "Sucesso",
        description: "Profissional atualizado com sucesso!",
      });
    } else {
      setProfessionals([...professionals, professionalData]);
      toast({
        title: "Sucesso", 
        description: "Profissional cadastrado com sucesso!",
      });
    }

    setIsDialogOpen(false);
    setEditingProfessional(null);
    setFormData({ name: "", email: "", phone: "", specialties: [], bio: "" });
  };

  const handleEditProfessional = (professional: Professional) => {
    setEditingProfessional(professional);
    setFormData({
      name: professional.name,
      email: professional.email,
      phone: professional.phone,
      specialties: professional.specialties,
      bio: professional.bio,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteProfessional = (professionalId: string) => {
    setProfessionals(professionals.filter(p => p.id !== professionalId));
    toast({
      title: "Sucesso",
      description: "Profissional removido com sucesso!",
    });
  };

  const handleNewProfessional = () => {
    setEditingProfessional(null);
    setFormData({ name: "", email: "", phone: "", specialties: [], bio: "" });
    setIsDialogOpen(true);
  };

  const handleSpecialtyToggle = (specialty: string) => {
    const currentSpecialties = formData.specialties;
    if (currentSpecialties.includes(specialty)) {
      setFormData({
        ...formData,
        specialties: currentSpecialties.filter(s => s !== specialty)
      });
    } else {
      setFormData({
        ...formData,
        specialties: [...currentSpecialties, specialty]
      });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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
                <h2 className="text-3xl font-bold tracking-tight">Profissionais</h2>
                <p className="text-muted-foreground">
                  Gerencie os profissionais da sua barbearia
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleNewProfessional}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Profissional
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProfessional ? "Editar Profissional" : "Novo Profissional"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingProfessional 
                        ? "Edite as informações do profissional" 
                        : "Cadastre um novo profissional na sua barbearia"
                      }
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Ex: João Silva"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="joao@bobbarber.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Especialidades</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {availableSpecialties.map((specialty) => (
                          <div key={specialty} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={specialty}
                              checked={formData.specialties.includes(specialty)}
                              onChange={() => handleSpecialtyToggle(specialty)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label htmlFor={specialty} className="text-sm">
                              {specialty}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Biografia (opcional)</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        placeholder="Conte um pouco sobre a experiência do profissional..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveProfessional}>
                      {editingProfessional ? "Salvar" : "Cadastrar"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {professionals.map((professional) => (
                <Card key={professional.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={professional.avatar} />
                        <AvatarFallback>{getInitials(professional.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-sm font-medium">
                          {professional.name}
                        </CardTitle>
                        <Badge 
                          variant={professional.active ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {professional.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProfessional(professional)}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProfessional(professional.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{professional.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>{professional.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Desde {new Date(professional.joinDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      
                      {professional.bio && (
                        <CardDescription className="text-xs">
                          {professional.bio}
                        </CardDescription>
                      )}
                      
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Especialidades:</p>
                        <div className="flex flex-wrap gap-1">
                          {professional.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {professionals.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <UserCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhum profissional cadastrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Comece adicionando os profissionais da sua barbearia
                  </p>
                  <Button onClick={handleNewProfessional}>
                    <Plus className="mr-2 h-4 w-4" />
                    Cadastrar Primeiro Profissional
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