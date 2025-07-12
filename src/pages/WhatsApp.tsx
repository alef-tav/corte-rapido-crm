
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MessageSquare, Webhook } from "lucide-react";

const WhatsApp = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <DashboardHeader />
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Integração WhatsApp</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Configuração WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="whatsapp-token">Token do WhatsApp</Label>
                    <Input 
                      id="whatsapp-token"
                      placeholder="Cole seu token do WhatsApp aqui"
                      type="password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone-number">Número do Telefone</Label>
                    <Input 
                      id="phone-number"
                      placeholder="+55 11 99999-9999"
                    />
                  </div>
                  <Button className="w-full">
                    Conectar WhatsApp
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Webhook className="h-5 w-5" />
                    Webhook n8n
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="webhook-url">URL do Webhook</Label>
                    <Input 
                      id="webhook-url"
                      placeholder="https://seu-n8n.com/webhook/whatsapp"
                    />
                  </div>
                  <div>
                    <Label htmlFor="webhook-secret">Chave Secreta</Label>
                    <Input 
                      id="webhook-secret"
                      placeholder="Cole sua chave secreta aqui"
                      type="password"
                    />
                  </div>
                  <Button className="w-full" variant="outline">
                    Testar Webhook
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Mensagens Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>Nenhuma mensagem ainda. Configure o webhook para começar a receber mensagens.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default WhatsApp;
