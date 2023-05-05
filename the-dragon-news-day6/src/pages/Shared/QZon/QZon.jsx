import React from 'react';
import QZon1 from '../../../assets/qZone1.png'
import QZon2 from '../../../assets/qZone2.png'
import QZon3 from '../../../assets/qZone3.png'


const QZon = () => {
    return (
        <div className='bg-secondary text-center my-4 py-4'>
            <h2>QZon</h2>
            <div>
                <img src={QZon1} alt="" />
                <img src={QZon2} alt="" />
                <img src={QZon3} alt="" />
            </div>
        </div>
    );
};

export default QZon;