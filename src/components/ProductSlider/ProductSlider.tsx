import React, { useState } from 'react';

import PrevIcon from '@assets/icons/Chevron_Left.svg?react';
import NextIcon from '@assets/icons/Chevron_Right.svg?react';

import type { Product } from '@/interfaces/Product';

import styles from './ProductSlider.module.css';

interface ProductSliderProps {
    productImgs: Product['images'];
}

function ProductSlider({ productImgs }: ProductSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className={styles.slider}>
            <div className={styles.sliderItem}>
                <button className="prev">
                    <PrevIcon />
                </button>
                <img className="slider-img" src={productImgs[currentSlide]} alt="" />
                <button className="next">
                    <NextIcon />
                </button>
            </div>
            <div className={styles.sliderImgs}>
                {productImgs.map((img, index) => (
                    <button key={img} onClick={() => setCurrentSlide(index)}>
                        <img src={productImgs[index]} alt="" />
                    </button>
                ))}
            </div>
        </div>
    );
}

export { ProductSlider };
