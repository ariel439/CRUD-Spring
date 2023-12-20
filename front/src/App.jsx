import { useEffect, useState } from "react";
import "./App.css";

function App() {
  //product Object
  const product = {
    id: 0,
    name: "",
    category: "",
    value: 0,
  };

  //UseState
  const [products, setProducts] = useState([]);
  const [objProduct, setObjProduct] = useState(product);

  //UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/products/list")
      .then((returnProducts) => returnProducts.json())
      .then((returnConverted) => setProducts(returnConverted));
  }, []);

  //functions
  const type = (e) => {
    setObjProduct({ ...objProduct, [e.target.name]: e.target.value });
  };

  const register = () => {
    fetch("http://localhost:8080/products/register", {
      method: "post",
      body: JSON.stringify(objProduct),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((returnProducts) => returnProducts.json())
      .then((returnConverted) => {
        if (returnConverted.msg !== undefined) {
          alert(returnConverted.msg);
        } else {
          setProducts([...products, returnConverted]);
          alert("Product Registered!");
          resetProduct();
        }
      });
  };

  const remove = (id, index) => {
    fetch("http://localhost:8080/products/delete/" + id, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((returnProducts) => returnProducts.json())
      .then((returnConverted) => {
        let list = [...products];
        list.splice(index, 1);
        setProducts(list);
        alert(returnConverted.msg);
      });
  };

  const change = () => {
    fetch("http://localhost:8080/products/change", {
      method: "put",
      body: JSON.stringify(objProduct),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((returnProducts) => returnProducts.json())
      .then((returnConverted) => {
        if (returnConverted.msg !== undefined) {
          alert(returnConverted.msg);
        } else {
          let list = [...products];
          let index = list.findIndex((p) => {
            return p.id === objProduct.id;
          });

          list[index] = objProduct;

          setProducts(list);

          alert("Product changed!");
          resetProduct();
        }
      });
  };

  const resetProduct = () => {
    setObjProduct(product);
  };

  const selectProduct = (index) => {
    setObjProduct(products[index]);
  };

  return (
    <>
      <ProductForm
        typeEvent={type}
        register={register}
        obj={objProduct}
        change={change}
        reset={resetProduct}
      />
      <ProductTable
        products={products}
        select={selectProduct}
        remove={remove}
      />
    </>
  );
}

const ProductForm = ({ typeEvent, register, obj, change, reset }) => {
  return (
    <div className="product-form">
      <h1>Form</h1>
      <div className="form">
        <p>ID: </p>
        <input className="input-id" disabled value={obj.id}></input>
        <p>Name:</p>
        <input type="text" onChange={typeEvent} name="name" value={obj.name} />
        <p>Category:</p>
        <select
          id="category"
          name="category"
          onChange={typeEvent}
          value={obj.category}
        >
          <option value="Null"></option>
          <option value="Shirts">Shirts</option>
          <option value="Pants">Pants</option>
          <option value="Footwear">Footwear</option>
          <option value="Jackets">Jackets</option>
        </select>
        <p>Value:</p>
        <input
          type="number"
          name="value"
          onChange={typeEvent}
          value={obj.value}
        />
      </div>
      <div className="form-buttons">
        {obj.id == 0 ? <input type="button" value="Register" onClick={register} /> : null}
        {obj.id != 0 ? <input type="button" value="Change" onClick={change}/>: null}
        {obj.id != 0 ? <input type="button" value="Cancel" onClick={reset}/>: null}
      </div>
      <div></div>
    </div>
  );
};

const ProductTable = ({ products, select, remove }) => {
  return (
    <div className="product-table">
      <h1>Products Table</h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {products.map((obj, i) => {
              return (
                <tr key={i}>
                  <td>{obj.id}</td>
                  <td>{obj.name}</td>
                  <td>{obj.category}</td>
                  <td>{obj.value}</td>
                  <td>
                    <button
                      onClick={() => {
                        remove(obj.id, i);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        select(i);
                      }}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
