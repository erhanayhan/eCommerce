import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
import { useStore } from '../services/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const Favorites = () => {

    const [favorites, setFavorites] = useState([]);
    const setSelectedItems = useStore(state => state.setSelectedItems)
    const selectedItems = useStore(state => state.selectedItems);

    const notify = () => {
        toast('Ürün Başarı ile Sepete Eklendi', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }
    const notifyFav = () => {
        toast('Ürün favorilerden çıkarıldı.', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }
    useEffect(() => {
        const getAllFavorites = async () => {
            const { data } = await axios.get("http://localhost:8080/favorites");
            setFavorites(data);
            console.log(selectedItems);
        };
        getAllFavorites();
    }, [favorites]);

    const removeFavorites = (product) => {
        axios({
            method: 'DELETE',
            url: 'http://localhost:8080/favorites/' + product.title,
            headers: {},
            data: {}
        })
    }
    return (
        <div className="container">
            <h3>Favoriler</h3>
            <div className="row text-center">
                {favorites.map((product) =>
                    <div className="card m-3 mr-4" style={{ width: '18rem' }} key={product.id}>
                        <div className="card-body ">
                            <img src={product.image} style={{ width: '100px', height: '100px' }} className="card-img-top mb-3" alt="..."></img>
                            <h5 className="card-title">{product.title}</h5>
                        </div>
                        <div className="card-footer" style={{ backgroundColor: 'white' }}>

                            <p className="card-price"><mark>{product.price}₺</mark></p>
                            <button className="btn btn-primary" onClick={() => {
                                notify()
                                if (!selectedItems.length) {
                                    setSelectedItems({ quantity: 1, product: product });
                                } else if (selectedItems.length && selectedItems.findIndex(item => item.product.id == product.id) == -1) {
                                    setSelectedItems({ quantity: 1, product: product });
                                } else {
                                    selectedItems[selectedItems.findIndex(item => item.product.id == product.id)].quantity += 1;
                                }
                            }}>Sepete Ekle</button>
                            <button style={{ backgroundColor: 'white', border: 'none', float: 'right' }} onClick={() => {
                                notifyFav()
                                removeFavorites(product)
                            }}><Icon.Trash style={{ float: 'right' }} color="red" size={30} /></button></div>
                    </div>
                )}
            </div>
        </div>

    );
}
export default Favorites;