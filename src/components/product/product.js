import React from 'react';
import { connect } from 'react-redux';
import Button from '../button';
import './product.css';

class Product extends React.Component{

	render(){
		const {title, src, price, id} = this.props.product;
		const {onInc, onDec} = this.props;
		const exist = this.props.cart.find(item => item.id === id);
		const count  = exist ? exist.quantity : 0; 
		return (
			<div className={'card'}>
				<div className='image__container'>
					<a href='/reg'>
						<img src={src} alt={title}/>
					</a>
				</div>
				
				<div className='card__title'>
					{title.substr(0, 24
						)}<a className='about' href='/reg'>...</a>
					
				</div>

				{count !== 0 ?
				(<div>
					<div className='card__price'>{price*count === 0 ? price : price*count} ₽.</div>
					<div className='btn-container'>
						<Button title={'-'} type={'remove'} onClick={() => onDec()}/>
						<div className='counter'>{count} шт.</div>
						<Button title={'+'} type={'add'} onClick={() => onInc()}/>
					</div>
				</div>)
				:
				(<div className='btn-container'>
					<div className='card__price'>{price} ₽.</div>
					<Button title={'В корзину'} type={'big-add'} onClick={() => onInc()}/>
				</div>)
				}
			</div>
		);
	}
}

const mapStateToProps = (state) =>{
	return {
		cart: state.cart
	}
}

export default connect(mapStateToProps)(Product)