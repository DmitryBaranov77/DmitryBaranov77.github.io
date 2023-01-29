import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './product.css';

const Product = ({product, className, onAdd, onInc, onDec}) => {

	return (
		<div className={'product ' + className}>
			<Card>
				<Card.Img variant='top' src='https://roof-rack.ru/upload/medialibrary/9dd/%D1%80%D1%8E%D0%BA%D0%B7%D0%B0%D0%BA%208.jpg'/>
				<Card.Body>
					<Card.Title>{product.name + ' ' + product.price + 'р.'}</Card.Title>
					<Card.Text>Количество: {product.count}</Card.Text>
					<div className='hidden change-count' id={'change-count-' + product.id}>
						<Button className='button' onClick={onInc}>+</Button>
						<Button className='button' onClick={onDec}>-</Button>
					</div>
					<Button className='button add' id={'add-' + product.id} onClick={onAdd}>Добавить в корзину</Button>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Product;