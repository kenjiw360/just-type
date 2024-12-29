import { MDXEditor, headingsPlugin, quotePlugin, listsPlugin, thematicBreakPlugin, linkPlugin, linkDialogPlugin, tablePlugin, markdownShortcutPlugin } from '@mdxeditor/editor';
import React, { useState, useEffect } from 'react';

import '@mdxeditor/editor/style.css';
import './MarkdownEditor.css';

var lastThought = null;

export default function MarkdownEditor(props){
	const [currentCategory, setCurrentCategory] = useState(props.category);
	const editorRef = React.useRef();

	function editorChanged(notes){
		if(notes == '' || notes.split(" ").length < 3){
			if(currentCategory != "No Category") props.categories.map(category => (category.name == currentCategory) && category.removeNote(props.id));
			props.setCategories([...props.categories]);
			setCurrentCategory("No Category");
			var category = props.categories.filter(category => category.name == "No Category")[0];
			document.querySelector(`.${props.id}`).style.borderColor = category.getColor();
			document.querySelector(`.${props.id}`).dataset.category = category.name;
			return
		}
		if(props.thinking) return lastThought = notes;
		props.setThinking(true);
		fetch("http://localhost:3000", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ categories: props.categories.map(category => category.name), notes }) })
		.then(response => response.json())
		.then(response => {
			props.setThinking(false);
			if(response.bestMatch != currentCategory) props.categories.map(category => (category.name == currentCategory) && category.removeNote(props.id));
			setCurrentCategory(response.bestMatch);

			props.categories.map(category => (category.name == response.bestMatch) && category.setNote(props.id, { id: props.id, note: notes, category: response.bestMatch }));
			localStorage.setItem("data", JSON.stringify(props.categories));
			props.setCategories([...props.categories]);

			let category = props.categories.filter(category => category.name == response.bestMatch)[0];
			document.querySelector(`.${props.id}`).style.borderColor = category.getColor();
			document.querySelector(`.${props.id}`).dataset.category = category.name;
			if(!lastThought) return;
			editorChanged(lastThought);
			lastThought = null;
		});
	}

	useEffect(function (){
		console.log('this is the note!', props.note);
		editorRef.current.setMarkdown(props.note);
	}, []);

	return (
		<span>
			<MDXEditor autoFocus={true} ref={editorRef} markdown={''} suppressHtmlProcessing={true} onChange={editorChanged} plugins={[headingsPlugin(), quotePlugin(), listsPlugin(), thematicBreakPlugin(), linkPlugin(), linkDialogPlugin(), tablePlugin(), markdownShortcutPlugin()]} contentEditableClassName={`editor ${props.id}`} />
		</span>
	)
}