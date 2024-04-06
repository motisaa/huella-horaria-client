import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { GeneralContext } from "./contextos/GeneralContext";
import "./App.css";
import { LoginPagina } from "./paginas/LoginPagina/LoginPagina";
import { InicioPagina } from "./paginas/InicioPagina/InicioPagina";
import { AdministradoresPagina } from "./paginas/AdministradoresPaginas/AdministradoresPaginas";
import { AdministradorPagina } from "./paginas/AdministradoresPaginas/AdministradorPagina";

const queryClient = new QueryClient();

function App() {
  return (
   <>
   <GeneralContext>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LoginPagina />} />
        <Route path="/inicio" element={<InicioPagina />} />
        <Route path="/administradores" element={<AdministradoresPagina />} />
        <Route path="/administrador" element={<AdministradorPagina />} />
        <Route path="/administrador/:adminId" element={<AdministradorPagina />} />
      </Routes>
    </QueryClientProvider>
   </GeneralContext>
   </>
  );
}

export default App;
