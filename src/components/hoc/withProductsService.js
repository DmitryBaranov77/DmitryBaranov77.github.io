import React from "react"
import ProductsServiceContext from "../productsContext/productsServiceContext"

const WithProductsService = () => (Wrapped) => {
	return (props) =>{
		return (
			<ProductsServiceContext.Consumer>
				{
					(ProductsService) => {
						return <Wrapped {...props} ProductsService={ProductsService}/>
					}
				}
			</ProductsServiceContext.Consumer>
		)
	}
}

export default WithProductsService;