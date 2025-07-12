
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const clientsAppointmentsData = [
  { month: "Jan", clientes: 0, agendamentos: 0 },
  { month: "Fev", clientes: 0, agendamentos: 0 },
  { month: "Mar", clientes: 0, agendamentos: 0 },
  { month: "Abr", clientes: 0, agendamentos: 0 },
  { month: "Mai", clientes: 1, agendamentos: 1 },
  { month: "Jun", clientes: 0, agendamentos: 0 },
  { month: "Jul", clientes: 0, agendamentos: 0 },
  { month: "Ago", clientes: 0, agendamentos: 0 },
  { month: "Set", clientes: 0, agendamentos: 0 },
  { month: "Out", clientes: 0, agendamentos: 0 },
  { month: "Nov", clientes: 0, agendamentos: 0 },
  { month: "Dez", clientes: 0, agendamentos: 0 },
];

const professionalsData = [
  { name: "Maria", value: 80, color: "#FF6B7A" },
  { name: "Matheus", value: 15, color: "#4ECDC4" },
  { name: "Michael", value: 5, color: "#45B7D1" },
];

const revenueData = [
  { month: "Jan", previsto: 0, confirmado: 0 },
  { month: "Fev", previsto: 0, confirmado: 0 },
  { month: "Mar", previsto: 0, confirmado: 0 },
  { month: "Abr", previsto: 0, confirmado: 0 },
  { month: "Mai", previsto: 15, confirmado: 0 },
  { month: "Jun", previsto: 0, confirmado: 0 },
  { month: "Jul", previsto: 0, confirmado: 0 },
  { month: "Ago", previsto: 0, confirmado: 0 },
  { month: "Set", previsto: 0, confirmado: 0 },
  { month: "Out", previsto: 0, confirmado: 0 },
  { month: "Nov", previsto: 0, confirmado: 0 },
  { month: "Dez", previsto: 0, confirmado: 0 },
];

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Clientes e Agendamentos Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Clientes e agendamentos - Anual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clientsAppointmentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clientes" fill="#4ECDC4" name="Clientes" />
              <Bar dataKey="agendamentos" fill="#45B7D1" name="Agendamentos" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Agendamentos por Profissional */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Agendamentos por profissional
          </CardTitle>
          <Select defaultValue="month">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={professionalsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {professionalsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {professionalsData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Faturamento Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Faturamento - Anual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`R$ ${value}`, '']}
              />
              <Bar dataKey="previsto" fill="#FFE066" name="Previsto" />
              <Bar dataKey="confirmado" fill="#4ECDC4" name="Confirmado" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
