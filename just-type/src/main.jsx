import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './Pages/App/App.jsx';
import StartPage from './Pages/StartPage/StartPage.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		{
			localStorage.getItem("data") ? <Routes>
				<Route path="/" element={<App />} />
			</Routes> : <Routes>
				<Route path="/" element={<StartPage />} />
			</Routes>
		}
	</BrowserRouter>
)