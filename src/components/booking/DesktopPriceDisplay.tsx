'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface DesktopPriceDisplayProps {
  totalCost: number;
}

const DesktopPriceDisplay: React.FC<DesktopPriceDisplayProps> = ({ totalCost }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 mt-8 md:block hidden">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-gray-900">{t('estimatedCost')}</h3>
          <p className="text-xs text-gray-700">{t('basedOnSelection')}</p>
        </div>
        <div className="text-xl font-bold text-pink-600">{t('aed')} {totalCost}</div>
      </div>
    </div>
  );
};

export default DesktopPriceDisplay; 