import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../button';
import { addToCart, modal, deleteFromCart } from '../../services/actions';
import './modalSize.css';

const initialState = {
	size: null,
	color: null,
	src: null
};

class ModalSize extends Component {
	tg = useTelegram().tg;
	state = {
		...initialState,
	}

	componentDidUpdate(){
		if(!this.state.src && this.props.modalStore.item){
			this.setState({
				src: this.props.modalStore.item?.src,
				color: this.props.modalStore.item?.colors ? this.props.modalStore.item?.colors[0] : 'base',
				size: this.props.modalStore.item?.sizes ?  this.props.modalStore.item?.sizes[0] : 'base'
			})
		}
	}

	handler(name, value) {
		this.setState({
			[name]: value
		});
	}

	render() {
		const {modal, addToCart, deleteFromCart, cart} = this.props; 
		let {isOpen, item} = this.props.modalStore;
		const exist = cart.find(pr => ((pr.id === item?.id) && (pr.color?.name === this.state.color?.name) && (pr.size === this.state.size)));
		const count = exist ? exist.quantity : 0;
		let src = this.state.src ? require('../../images/'+this.state.src) : '';
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
							<div className='modal-content__header'>
								<img src ={src} alt=''></img>
								<div className='price'>{item.price * count}</div>
							</div>
							{item.colors ? 
							(<div className='list-wrapper'>
								<div className='title'>Выберите цвет</div>
								<div className='list__colors'>
									{item.colors.map((color, index) => (
										<div key={'color--'+index} className='modal-content__item'>
											<input 
											id={'color-'+index}
											type='radio' 
											onChange={() => {
												this.handler('color', color);
												this.handler('src', color.src);
											}}
											checked={this.state.color === color}
											/>
											<label htmlFor={'color-'+index}>{color.name}</label>
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
								<div className='list__sizes'>
									{item.sizes.map((size, index) => (
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
						<div className={'modal-footer '}>
							<div className={'btns'}>
								<Button type={'remove'} onClick={() => {
									if(this.state.count !== 0){
										deleteFromCart({...item, color: this.state.color, size: this.state.size})
									}
								}} />
								<div className='counter__container'>
									<div className='counter'>{count} шт.</div>
								</div>
								<Button type={'add'} onClick={() => {
									addToCart({...item, color: this.state.color, size: this.state.size});
								}} />
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
		modalStore: state.modalStore,
		cart: state.cart
	}
}

const mapDispatchToProps = {
	modal,
	addToCart,
	deleteFromCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSize);