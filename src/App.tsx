import { DatabaseConnectionDemo } from "./patterns/creational/singleton"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import { VehicleFactoryDemo } from "./patterns/creational/factory"
import { QueryBuilderDemo } from "./patterns/creational/builder"
import {  PaymentAdapterDemo } from "./patterns/structural/adapter"
import { HttpDecoratorDemo } from "./patterns/structural/decorator"
import { OrderFacadeDemo } from "./patterns/structural/facade"
import { StockMarketDemo } from "./patterns/behavioral/observer"
import { ShippingStrategyDemo } from "./patterns/behavioral/strategy"
import { TextEditorDemo } from "./patterns/behavioral/command"
import { WithAuthDemo } from "./patterns/react-specific/hoc"
import { DataFetcherDemo } from "./patterns/react-specific/render-props"
import { AccordionDemo } from "./patterns/react-specific/compound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/singleton" element={<DatabaseConnectionDemo />} />
          <Route path="/factory" element={<VehicleFactoryDemo />} />
          <Route path="/builder" element={<QueryBuilderDemo />} />
          <Route path="/adapter" element={<PaymentAdapterDemo />} />
          <Route path="/decorator" element={<HttpDecoratorDemo />} />
          <Route path="/facade" element={<OrderFacadeDemo />} />
          <Route path="/observer" element={<StockMarketDemo />} />
          <Route path="/strategy" element={<ShippingStrategyDemo />} />
          <Route path="/command" element={<TextEditorDemo />} />
          <Route path="/hoc" element={<WithAuthDemo />} />
          <Route path="/render-props" element={<DataFetcherDemo />} />
          <Route path="/compound" element={<AccordionDemo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

