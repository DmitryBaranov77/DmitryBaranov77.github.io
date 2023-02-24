const initialState = {
	cart: [],
	products: [],
	count: 0,
	adress: {}
}

export const reducer = (state = initialState, action) => {
	switch(action.type){
		case 'NEW_PRODUCTS':
			return {
				...state,
				products: action.payload,
			};

		case 'ADD_ADRESS':
			return {
				...state,
				adress: {
					...state.adress,
					...action.payload
				},
			}

		case 'ADD_TO_CART':
			const exist = state.cart.find(item => item.id === action.payload.id);
			if(exist){
				return {
					...state,
					cart: state.cart.map(item => item.id === exist.id ? {...exist, quantity: exist.quantity + 1} : item)
				}
			} else {
				return {
					...state,
					cart: [...state.cart, {...action.payload, quantity: 1}]
				}
			};

		case 'DELETE_FROM_CART':
			const ex = state.cart.find(item => item.id === action.payload.id);
			if(ex.quantity === 1){
				return{
					...state,
					cart: state.cart.filter(item => item.id !== ex.id)
				}
			} else {
				return {
					...state,
					cart: state.cart.map(item => item.id === action.payload.id ? {...ex, quantity: ex.quantity - 1} : item)
				}
			};

		default: return state;
	}
}