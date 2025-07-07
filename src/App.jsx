import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import Detailweather from "./pages/Detailweather"
import { GlobalProvider } from "./context/GlobalContext"

// App principale: gestisce il routing e il context globale
function App() {
  return (
    <>
      {/* Provider globale per emoji e fetch meteo */}
      <GlobalProvider>
        {/* Router principale dell'app */}
        <BrowserRouter>
          <Routes>
            {/* Layout di default con Navbar e Outlet */}
            <Route element={<DefaultLayout />}>
              {/* Homepage con elenco città */}
              <Route path="/" element={<HomePage />} />
              {/* Pagina di dettaglio meteo per città */}
              <Route path="/dettaglio/:city/:country" element={<Detailweather />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
