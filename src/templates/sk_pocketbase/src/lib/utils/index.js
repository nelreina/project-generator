export const serializePOJO = (obj) => {
	return JSON.parse(JSON.stringify(obj));
};
