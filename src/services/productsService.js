export default class ProductsService {	
	getAll = async () => {
		const res = await fetch(`https://dmnsmgn.ru/api`);
		console.log(await res.json());
		
		return (await res.json());
	}
}