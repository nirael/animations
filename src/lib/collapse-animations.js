
import {randN} from "./common";



export function posToStyle(posGrid){
	return posGrid.map(pos => ({x: `${pos.x.toFixed(2)}%`, y: `${pos.y.toFixed(2)}%`}));
}

/*function posToFrames(posGrid){
	return posGrid.map(pos => ([
				{transform: "translateY(0%) translateX(0%)", opacity: 1},
			  	{transform: `translateY(${pos.y}%) translateX(${pos.x}%)`, opacity: 0}
			]));
}*/


export function randomFly(rows, cols,dev){
	function getSign(){
		return Math.random() * 99999 > (99999/2)?1:-1;
	}

	return Array.from(Array(rows*cols).keys()).map(o => [
			{transform: "translateX(0%) translateY(0%)", opacity: 1},
			{ transform: `translateX(${randN(dev)*getSign()}%) translateY(${randN(dev)*getSign()}%)`,
			  opacity: 0},
		])
}

export function opacityGrid(rows, cols){
	return Array.from(Array(rows*cols).keys()).map(o => [
		{opacity: 1},{opacity: 0}
	])
}

export function computeSteps__simple(rows,cols,d){
	let delay = -d;
	return Array.from(Array(rows*cols).keys()).map(n => {
		delay += d;
		return delay;
	})
}

export function getRandomPositionById(array, compareId=0){
	let ix = compareId;
	while(ix == compareId){
		ix = Math.abs(Math.floor(Math.random() * array.length));
	}
	return array[ix];
}
export function computeTurn(x,y){
	return Array.from(Array(x*y).keys()).map(n => [
		{"transform": "rotateY(0deg)"},
		{"transform": "rotateY(180deg)"}
	])
}


export function computeDiagonalTurn(x,y){
	console.info('test');
	const ints1 = [];
	const ints2 = [];

	const mul = x*y;
	const middle = Math.ceil((x+y-1)/2);
	const step = x-1;
	for(let i = 1;i <= middle;i++){
		let interval = [i];
		for(let j = 1; j < i; j++){
			interval.push(i+step*j)
		}
		ints1.push(interval);
	} 
	for(let i = 0; i < middle;i++){
		let interval = [mul - x*i];
		for(let j = 1; j <= i; j++){
			interval.push((mul - x*i)+step*j)
		}
		ints2.push(interval);
	}
	return  ints1.map((int,ix) => ({ delayMlp: ix, src: int})).
			concat(ints2.reverse().slice(1).map((int,ix) => ({ delayMlp: ix+ints1.length, src: int})))
}



export function animateDigonalTurn(x,y,items, cfg, aniFrames=null, objMappers=null){
	const frames = aniFrames?aniFrames: [
		{transform: 'rotateY(0deg)'},
		{transform: 'rotateY(180deg)'},
	];
	const mappers = objMappers?objMappers: computeDiagonalTurn(x,y);
	function findMapper(mappers,index){
		return mappers.find( o => o.src.includes(index));
	}
	items.forEach((item,ix) => {
		let mapper = findMapper(mappers,ix+1);
		//console.info('diag',ix, mapper);
		item.animate(frames,{
			delay: mapper.delayMlp * ( cfg.delay || 0),
			duration: cfg.duration+cfg.delay || 0,
			easing: 'ease-in',
			fill: 'forwards',
		})
	})
	return mappers;
}

export function reverseDiagonalTurn(x,y,items,cfg,mappers){
	frames = [
		{transform: 'rotateY(180deg)'},
		{transform: 'rotateY(0deg)'},
	]
	animateDigonalTurn(x,y,items,cfg,frames,mappers);
}


export function shuffleBasic(items,cfg){
	for(let ix = 0; ix < items.length; ix++){
			//console.info(items[ix].style.top, items[ix].style.left)
			let otherEl = getRandomPositionById(items,ix);
			let dimSelf = {
					top: items[ix].style.top,
					left: items[ix].style.left,
				};
			let dimOther = {
					top: otherEl.style.top,
					left: otherEl.style.left, 
				};
			//console.info('saved pos', dimSelf,dimOther, otherEl);

			items[ix].style.top = dimOther.top;
			items[ix].style.left = dimOther.left;

			otherEl.style.top = dimSelf.top;
			otherEl.style.left = dimSelf.left;
				
	}
}
