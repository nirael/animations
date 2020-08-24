import collapseBasic from "./lib/collapse-basic";
import collapseDiagonal from "./lib/collapse-diagonal";
import collapseShuffle from "./lib/collapse-shuffle";

import BgCircle from "./lib/bg-circle";
import BgDivide from "./lib/bg-divide";
import StyleSetter from "./lib/style-setter"

import { LoremIpsum } from "lorem-ipsum";

const textGenerator = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});


const testStyleSetterData = {
	fontSize: "3em",
	color: 'magenta',
}

const Stylizers = { 
		'test': new StyleSetter(testStyleSetterData),
}

import "./styles/test.sass";

//__webpack_nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=';

function divComponent(){
	return document.createElement('div');
}

function generateButtons(){
	const container = divComponent();
	container.className = 'buttons';
	const [ activatePicture, 
			animatePicture, 
			deactivatePicture, hidePicture, showPicture ]= [
						'activatePicture','animatePicture',
						'deactivatePicture','hidePicture','showPicture' ]
			.map(Id => {
				const btn = document.createElement('button');
				btn.className = 'ctrl-btn';
				btn.id = Id;
				btn.innerText = Id.slice(0,Id.indexOf('P') || Id.length-1);
				container.append(btn)
				return btn;
			})
	return { container, activatePicture, 
			animatePicture, 
			deactivatePicture,
			hidePicture,
			showPicture,
		};

}

function generateContent1(){
	const container = divComponent();
	container.className = "content-bx";
	const img = document.createElement('img');
	img.src = "https://picsum.photos/id/237/2000/2000";
	img.id = 'picture'; 
	container.append(img);
	return {container, img};
}

function generatePageCollapse(){
	const buttons = generateButtons();
	const content = generateContent1();
	document.body.append(buttons.container);
	document.body.append(content.container);

	/*const testCollapse = new collapseBasic({
		el: content.img,
		shouldCenter: false,
		noOverflow: true,
		rows: 6,
		cols: 6,
		duration: 1000,
		frameFunction: 'randomFly',
		steps: true,
		stepDuration: 200,
		randomizeSteps: true
	});*/
	const testCollapse = new collapseDiagonal({
		el: content.img,
		noOverflow: true,
		rows: 8,
		cols: 8,
		duration: 100,
		delay: 100,

	})
	/*const testCollapse = new collapseShuffle({
		el: content.img,
		noOverflow: true,
		rows: 4,
		cols: 4,
		duration: 500,
		//delay: 100,
	})*/
	const changePicture = "https://picsum.photos/id/238/2000/2000";
	buttons.activatePicture.onclick = testCollapse.activate.bind(testCollapse);
	//buttons.animatePicture.onclick = testCollapse.animateOnDemand.bind(testCollapse);
	buttons.animatePicture.onclick = () => testCollapse.transitionImg(changePicture)
	buttons.deactivatePicture.onclick = testCollapse.reverse.bind(testCollapse);
	buttons.hidePicture.onclick = () => testCollapse.hideInImg(changePicture);
	buttons.showPicture.onclick = () => testCollapse.showOutImg(changePicture);
}

generatePageCollapse();

function generatePageBg(){
	function generateBgButtons(){
		const container = divComponent();
		container.className = 'buttons';
		const [upLeft, upRight, divideCommon] = ['upLeft','upRight','divideCommon'].map(Id => {
			const btn = document.createElement('button');
			btn.className = 'ctrl-btn';
			btn.id = Id;
			btn.innerText = Id;
			container.append(btn)
			return btn;
		})
		return {container, upLeft, upRight, divideCommon};
	}
	function generateBgContent(){
		const container = divComponent();
		container.className = 'bg-container';
		const content = divComponent();
		content.className = 'bg-content';
		content.innerHTML = `<div class='over-text'> ${textGenerator.generateParagraphs(3) } </div>`;
		Stylizers['test'].setStyle(content,true);
		setTimeout(() => Stylizers['test'].recoverStyle(content), 5000);
		const targetBg = divComponent();
		targetBg.className = 'test-bg-1';
		container.append(content);
		content.append(targetBg);
		return {container, content, targetBg};
	}
	const buttons = generateBgButtons();
	const content = generateBgContent();
	[buttons,content].forEach(el => document.body.append(el.container));
	//console.info(content);
	const circleBgUpLeft = new BgCircle({
		targetEl : content.targetBg,
		duration: 500,
		delay: 250,
		frameFunction:  'upLeft'
	})
	const circleBgUpRight = new BgCircle({
		targetEl : content.targetBg,
		duration: 500,
		delay: 250,
		frameFunction:  'upRight'
	})
	const divideBgCommon = new BgDivide({
		targetEl : content.targetBg,
		duration: 1000,
		delay: 250,
		frameFunction: 'divideCommon',
	})
	buttons.upLeft.onclick = () => circleBgUpLeft.animate();
	buttons.upRight.onclick = () => circleBgUpRight.animate();
	buttons.divideCommon.onclick = () => divideBgCommon.animate();
}

//generatePageBg();

/*if(module.hot){
	
}*/