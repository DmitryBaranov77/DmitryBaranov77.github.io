const addToCart = (item) => {
	const payload = {
		id: item.id,
		price: item.price,
		size: item.size ? item.size : 'base',
		color: item.color ? item.color : 'base'
	}
	return {
		type: 'ADD_TO_CART',
		payload
	}
}

const deleteFromCart = (item) => {
	const payload = {
		id: item.id,
		size: item.size ? item.size : 'base',
		color: item.color ? item.color : 'base'
	}
	return {
		type: 'DELETE_FROM_CART',
		payload
	}
}

const modal = (modal) => {
	return {
		type: 'MODAL',
		payload: modal
	}
}

const productsLoaded = (newProducts) =>{
	return {
		type: 'NEW_PRODUCTS',
		payload: newProducts
	}
}

const changeCategory = (type) => {
	return {
		type: 'CHANGE_CATEGORY',
		payload: type
	}
}

export {
	addToCart, 
	deleteFromCart,
	modal,
	changeCategory,
	productsLoaded
}