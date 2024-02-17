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

function CategoriesSubPage({ categories, deleteCategory }){
	return (
		<div className='sub-page'>
			<div>
				{
					categories.filter(category => category.name != "No Category").map((category, index) => (
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
			<h1>Styling Settings In Progress</h1>
		</div>
	)
}

export default function (props){
	var [selected, setSelected] = useState(0);
	var [page, setPage] = useState(CategoriesSubPage);

	useEffect(function (){
		document.querySelector(".settings-page").addEventListener("click", e => (e.target == document.querySelector(".settings-page")) && props.setShowSettings(false));
	}, []);

	function deleteCategory(index){
		var change = [...props.categories.filter((category, i) => index != i)];
		props.setCategories(change);
	}

	return (
		<div {...props}>
			<div className="settings">
				<SettingsHeader tabs={["Categories", "Styling"]} selected={selected} setSelected={setSelected} />
				{ <page categories={props.categories} deleteCategory={deleteCategory} /> }
			</div>
		</div>
	)
}