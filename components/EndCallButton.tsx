"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation';
import React from 'react'

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter();
    const {useLocalParticipant} = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingOwner = localParticipant && 
    call?.state.createdBy && localParticipant.userId ===
    call.state.createdBy.id;

    if(!isMeetingOwner) return null;
  return (
    <button onClick={async ()=>{
        await call.endCall();
        router.push('/')
    }} className='bg-red-500 rounded-md'>
        End call for everyone
    </button>
)
}

export default EndCallButton