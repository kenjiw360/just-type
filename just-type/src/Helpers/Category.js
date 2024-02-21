export default class Category{
	constructor(name, color){
		this.name = name || "";
		this.color = color || [Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255)];
		this.notes = [];
	}

	getColor(format){
		if(!format || format == "RGB") return `rgb(${this.color.join()})`;
		if(format == "HEX") return `#${this.color.map(value => value.toString(16)).join("")}`
	}
	
	static toCategory(object){
		return Object.assign(new Category(), object);
	}
}