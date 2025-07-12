
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, CalendarCheck, DollarSign } from "lucide-react";

const statsData = [
  {
    title: "Total de Clientes",
    value: "1",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Clientes últimos 30 dias",
    value: "1",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Agendamentos hoje",
    value: "1",
    icon: CalendarCheck,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Faturamento do Mês",
    value: "R$ 0,00",
    icon: DollarSign,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
