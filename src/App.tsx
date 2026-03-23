import { DatabaseConnectionDemo } from "./patterns/creational/singleton"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import { VehicleFactoryDemo } from "./patterns/creational/factory"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/singleton" element={<DatabaseConnectionDemo />} />
          <Route path="/factory" element={<VehicleFactoryDemo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

