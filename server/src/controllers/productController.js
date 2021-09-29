const axios=require('axios');


const getProducts =  (req,res) => {

  
    axios.get('https://fakestoreapi.com/products')
    .then(result=>{
        res.status(200).json(result.data);
    })
    .catch(error=>{
        res.status(500).json(error);
    });


};


const getProductById =  (req,res) => {

    axios.get('https://fakestoreapi.com/products/'+req.params.productId)
    .then(result=>{
        res.status(200).json(result.data);
    })
    .catch(error=>{
        res.status(500).json(error);
    });


};


module.exports = {
    getProductById,
    getProducts,
  };