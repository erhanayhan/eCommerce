import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import ProductList from '../pages/ProductList';
import Favorites from '../pages/Favorites';
import * as Icon from 'react-bootstrap-icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';
import { useStore } from '../services/store';
import './cartList.css';
const TabMenu = () => {

  const [show, setShow] = useState(false);
  const selectedItems = useStore(state => state.selectedItems);
  var objectLength = 0;


  useEffect(() => {
    // selectedItems = JSON.parse(localStorage.getItem('card'));
    // console.log(selectedItems);
  }, []);

  const handleModalState = () => {
    setShow(!show);
  }

  const removeProductCart = id => {

    if (window.confirm("Silmek İstediğniize eminmisiniz?")) {
      selectedItems.forEach((item, index) => {
        if (item.product.id === id) {
          selectedItems.splice(index, 1);
        }
      })
    }

  }


  return (


    <div>
      <>
        <Modal show={show} onHide={handleModalState}>
          <Modal.Header closeButton>
            <Modal.Title>Sepetim</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedItems.map((item) =>
            <div className="cart" key={item.product.id} ><p style={{ color: 'white' }}>{objectLength++}</p>
              <img
                src={item.product.image}
              />
              <div>
                <h6>{item.product.title}</h6>
                <p>Adet:{item.quantity} <br />
                  <h style={{ color: 'blue' }}>Fiyat: ₺{item.product.price}</h><br />
                  <button onClick={() => {
                    removeProductCart(item.product.id)
                    handleModalState()
                  }}
                    style={{ color: 'red' }}>Ürünü Sil</button></p>
                {localStorage.setItem('card', JSON.stringify(selectedItems))}
              </div>
            </div>

          )} <p style={{ color: 'blue', float: 'right', fontSize: '25px' }}>Toplam Fiyat =₺{selectedItems.reduce((total, item) => total += item.product.price * item.quantity, 0).toFixed(2)}</p>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalState}>
              Kapat
            </Button>
            <Button variant="primary" onClick={handleModalState}>
              Sipariş Ver
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/storist"> Storist</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/favoriler" >Favorilerim</Nav.Link>
                <Nav.Link as={Link} to="/giriskayit" >Giriş / Kayıt</Nav.Link>
              </Nav>
              <Button className='btn btn-success' onClick={handleModalState}>
                <Icon.Cart style={{ fontSize: '28px' }}></Icon.Cart>
                <h style={{ color: 'yellow' }}>{objectLength}</h>
              </Button>
            </Container>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <Product />
            </Route>
            <Route path="/storist">
              <Storist />
            </Route>
            <Route path="/favoriler">
              <Favoriler />
            </Route>
          </Switch>
          <footer class="footer bg-dark">
            <div class="container text-center">
              <span class="text-white">Copyright© erhanayhan</span>
            </div>
          </footer>
        </div>
      </Router>
    </div>
  );
}

function Product() {

  return (
    <div>
      <ProductList />
    </div>
  );
}

function Storist() {

  return (
    <div>
      <ProductList />
    </div>
  );
}

function Favoriler() {

  return (
    <div>
      <Favorites />
    </div>
  );
}

export default TabMenu;