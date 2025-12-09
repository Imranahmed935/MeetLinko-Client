
 import { getSingleTravelById } from '@/services/user/travelBuddy';
 import React from 'react';

 const FindBuddyDetailsPage =async ({ params }: { params: { id: string } }) => {
     const {id} = await params
     const travelerDetails = await getSingleTravelById(id)
     console.log(travelerDetails)
     return (
         <div>
            
         </div>
    );
};

export default FindBuddyDetailsPage;



