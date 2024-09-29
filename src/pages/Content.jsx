import React from 'react'

const Content = ({children}) => {
  return (
    <div className=' h-[calc(100vh-90px)] rounded-md border-[1px] '>
      {children}
    </div>
  )
}

export default Content
