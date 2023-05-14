import './App.css'
import { useGlobalContext } from './context'

import Favourites from './components/Favourites'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Search from './components/Search'

function App() {
  const { showModal } = useGlobalContext()
  return (
    <main>
        {/* <Favourites /> */}
        {/* <Meals /> */}
        {/* <Modal /> */}
        <Search />
        <Meals />
        {showModal && <Modal />}
        
    </main>
  )
}

export default App
