import React, { useState, useEffect } from 'react';
import { VscLoading } from "react-icons/vsc";

import Header from './Components/Header/Header.jsx';
import MarkdownEditor from './Components/MarkdownEditor/MarkdownEditor.jsx';

import './App.css';

class Category{
	constructor(name, color){
		this.name = name;
		this.color = color;
		this.notes = [];
	}

	getColor(){
		return `rgb(${this.color.join()})`
	}
	static toCategory(object){
		return Object.assign(new Category(), object);
	}
}

const GenerateID = () => new Array(10).fill(undefined).map(() => "QWERTYUIOPASDFGHJKLZXCVBNM".split("")[Math.round(Math.random()*26)]).join("");

function App() {
	const [categories, setCategories] = useState([new Category("Rhetoric and Literary Analysis", [249, 231, 159]), new Category("Calculus 2", [52, 152, 219]), new 
	Category("Chemistry", [88, 214, 141]), new Category("History of the US", [245, 176, 65]), new Category("Chinese 2", [231, 76, 60]), new Category("No Category", [240, 240, 240])])
	const [thinking, setThinking] = useState(false);
	const [noteSections, setNoteSections] = useState([GenerateID()])

	var [showDropdown, setShowDropdown] = useState(false);

	useEffect(function (){
		localStorage.getItem("data") ? setCategories(JSON.parse(localStorage.getItem("data")).map(a => Category.toCategory(a))) : localStorage.setItem("data", JSON.stringify(categories));
		console.log(JSON.parse(JSON.stringify(categories)).map(a => Category.toCategory(a)));
	}, [])

	function revealDropdown(option){
		typeof option == "boolean" ? setShowDropdown(option) : setShowDropdown(false);
	}

	function handleKeyDown(e){
		if(!(e.key == "Enter" && e.shiftKey)) return;
		e.preventDefault();
		setNoteSections([...noteSections, GenerateID()]);
	}

	return (
		<span onKeyDown={handleKeyDown}>
			<Header revealDropdown={revealDropdown} />
			<VscLoading className={`spinner ${thinking ? 'showing' : 'hidden'}`} />
			{
				noteSections.map(id => <MarkdownEditor thinking={thinking} setThinking={setThinking} id={id} categories={categories} />)
			}
		</span>
	)
}

export default App
