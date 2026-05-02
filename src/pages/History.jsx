import { useState } from "react"
import { useExpenses } from "../context/ExpenseContext"

function History() {
  const { expenses, deleteExpense } = useExpenses()
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")

  const categories = ["All", "Food", "Transport", "Shopping", "Bills", "Health", "Education", "Entertainment", "Other"]

  const filtered = expenses.filter((exp) => {
    const matchSearch = exp.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = filterCategory === "All" || exp.category === filterCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="page">
      <h2>Expense History</h2>
      <div className="search-row">
        <input type="text" placeholder="Search expenses..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No expenses found.</p>
        ) : (
          filtered.map((exp) => (
            <div key={exp.id} className="expense-item">
              <div>
                <h3>{exp.title}</h3>
                <p>{exp.category} • {exp.date}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="expense-amount">₹{exp.amount}</span>
                <button className="delete-btn" onClick={() => deleteExpense(exp.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default History