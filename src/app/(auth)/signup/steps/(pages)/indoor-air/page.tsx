"use client";

import { z } from "zod";
import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { InfoIcon } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paragraph } from "@/components/common/Typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSignupForm } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";
import { useSignupProgress } from "@/hooks/useSignupProgress";
import { useFormSyncWithRedux } from "@/hooks/useFormSyncWithRedux";
import { selectSignupData } from "@/redux/slices/signupSlice";
import type { RootState } from "@/redux/store";

const indoorAirSchema = z.object({
  hasPets: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),
  homeFeelsHumid: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),
  waterLeaksOrMustySmells: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),
  usesGasStove: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),
});

type IndoorAirFormData = z.infer<typeof indoorAirSchema>;

const SignupStepIndoorAirPage = () => {
  const pathname = usePathname();
  const { registerForm, unregisterForm } = useSignupForm();
  const { saveStepDraft } = useSignupProgress();
  const savedData = useSelector((state: RootState) => selectSignupData(state).indoorAir);

  const defaultValues = useMemo((): {
    hasPets?: IndoorAirFormData["hasPets"];
    homeFeelsHumid?: IndoorAirFormData["homeFeelsHumid"];
    waterLeaksOrMustySmells?: IndoorAirFormData["waterLeaksOrMustySmells"];
    usesGasStove?: IndoorAirFormData["usesGasStove"];
  } => {
    const yesNo = (v: string | undefined): "yes" | "no" | undefined =>
      v === "yes" || v === "no" ? v : undefined;
    return {
      hasPets: yesNo(savedData?.hasPets),
      homeFeelsHumid: yesNo(savedData?.homeFeelsHumid),
      waterLeaksOrMustySmells: yesNo(savedData?.waterLeaksOrMustySmells),
      usesGasStove: yesNo(savedData?.usesGasStove),
    };
  }, [savedData]);

  const {
    handleSubmit,
    control,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IndoorAirFormData>({
    resolver: zodResolver(indoorAirSchema),
    defaultValues,
    mode: "onChange",
  });

  // Sync form with Redux state when navigating back to this step
  useFormSyncWithRedux<IndoorAirFormData>(savedData, reset, defaultValues);

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

  const onSubmit = (data: IndoorAirFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form 
      className="flex flex-col gap-10" 
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Indoor Air Form"
    >
      <section className="flex flex-col gap-3 w-full">
        <Label id="do-you-have-pets" className="text-white!">
          Do you have pets?
        </Label>
        <Controller
          name="hasPets"
          control={control}
          render={({ field }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                id="do-you-have-pets"
                className="flex flex-row gap-3"
                aria-label="Do you have pets?"
                aria-required="true"
                aria-invalid={errors.hasPets ? "true" : "false"}
              >
                <Label
                  htmlFor="do-you-have-pets-yes"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="yes" id="do-you-have-pets-yes" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    Yes
                  </span>
                </Label>
                <Label
                  htmlFor="do-you-have-pets-no"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="no" id="do-you-have-pets-no" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    No
                  </span>
                </Label>
              </RadioGroup>
              {errors.hasPets && (
                <p id="has-pets-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                  {errors.hasPets.message}
                </p>
              )}
            </>
          )}
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Pets are part of the family — and sometimes part of the breathing story.
          </Paragraph>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Pet dander can carry allergens and pollutants indoors. This helps Satori tailor strategies that reduce indoor irritation while respecting family routines and emotional bonds.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Label id="does-your-home-ever-feel-humid-musty-or-damp" className="text-white!">
          Does your home ever feel humid, musty, or damp?
        </Label>
        <Controller
          name="homeFeelsHumid"
          control={control}
          render={({ field }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                id="does-your-home-ever-feel-humid-musty-or-damp"
                className="flex flex-row gap-3"
                aria-label="Does your home ever feel humid, musty, or damp?"
                aria-required="true"
                aria-invalid={errors.homeFeelsHumid ? "true" : "false"}
              >
                <Label
                  htmlFor="does-your-home-ever-feel-humid-musty-or-damp-yes"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="yes" id="does-your-home-ever-feel-humid-musty-or-damp-yes" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    Yes
                  </span>
                </Label>
                <Label
                  htmlFor="does-your-home-ever-feel-humid-musty-or-damp-no"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="no" id="does-your-home-ever-feel-humid-musty-or-damp-no" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    No
                  </span>
                </Label>
              </RadioGroup>
              {errors.homeFeelsHumid && (
                <p id="home-feels-humid-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                  {errors.homeFeelsHumid.message}
                </p>
              )}
            </>
          )}
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Humidity and dampness can increase hidden breathing triggers.
          </Paragraph>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Moisture can encourage dust mites and mold. Satori integrates this with outdoor humidity, rainfall, and airflow patterns to detect when indoor risks may rise and suggest simple stabilizing steps.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Label id="have-you-noticed-water-leaks-or-musty-smells" className="text-white!">
          Have you noticed water leaks or musty smells?
        </Label>
        <Controller
          name="waterLeaksOrMustySmells"
          control={control}
          render={({ field }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                id="have-you-noticed-water-leaks-or-musty-smells"
                className="flex flex-row gap-3"
                aria-label="Have you noticed water leaks or musty smells?"
                aria-required="true"
                aria-invalid={errors.waterLeaksOrMustySmells ? "true" : "false"}
              >
                <Label
                  htmlFor="have-you-noticed-water-leaks-or-musty-smells-yes"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="yes" id="have-you-noticed-water-leaks-or-musty-smells-yes" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    Yes
                  </span>
                </Label>
                <Label
                  htmlFor="have-you-noticed-water-leaks-or-musty-smells-no"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="no" id="have-you-noticed-water-leaks-or-musty-smells-no" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    No
                  </span>
                </Label>
              </RadioGroup>
              {errors.waterLeaksOrMustySmells && (
                <p id="water-leaks-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                  {errors.waterLeaksOrMustySmells.message}
                </p>
              )}
            </>
          )}
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Leaks and musty odors often signal hidden mold growth.
          </Paragraph>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Mold can intensify asthma and allergy symptoms, especially during sleep. Satori combines this information with <b>real-time neighborhood humidity and weather dynamics</b> to recognize when mold risk may spike and guide you toward timely, child-safe adjustments.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Label id="do-you-primarily-cook-with-a-gas-stove" className="text-white!">
          Do you primarily cook with a gas stove?
        </Label>
        <Controller
          name="usesGasStove"
          control={control}
          render={({ field }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                id="do-you-primarily-cook-with-a-gas-stove"
                className="flex flex-row gap-3"
                aria-label="Do you primarily cook with a gas stove?"
                aria-required="true"
                aria-invalid={errors.usesGasStove ? "true" : "false"}
              >
                <Label
                  htmlFor="do-you-primarily-cook-with-a-gas-stove-yes"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="yes" id="do-you-primarily-cook-with-a-gas-stove-yes" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    Yes
                  </span>
                </Label>
                <Label
                  htmlFor="do-you-primarily-cook-with-a-gas-stove-no"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="no" id="do-you-primarily-cook-with-a-gas-stove-no" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    No
                  </span>
                </Label>
              </RadioGroup>
              {errors.usesGasStove && (
                <p id="uses-gas-stove-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                  {errors.usesGasStove.message}
                </p>
              )}
            </>
          )}
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Gas stoves release irritants that can influence indoor breathing quality.
          </Paragraph>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Gas stoves produce NO₂ and particulates. If Satori knows you use one, it can recommend helpful moments to ventilate or keep your child out of the kitchen during certain times — especially when indoor and outdoor conditions combine to create extra stress.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepIndoorAirPage;
