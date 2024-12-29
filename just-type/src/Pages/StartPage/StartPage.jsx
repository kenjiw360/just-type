import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import Category from '../../Helpers/Category.js';

import './StartPage.css';

function CategoryElement({ categories, setCategories, index }){
	var textInputRef = React.createRef();

	useEffect(function (){
		textInputRef.current.focus();
	}, []);

	function editName(event){
		if(event.target.innerText == '\n') return event.target.innerText = '';
		categories[index].name = event.target.innerText.replaceAll('\n', '');
		setCategories([...categories]);
	}
	
	function detectEnter(event){
		if(event.key != "Enter") return;
		event.preventDefault();
		if(textInputRef.current.innerText.length) return setCategories([...categories, new Category()]);
	}

	function changeColor(event){
		let color = event.target.value.replace("#","").match(/.{1,2}/g).map(hex => Number("0x"+hex));
		categories[index].setColor(color);
		setCategories([...categories]);
	}

	return (
		<div className='category'>
			<span className='left'>
				<div className='color' style={{ background: categories[index].getColor() }} onClick={() => document.querySelector(`#colorPicker${index}`).click()} />
				<input type="color" defaultValue={categories[index].getColor("HEX")} onChange={changeColor} id={'colorPicker'+index} />
				<span role='textbox' contentEditable='true' onKeyDown={detectEnter} onKeyUp={editName} ref={textInputRef} />
			</span>

		</div>
	);
}

export default function StartPage(){
	var [categories, setCategories] = useState([]);
	
	useEffect(function (){

	}, []);

	function submitItems(){
		if(!categories.length) return;
		localStorage.setItem('data', JSON.stringify([...categories, new Category("No Category", [240, 240, 240])]));
		window.location.reload();
	}

	return (
		<>
			<div className='centered card'>
				<h2 className='nospace'>Add Your Classes</h2>
				{
					categories.map((category, i) => <CategoryElement key={i} index={i} categories={categories} setCategories={setCategories} />)
				}
				<button className='add-category-button' onClick={() => setCategories([...categories, new Category()])}><FaPlus /></button>
				<button className='submit-button' data-disabled={categories.length == 0} onClick={submitItems}>Submit</button>
			</div>
			<span style={{ position: 'absolute', bottom: 20, right: 20, fontWeight: 600, fontSize: 20 }}>Just Type!</span>
		</>
	)
}