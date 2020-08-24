import StyleSetter from "./style-setter";

const upDownCommon = {
	width: '100%',
	height: '100%',
	zIndex: -1,
}
export const DivideStyles = {
	'bg-up': new StyleSetter({
		...upDownCommon,
		position: 'absolute',
		top: '0',
		left: '0',
	}),
	'bg-down': new StyleSetter({
		...upDownCommon,
		position: 'absolute',
		bottom: '0',
		right: '0',
	})
}

export const BasicCollapseable = {
	itemClass: new StyleSetter({zIndex: 1}),
	'margin-part': new StyleSetter({ perspective: '500px', backfaceVisibility: 'hidden',}),
	'box-target': new StyleSetter({display: 'flex', flexWrap: 'wrap', maxWidth: '100vw', maxHeight: '100vh'}),
}

