import React from 'react';
import Button from '../button';

class CartListItem extends React.Component {

	render() {
		const {src, title, quantity, price} = this.props.product;
		const {onInc, onDec} = this.props;
		return (
			<div className='cartList'>
				<div className='image__container'>
					<img src={src}/>
				</div>

				<div className='item__title'>
					{title}
				</div>

				<div className='button__container'>
					<Button title={'-'} type={'remove'} onClick={() => onDec()}/>
						<div className='counter'>{quantity} шт.</div>
					<Button title={'+'} type={'add'} onClick={() => onInc()}/>
				</div>

				<div className='price__container'>
					{price*quantity} ₽
				</div>
			</div>
		);
	}
}

export default CartListItem;