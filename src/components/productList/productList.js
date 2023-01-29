import React, { useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import Product from '../product/product';
import './productList.css';

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return acc+=(item.price * item.count);
	}, 0);
}

export default class ProductList extends React.Component{
	products = this.props.products;
	tg = useTelegram().tg;

	state = {
		products: this.products,
		cart: []
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


	onAdd = async (product) => {
		let index = this.state.products.findIndex(item => item.id === product.id);
		this.setState(prevState => {
			prevState.products[index].count++;
			return {
				products: prevState.products,
				cart: [...prevState.cart, prevState.products[index]]
			}
		})

		document.getElementById(`add-${product.id}`).classList.add('hidden');
		document.getElementById(`change-count-${product.id}`).classList.remove('hidden');
	}

	onDec = (product) => {
		let index = this.state.products.findIndex(item => item.id === product.id);
		this.setState(prevState => {
			prevState.products[index].count--;
			if(prevState.products[index].count === 0){
				document.getElementById(`add-${product.id}`).classList.remove('hidden');
				document.getElementById(`change-count-${product.id}`).classList.add('hidden');
				return {
					products: prevState.products,
					card: prevState.cart.filter(i => i.id !== product.id)
				}
			} else {
				prevState.cart.findIndex(item => item.id === product.id)
				prevState.cart[index] = prevState.products[index];
				return {
					products: prevState.products,
					cart: prevState.cart
				}
			}
		})
	}

	onInc = (product) =>{
		let index = this.state.products.findIndex(item => item.id === product.id);
		this.setState(prevState => {
			prevState.products[index].count++;
			prevState.cart.findIndex(item => item.id === product.id)
			prevState.cart[index] = prevState.products[index];
			return {
				products: prevState.products,
				cart: prevState.cart
			}
		})
	}

	render() {
		const {products} = this.state;
		return (
			<div className='list'>
				{products.map(item => (
					<Product
						key={item.id}
						product={item}
						onAdd={() => this.onAdd(item)}
						className={'item'}
						onInc={() => this.onInc(item)}
						onDec={() => this.onDec(item)}
					/>
				))}
			</div>
		);
	}
};