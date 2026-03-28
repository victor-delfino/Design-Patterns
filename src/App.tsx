import { DatabaseConnectionDemo } from "./patterns/creational/singleton"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import { VehicleFactoryDemo } from "./patterns/creational/factory"
import { QueryBuilderDemo } from "./patterns/creational/builder"
import {  PaymentAdapterDemo } from "./patterns/structural/adapter"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/singleton" element={<DatabaseConnectionDemo />} />
          <Route path="/factory" element={<VehicleFactoryDemo />} />
          <Route path="/builder" element={<QueryBuilderDemo />} />
          <Route path="/adapter" element={<PaymentAdapterDemo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

