import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../button';
import './product.css';

class Product extends React.Component{

	render(){
		const {title, src, price, id} = this.props.product;
		const {onInc, onDec} = this.props;
		const exist = this.props.cart.find(item => item.id === id);
		const count  = exist ? exist.quantity : 0; 
		return (
			<div className='product-card-wrapper'>
				<div className='an'>
					<div className='image-wrapper'>
						<Link to={`/about/?${id}`}>
							<img className='product-card__image' src={src} alt={title}/>
						</Link>
					</div>
					<div className='product-card__content'>
						<div className='product-cart-tite__wrapper'>
							<div className='product-card-title'>{title}</div>
						</div>
					</div>
					<div className={'product-card__control ' + (count === 0 ? 'add' : 'choose')}>
						<div className='product-card__price'>
							<div className='gm'>
								<div className='price'>{price*count === 0 ? price : price*count} ₽</div>
							</div>
						</div>
						<div className='product-card__cart'>
						{count !== 0 ?
							(<div>
								<div className='btn-container'>
									<Button title={'-'} type={'remove'} onClick={() => onDec()}/>
									<div className='counter'>{count} шт.</div>
									<Button title={'+'} type={'add'} onClick={() => onInc()}/>
								</div>
							</div>)
							:
							(<div className='cart-add'>
								<Button type={'big-add'} onClick={() => onInc()}/>
							</div>)}
						</div>
					</div>
				</div>
			</div>
			// <div className={'card'}>
			// 	<div className='image__container'>
			// 		<Link to={`/about/?${id}`}>
			// 			<img src={src} alt={title}/>
			// 		</Link>
			// 	</div>
				
			// 	<div className='card__title'>
			// 		{title.substr(0, 50
			// 			)}<Link to={`/about/?${id}`}> ...</Link>
					
			// 	</div>

			// 	{count !== 0 ?
			// 	(<div>
			// 		<div className='card__price'>{price*count === 0 ? price : price*count} ₽</div>
			// 		<div className='btn-container active'>
			// 			<Button title={'-'} type={'remove'} onClick={() => onDec()}/>
			// 			<div className='counter'>{count} шт.</div>
			// 			<Button title={'+'} type={'add'} onClick={() => onInc()}/>
			// 		</div>
			// 	</div>)
			// 	:
			// 	(<div className='btn-container'>
			// 		<div className='card__price'>{price} ₽</div>
			// 		<Button title={'В корзину'} type={'big-add'} onClick={() => onInc()}/>
			// 	</div>)
			// 	}
			// </div>
		);
	}
}

const mapStateToProps = (state) =>{
	return {
		cart: state.cart
	}
}

export default connect(mapStateToProps)(Product)