import React from 'react'
import { useGroup } from "../hook/use-group";
import Product from '../products/Product';
import Sidebar from '../main/Sidebar';

const SelectedGroup = () => {
    const { allGroups } = useGroup();
  return (
    <div>
        <Sidebar/>
        <Product/>
    </div>
  )
}

export default SelectedGroup