// src/ComingSoon.tsx

import CenterLayout from '@/layout/center.layout';
import React from 'react';
import kometa from '@/assets/logo/color.png'

const ComingSoon: React.FC = () => {
  return (
    <CenterLayout>

    <div className="flex items-center justify-center ">
      <div className="text-center text-emeraldGreen flex flex-col items-center">
        <img src={kometa} alt="s" className='w-52 mb-10'/>
        <h1 className="text-6xl font-bold mb-4">Coming Soon!</h1>
        <p className="text-xl mb-6">We are working hard to bring you something amazing.</p>
        
      </div>
    </div>
    </CenterLayout>
  );
};

export default ComingSoon;
