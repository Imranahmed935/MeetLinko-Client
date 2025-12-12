import AllMyPlan from '@/components/shared/AllMyPlan';
import React, { Suspense } from 'react';

const MyPlanPage = () => {
  return (
    <div>
      <Suspense>
        <AllMyPlan/>
      </Suspense>
    </div>
  );
};

export default MyPlanPage;