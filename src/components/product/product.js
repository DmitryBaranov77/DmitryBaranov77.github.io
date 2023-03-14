import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../button';
import './product.css';

class Product extends React.Component{

	render(){
		const {title, src, price, id, sizes, colors} = this.props.product;
		const exist = this.props.cart.find(item => item.id === id);
		const {onInc, onDec} = this.props;
		const count  = sizes || colors ? 0 : exist ? exist.quantity : 0;
		console.log(src);
		return (
			<div className='product-card-wrapper'>
				<div className={(count !== 0 ? 'active' : '') + ' product-card-image__container'}>
					<a href={'about?' + id}>
						<img className='product-card-image' src={window.URL.createObjectURL(new Blob([src[0]]))} alt={title}/>
					</a>
				</div>

				<div className='product-card-content'>
					<div className='product-card-title__container'>
						<div className='product-card-title'>{title}</div>
					</div>

					<div className={id + ' product-card-content-footer__container ' + (count !== 0 ? 'active' : '')}>
						<div className='product-card-price__container'>
							<div className={'product-card-price ' + (count !== 0 ? 'active' : '')}>{count !== 0 ? price*count : price}</div>
						</div>

						<div className={'product-card-btn-container'}>
							{count !== 0 ? (
								<div className={'btns ' + (count !== 0 ? 'active' : '')}>
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