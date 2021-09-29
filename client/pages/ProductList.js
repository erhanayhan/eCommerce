import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
import { useStore } from '../services/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const ProductList = () => {

    const products = useStore(state => state.products)
    const prepareProducts = useStore(state => state.prepareProducts)
    const setSelectedItems = useStore(state => state.setSelectedItems)
    const selectedItems = useStore(state => state.selectedItems);

    const notify = () => {
        toast('Ürün Başarı ile Sepete Eklendi', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }
    const notifyFav = () => {
        toast('Ürün favorilere eklendi', {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }

    useEffect(() => {
        prepareProducts();
    }, []);

    const addFavorites = (product) => {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/favorites',
            headers: {},
            data: {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                userId: 2
            }
        })
    }

    return (

        <div className="container">
            <div className="row text-center">
                {products.map((product) =>
                    <div className="card m-3 mr-4" style={{ width: '18rem' }} key={product.id}>
                        <div className="card-body ">
                            <img src={product.image} style={{ width: '100px', height: '100px' }} className="card-img-top mb-3" alt="..."></img>
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">{product.description.substring(0, 200) + '...'}</p>
                        </div>
                        <div className="card-footer" style={{ backgroundColor: 'white' }}>

                            <p className="card-price"><mark>{product.price}₺</mark></p>
                            <button className="btn btn-primary" onClick={() => {
                                notify()
                                if (!selectedItems.length) {
                                    setSelectedItems({ quantity: 1, product: product });
                                } else if (selectedItems.length && selectedItems.findIndex(item => item.product == product) == -1) {
                                    setSelectedItems({ quantity: 1, product: product });
                                } else {
                                    selectedItems[selectedItems.findIndex(item => item.product == product)].quantity += 1;
                                }
                            }}>Sepete Ekle</button>
                            <button style={{ backgroundColor: 'white', border: 'none', float: 'right' }} onClick={() => {
                                notifyFav()
                                addFavorites(product)
                            }}><Icon.Star style={{ float: 'right' }} color="red" size={30} /></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default ProductList;