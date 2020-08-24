import BgAnimate from "./bg-common";


const animationFunctions = {
	upLeft: function(bgEl){
		//console.info('animation started');
		const frames = [
			{width: '0%',height:'0%', top: 0, left:0, right: 'initial', borderRadius: '0% 0% 100% 0%', transform: "translateY(0%) translateX(0%)",offset: 0},
			{width: '100%', height: '150%',top: 0, left:0, right: 'initial', borderRadius: '0% 0% 100% 0%',transform: "translateY(0%) translateX(0%)",offset: .99},
			{width: '100%', height: '100%', top: 0, left:0, right: 'initial', transform: "translateY(0%) translateX(0%)", borderRadius: '0%',
			offset: 1}	
		]
		this.prevAnimation = bgEl.animate(frames,{
			duration: this.duration,
			delay: this.delay,
			easing: 'cubic-bezier(0.74, 0.24, 0.94, 0.43)',
		})
	},
	upRight: function(bgEl){
		//console.info('animation started');
		const frames = [
			{width: '0%',height:'0%', top: '0', right:'0',left: 'initial', borderRadius: '0% 0% 0% 200%'},
			{width: '100%', height: '150%',top: '0', right:'0',left: 'initial',  borderRadius: '0% 0% 0% 200%', offset: .99},
			{width: '100%', height: '100%', top: '0', right:'0',left: 'initial', borderRadius: '0%', offset: 1}	
		]
		this.prevAnimation = bgEl.animate(frames,{
			duration: this.duration,
			delay: this.delay,
			easing: 'cubic-bezier(0.74, 0.24, 0.94, 0.43)',
			//fill: 'forwards',
		})
	}
}

class BgCircle extends BgAnimate{
	constructor(cO){
		super(cO);
		this.animationFn = (animationFunctions[cO.frameFunction] || animationFunctions.upLeft).bind(this);
	}

	animate(){
		console.info('target-el',this.targetEl)
		this.animationFn(this.targetEl);
	}
	reverse(){
		if(this.prevAnimation)
			this.prevAnimation.reverse();
	}

}


export default BgCircle;
