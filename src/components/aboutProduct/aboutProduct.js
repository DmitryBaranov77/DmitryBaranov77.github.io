import React from 'react';
import Button from '../button';

class AboutProduct extends React.Component {
	render() {
		return (
			
			<div className='product-card'>
				<div className='product-card__header'>
					<Button type={'back'} onClick={() => {
						this.props.navigate(-1);
						this.tg.HapticFeedback.impactOccurred('rigid');
					}}/>
				</div>	
				
				<div className='product-card__container'>

				</div>
			</div>
		);
	}
}

export default AboutProduct;