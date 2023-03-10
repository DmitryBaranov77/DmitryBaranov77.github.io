import React from 'react';
import WithProductsService from '../hoc/withProductsService';
import Button from '../button';
import { connect } from 'react-redux';
import './aboutProduct.css'
import { useTelegram } from '../../hooks/useTelegram';
import { addToCart, deleteFromCart, modal } from '../../services/actions';
import Carousel, { CarouselItem } from '../carousel/carousel';

class AboutProduct extends React.Component {
	tg = useTelegram().tg;

	render() {
		const id = location.search.slice(1);
		const {addToCart, deleteFromCart, products, modal} = this.props;
		const product = products.find(item => item.id === id);
		let {src, title, descr, price, sizes, colors} = product;
		console.log(product);
		const exist = this.props.cart.find(item => item.id === id);
		const count  = (sizes || colors) ? 0 : exist ? exist.quantity : 0;
		
		return (
			<div className='product-card'>
				<div className='product-card__header'>
					<Button type={'back'} onClick={() => {
						this.props.navigate(-1);
						this.tg.HapticFeedback.impactOccurred('rigid');
					}}/>
				</div>	
				
				<div className='product-card__container'>
					<div className='image__container'>
						{src.length === 1 ? (
								<img className='product-card-image' src={require('../../images/' + src)} alt={title}/>
							) : (
								<Carousel>
									{src.map((item, index) => (
										<CarouselItem key={index}>
											<img className='product-card-image' src={require('../../images/' + item)} alt={title}/>
										</CarouselItem>
									))}
								</Carousel>
						)}
					</div>
					<div className='title__container'>
						<div className='title'>{title}</div>
					</div>
					<div className='description__container'>
						<p className='description'>{descr}</p>
					</div>
				</div>
				<div className='product-card__footer'>
					<div className='card__price'>{price*count === 0 ? price : price*count} ₽</div>
					{count !== 0 ? (
						<div className={'btns ' + (count !== 0 ? 'active' : '')}>
							<Button type={'remove'} onClick={() => {
								this.tg.HapticFeedback.impactOccurred('rigid');
								deleteFromCart(product);
							}} />
							<div className='counter__container'>
								<div className='counter'>{count} шт.</div>
							</div>
							<Button type={'add'} onClick={() => {
								this.tg.HapticFeedback.impactOccurred('rigid');
								if(colors || sizes){
									modal({isOpen: true, item: product})
								} else {
									addToCart(product);
								}
							}} />
						</div>
					) : (
						<div className='btns'>
							<Button type={'big-add'} onClick={() => {
								modal({isOpen: true, item: product});
								if(colors || sizes){
									modal({isOpen: true, item: product});
								} else {
									addToCart(product);
								}
								this.tg.HapticFeedback.impactOccurred('rigid');
								}} />
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products,
		cart: state.cart,
		modalStore: state.modalStore
	}
}

const mapDispatchToProps = {
	addToCart,
	deleteFromCart,
	modal
}

export default WithProductsService()(connect(mapStateToProps, mapDispatchToProps)(AboutProduct));