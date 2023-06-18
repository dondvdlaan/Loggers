import { ReactElement } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import {LogsOverview} from "./audit/LogsOverview"


export default function Routing(): ReactElement {

    return(
      <Routes>
        <Route path="/overview" element={<LogsOverview />} />
        <Route path="/home"     element={<Home />} />
        <Route path="/"         element={<Navigate to="/home" />} />
      </Routes>
    )
}