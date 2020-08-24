import BgAnimate from "./bg-common";
import {DivideStyles} from './bg-common-styles.js';

const upDownFrames = {
		up: [
		{transform: "scale(.1) translate(-450%, -450%"},
		{transform: "scale(1) translate(0%, 0%"}
		],
		down: [
		{transform: "scale(.1) translate(450%, 450%"},
		{transform: "scale(1) translate(0%, 0%"}
		]

}

function animateSizeIn(el,whence, mainObj={}){
		mainObj.previousAnimation =  el.animate(upDownFrames[whence],{
			duration: mainObj.duration,
			delay: mainObj.delay,
			fill: 'forwards',
			easing: 'ease',
		});

	}
function divideCommon(el,classes){
		const holder = el.parentElement;
		const holderInner1 = document.createElement('div');
		const holderInner2 = document.createElement('div');
		const cloneUp = el.cloneNode(true);
		const cloneDown = el.cloneNode(true)
		holderInner1.append(cloneUp);
		holderInner2.append(cloneDown);
		DivideStyles['bg-up'].setStyle(holderInner1);
		DivideStyles['bg-down'].setStyle(holderInner2);
		holderInner1.classList.add(classes['bg-up'] );
		holderInner2.classList.add(classes['bg-down']);
		[holderInner1, holderInner2].forEach( e => {

			 holder.append(e);
		});

		cloneUp.style.clipPath = "polygon(100% 0, 0% 0, 0 100%)";
		cloneDown.style.clipPath = "polygon(100% 0, 0% 100%, 100% 100%)";
		cloneDown.style.transform = "translateX(0%) translateY(0%)"
		el.style.display = 'none';
		animateSizeIn(holderInner1, 'up',this);
		animateSizeIn(holderInner2, 'down',this);
		setTimeout(() => {
			el.style.display = '';
			holderInner1.remove();
			holderInner2.remove();
		},this.delay + this.duration )
}

const animationFunctions = {
	divideCommon,

}

class BgDivide extends BgAnimate{
	constructor(cO){
		super(cO);
		this.frameFunction = (animationFunctions[cO.frameFunction] || divideCommon).bind(this);
	}
	animate(){
		this.frameFunction(this.targetEl,this.classes);
	}
}

export default BgDivide;