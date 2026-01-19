import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { selectAllSignupData } from '@/redux/slices/signupSlice';
import { normalizeFormData } from '@/utils/normalizeFormData';

export const useSignupData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => selectAllSignupData(state));

  const getAllSignupData = () => {
    const allData = {
      ...formData.parentInformation,
      ...formData.childInformation,
      ...formData.howTheirBreathingBehaves,
      ...formData.homeAndSchoolEnvironment,
      ...formData.allergiesAndSensitivities,
      ...formData.indoorAir,
      ...formData.illnessAndRecoveryTendencies,
      ...formData.yourExperienceAsAParent,
    };
    
    // Normalize all data (trim strings) before returning for API submission
    const normalizedData = normalizeFormData(allData);
    
    console.log('=== Complete Signup Data ===');
    console.log(JSON.stringify(normalizedData, null, 2));
    console.log('===========================');
    
    return normalizedData;
  };

  return {
    formData,
    getAllSignupData,
    dispatch,
  };
};
