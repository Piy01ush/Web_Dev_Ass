import { createContext, useState, useContext, useEffect } from "react"

const ExpenseContext = createContext()

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([])
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [darkMode])

  function addExpense(expense) {
    setExpenses([...expenses, expense])
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode)
  }

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, darkMode, toggleDarkMode }}>
      {children}
    </ExpenseContext.Provider>
  )
}

export function useExpenses() {
  return useContext(ExpenseContext)
}