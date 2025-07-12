
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";

const Agendamentos = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <DashboardHeader />
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Agendamentos</h1>
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-600">Sistema de agendamentos será implementado aqui.</p>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Agendamentos;
