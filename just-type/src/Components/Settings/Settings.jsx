import React, { useState, useEffect } from 'react';
import { IoIosClose } from "react-icons/io";

import './Settings.css';

function SettingsHeader({ tabs, selected, setSelected }){
	return (
		<div className='settings-header'>
			{
				tabs.map((tab, index) => <span data-selected={selected == index} onClick={() => setSelected(index)}>{tab}</span>)
			}
		</div>
	)
}

function CategoriesSubPage({ categories, setCategories }){
	var [categoriesInstance, setCategoriesInstance] = useState(categories);

	function deleteCategory(index){
		var change = [...categories.filter((category, i) => index != i)];
		setCategories(change);
		setCategoriesInstance(change);
		localStorage.setItem("data", JSON.stringify(change));
	}

	return (
		<div className='sub-page'>
			<div>
				{
					categoriesInstance.filter(category => category.name != "No Category").map((category, index) => (
						<span className='category'>
							<span className='content'>
								<div className="circle" style={{ background: category.getColor() }} />
								<span contentEditable={true}>{category.name}</span>
							</span>
							<IoIosClose size={20} onClick={() => deleteCategory(index)} />
						</span>
					))
				}
			</div>
		</div>
	)
}

function StylingSubPage(){
	return (
		<div className='sub-page'>
			<h1 className='nospace'>Styling Settings In Progress</h1>
		</div>
	)
}

export default function (props){
	var [selected, setSelected] = useState(0);
	var [pages, setPages] = useState([<CategoriesSubPage categories={props.categories} setCategories={props.setCategories} />, <StylingSubPage />]);

	useEffect(function (){
		document.querySelector(".settings-page").addEventListener("click", e => (e.target == document.querySelector(".settings-page")) && props.setShowSettings(false));
	}, []);

	return (
		<div {...props}>
			<div className="settings">
				<SettingsHeader tabs={["Categories", "Styling"]} selected={selected} setSelected={setSelected} />
				{ pages[selected] }
			</div>
		</div>
	)
}