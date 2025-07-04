import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import Detailweather from "./pages/Detailweather"
import { GlobalProvider } from "./context/GlobalContext"


function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/dettaglio/:city/:country" element={<Detailweather />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>


    </>
  )
}

export default App
