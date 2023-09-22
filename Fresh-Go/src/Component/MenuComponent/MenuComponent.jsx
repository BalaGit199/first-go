import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'

function MenuComponent() {
  const params = useParams()
  const allProductRedux = useSelector(state => state.product)
  console.log("product state",allProductRedux.allProduct)
  useEffect(async()=>{

  const findProductData = await allProductRedux.allProduct.filter(data => data._id === params.id )

  console.log("shop data",findProductData)
      
  },[])

  console.log("paramss",params.value)
  console.log("paramss",params.id)
  return (
    <div>
    </div>
  )
}

export default MenuComponent