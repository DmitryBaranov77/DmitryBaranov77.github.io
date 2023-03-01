import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../button';
import { addToCart, modal } from '../../services/actions';
import './modalSize.css';

const initialState = {
	size: null,
	color: null,
	count: 1
};

class ModalSize extends Component {
	tg = useTelegram().tg;
	state = {
		...initialState
	}

	handler(name, value) {
		this.setState({
			[name]: value
		});
	}

	render() {
		const {modal, addToCart} = this.props; 
		let {isOpen, item} = this.props.modalStore; 
		return (
			<>
				{isOpen ? 
				(
				<div className='modal__wrapper' onClick={(e) => {
					if(e.target.className === 'modal__wrapper'){
						this.setState({...initialState});
						modal({isOpen: false, item: null});
					}
					}}>
					<div className='modal'>
						<div className='modal-header'>
							<button className='close' onClick={() =>  {
								this.setState({...initialState});
								modal({isOpen: false, item: null});
							}} />
						</div>
						<div className='modal-content'>
							{item.colors ? 
							(<div className='list-wrapper'>
								<div className='title'>Выберите цвет</div>
								<div className='list'>
									{item.colors.split(' ').map((color, index) => (
										<div key={color.toString()} className='modal-content__item'>
											<input 
											id={'color-'+index}
											type='radio' 
											onChange={() => this.handler('color', color)}
											checked={this.state.color === color}
											/>
											<label htmlFor={'color-'+index}>{color}</label>
										</div>
									))}
								</div>
							</div>)
							:
							null
							}
							{item.sizes ? 
							(<div className='list-wrapper'>
								<div className='title'>Выберите размер</div>
								<div className='list'>
									{item.sizes.split(' ').map((size, index) => (
										<div key={size.toString()} className='modal-content__item'>
										<input 
										id={'size-'+index}
										key={'size-'+index}
										type='radio' 
										onChange={() => this.handler('size', size)}
										checked={this.state.size === size}
										/>
										<label key={index + '-label-size'} htmlFor={'size-'+index}>{size}</label>
									</div>
									))}
								</div>
							</div>)
							:
							null
							}
						</div>
						<div className={'modal-footer ' + ((!this.state.color || !this.state.size) ? 'hidden' : 'visible')}>
							<div className={'btns'}>
								<Button type={'remove'} onClick={() => this.state.count === 1 ? 1 : this.handler('count', this.state.count - 1)} />
								<div className='counter__container'>
									<div className='counter'>{this.state.count} шт.</div>
								</div>
								<Button type={'add'} onClick={() => {
									this.handler('count', this.state.count + 1)
								}} />
							</div>
							<div className='add-to-cart-btn'>
								<button onClick={() => {
									addToCart({...item, quantity: this.state.count, color: this.state.color, size: this.state.size});
									this.setState({...initialState});
									modal({isOpen: false, item: null});
									this.tg.HapticFeedback.impactOccurred('rigid');
								}}>Добавить в корзину</button>
							</div>
						</div>
					</div>
				</div>
				)
				:
				null
				}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		modalStore: state.modalStore
	}
}

const mapDispatchToProps = {
	modal,
	addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSize);