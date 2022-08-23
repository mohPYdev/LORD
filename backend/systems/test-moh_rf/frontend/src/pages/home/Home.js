
import React, { useEffect, useState } from 'react';
import './Home.css'
import { useFetch } from '../../hooks/useFetch'; 

import ItemCard from '../../components/ItemCard';
import { LocalUrl } from '../../urls/urls';


const Home = () => {

    const {data, isPending, error} = useFetch(LocalUrl + "services/")
    const [items, setItems] = useState([])

    useEffect(() => {
        if (data)
            setItems(data)
    },[data])

    return (
        <div className='home'>
            <div className='container'> 
                <div className='row'>
                    {items && items.map((doc) => (
                        <div className='col-md-4 '  key={doc.id}>
                            <ItemCard id={doc.id} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
