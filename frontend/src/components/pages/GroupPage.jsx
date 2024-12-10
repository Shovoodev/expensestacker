import React from 'react'
import Sidebar from '../main/Sidebar'
import GroupeNavbar from '../main/GroupeNavbar'
import Group from '../group/Group'

const GroupPage = () => {
  return (
    <div>
        <Sidebar/>
        <GroupeNavbar/>
        <div className='ml-[20%]'>
        
        <Group/>
        </div>
    </div>
  )
}

export default GroupPage