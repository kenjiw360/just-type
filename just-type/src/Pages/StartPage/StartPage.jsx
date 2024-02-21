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
		categories[index].name = event.target.innerText;
		console.log(categories);
		setCategories([...categories]);
	}
	
	function detectEnter(event){
		if(event.key == "Enter"){
			event.preventDefault();
			if(textInputRef.current.innerText.length) return setCategories([...categories, new Category()]);
		};
	}

	return (
		<div className='category'>
			<span className='left'>
				<div className='color' style={{ background: categories[index].getColor() }}></div>
				<input type="color" defaultValue={categories[index].getColor("HEX")} />
				<span role='textbox' contentEditable='true' onKeyDown={detectEnter} onKeyUp={editName} ref={textInputRef} />
			</span>

		</div>
	);
}

export default function StartPage(){
	var [categories, setCategories] = useState([]);
	
	useEffect(function (){

	}, []);

	return (
		<>
			<div className='centered card'>
				<h2 className='nospace'>Add Your Classes</h2>
				{
					categories.map((category, i) => <CategoryElement key={i} index={i} categories={categories} setCategories={setCategories} />)
				}
				<button className='add-category-button' onClick={() => setCategories([...categories, new Category()])}><FaPlus /></button>
				<button className='submit-button' data-disabled={categories.length == 0}>Submit</button>
			</div>
			<span style={{ position: 'absolute', bottom: 20, right: 20, fontWeight: 600, fontSize: 20 }}>Just Type!</span>
		</>
	)
}