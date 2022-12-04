
import './App.css';
import React from 'react';
import Index from './Views/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './admin/Views/index';
import CategoriesGrid from './admin/components/categories';
import ItemsGrid from './admin/components/items';
function App() {
  return (
    <div>
      <Router>
       <Routes>
        
		      <Route exact path="/" element={<Index/>}/>
				<Route exact path="/admin" element={<Admin/>}/>
        <Route exact path="/admin/categories" element={<CategoriesGrid/>}/>
        <Route exact path="/admin/items" element={<ItemsGrid/>}/>
	    </Routes>
    </Router>
    </div>
  );
}

export default App;
