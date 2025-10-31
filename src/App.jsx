import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return

    const task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false
    }

    setTasks([task, ...tasks])
    setNewTask('')
  }

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const completedTasks = tasks.filter(task => task.completed)
  const pendingTasks = tasks.filter(task => !task.completed)

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Todo List</h1>
          <p>Simple task management app</p>
        </header>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="task-form">
          <div className="input-group">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done?"
              className="task-input"
            />
            <button
              type="submit"
              className="add-button"
              disabled={!newTask.trim()}
            >
              Add Task
            </button>
          </div>
        </form>

        {/* Tasks Section */}
        <div className="tasks-container">
          {pendingTasks.length > 0 && (
            <TaskSection
              title={`Pending Tasks (${pendingTasks.length})`}
              tasks={pendingTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          )}

          {completedTasks.length > 0 && (
            <TaskSection
              title={`Completed Tasks (${completedTasks.length})`}
              tasks={completedTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              completed
            />
          )}

          {tasks.length === 0 && (
            <div className="empty-state">
              <p>No tasks yet. Add a task to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Reusable Task Section
function TaskSection({ title, tasks, onToggle, onDelete, completed }) {
  return (
    <div className={`task-section ${completed ? 'completed' : ''}`}>
      <h2>{title}</h2>
      <div className="tasks-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

// Single Task Item
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <button
          onClick={() => onToggle(task.id)}
          className={`checkbox ${task.completed ? 'checked' : ''}`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && '✓'}
        </button>
        <span className="task-text">{task.text}</span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="delete-button"
        aria-label="Delete task"
      >
        ×
      </button>
    </div>
  )
}

export default App