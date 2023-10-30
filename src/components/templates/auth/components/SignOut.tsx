'use client';
import styled from '@emotion/styled';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const StyledLogout = styled.div`
     margin: 0 0.6rem;
     display: flex;
     justify-content: center;
     align-items: center;
     button {
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        cursor: pointer;
        i {
            font-size: 2rem;
            transition: color 0.2s ease-in;
            &:hover {
                color: blue;
            }
        }
     }
`

export default function SignOut() {
  const router = useRouter()
  const supabase = createClientComponentClient();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
   

    if (error) {
      // eslint-disable-next-line no-console
      console.error('ERROR:', error);
    } else {
        router.push('/')
    }
  }

  return (
    <StyledLogout>
    <button type="button" className="button-inverse" onClick={handleSignOut}>
     <i className="material-icons-outlined">logout</i> 
    </button>
    </StyledLogout>
  );
}
