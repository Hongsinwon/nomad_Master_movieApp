import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components';
import { Home, Search, TV } from './Routes/index';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path='/tv' element={<TV />}>
          <Route path='/tv/:id' element={<TV />} />
        </Route>
        <Route path='/search' element={<Search />}>
          <Route path={`/search/movie/:id`} element={<Search />} />
          <Route path={`/search/tv/:id`} element={<Search />} />
        </Route>
        <Route path='/' element={<Home />}>
          <Route path='movies/:id' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
