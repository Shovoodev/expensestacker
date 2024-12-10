import React from 'react'
import Sidebar from '../main/Sidebar'
import GroupeNavbar from '../main/GroupeNavbar'
import Product from '../products/Product'

const ProductPage = () => {
  return (
    <div>
        <Sidebar/>
        <GroupeNavbar/>
        <div className='ml-[20%]'>

        <Product/>
        </div>
    </div>
  )
}

export default ProductPage