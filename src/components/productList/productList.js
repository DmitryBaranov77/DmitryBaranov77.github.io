import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { useTelegram } from '../../hooks/useTelegram';
import { addToCart, changeCategory, deleteFromCart, modal, productsLoaded } from '../../services/actions';
import Button from '../button';
import WithProductsService from '../hoc/withProductsService';
import Product from '../product/product';
import './productList.css';
class ProductList extends React.Component{
	tg = useTelegram().tg;
	navigate = this.props.navigate;
	totalPrice = this.props.totalPrice;
	ref = createRef();
	
	async componentDidMount() {
		const {ProductsService} = this.props;
		ProductsService.getAll().then(res => {
			this.props.productsLoaded(res);
		})
		this.tg.MainButton.onClick(this.onGoCart);
		this.tg.enableClosingConfirmation();
		this.tg.MainButton.color = '#20B2AA';
	}

	onGoCart = () => {
		this.props.navigate('/cart');
	}

	componentDidUpdate(){
		const cart = this.props.cart;
		if(cart.length === 0 || this.props.modalStore.isOpen){
			this.tg.MainButton.hide();
		} else {
			this.tg.MainButton.show();
			this.tg.MainButton.setParams({
				text: this.totalPrice(cart)+' ₽'
			})
		}
		const el = this.ref.current;
		if (el) {
			const onWheel = e => {
			  if (e.deltaY == 0) return;
			  e.preventDefault();
			  el.scrollTo({
				left: el.scrollLeft + e.deltaY,
				behavior: "smooth"
			  });
			};
			el.addEventListener("wheel", onWheel);
			return () => el.removeEventListener("wheel", onWheel);
		}
	}

	componentWillUnmount(){
		this.tg.MainButton.offClick(this.onGoCart);
		this.tg.MainButton.setParams({
			text: 'Оплатить'
		})
	}

	render() {
		const { products, categories, currentCategory, addToCart, deleteFromCart, changeCategory, modal} = this.props;
		const showProducts = currentCategory === 'Все' ? products : products.filter(item => item.type === currentCategory);

		return (
			<div className='list-wrapper'>
				<div className='list-header'>
					<Button type={'cart'} onClick={() => {
						this.tg.HapticFeedback.impactOccurred('rigid');
						this.navigate('/cart');
					}}/>
				</div>
				<div className='categories-scroller' ref={this.ref}>
					{categories.map((item, index) => (
						<button className={currentCategory === item ? 'active' : ''} key={index + 'btn'} onClick={() =>{
							this.tg.HapticFeedback.impactOccurred('rigid');
							changeCategory(item);
						}}>
							{item}
						</button>
					))}
				</div>
				<div className='list'>
					{showProducts.map(item => (
						<Product
							key={item.id}
							product={item}
							onInc={() => {
								if(item?.colors.length !== 0 || item?.sizes){
									modal({isOpen: true, item})
								} else {
									addToCart(item);
								}
								this.tg.HapticFeedback.impactOccurred('rigid');
							}}
							onDec={() => {
								deleteFromCart(item);
								this.tg.HapticFeedback.impactOccurred('rigid');
							}}
						/>
					))}
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) =>{
	return {
		products: state.products,
		cart: state.cart,
		categories: state.categories,
		currentCategory: state.currentCategory,
		modalStore: state.modalStore
	}
}

const mapDispatchToProps = {
	productsLoaded,
	addToCart,
	deleteFromCart,
	changeCategory,
	modal

}

export default  WithProductsService()(connect(mapStateToProps, mapDispatchToProps)(ProductList))