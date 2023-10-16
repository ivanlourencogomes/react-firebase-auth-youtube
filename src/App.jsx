import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BooksPage from './views/BooksPage.jsx';
import SingleBookPage from './views/SingleBookPage.jsx';
import LoginPage from './views/LoginPage.jsx';
import AddBookPage from './views/AddBookPage.jsx';

function App() {

  return (
    <>  
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="add-book" element={<AddBookPage />} />
          <Route path="book/:id" element={<SingleBookPage />} />
        </Routes>
      </BrowserRouter>
      
        
    </>
  )
}

export default App
