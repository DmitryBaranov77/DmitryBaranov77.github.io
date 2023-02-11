import React from "react"
import { useNavigate } from "react-router-dom"
import ProductsServiceContext from "../productsContext/productsServiceContext"

const WithProductsService = () => (Wrapped) => {
	return (props) =>{
		const navigate = useNavigate();

		const getTotalPrice = (items = []) => {
			return items.reduce((acc, item) => {
				return acc+=(item.price * item.quantity);
			}, 0);
		}

		return (
			<ProductsServiceContext.Consumer>
				{
					
					(ProductsService) => {
						
						return <Wrapped totalPrice={getTotalPrice} navigate={navigate} {...props} ProductsService={ProductsService}/>
					}
				}
			</ProductsServiceContext.Consumer>
		)
	}
}

export default WithProductsService;