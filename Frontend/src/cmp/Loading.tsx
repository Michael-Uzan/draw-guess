import React from 'react';
import Loader from '../assets/imgs/bars-loader.svg';

export function Loading() {
    return (
        <div className="loader flex align-center justify-center">
            <img src={Loader} alt="loading..." />
        </div>
    )
}
