import { Link } from "react-router-dom"
import { useExpenses } from "../context/ExpenseContext"

function Navbar() {
  const { darkMode, toggleDarkMode } = useExpenses()

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold"> Spendly</h1>

      <div className="flex gap-6">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/add" className="hover:underline">Add Expense</Link>
        <Link to="/history" className="hover:underline">History</Link>
      </div>

      <button
        onClick={toggleDarkMode}
        className="bg-white text-blue-600 px-3 py-1 rounded font-semibold"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  )
}

export default Navbar