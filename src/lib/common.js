export function getRowPosition(n,rows,cols){

	return (n+1) % cols?Math.floor((n+1) / cols):(n+1)/cols - 1

}
export function getColPosition(n,rows){
		return n < rows?n:(n % rows);
}

export function getFraction(f,mx=10000){
	return Math.ceil(((f < 1.0) ? f : (f % Math.floor(f))) * mx)
}

export function computeCellPositions(x,y){
	const limX = 100/x;
	const limY = 100/y;
	const dotGrid = [];
	for(let i = 0; i < y; i++){
		for(let j = 0; j < x; j++)
			dotGrid.push({x: -j*limX, y: -i*limY})
	}
	return dotGrid;
}


export function randN(n){
	return Math.abs(Math.round(Math.random() * (100-n)))+n;
}