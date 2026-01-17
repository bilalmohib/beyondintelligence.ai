"use client";

import { InfoIcon } from "@/components/icons";
import { Paragraph } from "@/components/common/Typography";
import { MultiSelect } from "@/components/ui/multi-select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SignupStepYourExperienceAsAParentPage = () => {
  return (
    <form className="flex flex-col gap-10">
      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <MultiSelect
            label="What worries you most about your child’s breathing?"
            labelClassName="text-white!"
            id="what-worries-you-most-about-your-childs-breathing"
            multiSelectClassName="px-5! py-3! h-auto! min-h-14.25! rounded-2xl! text-base!"
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
            onValueChange={(value) => {
              console.log(value);
            }}
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
