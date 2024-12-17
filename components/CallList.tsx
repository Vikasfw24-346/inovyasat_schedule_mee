// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useGetCalls } from '@/hook/useGetCalls';
// import { CallRecording } from '@stream-io/node-sdk';
// import { useRouter } from 'next/navigation';
// import MeetingCard from './MeetingCard';
// import { Call } from '@stream-io/video-react-sdk';
// import Loader from './Loader';
// import { useToast } from '@/hooks/use-toast';

// interface CallListProps {
//   type: 'ended' | 'upcoming' | 'recordings';
// }

// const CallList: React.FC<CallListProps> = ({ type }) => {
//   const { endedCalls = [], upcomingCalls = [], callRecordings = [], isLoading } = useGetCalls();
//   const router = useRouter();
//   const [recordings, setRecordings] = useState<CallRecording[]>([]);
//   const { toast } = useToast();

//   useEffect(() => {
//     if (type === 'recordings' && callRecordings.length > 0) {
//       const fetchRecordings = async () => {
//         try {
//           const callData = await Promise.all(
//             callRecordings.map((meeting) => meeting.queryRecordings())
//           );
//           const fetchedRecordings = callData
//             .filter((call) => call.recordings.length > 0)
//             .flatMap((call) => call.recordings);

//           setRecordings((prev: CallRecording[]) => {
//             const prevIds = new Set(prev.map((rec) => rec.id));
//             const newIds = new Set(fetchedRecordings.map((rec) => rec.id));
//             return prevIds.size === newIds.size && [...prevIds].every((id) => newIds.has(id))
//               ? prev
//               : fetchedRecordings;
//           });
//         } catch (error) {
//           console.error('Error fetching recordings:', error);
//           toast({ title: 'Try again later' });
//         }
//       };
//       fetchRecordings();
//     }
//   }, [type, callRecordings, toast]);

//   const getCalls = (): Call[] | CallRecording[] => {
//     switch (type) {
//       case 'ended':
//         return endedCalls;
//       case 'recordings':
//         return recordings;
//       case 'upcoming':
//         return upcomingCalls;
//       default:
//         return [];
//     }
//   };

//   const getNoCallsMessage = (): string => {
//     switch (type) {
//       case 'ended':
//         return 'No Previous Calls';
//       case 'recordings':
//         return 'No Recordings';
//       case 'upcoming':
//         return 'No Upcoming Calls';
//       default:
//         return '';
//     }
//   };

//   const calls = getCalls();
//   const noCallsMessage = getNoCallsMessage();

//   if (isLoading) return <Loader />;

//   return (
//     <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
//       {calls.length > 0 ? (
//         calls.map((meeting, index) => (
//           <MeetingCard
//             key={(meeting as Call)?.id ?? (meeting as CallRecording)?.id ?? `${type}-${index}`}
//             icon={
//               type === 'ended'
//                 ? '/icons/previous.svg'
//                 : type === 'upcoming'
//                 ? '/icons/upcoming.svg'
//                 : '/icons/recordings.svg'
//             }
//             title={
//               (meeting as Call).state?.custom?.description?.substring(0, 26) ||
//               (meeting as CallRecording).filename?.substring(0, 20) ||
//               'Personal Meeting'
//             }
//             date={
//               (meeting as Call).state?.startsAt?.toLocaleString() ||
//               (meeting as CallRecording).start_time?.toLocaleString()
//             }
//             isPreviousMeeting={type === 'ended'}
//             buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
//             buttonText={type === 'recordings' ? 'Play' : 'Start'}
//             handleClick={
//               type === 'recordings'
//                 ? () => router.push((meeting as CallRecording).url)
//                 : () => router.push(`/meeting/${(meeting as Call).id}`)
//             }
//             link={
//               type === 'recordings'
//                 ? (meeting as CallRecording).url
//                 : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
//             }
//           />
//         ))
//       ) : (
//         <h1>{noCallsMessage}</h1>
//       )}
//     </div>
//   );
// };

// export default React.memo(CallList);








// //@ts-nocheck
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useGetCalls } from '@/hook/useGetCalls';
// import { CallRecording } from '@stream-io/node-sdk';
// import { useRouter } from 'next/navigation';
// import MeetingCard from './MeetingCard';
// import { Call } from '@stream-io/video-react-sdk';
// import Loader from './Loader';
// import { useToast } from '@/hooks/use-toast';

// const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
//   const { endedCalls = [], upcomingCalls = [], callRecordings = [], isLoading } = useGetCalls();
//   const router = useRouter();
//   const [recordings, setRecordings] = useState<CallRecording[]>([]);
//   const { toast } = useToast();

//   useEffect(() => {
//     if (type === 'recordings' && callRecordings.length > 0) {
//       const fetchRecordings = async () => {
//         try {
//           const callData = await Promise.all(
//             callRecordings.map((meeting) => meeting.queryRecordings())
//           );
//           const fetchedRecordings = callData
//             .filter((call) => call.recordings.length > 0)
//             .flatMap((call) => call.recordings);

//           setRecordings((prev) => {
//             const prevIds = new Set(prev.map((rec) => rec.id));
//             const newIds = new Set(fetchedRecordings.map((rec) => rec.id));
//             return prevIds.size === newIds.size && [...prevIds].every((id) => newIds.has(id))
//               ? prev
//               : fetchedRecordings;
//           });
//         } catch (error) {
//           console.error('Error fetching recordings:', error);
//           toast({ title: 'Try again later' });
//         }
//       };
//       fetchRecordings();
//     }
//   }, [type, callRecordings, toast]);

