import React from 'react';
import Button from '../../button/button';
import './product.css';

export default class Product extends React.Component{
	product = this.props.product;
	state = {
		count: 0
	};

	onIncHandler = () => {
		this.setState(prevstate => {
			return {
				count: prevstate.count + 1
			}
		})
		this.props.onInc(this.product);
	}

	onDecHandler = () => {
		this.setState(prevstate => {
			return {
				count: prevstate.count - 1
			}
		})
		this.props.onDec(this.product);
		
	}

	render(){
		const {title, src, price} = this.product;
		const count = this.state.count;
		return (
			<div className={'card'}>
				<span
				className={`${count !== 0 ? 'card__badge' : 'card__badge--hidden'}`}
				>
					{count}
				</span>
				<div className='image__container'>
					<img src={src} alt={title} />
				</div>
				<h4 className='card__title'>
					{title}. <span className='card__price'> {price}</span>
				</h4>

				<div className='btn-container'>
					{count !== 0 ? (<Button title={'-'} type={'remove'} onClick={this.onDecHandler} />) : ''}
					<Button title={'+'} type={'add'} onClick={this.onIncHandler}/>
				</div>
			</div>
		);
	}
}