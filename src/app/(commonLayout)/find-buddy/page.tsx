/* eslint-disable @typescript-eslint/no-explicit-any */


import FindBuddy from '@/components/shared/FindBuddy';
import React, { Suspense } from 'react';

const FindBuddyPage = () => {
  return (
    <div>
     <Suspense>
       <FindBuddy/>
     </Suspense>
    </div>
  );
};

export default FindBuddyPage;



