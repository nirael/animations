import {computeCellPositions} from "./common";
import { posToStyle, 
		 computeSteps__simple, 
		 computeDiagonalTurn,
		 animateDigonalTurn,
		 reverseDiagonalTurn } from "./collapse-animations";

import BasicCollapseable from './collapse-common';
import {shuffle} from 'lodash';

function reverseMappers(mappers){
	const mappersCopy = mappers.slice(); 
	for(let i = 0;i < mappersCopy.length; i++){
		mappersCopy[i].delayMlp = mappersCopy.length - i;
	}
	return mappersCopy.reverse();
}

const diagonalFrameFunctions = {
	simpleTurn: animateDigonalTurn,
}
class collapseDiagonal extends BasicCollapseable{ 
	constructor(constructorObject){
		super(constructorObject);
		this.el = constructorObject.el;
		if(constructorObject.targetEl)
			this.targetEl = constructorObject.targetEl;
		else
			this.insertTargetEl();
		this.duration = constructorObject.duration || 1000;
		this.delay = constructorObject.delay || 500;
		this.deviation = constructorObject.deviation || 100;

		this.rows = constructorObject.rows || 3;
		this.cols = constructorObject.cols || 3;

		this.gridPositions =  posToStyle(computeCellPositions(this.rows, this.cols));
		this.frameFunction = diagonalFrameFunctions[constructorObject.frameFunction] || animateDigonalTurn ;
		//console.info("got frame function pos", this.explodePositions);
		//makeAnimatedPositions(this.deviation);
		this.animationObjects = [];
		this.noContainerOverflow = constructorObject.noOverflow || false;
		this.shouldCenter = constructorObject.shouldCenter || true;
		if(constructorObject.steps && constructorObject.stepDuration){
			this.steps = computeSteps__simple(this.rows, this.cols,constructorObject.stepDuration);
			this.stepDuration = constructorObject.stepDuration;
			if(constructorObject.randomizeSteps)
				this.steps = _.shuffle(this.steps);
			console.info("got steps:", this.steps);
		}
	}
	setNoOverflow(v){
		this.noContainerOverflow = v;
	}
	setShouldCenter(v){
		this.shouldCenter = v;
	}
	reverse(deactivate=true){
		const reversedMappers = reverseMappers(this.mappers);
		console.info(reversedMappers);
		reverseDiagonalTurn(this.rows,this.cols,
					this.targetEl.querySelectorAll(`.${this.classes.itemClass}`), {
						duration: this.duration,
						delay: this.delay,
					}, reversedMappers);
		const mlp = this.rows+this.cols-1;
		if(deactivate)
			setTimeout(this.deactivate.bind(this), this.duration * mlp + 200);
	}
	transitionImg(src){
		this.deactivate();
		this.activate();
		setTimeout( () => Array.from(this.targetEl.children).forEach(e => {
			e.querySelector('img').src = src;
		}),this.mappers.length * this.delay);
		setTimeout(() => this.reverse(false),(this.mappers.length * this.delay) + 200);
	}
	hideInImg(src){
		this.oldVals = {
			delay: this.delay,
			duration : this.duration,
		}
		this.deactivate();
		this.delay = 0;
		this.duration = 0;
		this.prevSrc = this.el.src;
		this.el.src = src;
		this.activate();
		/*Array.from(this.targetEl.children).forEach(e => {
			e.querySelector('img').src = src;
		});*/
	}
	showOutImg(src){
		this.delay = this.oldVals.delay;
		this.duration = this.oldVals.duration;
		
		this.reverse();
		//setTimeout(() => this.reverse(false),100);
	}
	activate(){
		const targetClone = this.el.cloneNode(true);
		targetClone.id = "";
		const cachedPosition = this.el.getBoundingClientRect();
		this.el.style.display = "none";
		//console.info('target clone',targetClone)
		this.targetEl.style.overflow = this.noContainerOverflow?"hidden":"";
		this.collapseTextEl(targetClone,this.targetEl, cachedPosition);
		this.posElemCenter(this.targetEl);
		this.mappers = this.frameFunction(this.rows, this.cols, 
			this.targetEl.querySelectorAll(`.${this.classes.itemClass}`),{
			duration: this.duration,
			delay: this.delay,
		})
	}
	deactivate(){
		//console.info('mappers', reverseMappers(this.mappers));
		//console.info('children',Array.from(this.targetEl.children))
		Array.from(this.targetEl.children).forEach(e => e.remove())
		this.el.style.display = "";
	}
}


export default collapseDiagonal;