import { useEffect, useState } from 'react';
import './App.css'

function App() {

  //product Object
  const product = {
    id: 0,
    name: "",
    category: "",
    value: 0
  }
  
  //UseState
  const [products, setProducts] = useState([]);
  const [objProduct, setObjProduct] = useState(product)

  //UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/products/list")
    .then(returnProducts => returnProducts.json())
    .then(returnConverted => setProducts(returnConverted));
  }, []);

  //functions
  const type = (e) => {
    setObjProduct({...objProduct, [e.target.name]:e.target.value})
  }

  const register = () => {
    fetch("http://localhost:8080/products/register", {
      method: "post",
      body:JSON.stringify(objProduct),
      headers:{
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }).then(returnProducts => returnProducts.json())
      .then(returnConverted => {
        if (returnConverted.msg !== undefined){
          alert(returnConverted.msg);
        } else{
          setProducts([...products, returnConverted]);
          alert("Cadastro efetuado!");
        }
      });
  }
  
  return (
    <>
      <p>{JSON.stringify(objProduct)}</p>
      <ProductForm typeEvent={type} register={register}/>
      <ProductTable products={products}/>
    </>
  )
}

const ProductForm = ({typeEvent, register}) => {
  return(
    <div className='product-form'>
        <h1>Form</h1>
        <input type="text" onChange={typeEvent} placeholder='name' name="name"/>
        <select id="category" name="category" onChange={typeEvent}>
          <option value="Null">-</option>
          <option value="Shirts">Shirts</option>
          <option value="Pants">Pants</option>
          <option value="Footwear">Footwear</option>
          <option value="Jackets">Jackets</option>
        </select>
        <input type="number" placeholder='0.00' name="value" onChange={typeEvent}/>
        <input type="button" value="Register" onClick={register}/>
      </div>
  )
}

const ProductTable = ({products}) => {
  return(
      <div>
        <h1>Table</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
                {products.map((obj, i) =>{
                  return(
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{obj.name}</td>
                      <td>{obj.category}</td>
                      <td>{obj.value}</td>
                      <td><input type='checkbox'/></td>
                    </tr>
                  )})
                }
            </tbody>
          </table>
      </div>
  )
}

export default App