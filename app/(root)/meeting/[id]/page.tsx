"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hook/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState, use } from "react";

interface MeetingProps {
  params: Promise<{ id: string }>;
}

const Meeting = ({ params }: MeetingProps) => {
  const { id } = use(params); // Unwrap the params Promise
  
  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;






// "use client";
// import Loader from "@/components/Loader";
// import MeetingRoom from "@/components/MeetingRoom";
// import MeetingSetup from "@/components/MeetingSetup";
// import { useGetCallById } from "@/hook/useGetCallById";
// import { useUser } from "@clerk/nextjs";
// import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
// import { useState } from "react";

// interface MeetingProps {
//   params: { id: string };
// }

// const Meeting = ({ params: { id } }: MeetingProps) => {  
//   const { isLoaded } = useUser();
//   const [isSetupComplete, setIsSetupComplete] = useState(false);
//   const { call, isCallLoading } = useGetCallById(id);

//   if (!isLoaded || isCallLoading) return <Loader />;

//   return (
//     <main className="h-screen w-full">
//       <StreamCall call={call}>
//         <StreamTheme>
//           {!isSetupComplete ? (
//             <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
//           ) : (
//             <MeetingRoom />
//           )}
//         </StreamTheme>
//       </StreamCall>
//     </main>
//   );
// };

// export default Meeting;









// "use client";

// import Loader from "@/components/Loader";
// import MeetingRoom from "@/components/MeetingRoom";
// import MeetingSetup from "@/components/MeetingSetup";
// import { useGetCallById } from "@/hook/useGetCallById";
// import { useUser } from "@clerk/nextjs";
// import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
// import { useState } from "react";
// // import { useParams } from 'next/navigation';

// // const  {id}  = useParams();
// const Meeting = ({params: {id}}: {params: { id: string }}) => {

//   // const { user, isLoaded} = useUser();
//   const { isLoaded} = useUser();

//   const [isSetupComplete, setIsSetupComplete] = useState(false);
//   const { call, isCallLoading} = useGetCallById(id);
  

//   if(!isLoaded || isCallLoading) return <Loader/>

//   return (
//     // <div>Meeting Room: #{params.id}</div>
//     <main className="h-screen w-full">
//       <StreamCall call={call}>
//         <StreamTheme>
//           {!isSetupComplete ? (
//             <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
//           ):(
//             <MeetingRoom/>
//           )}
//         </StreamTheme>
//       </StreamCall>
//     </main>
//   )
// }

// export default Meeting




// 'use client';

// import { useState } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
// import { useParams } from 'next/navigation';
// import { Loader } from 'lucide-react';

// import { useGetCallById } from '@/hook/useGetCallById';
// import Alert from '@/components/Alert';
// import MeetingSetup from '@/components/MeetingSetup';
// import MeetingRoom from '@/components/MeetingRoom';

// const MeetingPage = () => {
//   const { id } = useParams();
//   const { isLoaded, user } = useUser();
//   const { call, isCallLoading } = useGetCallById(id);
//   const [isSetupComplete, setIsSetupComplete] = useState(false);

//   if (!isLoaded || isCallLoading) return <Loader />;

//   if (!call) return (
//     <p className="text-center text-3xl font-bold text-white">
//       Call Not Found
//     </p>
//   );

//   // get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
//   const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

//   if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;

//   return (
//     <main className="h-screen w-full">
//       <StreamCall call={call}>
//         <StreamTheme>

//         {!isSetupComplete ? (
//           <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
//         ) : (
//           <MeetingRoom />
//         )}
//         </StreamTheme>
//       </StreamCall>
//     </main>
//   );
// };

// export default MeetingPage;