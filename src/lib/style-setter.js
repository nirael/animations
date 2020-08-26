class StyleDeclarationNotFound extends Error{
	constructor(el, ...params){
		super(params);
		if(Error.captureStackTrace){
			Error.captureStackTrace(this, StyleDeclarationNotFound);
		}
		this.name = 'StyleDeclarationNotFound';
		this.el = el;
		this.date = new Date();
		this.message = "Style declaration not found!";
	}
}


class StyleSetter{
	constructor(basicStyle){
		this.style = basicStyle;
		this.boundElementStyles = [];
	}
	setStyle(el, shouldRecover=false){
		if(shouldRecover){
			const initDec = {};
			const elStyle = el.style //window.getComputedStyle(el);
			for(let prop in this.style){
				//if(elStyle.hasOwnProperty(prop))
				initDec[prop] = elStyle[prop] || ""
				el.style[prop] = this.style[prop]
			}
			this.boundElementStyles.push({el, initDec})	
		}else{
			for(let prop in this.style){
				el.style[prop] = this.style[prop];
			}
		}
	}
	recoverStyle(el){
		const initStyleObject= this.recoverDeclaration(el);
		//console.info('initial declaration', initDec);
		if(!initStyleObject){
			throw new StyleDeclarationNotFound(el);
			return;
		}
		for(let prop in initStyleObject.initDec)
			el.style[prop] = initStyleObject.initDec[prop]
	}

	recoverDeclaration(el){
		return this.boundElementStyles.find(e => e.el == el);
	}
}

export default StyleSetter;