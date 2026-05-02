import { useExpenses } from "../context/ExpenseContext"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"]

function Dashboard() {
  const { expenses } = useExpenses()

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount
    return acc
  }, {})

  const chartData = Object.keys(categoryTotals).map((key) => ({
    name: key,
    value: categoryTotals[key]
  }))

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <p className="welcome-text">Welcome to Spendly — track your expenses easily!</p>
      <div className="card">
        <h3>Total Spent</h3>
        <p className="total-amount">₹{totalAmount}</p>
      </div>

      <div className="card">
        <h3>Spending by Category</h3>
        {chartData.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No expenses yet. Add some to see the chart!</p>
        ) : (
          <PieChart width={400} height={300}>
            <Pie data={chartData} cx={200} cy={150} outerRadius={100} dataKey="value" label>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>

      <div className="card">
        <h3>Recent Expenses</h3>
        {expenses.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No expenses added yet.</p>
        ) : (
          expenses.slice(-5).reverse().map((exp) => (
            <div key={exp.id} className="expense-item">
              <span>{exp.title} <span style={{ color: "#9ca3af", fontSize: "13px" }}>({exp.category})</span></span>
              <span className="expense-amount">₹{exp.amount}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard