import React, { useState, useEffect } from 'react';
import { VscLoading } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa";

import Category from '../../Helpers/Category.js';

import Header from '../../Components/Header/Header.jsx';
import Settings from '../../Components/Settings/Settings.jsx';
import MarkdownEditor from '../../Components/MarkdownEditor/MarkdownEditor.jsx';

import './App.css';

const GenerateID = () => new Array(10).fill(undefined).map(() => "QWERTYUIOPASDFGHJKLZXCVBNM".split("")[Math.round(Math.random()*26)]).join("");

var lastThought = null;

function App() {
	const [categories, setCategories] = useState([]);
	const [thinking, setThinking] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	
	const [noteSections, setNoteSections] = useState([]);


	useEffect(function (){
		let categories = JSON.parse(localStorage.getItem("data")).map(a => Category.toCategory(a));
		setCategories([...categories]);
		setNoteSections([...categories.map(category => Object.values(category.notes)).flat(), { id: GenerateID(), note: "", category: "No Category" }]);
	}, []);

	function handleKeyDown(e){
		if(!(e.key == "Enter" && e.shiftKey)) return;
		e.preventDefault();
		setNoteSections([...noteSections, { id: GenerateID(), note: "", category: "No Category" }]);
	}

	return (
		<span onKeyDown={handleKeyDown}>
			<Header setShowSettings={setShowSettings} showSettings={showSettings} />
			<Settings className={`settings-page ${showSettings ? 'showing' : 'hidden'}`} setShowSettings={setShowSettings} categories={categories} setCategories={setCategories} />
			{
				noteSections.map(note => <MarkdownEditor thinking={thinking} setThinking={setThinking} lastThought={lastThought} id={note.id} categories={categories} setCategories={setCategories} category={note.category} note={note.note} />)
			}
			<div className="create-notes" onClick={() => setNoteSections([...noteSections, { id: GenerateID(), note: "", category: "No Category" }])}>
				<FaPlus />
			</div>
			<VscLoading className={`spinner ${thinking ? 'showing' : 'hidden'}`} />
		</span>
	)
}

export default App
