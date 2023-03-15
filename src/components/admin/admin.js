import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { productsLoaded } from '../../services/actions';
import WithProductsService from '../hoc/withProductsService';
import './admin.css'



class Admin extends Component {
	componentDidMount(){
		const {ProductsService} = this.props;
		ProductsService.getAll().then(res => {
			this.props.productsLoaded(res);
		})
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
					<tbody>
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
					</tbody>
				</table>
			</details>
			<button onClick={() => {
				let data = new FormData();
				data.append('id', item.id);
				fetch('https://dmnsmgn.ru/api', {
					method: 'DELETE',
					body: data
				})
				window.location.reload();
			}}>Удалить</button>
		</div>
	)
}

export const AddItem = () => {
	const [colors, setColors] = useState([]);
	const [photos, setPhotos] = useState([{
		src: ''
	}])
	const [title, setTitle] = useState(null);
	const [type, setType] = useState(null);
	const [descr, setDescr] = useState(null);
	const [sizes, setSizes] = useState([]);
	const [price, setPrice] = useState(null);

	return (
		<form className='admin-form' onSubmit={(e) => {
			e.preventDefault();
			let data = new FormData();
			data.append('title', title);
			data.append('type', type);
			data.append('descr', descr);
			data.append('price', price);

			sizes.map(item => {
				data.append('sizes[]', item);
			})
			colors.map(item => {
				data.append('colorNames[]', item.name);
				data.append('colorSrcs', item.src);
			})
			photos.map(item => {
				data.append('files', item.src);
			})

			// console.log(data.getAll('title'));
			// console.log(data.getAll('type'));
			// console.log(data.getAll('descr'));
			// console.log(data.getAll('price'));
			// console.log(data.getAll('sizes[]'));
			// console.log(data.getAll('colorNames[]'));
			// console.log(data.getAll('colorSrcs'));
			// console.log(data.getAll('files'));
			fetch('https://dmnsmgn.ru/api',{
				method: 'POST',
				body: data
			}).then(() => {
				window.location.href = 'https://dmnsmgn.ru/admin';
			})
		}}>
			<button type="button" onClick={() => window.location.href = 'https://dmnsmgn.ru/admin'}>Назад</button>
			<label htmlFor='title'>Название</label>
			<input type='text' name='title' required onChange={(e) => setTitle(e.target.value)}/>
			
			<label htmlFor='type'>Тип</label>
			<input type='text' name='type' required onChange={(e) => setType(e.target.value)}/>

			<label htmlFor='descr'>Описание</label>
			<textarea type='text' name='descr' required onChange={(e) => setDescr(e.target.value)}/>

			<details>
				<summary>Цвета</summary>
				{colors.map((item, index) => (
					<div className='admin-color' key={index}>
						<label htmlFor='name'>Имя</label>
						<input name='name' type='text' value={colors[index].name || ''} required onChange={(e) => {
							let data = [...colors];
							data[0].name = e.target.value;
							setColors(data);
						}}/>

						<label className='file' htmlFor={"filePicker"+index}>{colors[index].src?.name || 'Выберите файл'}</label>
						<input id={"filePicker"+index} type={"file"} hidden required onChange={(e) => {
							let data = [...colors];
							data[index].src = e.target.files[0];
							setColors(data);
						}}/>
						<button type='button' onClick={() => {
							let data = [...colors];
							data.splice(index, 1);
							setColors(data);
						}}>Удалить</button>
					</div>
				))}
				<button type='button' onClick={() => setColors([...colors, {name: null, src: null}])}>Добавить цвет</button>
			</details>

			<details>
				<summary>Фото</summary>
				{photos.map((item, index) => (
					<div className='admin-color' key={'photo'+index}>
						<label className='file' htmlFor={"photoPicker"+index}>{photos[index].src?.name || 'Выберите файл'}</label>
						<input id={"photoPicker"+index} type={"file"} hidden required onChange={(e) => {
							let data = [...photos];
							data[index].src = e.target.files[0];
							setPhotos(data);
						}}/>
						{index !== 0 ? (
							<button type='button' onClick={() => {
								let data = [...photos];
								data.splice(index, 1);
								setPhotos(data);
							}}>Удалить</button>
						) : null}
					</div>
				))}
				<button type='button' onClick={() => setPhotos([...photos, {src: null}])}>Добавить фото</button>
			</details>

			<label htmlFor='sizes'>Размеры</label>
			<input type='text' name='sizes' onChange={(e) => {
					const data = e.target.value.split(' ');
					setSizes(data);
				}}/>

			<label htmlFor='price'>Цена</label>
			<input type='number' name='price' required onChange={(e) => setPrice(e.target.value)}/>

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
