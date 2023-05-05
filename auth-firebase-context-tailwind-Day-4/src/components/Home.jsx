import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';

const Home = () => {

    const { user } = useContext(AuthContext)
    console.log(user);
    return (
        <div>
            <h2 className='text-center text-3xl font-bold mt-3 mb-2'>This is Home {user && <span>{user.diaplayName}</span>}</h2>
            <div className="mockup-window border bg-base-300">
                <div className="flex justify-center px-4 py-16 bg-base-200 text-5xl text-indigo-600">Auth MASter</div>
            </div>
        </div>
    );
};

export default Home;