"use client";

import { Label } from "@/components/ui/label";
import { InfoIcon } from "@/components/icons";
import { MultiSelect } from "@/components/ui/multi-select";
import { Paragraph } from "@/components/common/Typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SignupStepAllergiesAndSensitivitiesPage = () => {
  return (
    <form className="flex flex-col gap-10">
      <section className="flex flex-col gap-3 w-full">
        <Label id="has-your-child-been-diagnosed-with-allergies" className="text-white!">
          Has your child been diagnosed with allergies?
        </Label>
        <RadioGroup defaultValue="yes" id="has-your-child-been-diagnosed-with-allergies" className="flex flex-row gap-3">
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
            <RadioGroupItem value="not-sure" id="has-your-child-been-diagnosed-with-allergies-not-sure" />
            <span className="text-radio-text text-lg leading-7 font-normal">
              Not Sure
            </span>
          </Label>
        </RadioGroup>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Allergies and asthma often amplify each other.
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
                This helps Satori decide whether to treat allergens — like pollen, dust mites, mold, or pet dander — as major co-drivers of your child’s breathing patterns or to keep focus primarily on environmental triggers like cold air and pollution.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <MultiSelect
            label="Which allergies do they have?"
            labelClassName="text-white!"
            id="which-allergies-do-they-have"
            multiSelectClassName="px-5! py-3! h-auto! min-h-14.25! rounded-2xl! text-base!"
            data={[
              {
                label: "Pollen",
                value: "pollen"
              },
              {
                label: "Dust Mites",
                value: "dust mites"
              },
              {
                label: "Pets",
                value: "pets"
              },
              {
                label: "Mold",
                value: "mold"
              },
              {
                label: "Other",
                value: "other"
              }
            ]}
            onValueChange={(value) => {
              console.log(value);
            }}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Different allergens behave differently across seasons, weather, and time of day.
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
                Satori uses real-time environmental factors that influence allergens (vegetation phase, wind, humidity, recent rain, mold potential) and combines them with your child's known sensitivities to offer earlier and more accurate warnings — reducing total airway load.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepAllergiesAndSensitivitiesPage;
