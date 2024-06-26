import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { GeneralContext } from "./contextos/GeneralContext";
import "./App.css";
import { LoginPagina } from "./paginas/LoginPagina/LoginPagina";
import { InicioPagina } from "./paginas/InicioPagina/InicioPagina";
import { AdministradoresPagina } from "./paginas/AdministradoresPaginas/AdministradoresPagina";
import { AdministradorPagina } from "./paginas/AdministradoresPaginas/AdministradorPagina";
import { TrabajadorPagina } from "./paginas/TrabajadoresPaginas/TrabajadorPagina";
import { TrabajadoresPagina } from "./paginas/TrabajadoresPaginas/TrabajadoresPagina";
import { GruposPagina } from "./paginas/GruposPaginas/GruposPagina";
import { GrupoPagina } from "./paginas/GruposPaginas/GrupoPagina";
import { FichajesPagina } from "./paginas/FichajesPaginas/FichajesPagina";
import { FichajePagina } from "./paginas/FichajesPaginas/FichajePagina"
import { PerfilPagina } from "./paginas/PerfilPagina/PerfilPagina";
import { EditarPerfilPagina } from "./paginas/PerfilPagina/EditarPerfilPagina";

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
            <Route path="/trabajadores" element={<TrabajadoresPagina />} />
            <Route path="/trabajador/" element={<TrabajadorPagina />} />
            <Route path="/trabajador/:trabajadorId" element={<TrabajadorPagina />} />
            <Route path="/grupos" element={<GruposPagina />} />
            <Route path="/grupo/" element={<GrupoPagina />} />
            <Route path="/grupo/:grupoId" element={<GrupoPagina />} />
            <Route path="/fichajes/" element={<FichajesPagina />} />
            <Route path="/fichaje/" element={<FichajePagina />} />
            <Route path="/fichaje/:fichajeId" element={<FichajePagina />} />
            <Route path="/perfil" element={<PerfilPagina />} />
            <Route path="/perfil/:trabajadorId" element={<EditarPerfilPagina />} />
          </Routes>
        </QueryClientProvider>
      </GeneralContext>
    </>
  );
}

export default App;