//   const getCalls = () => {
//     switch (type) {
//       case 'ended':
//         return endedCalls;
//       case 'recordings':
//         return recordings;
//       case 'upcoming':
//         return upcomingCalls;
//       default:
//         return [];
//     }
//   };

//   const getNoCallsMessage = () => {
//     switch (type) {
//       case 'ended':
//         return 'No Previous Calls';
//       case 'recordings':
//         return 'No Recordings';
//       case 'upcoming':
//         return 'No Upcoming Calls';
//       default:
//         return '';
//     }
//   };

//   const calls = getCalls();
//   const noCallsMessage = getNoCallsMessage();

//   if (isLoading) return <Loader />;

//   return (
//     <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
//       {calls.length > 0 ? (
//         calls.map((meeting: Call | CallRecording, index) => (
//           <MeetingCard
//             key={(meeting as Call)?.id ?? (meeting as CallRecording)?.id ?? `${type}-${index}`}
//             icon={
//               type === 'ended'
//                 ? '/icons/previous.svg'
//                 : type === 'upcoming'
//                 ? '/icons/upcoming.svg'
//                 : '/icons/recordings.svg'
//             }
//             title={
//               (meeting as Call).state?.custom?.description?.substring(0, 26) ||
//               (meeting as CallRecording).filename?.substring(0, 20) ||
//               'Personal Meeting'
//             }
//             date={
//               (meeting as Call).state?.startsAt?.toLocaleString() ||
//               (meeting as CallRecording).start_time?.toLocaleString()
//             }
//             isPreviousMeeting={type === 'ended'}
//             buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
//             buttonText={type === 'recordings' ? 'Play' : 'Start'}
//             handleClick={
//               type === 'recordings'
//                 ? () => router.push((meeting as CallRecording).url)
//                 : () => router.push(`/meeting/${(meeting as Call).id}`)
//             }
//             link={
//               type === 'recordings'
//                 ? (meeting as CallRecording).url
//                 : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
//             }
//           />
//         ))
//       ) : (
//         <h1>{noCallsMessage}</h1>
//       )}
//     </div>
//   );
// };

// export default React.memo(CallList);









// // @ts-nocheck
// 'use client'
// import { useGetCalls } from '@/hook/useGetCalls'
// import { CallRecording } from '@stream-io/node-sdk';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import MeetingCard from './MeetingCard';
// import { Call } from '@stream-io/video-react-sdk';
// import Loader from './Loader';
// import { useToast } from '@/hooks/use-toast';

// const CallList = ({ type }: {
//     type: 'ended' |
//     'upcoming' | 'recordings'
// }) => {
//     const { endedCalls, upcomingCalls, callRecordings,
//         isLoading, } = useGetCalls();
//     const router = useRouter();
//     const [recordings, setRecordings] =
//         useState<CallRecording[]>([]);
    
//     const { toast } = useToast();
//     const getCalls = () => {
//         switch (type) {
//             case 'ended':
//                 return endedCalls;
//             case 'recordings':
//                 return recordings;
//             case 'upcoming':
//                 return upcomingCalls;
//             default:
//                 return [];
//         }
//     }

//     const getNoCallsMessage = () => {
//         switch (type) {
//             case 'ended':
//                 return 'No Previous Calls';
//             case 'recordings':
//                 return "No Recordings";
//             case 'upcoming':
//                 return "No Upcoming Calls";
//             default:
//                 return '';
//         }
//     }

//      useEffect(() =>{
//         const fetchRecordings = async ()=>{
//             try{
//                 const callData = await Promise.all(callRecordings.
//                     map((meeting) => meeting.queryRecordings()))
//                     const recordings = callData.filter(call =>
//                         call.recordings.length > 0)
//                         .flatMap(call =>call.recordings)
//                     setRecordings(recordings);
//             }catch(error){
//                 toast({title:'Try again later'})
//             }
//                 }
//                 if (type === 'recordings') fetchRecordings();
//      },[type,callRecordings]);


//     const calls = getCalls();
//     const noCallsMessage = getNoCallsMessage();

//     if(isLoading) return <Loader/>

//     return (
//         <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
//             {calls && calls.length > 0 ? calls.map((meeting:
//                 Call | CallRecording) => (
//                 <MeetingCard
//                 key={(meeting as Call).id}
//                 icon={
//                     type === 'ended'
//                     ? '/icons/previous.svg'
//                     : type === 'upcoming'
//                     ? '/icons/upcoming.svg'
//                     : '/icons/recordings.svg'
//                 }
//                 title={(meeting as Call).state?.custom?.
//                     description?.substring(0,26) ||meeting.filename?.substring(0,20) || 'Personal Meeting'
//                 }
//                 date={meeting.state?.startsAt.toLocaleString()
//                     || meeting.start_time.toLocaleString()}
//                 isPreviousMeeting={type === 'ended'}
//                 buttonIcon1={type === 'recordings' ? '/icons/play.svg': undefined}
//                 buttonText={type === 'recordings' ? 'Play': 'Start'}
//                 handleClick={type === 'recordings' ? () =>
//                     router.push(`${meeting.url}`): () => router.push
//                     (`/meeting/${meeting.id}`)}
//                 link={type === 'recordings' ? meeting.url :`$
//                     {process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
               
//         />)) : (
//                 <h1>{noCallsMessage}</h1>
//             )}
//         </div>
//     )
// }

// export default CallList











'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';

import Loader from './Loader';
import { useGetCalls } from '@/hook/useGetCalls';
import MeetingCard from './MeetingCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                  ? '/icons/upcoming.svg'
                  : '/icons/recordings.svg'
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              'No Description'
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            link={
              type === 'recordings'
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;