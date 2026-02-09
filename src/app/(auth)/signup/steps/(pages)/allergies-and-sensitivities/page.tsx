"use client";

import { z } from "zod";
import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "@/components/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiSelect } from "@/components/ui/multi-select";
import { Paragraph } from "@/components/common/Typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSignupForm } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";
import { useSignupProgress } from "@/hooks/useSignupProgress";
import { useFormSyncWithRedux } from "@/hooks/useFormSyncWithRedux";
import { selectSignupData } from "@/redux/slices/signupSlice";
import type { RootState } from "@/redux/store";

const allergiesAndSensitivitiesSchema = z.object({
  hasAllergies: z.enum(["yes", "no", "not_sure"], {
    message: "Please select an option",
  }),
  allergies: z.array(z.string()).min(1, "Please select at least one option"),
});

type AllergiesAndSensitivitiesFormData = z.infer<typeof allergiesAndSensitivitiesSchema>;

const SignupStepAllergiesAndSensitivitiesPage = () => {
  const pathname = usePathname();
  const { registerForm, unregisterForm } = useSignupForm();
  const { saveStepDraft } = useSignupProgress();
  const savedData = useSelector((state: RootState) => selectSignupData(state).allergiesAndSensitivities);

  const toUnderscore = (v: string) => v.toLowerCase().replace(/\s+/g, "_");
  const defaultValues = useMemo((): {
    hasAllergies?: AllergiesAndSensitivitiesFormData["hasAllergies"];
    allergies: string[];
  } => {
    const raw = savedData?.hasAllergies;
    const hasAllergies: AllergiesAndSensitivitiesFormData["hasAllergies"] | undefined =
      raw === "yes" || raw === "no" || raw === "not_sure" || raw === "not-sure" ? (raw === "not-sure" ? "not_sure" : raw) : undefined;
    return {
      hasAllergies,
      allergies: (savedData?.allergies ?? []).map(toUnderscore),
    };
  }, [savedData]);

  const {
    handleSubmit,
    control,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<AllergiesAndSensitivitiesFormData>({
    resolver: zodResolver(allergiesAndSensitivitiesSchema),
    defaultValues,
    mode: "onChange",
  });

  useFormSyncWithRedux<AllergiesAndSensitivitiesFormData>(savedData, reset, defaultValues);

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

  const onSubmit = (data: AllergiesAndSensitivitiesFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form 
      className="flex flex-col gap-10" 
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Allergies and Sensitivities Form"
    >
      <section className="flex flex-col gap-3 w-full">
        <Label id="has-your-child-been-diagnosed-with-allergies" className="text-white!">
          Has your child been diagnosed with allergies?
        </Label>
        <Controller
          name="hasAllergies"
          control={control}
          render={({ field }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                id="has-your-child-been-diagnosed-with-allergies"
                className="flex flex-row gap-3"
                aria-label="Has your child been diagnosed with allergies?"
                aria-required="true"
                aria-invalid={errors.hasAllergies ? "true" : "false"}
              >
                <Label
                  htmlFor="has-your-child-been-diagnosed-with-allergies-yes"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="yes" id="has-your-child-been-diagnosed-with-allergies-yes" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    Yes
                  </span>
                </Label>
                <Label
                  htmlFor="has-your-child-been-diagnosed-with-allergies-no"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="no" id="has-your-child-been-diagnosed-with-allergies-no" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    No
                  </span>
                </Label>
                <Label
                  htmlFor="has-your-child-been-diagnosed-with-allergies-not-sure"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="not_sure" id="has-your-child-been-diagnosed-with-allergies-not-sure" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    Not Sure
                  </span>
                </Label>
              </RadioGroup>
              {errors.hasAllergies && (
                <p id="has-allergies-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                  {errors.hasAllergies.message}
                </p>
              )}
            </>
          )}
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Allergies and asthma often amplify each other.
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
              title="Why we ask about allergies"
              showClose
            >
              This helps Satori decide whether to treat allergens — like pollen, dust mites, mold, or pet dander — as major co-drivers of your child's breathing patterns or to keep focus primarily on environmental triggers like cold air and pollution.
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <Controller
            name="allergies"
            control={control}
            render={({ field }) => (
              <>
                <MultiSelect
                  label="Which allergies do they have?"
                  labelClassName="text-white!"
                  id="which-allergies-do-they-have"
                  multiSelectClassName={`px-5! py-3! h-auto! min-h-14.25! rounded-2xl! text-base! ${
                    errors.allergies ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                  }`}
                  aria-label="Which allergies do they have?"
                  aria-required="true"
                  aria-invalid={errors.allergies ? "true" : "false"}
                  aria-describedby={errors.allergies ? "allergies-error" : undefined}
                  data={[
                    { label: "Pollen", value: "pollen" },
                    { label: "Dust Mites", value: "dust_mites" },
                    { label: "Pets", value: "pets" },
                    { label: "Mold", value: "mold" },
                    { label: "Other", value: "other" },
                  ]}
                  value={field.value || []}
                  onValueChange={field.onChange}
                />
                {errors.allergies && (
                  <p id="allergies-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                    {errors.allergies.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Different allergens behave differently across seasons, weather, and time of day.
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
              title="Why we ask about specific allergens"
              showClose
            >
              Satori uses real-time environmental factors that influence allergens (vegetation phase, wind, humidity, recent rain, mold potential) and combines them with your child's known sensitivities to offer earlier and more accurate warnings — reducing total airway load.
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepAllergiesAndSensitivitiesPage;
