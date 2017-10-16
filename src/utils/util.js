const randomRange=(under, over)=>{
	return Math.ceil(Math.random() * (over - under) + under);
};
export {randomRange as default}