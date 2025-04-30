'use client';

import React from 'react';
import { FormIcons } from '../BookingIcons';
import FormSummary from '../FormSummary';
import { useBookingContext } from '@/context/BookingContext';
import { useTranslation } from '@/hooks/useTranslation';
import StepNavigation from '../StepNavigation';
import FormField from '@/components/ui/FormField';

interface ContactStepProps {
  onNext: () => void;
  onBack: () => void;
  totalCost: number;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onBlur: (field: string) => void;
}

const ContactStep: React.FC<ContactStepProps> = ({
  onNext,
  onBack,
  totalCost,
  errors,
  touched,
  onBlur,
}) => {
  const { state, dispatch } = useBookingContext();
  const { name, email, phone } = state;
  const { t } = useTranslation();

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name as ('name' | 'email' | 'phone'), value });
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{t('contactStep.title')}</h2>
      <p className="text-gray-800 mb-6">{t('contactStep.subtitle')}</p>
      
      <FormSummary
        isCollapsible={true}
      />
      
      <div className="space-y-6 mt-6">
        <FormField
          id="name"
          label={t('contactStep.nameLabel')}
          type="text"
          value={name}
          onChange={handleFieldChange}
          onBlur={() => onBlur('name')}
          placeholder={t('contactStep.namePlaceholder')}
          required={true}
          error={errors.name ? 'requiredField' : undefined}
          touched={touched.name}
          icon={FormIcons.user}
        />
        
        <FormField
          id="email"
          label={t('contactStep.emailLabel')}
          type="email"
          value={email}
          onChange={handleFieldChange}
          onBlur={() => onBlur('email')}
          placeholder={t('contactStep.emailPlaceholder')}
          required={true}
          error={errors.email ? (errors.email === 'Please enter a valid email address' ? 'invalidEmail' : 'requiredField') : undefined}
          touched={touched.email}
          icon={FormIcons.email}
        />
        
        <FormField
          id="phone"
          label={t('contactStep.phoneLabel')}
          type="tel"
          value={phone}
          onChange={handleFieldChange}
          onBlur={() => onBlur('phone')}
          placeholder={t('contactStep.phonePlaceholder')}
          required={true}
          error={errors.phone ? (errors.phone === 'Please enter a valid phone number' ? 'invalidPhone' : 'requiredField') : undefined}
          touched={touched.phone}
          icon={FormIcons.phone}
        />
        <p className="text-xs text-gray-500 -mt-4 ml-1">
          {t('contactStep.phoneHelpText')}
        </p>
        
        <div className="mt-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                {t('contactStep.termsAgree')} <a href="#" className="text-pink-600 hover:text-pink-800">{t('contactStep.termsLink')}</a> and <a href="#" className="text-pink-600 hover:text-pink-800">{t('contactStep.privacyLink')}</a>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <StepNavigation 
        onNext={onNext}
        onBack={onBack}
        totalCost={totalCost}
        currentStep={5}
      />
    </div>
  );
};

export default ContactStep; 