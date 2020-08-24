class BgAnimate{
	constructor(consturctorObj){
		console.info(consturctorObj);
		this.targetEl = consturctorObj.targetEl;
		this.duration = consturctorObj.duration || 400;
		this.delay = consturctorObj.delay || 0;
		this.classes = consturctorObj.classes || {
			'bg-up': 'bg-up',
			'bg-down': 'bg-down'
		};
	}
}

export default BgAnimate;