import { Route, Routes, Link } from 'react-router-dom';
import { E404 } from './pages/errors';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div></div>} />
        {/* 404 Error For Undefined Routes  */}
        <Route path="*" element={<E404 />} />
      </Routes>
    </div>
  );
}

export default App;
