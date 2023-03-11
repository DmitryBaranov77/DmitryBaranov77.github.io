import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productsLoaded } from '../../services/actions';
import WithProductsService from '../hoc/withProductsService';
import './admin.css'


class Admin extends Component {
	componentDidMount(){
		const {ProductsService} = this.props;
		this.props.productsLoaded(ProductsService.getProducts());
	}

	render() {
		const {products} = this.props;
		return (
			<div>
				<table>
					<></>
					{products.map(item => (
						<AdminItem key={item.id} item={item}/>
					))}
				</table>
			</div>
		);
	}
}

const AdminItem = ({item}) => {
	return(
		<div className='admin-item'>
			<div className='type'>{item.type}</div>
			<div className='title'>{item.title}</div>
			<div className='descr'>{item.descr}</div>
			<div className='sizes'>{item.sizes !== null ? item.sizes.toString() : null}</div>
			<div className='colors'>{item.colors !== null ? item.colors.toString() : null}</div>
			<div className='price'>{item.price}</div>
		</div>
	)
}

const mapStateToProps = (state) =>{
	return {
		products: state.products,
	}
}

const mapDispatchToProps = {
	productsLoaded,
}

export default WithProductsService()(connect(mapStateToProps, mapDispatchToProps)(Admin));
