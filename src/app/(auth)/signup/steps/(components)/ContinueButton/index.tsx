"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  saveParentInformation,
  saveChildInformation,
  saveHowTheirBreathingBehaves,
  saveHomeAndSchoolEnvironment,
  saveAllergiesAndSensitivities,
  saveIndoorAir,
  saveIllnessAndRecoveryTendencies,
  saveYourExperienceAsAParent,
  saveSignupResponse,
} from "@/redux/slices/signupSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { signupSteps } from "@/app/(auth)/signup/steps/(components)/SignupStepper/data";
import { useSignupForm } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";
import { normalizeFormData } from "@/utils/normalizeFormData";
import { useSignupMutation } from "@/redux/signupApiSlice";
import { transformSignupData } from "@/utils/transformSignupData";
import { Loader2 } from "lucide-react";

const stepActionMap: Record<string, (data: any) => any> = {
  "/signup/steps/parent-information": saveParentInformation,
  "/signup/steps/child-information": saveChildInformation,
  "/signup/steps/how-their-breathing-behaves": saveHowTheirBreathingBehaves,
  "/signup/steps/home-and-school-environment": saveHomeAndSchoolEnvironment,
  "/signup/steps/allergies-and-sensitivities": saveAllergiesAndSensitivities,
  "/signup/steps/indoor-air": saveIndoorAir,
  "/signup/steps/illness-and-recovery-tendencies": saveIllnessAndRecoveryTendencies,
  "/signup/steps/your-experience-as-a-parent": saveYourExperienceAsAParent,
};

const ContinueButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.signup.formData);
  const { validateCurrentForm, getCurrentFormValues } = useSignupForm();
  const [signup] = useSignupMutation();

  const currentStepIndex = signupSteps.findIndex(
    (step) => step.href === pathname
  );

  const isLastStep = currentStepIndex === signupSteps.length - 1;

  const handleContinue = async () => {
    const isValid = await validateCurrentForm();

    if (!isValid) {
      return;
    }

    const formValues = getCurrentFormValues();
    const saveAction = stepActionMap[pathname];

    if (formValues && saveAction) {
      // Normalize form data (trim strings) before saving to Redux
      const normalizedValues = normalizeFormData(formValues);
      dispatch(saveAction(normalizedValues));
    }

    if (isLastStep) {
      setIsSubmitting(true);
      
      try {
        // Get the complete form data including the current step's data
        const completeFormData = {
          ...formData,
          yourExperienceAsAParent: normalizeFormData(formValues),
        };

        // Transform form data to API request format
        const apiRequest = transformSignupData(completeFormData);

        // Log the request for debugging
        console.log('=== Signup API Request ===');
        console.log(JSON.stringify(apiRequest, null, 2));
        console.log('==========================');

        // Make the API call
        const response = await signup(apiRequest).unwrap();

        // Log the response for debugging
        console.log('=== Signup API Response ===');
        console.log(JSON.stringify(response, null, 2));
        console.log('===========================');

        // Save response to Redux
        dispatch(saveSignupResponse(response));

        // Show success toast
        toast.success('Account created successfully! Check your SMS for the next steps.', {
          duration: 5000,
        });

        // Navigate to success page
        router.push("/signup/success");
      } catch (error: any) {
        console.error('Signup error:', error);
        
        // Extract error message from API response
        let errorMessage = 'Something went wrong. Please try again.';
        
        if (error?.data?.message) {
          errorMessage = error.data.message;
        } else if (error?.data?.error) {
          errorMessage = error.data.error;
        } else if (error?.message) {
          errorMessage = error.message;
        } else if (typeof error?.data === 'string') {
          errorMessage = error.data;
        }

        // Show error toast
        toast.error(errorMessage, {
          duration: 6000,
        });
      } finally {
        setIsSubmitting(false);
      }
      
      return;
    }

    const nextStep = signupSteps[currentStepIndex + 1];
    if (nextStep) {
      router.push(nextStep.href);
    }
  };

  return (
    <Button
      variant="default"
      size="lg"
      className="w-fit px-5! py-3.5! text-base!"
      onClick={handleContinue}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : isLastStep ? (
        "Submit"
      ) : (
        "Continue"
      )}
    </Button>
  );
};

export default ContinueButton;
