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
	const [categories, setCategories] = useState([new Category("Rhetoric and Literary Analysis", [249, 231, 159]), new Category("Calculus 2", [52, 152, 219]), new 
	Category("Chemistry", [88, 214, 141]), new Category("History of the US", [245, 176, 65]), new Category("Chinese 2", [231, 76, 60]), new Category("No Category", [240, 240, 240])])
	const [thinking, setThinking] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	
	const [noteSections, setNoteSections] = useState([GenerateID()]);


	useEffect(function (){
		localStorage.getItem("data") ? setCategories(JSON.parse(localStorage.getItem("data")).map(a => Category.toCategory(a))) : localStorage.setItem("data", JSON.stringify(categories));
		console.log(JSON.parse(localStorage.getItem("data")).map(a => Category.toCategory(a)));
	}, []);

	function handleKeyDown(e){
		if(!(e.key == "Enter" && e.shiftKey)) return;
		e.preventDefault();
		setNoteSections([...noteSections, GenerateID()]);
	}

	return (
		<span onKeyDown={handleKeyDown}>
			<Header setShowSettings={setShowSettings} showSettings={showSettings} />
			<Settings className={`settings-page ${showSettings ? 'showing' : 'hidden'}`} setShowSettings={setShowSettings} categories={categories} setCategories={setCategories} />
			{
				noteSections.map(id => <MarkdownEditor thinking={thinking} setThinking={setThinking} lastThought={lastThought} id={id} categories={categories} />)
			}
			<div className="create-notes" onClick={() => setNoteSections([...noteSections, GenerateID()])}>
				<FaPlus />
			</div>
			<VscLoading className={`spinner ${thinking ? 'showing' : 'hidden'}`} />
		</span>
	)
}

export default App
