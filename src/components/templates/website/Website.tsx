"use client"
import TextEditor from '@/components/molecules/TextEditor'
import { User } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

interface WebsiteProps {
  user: User
}

function Website({user}: WebsiteProps) {
  const userData = user.user_metadata
  useEffect(()=>{
  if(!userData.isAdmin) redirect('/app/reports')
  },[])

  return (
    <div>
      <h2>Hero</h2>
      <TextEditor />
    </div>
  )
}

export default Website