export default class ProductsService {	
	getAll = async () => {
		const res = await fetch(`https://dmnsmgn.ru/api`);
		
		return (await res.json());
	}
}