import React, { Component, useState } from 'react';
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
			
			<div className='admin'>
				{products.map(item => (
					<AdminItem key={item.id} item={item}/>
				))}
				<button onClick={() => this.props.navigate('/addItem')}>Добавить</button>
			</div>
		);
	}
}

const AdminItem = ({item}) => {
	return(
		<div className='admin-item'>
			<details>
				<summary>{item.title}</summary>
				<table>
					<tr>
						<th>Тип:</th>
						<td>{item.type}</td>
					</tr>
					<tr>
						<th>Описание:</th>
						<td>{item.descr}</td>
					</tr>
					<tr>
						<th>Цвета:</th>
						<td>{item.colors !== null ? (
							item.colors.map(item => (
								`${item.name}, `
							))
						) : null}</td>
					</tr>
					<tr>
						<th>Размеры:</th>
						<td>{item.sizes !== null ? item.sizes.toString() : null}</td>
					</tr>
					<tr>
						<th>Цена:</th>
						<td>{item.price}</td>
					</tr>
				</table>
			</details>
			<button>Удалить</button>
		</div>
	)
}

export const AddItem = () => {
	const [colors, setColors] = useState([{
		name: '',
		src: ''
	}]);

	return (
		<form className='admin-form' onSubmit={(e) => {
			console.log(colors);
		}}>
			<label htmlFor='title'>Название</label>
			<input type='text' name='title' required/>
			
			<label htmlFor='type'>Тип</label>
			<input type='text' name='type'/>

			<label htmlFor='descr'>Описание</label>
			<input type='text' name='descr'/>

			<details>
				<summary>Цвета</summary>
				
			</details>

			<label htmlFor='sizes'>Размеры</label>
			<input type='text' name='sizes'/>

			<label htmlFor='price'>Цена</label>
			<input type='number' name='price'/>

			<button type="submit" >Добавить</button>
		</form>
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
