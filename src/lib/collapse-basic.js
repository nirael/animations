import BasicCollapseable from './collapse-common';
import {computeCellPositions} from "./common";
import {posToStyle,computeSteps__simple,computeTurn, randomFly, opacityGrid} from "./collapse-animations";
import {shuffle} from 'lodash';

//import {BasicCollapseable as collapseBasicStyles} from "./bg-common-styles";

const frameFunctions = {
	'turn': computeTurn,
	'randomFly': randomFly,
	'opacity': opacityGrid,

}


class collapseBasic extends BasicCollapseable{
	constructor(constructorObject){
		super(constructorObject);
		console.info('constructorObject', constructorObject)
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
		this.frameFunction = frameFunctions[constructorObject.frameFunction] || computeTurn;
		this.explodePositions = this.frameFunction(this.rows, this.cols, this.deviation);

		//makeAnimatedPositions(this.deviation);
		this.animationObjects = [];
		this.noContainerOverflow = constructorObject.noOverflow || false;
		this.shouldCenter = constructorObject.shouldCenter || true;
		if(constructorObject.steps && constructorObject.stepDuration){
			this.steps = computeSteps__simple(this.rows, this.cols,constructorObject.stepDuration);
			this.stepDuration = constructorObject.stepDuration;
			if(constructorObject.randomizeSteps)
				this.steps = shuffle(this.steps);
			console.info("got steps:", this.steps);
		}
	}
	setNoOverflow(v){
		this.noContainerOverflow = v;
	}
	setShouldCenter(v){
		this.shouldCenter = v;
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
		//this.animateParts(this.targetEl);
	}
	deactivate(){
		//console.info('children',Array.from(this.targetEl.children))
		Array.from(this.targetEl.children).forEach(e => e.remove())
		this.el.style.display = "";
	}

	reverse(){
		const self = this;
		//edit
		const delay = this.steps? (this.steps.length) * this.stepDuration: this.duration + this.delay;
		if(this.steps)
			this.animationObjects.reverse().forEach((a,ix) => {

					setTimeout(a.reverse.bind(a),this.steps[ix])
			});
		else
		this.animationObjects.forEach((a) => a.reverse());
		setTimeout(this.deactivate.bind(this), delay);
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
		target.querySelectorAll(`.${this.classes.itemClass}`).forEach((el,ix) => {
			//console.info(positions[ix])
			if(this.steps){
				cfg.delay = this.steps[ix];
				cfg.duration = this.stepDuration;
			}
			this.animationObjects.push(el.animate(
				this.explodePositions[ix],
				cfg
			));
		})
	}
}

export default collapseBasic;