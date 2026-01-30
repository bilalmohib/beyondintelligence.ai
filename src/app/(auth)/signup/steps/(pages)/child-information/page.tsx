"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Paragraph } from "@/components/common/Typography";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "@/components/icons";
import { Combobox } from "@/components/ui/combo-box";
import { useSignupForm } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";
import { useSignupProgress } from "@/hooks/useSignupProgress";
import { useFormSyncWithRedux } from "@/hooks/useFormSyncWithRedux";
import { selectSignupData } from "@/redux/slices/signupSlice";
import type { RootState } from "@/redux/store";

const childInformationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.number({ message: "Age is required" }).min(1, "Age is required").max(18, "Age must be 18 or less"),
  asthmaDescription: z.enum(["mild", "moderate", "severe", "not sure"], {
    message: "Please select an option",
  }),
});

type ChildInformationFormData = z.infer<typeof childInformationSchema>;

const SignupStepChildInformationPage = () => {
  const pathname = usePathname();
  const { registerForm, unregisterForm } = useSignupForm();
  const { saveStepDraft } = useSignupProgress();
  const savedData = useSelector((state: RootState) => selectSignupData(state).childInformation);

  const defaultValues = useMemo(() => ({
    firstName: savedData?.firstName ?? "",
    lastName: savedData?.lastName ?? "",
    age: savedData?.age ?? undefined,
    asthmaDescription: savedData?.asthmaDescription ?? undefined,
  }), [savedData]);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ChildInformationFormData>({
    resolver: zodResolver(childInformationSchema),
    defaultValues,
    mode: "onChange",
  });

  // Sync form with Redux state when navigating back to this step
  useFormSyncWithRedux(savedData, reset, defaultValues);

  useEffect(() => {
    registerForm(
      async () => {
        const isValid = await trigger();
        return isValid;
      },
      () => getValues()
    );
    return () => {
      saveStepDraft(pathname, getValues());
      unregisterForm();
    };
  }, [registerForm, unregisterForm, trigger, getValues, pathname, saveStepDraft]);

  const onSubmit = (data: ChildInformationFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form 
      className="flex flex-col gap-10" 
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Child Information Form"
    >
      <section className="flex flex-col gap-3 w-full">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex-1">
            <Input
              label="First Name*"
              required
              type="text"
              id="first-name"
              placeholder="First Name"
              className="rounded-2xl"
              labelClassName="text-white!"
              inputClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${
                errors.firstName ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
              }`}
              aria-label="Child First Name"
              aria-required="true"
              aria-invalid={errors.firstName ? "true" : "false"}
              aria-describedby={errors.firstName ? "first-name-error" : undefined}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p id="first-name-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Input
              label="Last Name*"
              required
              type="text"
              id="last-name"
              placeholder="Last Name"
              className="rounded-2xl"
              labelClassName="text-white!"
              inputClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${
                errors.lastName ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
              }`}
              aria-label="Child Last Name"
              aria-required="true"
              aria-invalid={errors.lastName ? "true" : "false"}
              aria-describedby={errors.lastName ? "last-name-error" : undefined}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p id="last-name-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Your child is a living, breathing person — not a data point.
          </Paragraph>
          <Tooltip>
            <div className="flex flex-row justify-center items-center gap-1.5">
              <div>
                <TooltipTrigger asChild className="cursor-pointer">
                  <InfoIcon className="text-white!" />
                </TooltipTrigger>
              </div>
              <Paragraph className="text-white! text-xs! font-semibold">
                See why this matters?
              </Paragraph>
            </div>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Using your child's name helps Satori frame guidance around their
                world — their routines, their patterns, their risks — making
                alerts feel intuitive and actionable in the moments you need
                them.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Input
          label="Child age"
          required
          type="number"
          id="child-age"
          placeholder="Child age"
          className="rounded-2xl"
          labelClassName="text-white!"
          inputClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${
            errors.age ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
          }`}
          aria-label="Child Age"
          aria-required="true"
          aria-invalid={errors.age ? "true" : "false"}
          aria-describedby={errors.age ? "age-error" : undefined}
          {...register("age", { valueAsNumber: true })}
        />
        {errors.age && (
          <p id="age-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
            {errors.age.message}
          </p>
        )}
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Age affects how sensitive a child's breathing is to cold, heat,
            activity, and environmental shifts.
          </Paragraph>
          <Tooltip>
            <div className="flex flex-row justify-center items-center gap-1.5">
              <div>
                <TooltipTrigger asChild className="cursor-pointer">
                  <InfoIcon className="text-white!" />
                </TooltipTrigger>
              </div>
              <Paragraph className="text-white! text-xs! font-semibold">
                See why this matters?
              </Paragraph>
            </div>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                A 4-year-old and a 14-year-old interact with the{" "}
                <b>same environment</b> very differently. Age allows Satori to
                tailor its guidance and calibrate protection based on lung
                development, daily activity, and vulnerability windows.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Controller
          name="asthmaDescription"
          control={control}
          render={({ field }) => (
            <>
              <Combobox
                label="How would you describe their asthma right now?"
                labelClassName="text-white!"
                required={true}
                id="how-would-you-describe-their-asthma-right-now"
                comboBoxClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${
                  errors.asthmaDescription ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                }`}
                aria-label="How would you describe their asthma right now?"
                aria-required="true"
                aria-invalid={errors.asthmaDescription ? "true" : "false"}
                aria-describedby={errors.asthmaDescription ? "asthma-description-error" : undefined}
                data={[
                  {
                    label: "Mild",
                    value: "mild",
                  },
                  {
                    label: "Moderate",
                    value: "moderate",
                  },
                  {
                    label: "Severe",
                    value: "severe",
                  },
                  {
                    label: "Not Sure",
                    value: "not sure",
                  },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
              {errors.asthmaDescription && (
                <p id="asthma-description-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                  {errors.asthmaDescription.message}
                </p>
              )}
            </>
          )}
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            This helps Satori understand how fragile or stable your child's
            breathing feels day to day.{" "}
          </Paragraph>
          <Tooltip>
            <div className="flex flex-row justify-center items-center gap-1.5">
              <div>
                <TooltipTrigger asChild className="cursor-pointer">
                  <InfoIcon className="text-white!" />
                </TooltipTrigger>
              </div>
              <Paragraph className="text-white! text-xs! font-semibold">
                See why this matters?
              </Paragraph>
            </div>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                This is not a medical diagnosis — it's your lived assessment.
                Satori uses this as a <b>sensitivity signal</b>, adjusting the
                tone and level of protection so the guidance matches the reality
                you navigate each day.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepChildInformationPage;
