"use client";

import { z } from "zod";
import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "@/components/icons";
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

const illnessAndRecoveryTendenciesSchema = z.object({
  catchesColdsOften: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),
  usesGasStove: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),
});

type IllnessAndRecoveryTendenciesFormData = z.infer<typeof illnessAndRecoveryTendenciesSchema>;

const SignupStepIllnessAndRecoveryTendenciesPage = () => {
  const pathname = usePathname();
  const { registerForm, unregisterForm } = useSignupForm();
  const { saveStepDraft } = useSignupProgress();
  const savedData = useSelector((state: RootState) => selectSignupData(state).illnessAndRecoveryTendencies);

  const defaultValues = useMemo((): {
    catchesColdsOften?: IllnessAndRecoveryTendenciesFormData["catchesColdsOften"];
    usesGasStove?: IllnessAndRecoveryTendenciesFormData["usesGasStove"];
  } => {
    const yesNo = (v: string | undefined): "yes" | "no" | undefined =>
      v === "yes" || v === "no" ? v : undefined;
    return {
      catchesColdsOften: yesNo(savedData?.catchesColdsOften),
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
  } = useForm<IllnessAndRecoveryTendenciesFormData>({
    resolver: zodResolver(illnessAndRecoveryTendenciesSchema),
    defaultValues,
    mode: "onChange",
  });

  useFormSyncWithRedux<IllnessAndRecoveryTendenciesFormData>(savedData, reset, defaultValues);

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

  const onSubmit = (data: IllnessAndRecoveryTendenciesFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Illness and Recovery Tendencies Form"
    >
      <section className="flex flex-col gap-3 w-full">
        <Label id="does-your-child-tend-to-catch-colds-or-respiratory-infections-often" className="text-white!">
          Does your child tend to catch colds or respiratory infections often?
        </Label>
        <Controller
          name="catchesColdsOften"
          control={control}
          render={({ field }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                id="does-your-child-tend-to-catch-colds-or-respiratory-infections-often"
                className="flex flex-row gap-3"
                aria-label="Does your child tend to catch colds or respiratory infections often?"
                aria-required="true"
                aria-invalid={errors.catchesColdsOften ? "true" : "false"}
              >
                <Label
                  htmlFor="does-your-child-tend-to-catch-colds-or-respiratory-infections-often-yes"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="yes" id="does-your-child-tend-to-catch-colds-or-respiratory-infections-often-yes" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    Yes
                  </span>
                </Label>
                <Label
                  htmlFor="does-your-child-tend-to-catch-colds-or-respiratory-infections-often-no"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="no" id="does-your-child-tend-to-catch-colds-or-respiratory-infections-often-no" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    No
                  </span>
                </Label>
              </RadioGroup>
              {errors.catchesColdsOften && (
                <p id="catches-colds-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                  {errors.catchesColdsOften.message}
                </p>
              )}
            </>
          )}
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Some children recover quickly, while others stay sensitive longer after illness.
          </Paragraph>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="flex flex-row justify-center items-center gap-1.5 cursor-pointer bg-transparent border-0 p-0">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={12}
              title="Why we ask about frequent colds"
              showClose
            >
              If your child gets sick frequently, Satori treats their lungs as more likely to be in a "sensitive state" throughout the year. This influences how protective guidance is timed around difficult weather or air events.
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
              <button type="button" className="flex flex-row justify-center items-center gap-1.5 cursor-pointer bg-transparent border-0 p-0">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={12}
              title="Why we ask about gas stoves"
              showClose
            >
              Gas stoves produce NO₂ and particulates. If Satori knows you use one, it can recommend helpful moments to ventilate or keep your child out of the kitchen during certain times — especially when indoor and outdoor conditions combine to create extra stress.
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepIllnessAndRecoveryTendenciesPage;
