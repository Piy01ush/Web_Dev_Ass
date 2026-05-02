import { useState } from "react"
import { useExpenses } from "../context/ExpenseContext"
import categories from "../data/categories"
import { useNavigate } from "react-router-dom"

function AddExpense() {
  const { addExpense } = useExpenses()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Food")
  const [date, setDate] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!title || !amount || !date) {
      alert("Please fill all fields!")
      return
    }
    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date
    }
    addExpense(newExpense)
    alert("Expense added!")
    navigate("/")
  }

  return (
    <div className="page">
      <h2>Add New Expense</h2>
      <div className="card">
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Lunch" />

        <label>Amount (₹)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 250" />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <button className="btn" onClick={handleSubmit}>Add Expense</button>
      </div>
    </div>
  )
}

export default AddExpense