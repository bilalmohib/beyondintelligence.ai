"use client";

import { z } from "zod";
import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
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

// Address validation that works for US and international addresses
const addressSchema = z
  .string()
  .min(10, "Please enter a complete address")
  .max(200, "Address is too long")
  .refine(
    (val) => /[a-zA-Z]/.test(val),
    "Address must contain street name"
  )
  .refine(
    (val) => /\d/.test(val),
    "Address must contain a street number or postal code"
  )
  .refine(
    (val) => val.trim().split(/[\s,]+/).length >= 3,
    "Please include street, city, and state/country"
  );

const homeAndSchoolEnvironmentSchema = z.object({
  usesAirPurifier: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),
  homeAddress: addressSchema,
  schoolAddress: addressSchema,
});

type HomeAndSchoolEnvironmentFormData = z.infer<typeof homeAndSchoolEnvironmentSchema>;

const SignupStepHomeAndSchoolEnvironmentPage = () => {
  const pathname = usePathname();
  const { registerForm, unregisterForm } = useSignupForm();
  const { saveStepDraft } = useSignupProgress();
  const savedData = useSelector((state: RootState) => selectSignupData(state).homeAndSchoolEnvironment);

  const defaultValues = useMemo((): {
    usesAirPurifier?: HomeAndSchoolEnvironmentFormData["usesAirPurifier"];
    homeAddress: string;
    schoolAddress: string;
  } => {
    const raw = savedData?.usesAirPurifier;
    const usesAirPurifier: HomeAndSchoolEnvironmentFormData["usesAirPurifier"] | undefined =
      raw === "yes" || raw === "no" ? raw : undefined;
    return {
      usesAirPurifier,
      homeAddress: savedData?.homeAddress ?? "",
      schoolAddress: savedData?.schoolAddress ?? "",
    };
  }, [savedData]);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<HomeAndSchoolEnvironmentFormData>({
    resolver: zodResolver(homeAndSchoolEnvironmentSchema),
    defaultValues,
    mode: "onChange",
  });

  // Sync form with Redux state when navigating back to this step
  useFormSyncWithRedux<HomeAndSchoolEnvironmentFormData>(savedData, reset, defaultValues);

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

  const onSubmit = (data: HomeAndSchoolEnvironmentFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form 
      className="flex flex-col gap-10" 
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Home and School Environment Form"
    >
      <section className="flex flex-col gap-3 w-full">
        <Label id="do-you-use-an-air-purifier" className="text-white!">
          Do you use an air purifier?
        </Label>
        <Controller
          name="usesAirPurifier"
          control={control}
          render={({ field }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                id="do-you-use-an-air-purifier"
                className="flex flex-row gap-3"
                aria-label="Do you use an air purifier?"
                aria-required="true"
                aria-invalid={errors.usesAirPurifier ? "true" : "false"}
              >
                <Label
                  htmlFor="do-you-use-an-air-purifier-yes"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="yes" id="do-you-use-an-air-purifier-yes" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    Yes
                  </span>
                </Label>
                <Label
                  htmlFor="do-you-use-an-air-purifier-no"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="no" id="do-you-use-an-air-purifier-no" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    No
                  </span>
                </Label>
              </RadioGroup>
              {errors.usesAirPurifier && (
                <p id="uses-air-purifier-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                  {errors.usesAirPurifier.message}
                </p>
              )}
            </>
          )}
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Purifiers can turn parts of your home into breathing-friendly recovery zones.
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
                If you have one, Satori can suggest ideal times to strengthen indoor air. If not, Satori emphasizes low-cost, high-impact alternatives like window timing, avoiding dust disturbances, and choosing the cleanest rooms for rest.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex-1">
            <Input
              label="What is your home address?"
              required
              type="text"
              id="home-address"
              placeholder="123 Main St, City, State/Country"
              className="rounded-2xl"
              labelClassName="text-white!"
              inputClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${
                errors.homeAddress ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
              }`}
              aria-label="Home Address"
              aria-required="true"
              aria-invalid={errors.homeAddress ? "true" : "false"}
              aria-describedby={errors.homeAddress ? "home-address-error" : undefined}
              {...register("homeAddress")}
            />
            {errors.homeAddress && (
              <p id="home-address-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                {errors.homeAddress.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Your child's environment changes street by street — not just city by city.
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
                Your address helps Satori understand proximity to major traffic sources, detect valley or basin shapes that influence airflow, and model how weather and pollution interact in your <b>neighborhood micro-environment</b>. This enables truly hyperlocal protection. Your address is used only for environmental calculations — never for marketing or sharing.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex-1">
            <Input
              label="What is your child's school address?"
              required
              type="text"
              id="child-school-address"
              placeholder="456 School Ave, City, State/Country"
              className="rounded-2xl"
              labelClassName="text-white!"
              inputClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${
                errors.schoolAddress ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
              }`}
              aria-label="Child's School Address"
              aria-required="true"
              aria-invalid={errors.schoolAddress ? "true" : "false"}
              aria-describedby={errors.schoolAddress ? "school-address-error" : undefined}
              {...register("schoolAddress")}
            />
            {errors.schoolAddress && (
              <p id="school-address-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                {errors.schoolAddress.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Your child spends much of their day breathing the air around their school.
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
                School environments shape exposure during arrival, recess, dismissal, and outdoor play. Satori uses this to anticipate risks at the right times and support future safe-route features between home and school.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepHomeAndSchoolEnvironmentPage;
