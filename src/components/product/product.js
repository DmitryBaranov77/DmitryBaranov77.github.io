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
				<div className={(count !== 0 ? 'active' : '') + ' product-card-image__container'}>
					<img className='product-card-image' src={require('../../images/' + src)} alt={title}/>
				</div>

				<div className='product-card-content'>
					<div className='product-card-title__container'>
						<div className='product-card-title'>{title}</div>
					</div>

					<div className={id + ' product-card-content-footer__container ' + (count !== 0 ? 'active' : '')}>
						<div className='product-card-price__container'>
							<div className='product-card-price'>{count !== 0 ? price*count : price}</div>
						</div>

						<div className='product-card-btn-container'>
							{count !== 0 ? (
								<div className='btns'>
									<Button type={'remove'} onClick={() => onDec()} />
									<div className='counter__container'>
										<div className='counter'>{count} шт.</div>
									</div>
									<Button type={'add'} onClick={() => onInc()} />
								</div>
							) : (
								<div className='btns'>
									<Button type={'big-add'} onClick={() => onInc()} />
								</div>
							)}
						</div>
					</div>
				</div>

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