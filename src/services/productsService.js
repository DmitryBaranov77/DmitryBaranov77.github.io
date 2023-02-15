export default class ProductsService {
	getProducts(){
		const products = [
			{id: '1', title: 'Детская машинка', price: 5000, descr: 'Описание', src:'car.jpg'},
			{id: '2', title: 'Детский комбинезон', price: 2000, descr: 'Описание', src:'comb.jpg'},
			{id: '3', title: 'Платье для девочки', price: 1200, descr: 'Описание', src:'dress.jpg'},
			{id: '4', title: 'Игрушечный робот', price: 759, descr: 'Описание', src:'robot.jpg'},
			{id: '5', title: 'Худи', price: 1300, descr: 'Описание', src:'sweater.jpg'}
		]
		return products;
	}
}