import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Historicos from "./pages/Historicos";
import HistoricoDetalhe from "./pages/HistoricoDetalhe";
import CalcularImpacto from "./pages/CalcularImpacto";
import NotFound from "./pages/NotFound";
import Thornado from "./pages/rag/Thornado";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Index />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/historicos" element={<Historicos />} />
              <Route path="/historicos/:id" element={<HistoricoDetalhe />} />
              <Route
                path="/historicos/:id/calcular-impacto"
                element={<CalcularImpacto />}
              />
              <Route path="/rag" element={<Thornado />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
