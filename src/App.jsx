import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useExpenses } from "./context/ExpenseContext"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import AddExpense from "./pages/AddExpense"
import History from "./pages/History"

function App() {
  const { darkMode } = useExpenses()

  return (
    <div className={darkMode ? "dark bg-gray-900 min-h-screen" : "bg-gray-100 min-h-screen"}>
      <BrowserRouter>
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddExpense />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App