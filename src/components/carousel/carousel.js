import React, { useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './carousel.css';


export const CarouselItem = ({children, width}) => {
	return (
		<div className='carousel-item' style={{width: width}} >
			{children}			
		</div>
	);
};



const Carousel = ({children, windowWidth}) => {
	const [currentXIndex, setCurrentX] = useState(0);
	const [startX, setStartX] = useState(0);
	const [width, setWidth] = useState(windowWidth);
	const [diff, setDiff] = useState(currentXIndex * width);
	const tg = useTelegram().tg;

	useEffect(() =>{
		setDiff(windowWidth * currentXIndex);
		console.log(diff);
	}, [windowWidth])
	

	return (
		<div className='carousel'>
			<div className='inner' style={{transform: `translate3d(${-diff}px, 0, 0)`}}
			onTouchStart={(e) =>{
				tg.expand();
				document.body.style.overflow = 'hidden';
				setWidth(e.targetTouches[0].target.offsetWidth);
				setStartX(e.targetTouches[0].clientX + (currentXIndex * width));
			}}
			onTouchMove={(e) => {
				tg.expand();
				const dif = startX - e.targetTouches[0].clientX;
				if((currentXIndex === children.length - 1) && (dif > width)){
					
				} else if((currentXIndex === 0) && (dif < 0)){

				} else if (dif > 0 && dif < width * (children.length - 1)){
					setDiff(dif);
				}
			}}
			onTouchEnd={(e) => {
				document.body.style.overflow = 'scroll';
				setCurrentX(Math.round(diff/width));
				setDiff(Math.round(diff/width) * width);
			}}
			>
				{React.Children.map(children, (child, index) => {
					return React.cloneElement(child, {width: '100%'});
				})}
			</div>
		</div>
	)
}

export default Carousel;