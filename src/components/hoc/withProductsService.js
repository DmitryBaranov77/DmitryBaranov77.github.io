import React from "react"
import { useNavigate } from "react-router-dom"
import ProductsServiceContext from "../productsContext/productsServiceContext"

const WithProductsService = () => (Wrapped) => {
	return (props) =>{
		const navigate = useNavigate();
		return (
			<ProductsServiceContext.Consumer>
				{
					
					(ProductsService) => {
						
						return <Wrapped navigate={navigate} {...props} ProductsService={ProductsService}/>
					}
				}
			</ProductsServiceContext.Consumer>
		)
	}
}

export default WithProductsService;