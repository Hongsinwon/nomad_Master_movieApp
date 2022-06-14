import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components';
import { Home, TV, Search } from './Routes/index';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tv' element={<TV />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
