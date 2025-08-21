import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Store, 
  Bell, 
  MessageSquare, 
  Calendar, 
  Users, 
  Palette,
  Shield,
  Save,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Configuracoes() {
  const [settings, setSettings] = useState({
    // Informações Gerais
    businessName: "Bob Barber",
    businessDescription: "A melhor barbearia da cidade",
    businessPhone: "(11) 99999-9999",
    businessEmail: "contato@bobbarber.com",
    businessAddress: "Rua das Flores, 123 - Centro",
    businessHours: {
      monday: { open: "08:00", close: "18:00", closed: false },
      tuesday: { open: "08:00", close: "18:00", closed: false },
      wednesday: { open: "08:00", close: "18:00", closed: false },
      thursday: { open: "08:00", close: "18:00", closed: false },
      friday: { open: "08:00", close: "18:00", closed: false },
      saturday: { open: "08:00", close: "16:00", closed: false },
      sunday: { open: "09:00", close: "14:00", closed: true },
    },
    
    // Notificações
    emailNotifications: true,
    smsNotifications: true,
    whatsAppNotifications: true,
    appointmentReminders: true,
    marketingEmails: false,
    
    // WhatsApp
    whatsAppWebhookUrl: "",
    whatsAppToken: "",
    whatsAppAutoReply: true,
    whatsAppAutoReplyMessage: "Olá! Obrigado pelo contato. Em breve retornaremos sua mensagem.",
    
    // Agendamentos
    allowOnlineBooking: true,
    requireConfirmation: true,
    maxAdvanceBookingDays: 30,
    minAdvanceBookingHours: 2,
    defaultAppointmentDuration: 30,
    
    // Sistema
    theme: "light",
    language: "pt-BR",
    timezone: "America/Sao_Paulo",
    currency: "BRL",
  });

  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Aqui você salvaria as configurações no backend
    toast({
      title: "Sucesso",
      description: "Configurações salvas com sucesso!",
    });
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const weekDays = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
                <p className="text-muted-foreground">
                  Gerencie as configurações da sua barbearia
                </p>
              </div>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="general">
                  <Store className="h-4 w-4 mr-2" />
                  Geral
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger value="whatsapp">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp
                </TabsTrigger>
                <TabsTrigger value="appointments">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendamentos
                </TabsTrigger>
                <TabsTrigger value="system">
                  <Settings className="h-4 w-4 mr-2" />
                  Sistema
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="h-4 w-4 mr-2" />
                  Segurança
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Negócio</CardTitle>
                    <CardDescription>
                      Configure as informações básicas da sua barbearia
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Nome da Barbearia</Label>
                        <Input
                          id="businessName"
                          value={settings.businessName}
                          onChange={(e) => handleSettingChange('businessName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessPhone">Telefone</Label>
                        <Input
                          id="businessPhone"
                          value={settings.businessPhone}
                          onChange={(e) => handleSettingChange('businessPhone', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessEmail">E-mail</Label>
                        <Input
                          id="businessEmail"
                          type="email"
                          value={settings.businessEmail}
                          onChange={(e) => handleSettingChange('businessEmail', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessAddress">Endereço</Label>
                        <Input
                          id="businessAddress"
                          value={settings.businessAddress}
                          onChange={(e) => handleSettingChange('businessAddress', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessDescription">Descrição</Label>
                      <Textarea
                        id="businessDescription"
                        value={settings.businessDescription}
                        onChange={(e) => handleSettingChange('businessDescription', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Horário de Funcionamento</CardTitle>
                    <CardDescription>
                      Configure os horários de funcionamento para cada dia da semana
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {weekDays.map((day) => (
                      <div key={day.key} className="flex items-center justify-between space-x-4">
                        <div className="w-32">
                          <Label>{day.label}</Label>
                        </div>
                        <div className="flex items-center space-x-2 flex-1">
                          <Switch
                            checked={!settings.businessHours[day.key as keyof typeof settings.businessHours].closed}
                            onCheckedChange={(checked) => {
                              const newHours = { ...settings.businessHours };
                              newHours[day.key as keyof typeof newHours].closed = !checked;
                              handleSettingChange('businessHours', newHours);
                            }}
                          />
                          {!settings.businessHours[day.key as keyof typeof settings.businessHours].closed ? (
                            <>
                              <Input
                                type="time"
                                value={settings.businessHours[day.key as keyof typeof settings.businessHours].open}
                                onChange={(e) => {
                                  const newHours = { ...settings.businessHours };
                                  newHours[day.key as keyof typeof newHours].open = e.target.value;
                                  handleSettingChange('businessHours', newHours);
                                }}
                                className="w-32"
                              />
                              <span className="text-muted-foreground">às</span>
                              <Input
                                type="time"
                                value={settings.businessHours[day.key as keyof typeof settings.businessHours].close}
                                onChange={(e) => {
                                  const newHours = { ...settings.businessHours };
                                  newHours[day.key as keyof typeof newHours].close = e.target.value;
                                  handleSettingChange('businessHours', newHours);
                                }}
                                className="w-32"
                              />
                            </>
                          ) : (
                            <Badge variant="secondary">Fechado</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências de Notificação</CardTitle>
                    <CardDescription>
                      Configure como deseja receber notificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Notificações por E-mail</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações importantes por e-mail
                        </p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsNotifications">Notificações por SMS</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações urgentes por SMS
                        </p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="whatsAppNotifications">Notificações WhatsApp</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações pelo WhatsApp
                        </p>
                      </div>
                      <Switch
                        id="whatsAppNotifications"
                        checked={settings.whatsAppNotifications}
                        onCheckedChange={(checked) => handleSettingChange('whatsAppNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="appointmentReminders">Lembretes de Agendamento</Label>
                        <p className="text-sm text-muted-foreground">
                          Envie lembretes automáticos para clientes
                        </p>
                      </div>
                      <Switch
                        id="appointmentReminders"
                        checked={settings.appointmentReminders}
                        onCheckedChange={(checked) => handleSettingChange('appointmentReminders', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="whatsapp" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Integração WhatsApp</CardTitle>
                    <CardDescription>
                      Configure a integração com WhatsApp via webhook N8N
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="whatsAppWebhookUrl">URL do Webhook N8N</Label>
                      <Input
                        id="whatsAppWebhookUrl"
                        placeholder="https://n8n.yourdomain.com/webhook/whatsapp"
                        value={settings.whatsAppWebhookUrl}
                        onChange={(e) => handleSettingChange('whatsAppWebhookUrl', e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        URL do webhook do N8N para receber mensagens do WhatsApp
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsAppToken">Token de Autenticação</Label>
                      <Input
                        id="whatsAppToken"
                        type="password"
                        placeholder="Token de segurança"
                        value={settings.whatsAppToken}
                        onChange={(e) => handleSettingChange('whatsAppToken', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="whatsAppAutoReply">Resposta Automática</Label>
                        <p className="text-sm text-muted-foreground">
                          Envie uma resposta automática para novas mensagens
                        </p>
                      </div>
                      <Switch
                        id="whatsAppAutoReply"
                        checked={settings.whatsAppAutoReply}
                        onCheckedChange={(checked) => handleSettingChange('whatsAppAutoReply', checked)}
                      />
                    </div>
                    {settings.whatsAppAutoReply && (
                      <div className="space-y-2">
                        <Label htmlFor="whatsAppAutoReplyMessage">Mensagem de Resposta Automática</Label>
                        <Textarea
                          id="whatsAppAutoReplyMessage"
                          value={settings.whatsAppAutoReplyMessage}
                          onChange={(e) => handleSettingChange('whatsAppAutoReplyMessage', e.target.value)}
                          rows={3}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Agendamento</CardTitle>
                    <CardDescription>
                      Configure as regras para agendamentos online
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowOnlineBooking">Agendamento Online</Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir que clientes façam agendamentos online
                        </p>
                      </div>
                      <Switch
                        id="allowOnlineBooking"
                        checked={settings.allowOnlineBooking}
                        onCheckedChange={(checked) => handleSettingChange('allowOnlineBooking', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="requireConfirmation">Confirmação Obrigatória</Label>
                        <p className="text-sm text-muted-foreground">
                          Agendamentos precisam ser confirmados
                        </p>
                      </div>
                      <Switch
                        id="requireConfirmation"
                        checked={settings.requireConfirmation}
                        onCheckedChange={(checked) => handleSettingChange('requireConfirmation', checked)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="maxAdvanceBookingDays">Máximo de Dias para Agendamento</Label>
                        <Input
                          id="maxAdvanceBookingDays"
                          type="number"
                          value={settings.maxAdvanceBookingDays}
                          onChange={(e) => handleSettingChange('maxAdvanceBookingDays', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minAdvanceBookingHours">Mínimo de Horas de Antecedência</Label>
                        <Input
                          id="minAdvanceBookingHours"
                          type="number"
                          value={settings.minAdvanceBookingHours}
                          onChange={(e) => handleSettingChange('minAdvanceBookingHours', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="defaultAppointmentDuration">Duração Padrão (minutos)</Label>
                      <Input
                        id="defaultAppointmentDuration"
                        type="number"
                        value={settings.defaultAppointmentDuration}
                        onChange={(e) => handleSettingChange('defaultAppointmentDuration', parseInt(e.target.value))}
                        className="w-32"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações do Sistema</CardTitle>
                    <CardDescription>
                      Configure preferências gerais do sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Tema</Label>
                        <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Claro</SelectItem>
                            <SelectItem value="dark">Escuro</SelectItem>
                            <SelectItem value="system">Sistema</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                            <SelectItem value="en-US">English (US)</SelectItem>
                            <SelectItem value="es-ES">Español</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Fuso Horário</Label>
                        <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                            <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                            <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Moeda</Label>
                        <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BRL">Real (R$)</SelectItem>
                            <SelectItem value="USD">Dólar ($)</SelectItem>
                            <SelectItem value="EUR">Euro (€)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Segurança</CardTitle>
                    <CardDescription>
                      Gerencie configurações de segurança e privacidade
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="mr-2 h-4 w-4" />
                        Alterar Senha
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        Gerenciar Usuários
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Log de Atividades
                      </Button>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Recomendações de Segurança</h4>
                          <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                            <li>• Use senhas fortes e únicas</li>
                            <li>• Ative a autenticação de dois fatores</li>
                            <li>• Revise regularmente as permissões de usuário</li>
                            <li>• Mantenha o sistema sempre atualizado</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}