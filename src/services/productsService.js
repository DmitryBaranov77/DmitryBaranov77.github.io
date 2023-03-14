export default class ProductsService {
	getProducts(){
		const products = [
			{id: '1', 
			title: 'Детская машинка', 
			type:'Игрушки', 
			sizes: null, 
			colors: null, 
			price: 5000, 
			descr: `Реалистичный пушкар "Mercedes-Benz SLS" со звуковыми эффектами, на котором можно кататься дома и на улице. Каталка стимулирует малышей к активным движениям и развитию. В процессе игры развивается общая моторика и опорно-двигательный аппарат. Под сиденьем толокара багажник для игрушек. На руле кнопки для звуковых эффектов. Размер модели 66,2*28,7*38,4см  вес 2,57кг. Максимальная нагрузка 23 кг. В данной модели предусмотрена защита от опрокидывания. Для работы звуковых эффектов требуются 2 батарейки типа AA (в комплект не входят). Габариты упаковки: 67*30*26см  вес 3,51кг.

			Комплектация: машина-каталка
			Максимальная нагрузка, кг: 23
			Родительская ручка: нет
			Батарейки в комплекте: нет
			Тип батареек: 2 шт AA
			Возраст, лет: 3+
			Длина, см: 66,2
			Высота, см: 38,4
			Ширина, см: 28,7
			Вес, кг: 3,49
			Страна бренда: Китай
			Длина упаковки, см: 67
			Ширина упаковки, см: 26
			Высота упаковки, см: 30`, 
			src:['car.jpg', 'comb.jpg']
			},
			{id: '2', title: 'Детский комбинезон', colors: [
				{
					name: 'Голубой',
					src: ['comb.jpg']
				},
				{
					name: 'Цвет2',
					src: ['S127c0e2b55f04ff19e6a5af68329c556C.jpg']
				},
				{
					name: 'Цвет3',
					src: ['Sf1ac089cc4ea4be6a5a7af5a3140b747x.jpg']
				},
				{
					name: 'Цвет4',
					src: ['S7bf46338a4b74332a24565f9fa4502b4T.jpg']
				},
				{
					name: 'Цвет5',
					src: ['Sd20edc0f91eb429ab5210561d34bd9a2N.jpg']
				},
				{
					name: 'Цвет6',
					src: ['Se015b4fada414a6285c1a3631f2a0f94S.jpg']
				},
				{
					name: 'Цвет7',
					src: ['Sa7aeb4e5edcd41e6913f07b0e52c345en.jpg']
				}
			], 
			sizes: ['S', 'M', 'L'], 
			type:'Одежда', 
			price: 2000, 
			descr: 'Описание', 
			src:['comb.jpg']},
			{id: '3', title: 'Платье для девочки', sizes: ['S', 'M', 'L'], colors: null, type:'Верхняя одежда', price: 1200, descr: 'Описание', src:['dress.jpg', 'comb.jpg']},
			{id: '4', title: 'Игрушечный робот', type:'Игрушки', sizes: null, colors: null, price: 759, descr: 'Описание', src:['robot.jpg']},
			{id: '5', title: 'Худи', type:'Одежда', sizes: null, colors: null,  price: 1300, descr: 'Описание', src:['sweater.jpg']}
		]
		
		return products;
	}

	getAll = async () => {
		const res = await fetch(`https://dmnsmgn.ru/api`);
		console.log(await res.json());
	}
}