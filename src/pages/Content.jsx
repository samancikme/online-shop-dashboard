import React from 'react'

const Content = ({children}) => {
  return (
    <div className=' h-[calc(100vh-90px)] shadow-lg border-[1px]'>
      {children}
    </div>
  )
}

export default Content
