'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const NewPage = () => {
 const router =  useRouter();
 const navigate = () => {
  router.push('/users')
 }
  return (
    <div>
      <button onClick={() => navigate()} className='btn btn-primary'>Create</button>
    </div>
  )
}

export default NewPage
