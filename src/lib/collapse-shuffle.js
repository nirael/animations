import {computeCellPositions,getRowPosition, getColPosition} from "./common";
import { posToStyle, 
		 computeSteps__simple,
		 shuffleBasic  
} from "./collapse-animations";

import BasicCollapseable from './collapse-common';
import {shuffle} from 'lodash';

class collapseShuffle extends BasicCollapseable{
	constructor(constructorObject){
		super(constructorObject);
		this.el = constructorObject.el;
		if(constructorObject.targetEl)
			this.targetEl = constructorObject.targetEl;
		else
			this.insertTargetEl();
		this.noContainerOverflow = constructorObject.noOverflow || false;
		this.rows = constructorObject.rows || 3;
		this.cols = constructorObject.cols || 3;
		this.duration = constructorObject.duration;
		this.gridPositions =  posToStyle(computeCellPositions(this.rows, this.cols));
		this.animateFn = shuffleBasic;
		this.savedPositions = [];
	}

	activate(){
		const targetClone = this.el.cloneNode(true);
		targetClone.id = "";
		const cachedPosition = this.el.getBoundingClientRect();
		this.el.style.display = "none";
		//console.info('target clone',targetClone)
		this.targetEl.style.overflow = this.noContainerOverflow?"hidden":"";
		this.collapseTextEl(targetClone,this.targetEl, cachedPosition);
		this.absolutizeItems();
		this.animateParts(this.targetEl);
	}
	reverse(){
		const items = this.targetEl.querySelectorAll(`.${this.classes.itemClass}`);
		items.forEach((e,ix) => {
			e.style.top = this.savedPositions[ix].top;
			e.style.left = this.savedPositions[ix].left;
		});
		//this.el.style.display = "";

	}
	absolutizeItems(){
		//this.targetEl.style.position = 'relative';
		const items = this.targetEl.querySelectorAll(`.${this.classes.itemClass}`);
		const textPos = this.targetEl.getBoundingClientRect();
		const fullHeight = textPos.height;
		const fullWidth = textPos.width;
		const dim = {
			width: fullWidth / this.cols,
			height: fullHeight / this.rows,
		};
		items.forEach((item,ix) => {
			const rowPos = getRowPosition(ix,this.rows,this.cols);
			const colPos = getColPosition(ix,this.rows);
			//console.info('dim',ix,rowPos,colPos, (dim.height * rowPos),(dim.width * colPos) )
			const rect = item.getBoundingClientRect();
			//console.info(`item ${ix}`, rect);
			item.style.position = "absolute";
			item.style.top = (dim.height * rowPos) + 'px';
			item.style.left = (dim.width * colPos) + rect.x + 'px';
			this.savedPositions.push({top: item.style.top, left: item.style.left})
			item.style.transition = `all ${(this.duration / 1000).toFixed(2)}s`
		})
	}
	animateOnDemand(){
		this.animateParts(this.targetEl);
	}
	animateParts(target, deviation=10){
		this.animationObjects = [];
		const cfg = {
					duration: this.duration, 
					iterations: 1,//Infinity, 
					easing: 'ease-out', 
					fill:'forwards', 
					delay: this.delay,
					//direction: 'alternate'
				};
		const items = target.querySelectorAll(`.${this.classes.itemClass}`);

		this.animateFn(items,cfg);
		//console.info('saved positions', this.savedPositions);

	}
}

export default collapseShuffle;