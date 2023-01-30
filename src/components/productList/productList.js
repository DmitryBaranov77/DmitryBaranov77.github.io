import React, { useCallback } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import Product from '../product/product';
import './productList.css';

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return acc+=(item.price * item.quantity);
	}, 0);
}

export default class ProductList extends React.Component{
	products = this.props.products;
	tg = useTelegram().tg;


	state = {
		cart: []
	}

	onSendData = () => {
		const data = {
			cart: this.state.cart,
			// initData: this.state.initData,
			// initDataUnsafe: this.tg.initDataUnsafe,
			// version: this.tg.version,
			// platform: this.tg.platform,
			// themeParams: this.tg.themeParams,
		}
		this.tg.sendData(JSON.stringify(data));
	}

	componentDidMount(){
		this.tg.onEvent('mainButtonClicked', () => {
			const data = {
			cart: this.state.cart,
			initData: this.state.initData,
			initDataUnsafe: this.tg.initDataUnsafe,
			version: this.tg.version,
			platform: this.tg.platform,
			themeParams: this.tg.themeParams,
		}
		this.tg.sendData(JSON.stringify(data));
		});
	}

	componentDidMount() {
		this.tg.offEvent('mainButtonClicked', this.onSendData);
	}

	componentDidUpdate(prevProps, prevState){
		if(this.state.cart.length === 0){
			this.tg.MainButton.hide();
		} else {
			this.tg.MainButton.show();
			this.tg.MainButton.setParams({
				text: getTotalPrice(this.state.cart)
			})
		}
	}

	onInc = (product) => {
		const exist = this.state.cart.find(item => item.id === product.id);
		if(exist){
			this.setState(prevState => {
				return {
					cart: prevState.cart.map(item => item.id === product.id ? {...exist, quantity: exist.quantity + 1} : item)
				}
			})
		} else {
			this.setState(prevState => {
				return {
					cart: [...prevState.cart, {...product, quantity: 1}]
				}
			})
		}
	}

	onDec = (product) =>{
		const exist = this.state.cart.find(item => item.id === product.id);
		if(exist.quantity === 1){
			this.setState(prevState => {
				return{
					cart: prevState.cart.filter(item => item.id !== product.id)
				}
			})
		} else {
			this.setState(prevState => {
				return {
					cart: prevState.cart.map(item => item.id === product.id ? {...exist, quantity: exist.quantity - 1} : item)
				}
			})
		}
	}

	render() {
		const products = this.products;
		return (
			<div className='list'>
				{products.map(item => (
					<Product
						key={item.id}
						product={item}
						onInc={this.onInc}
						onDec={this.onDec}
					/>
				))}
			</div>
		);
	}
};