import React from 'react';
import './Messages.scss'
import Contact from './Contact';
import { User } from '@supabase/auth-helpers-nextjs';

interface ContactProps {
   user: User
}

function Contacts({user}: ContactProps) {
  return (
    <div>
        <Contact />
    </div>
  )
}

export default Contacts