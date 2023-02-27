import React from 'react';
import Button from '../button';
import './cartListItem.css';	

class CartListItem extends React.Component {

	render() {
		const {src, title, quantity, price, id} = this.props.product;
		const {onInc, onDec} = this.props;
		return (
			<div className='cart-item'>
				<div className='cart-image__container'>
					<a href={'about?' + id}>
						<img src={require('../../images/'+src)}/>
					</a>
				</div>

				<div className='cart-item__container'>
					<div className='cart-item__header'>
						<div className='cart-item__title'>{title}</div>
					</div>
					<div className='cart-item__footer'>
						<div className='cart-price__container'>
							{price*quantity} ₽
						</div>
						<div className='cart-btn-container active'>
							<Button title={'-'} type={'remove'} onClick={() => {
								onDec();
							}}/>
								<div className='counter'>{quantity} шт.</div>
							<Button title={'+'} type={'add'} onClick={() => {
								onInc();
							}}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CartListItem;