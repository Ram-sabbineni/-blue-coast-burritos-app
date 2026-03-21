import { useState } from "react";

export default function App() {
  const menu = [
    { id: 1, name: "Small Burrito", price: 5.39 },
    { id: 2, name: "Regular Burrito", price: 6.39 },
    { id: 3, name: "Tacos (3)", price: 6.99 },
    { id: 4, name: "Taco Salad", price: 6.89 },
    { id: 5, name: "Nachos", price: 6.59 },
    { id: 6, name: "Quesadilla", price: 6.59 },
    { id: 7, name: "Cabo Bol", price: 7.49 },
    { id: 8, name: "Peasant Plate", price: 5.89 },
    { id: 9, name: "Baja Fish Burrito", price: 6.99 },
    { id: 10, name: "Baja Fish Tacos (3)", price: 6.99 }
  ];

  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (!customerName || !phone || cart.length === 0) {
      alert("Please enter name, phone, and add at least one item.");
      return;
    }

    setOrderPlaced(true);
  };

  const handlePayment = () => {
    if (!orderPlaced) {
      alert("Please place the order before payment.");
      return;
    }

    alert("Payment gateway will be connected next.");
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        maxWidth: "900px",
        margin: "0 auto"
      }}
    >
      <h1 style={{ textAlign: "center" }}>Blue Coast Burritos - Nashville</h1>
      <p style={{ textAlign: "center" }}>Step 1: Choose Your Menu Item</p>

      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
        {menu.map((item) => (
          <div
            key={item.id}
            style={{
              marginBottom: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>
              {item.name} - ${item.price}
            </span>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <hr style={{ margin: "25px 0" }} />

      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: "15px" }}>
              <strong>{item.name}</strong> - ${item.price} x {item.quantity}
              <div style={{ marginTop: "6px" }}>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button onClick={() => decreaseQuantity(item.id)} style={{ marginLeft: "5px" }}>
                  -
                </button>
                <button onClick={() => removeItem(item.id)} style={{ marginLeft: "5px" }}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}

      <hr style={{ margin: "25px 0" }} />

      <h2>Customer Details</h2>
      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <button onClick={placeOrder}>Place Order</button>
        <button onClick={handlePayment} style={{ marginLeft: "10px" }}>
          Pay Now
        </button>

        {orderPlaced && (
          <p style={{ color: "green", marginTop: "15px" }}>
            Order placed successfully! Ready for payment.
          </p>
        )}
      </div>
    </div>
  );
}