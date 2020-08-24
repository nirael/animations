
import {BasicCollapseable as collapseBasicStyles} from "./bg-common-styles";
class BasicCollapseable{
	constructor(constructorObject){
		this.classes = constructorObject.classes || {itemClass : "item"};
		this.styles = collapseBasicStyles;
		this.applyStyles = constructorObject.applyStyles || true;
	}
	makeCollapseable(target, 
				pos={x:"5%", y:"5%"}, 
				dim={'width':100, 'height':100},
				targetEl=document.body,
				cachedPosition=null){
		const elPos = cachedPosition?cachedPosition:target.getBoundingClientRect();
		//console.info(elPos);
		const el = document.createElement('div');
		el.className = this.classes['margin-part'] || 'margin-part';
		el.classList.add(this.classes.itemClass);
		if(this.applyStyles){
			this.styles.itemClass.setStyle(el);
			this.styles['margin-part'].setStyle(el);			
		}
		el.style.overflow = 'hidden';
		el.style.width = dim.width + 'px';
		el.style.height = dim.height + 'px';
		const targetClone = target.cloneNode(true);
		targetClone.id = "";
		targetClone.style.width = elPos.width + 'px';
		targetClone.style.height = elPos.height + 'px';
		el.append(targetClone)
		el.firstChild.style.transform = `translateX(${pos.x}) translateY(${pos.y})`;
		targetEl.append(el); 
	}
	insertTargetEl(){
		const el = document.createElement('div');
		this.el.parentElement.append(el);
		el.className = this.classes['box-target'] || 'box-target';
		if(this.applyStyles)
			this.styles['box-target'].setStyle(el,true);
		this.targetEl = el;
	}
	collapseTextEl(elt,elTarget,cachedPosition){
		const textPos = cachedPosition? cachedPosition:elt.getBoundingClientRect();
		const fullHeight = textPos.height;
		const fullWidth = textPos.width;
		const dim = {
			width: fullWidth / this.cols,
			height: fullHeight / this.rows,
		};
		elTarget.style.width = fullWidth + 'px';
		elTarget.style.height = fullHeight + 'px';
		
		for(let i = 0; i < this.gridPositions.length;i++){
			this.makeCollapseable(elt, this.gridPositions[i], dim, elTarget,cachedPosition);
		}

	}
	posElemCenter(target){
		const pos = target.getBoundingClientRect();
		target.style.position = 'absolute';
		target.style.top = `calc((100vh - ${pos.height}px)/2)`;
		target.style.left = `calc((100vw - ${pos.width}px)/2)`;
	}
}

export default BasicCollapseable;