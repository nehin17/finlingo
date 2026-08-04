import './App.css'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Home from './components/Home'

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <TopBar />
        <div className="main-content">
          <Home />
        </div>
      </div>
    </div>
  )
}

export default App