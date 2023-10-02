import React from 'react'
import './cartsildercomponent.css'

function CartSilderComponent() {
  return (
    <div className="cart-silder-maincontainer">
        <div className="cart-silder-inner-container">
          <div className="cart-slider-sub-total-container">
               <div className="cart-silder-subtotal-header">subtotal</div>
               <div className="cart-silder-subtotal-price">300</div>
               <div className="cart-slider-subtotal-describe">
               Add ₹167.00 of eligible items to your order to qualify for FREE Delivery
               </div>
               <div className="cart-slider-subtotal-btn-container">
                <button className="cart-slider-subtotal-btn"></button>
               </div>
          </div>
        </div>
    </div>
  )
}

export default CartSilderComponent