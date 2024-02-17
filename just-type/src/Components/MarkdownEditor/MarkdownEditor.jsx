import { MDXEditor, headingsPlugin, quotePlugin, listsPlugin, thematicBreakPlugin, linkPlugin, linkDialogPlugin, tablePlugin, markdownShortcutPlugin } from '@mdxeditor/editor';
import React, { useState, useEffect } from 'react';

import '@mdxeditor/editor/style.css';
import './MarkdownEditor.css';

var lastThought = null;

export default function MarkdownEditor(props){
	const [currentCategory, setCurrentCategory] = useState("No Category");
	const editorRef = React.useRef();

	function editorChanged(notes){
		if(notes == ''){
			setCurrentCategory("No Category");
			var category = props.categories.filter(category => category.name == "No Category")[0];
			document.querySelector(`.${props.id}`).style.borderColor = category.getColor();
			document.querySelector(`.${props.id}`).dataset.category = category.name;
			return
		}
		if(props.thinking) return lastThought = notes;
		props.setThinking(true);
		fetch("https://glowing-space-rotary-phone-4v9r9wj6w5635rr6-3000.app.github.dev", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ categories: props.categories.map(category => category.name), notes }) })
		.then(response => response.json())
		.then(response => {
			props.setThinking(false);
			setCurrentCategory(response.bestMatch);
			var category = props.categories.filter(category => category.name == response.bestMatch)[0];
			document.querySelector(`.${props.id}`).style.borderColor = category.getColor();
			document.querySelector(`.${props.id}`).dataset.category = category.name;
			console.log(lastThought);
			if(!lastThought) return;
			editorChanged(lastThought);
			lastThought = null;
		});
	}

	return (
		<span>
			<MDXEditor autoFocus={true} ref={editorRef} markdown={props.markdown || ''} suppressHtmlProcessing={true} onChange={editorChanged} plugins={[headingsPlugin(), quotePlugin(), listsPlugin(), thematicBreakPlugin(), linkPlugin(), linkDialogPlugin(), tablePlugin(), markdownShortcutPlugin()]} contentEditableClassName={`editor ${props.id}`} />
		</span>
	)
}