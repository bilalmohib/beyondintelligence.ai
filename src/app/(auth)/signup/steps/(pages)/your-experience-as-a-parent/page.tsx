"use client";

import { z } from "zod";
import { useEffect } from "react";
import { InfoIcon } from "@/components/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paragraph } from "@/components/common/Typography";
import { MultiSelect } from "@/components/ui/multi-select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSignupForm } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";

const yourExperienceAsAParentSchema = z.object({
  worries: z.array(z.string()).min(1, "Please select at least one option"),
});

type YourExperienceAsAParentFormData = z.infer<typeof yourExperienceAsAParentSchema>;

const SignupStepYourExperienceAsAParentPage = () => {
  const { registerForm, unregisterForm } = useSignupForm();

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<YourExperienceAsAParentFormData>({
    resolver: zodResolver(yourExperienceAsAParentSchema),
    defaultValues: {
      worries: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    registerForm(async () => {
      const isValid = await trigger();
      return isValid;
    });
    return () => unregisterForm();
  }, [registerForm, unregisterForm, trigger]);

  const onSubmit = (data: YourExperienceAsAParentFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Your Experience as a Parent Form"
    >
      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <Controller
            name="worries"
            control={control}
            render={({ field }) => (
              <>
                <MultiSelect
                  label="What worries you most about your child's breathing?"
                  labelClassName="text-white!"
                  id="what-worries-you-most-about-your-childs-breathing"
                  multiSelectClassName={`px-5! py-3! h-auto! min-h-14.25! rounded-2xl! text-base! ${errors.worries ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                    }`}
                  aria-label="What worries you most about your child's breathing?"
                  aria-required="true"
                  aria-invalid={errors.worries ? "true" : "false"}
                  aria-describedby={errors.worries ? "worries-error" : undefined}
                  data={[
                    {
                      label: "Nighttime Breathing",
                      value: "nighttime breathing",
                    },
                    {
                      label: "Sudden Flares",
                      value: "sudden flares",
                    },
                    {
                      label: "School Handling",
                      value: "school handling",
                    },
                    {
                      label: "Sports Activity",
                      value: "sports activity",
                    },
                    {
                      label: "Colds and Infections",
                      value: "colds and infections",
                    },
                    {
                      label: "Uncertain Triggers",
                      value: "uncertain triggers",
                    },
                    {
                      label: "Unpredictability",
                      value: "unpredictability",
                    },
                    {
                      label: "Other",
                      value: "other",
                    },
                  ]}
                  value={field.value}
                  onValueChange={field.onChange}
                />
                {errors.worries && (
                  <p id="worries-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                    {errors.worries.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Your worries shape how Satori supports you emotionally as well as practically.
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
                Asthma and allergies affect the whole family, not just your child. Knowing what keeps you up at night lets Satori tailor each communication so that it feels less clinical and more like a caring guardian standing beside you — helping you feel steadier, more confident, and far less alone.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepYourExperienceAsAParentPage;
