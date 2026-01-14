"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "@/components/icons";
import { Paragraph } from "@/components/common/Typography";
import { Combobox } from "@/components/ui/combo-box";
import { MultiSelect } from "@/components/ui/multi-select";

const SignupStepHowTheirBreathingBehavesPage = () => {
  return (
    <form className="flex flex-col gap-10">
      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <Combobox
            label="When do their symptoms tend to get worse?"
            labelClassName="text-white!"
            comboBoxClassName="px-5! py-4! h-14.25! rounded-2xl! text-base!"
            data={[
              {
                label: "Early Morning",
                value: "early morning",
              },
              {
                label: "Late Morning",
                value: "late morning",
              },
              {
                label: "Midday",
                value: "midday",
              },
              {
                label: "Late Afternoon",
                value: "late afternoon",
              },
              {
                label: "Evening",
                value: "evening",
              },
              {
                label: "Night",
                value: "night",
              },
              {
                label: "Not Sure",
                value: "not sure",
              },
            ]}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Breathing has rhythms — and so does the environment.
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
                Knowing whether mornings, afternoons, or evenings are harder for
                your child lets Satori align environmental intelligence with
                your child’s physiological windows, timing alerts around the
                moments when they need it most
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <MultiSelect
            label="What usually triggers their breathing symptoms?"
            labelClassName="text-white!"
            multiSelectClassName="px-5! py-3! h-auto! min-h-14.25! rounded-2xl! text-base!"
            data={[
              {
                label: "Exercise",
                value: "exercise",
              },
              {
                label: "Cold Air",
                value: "cold air",
              },
              {
                label: "Dust",
                value: "dust",
              },
              {
                label: "Pollen",
                value: "pollen",
              },
              {
                label: "Mold",
                value: "mold",
              },
              {
                label: "Pets",
                value: "pets",
              },
              {
                label: "Smoke",
                value: "smoke",
              },
              {
                label: "Strong Smells",
                value: "strong smells",
              },
              {
                label: "Infections",
                value: "infections",
              },
              {
                label: "Weather Changes",
                value: "weather changes",
              },
              {
                label: "Not Sure",
                value: "not sure",
              },
            ]}
            onValueChange={(value) => {
              console.log(value);
            }}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Every child has unique triggers — knowing them helps Satori
            personalize guidance more precisely.
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
                Satori uses an internal causal model of how pollution, weather,
                allergens, and meteorology interact with specific triggers. When
                Satori understands your child's triggers, it can detect the
                exact environmental patterns that activate them and offer
                targeted, high-impact guidance instead of generic advice
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepHowTheirBreathingBehavesPage;
