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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const SignupStepHowTheirBreathingBehavesPage = () => {
  return (
    <form className="flex flex-col gap-10">
      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <Combobox
            label="When do their symptoms tend to get worse?"
            labelClassName="text-white!"
            id="when-do-their-symptoms-tend-to-get-worse"
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
                Knowing whether mornings, afternoons, or evenings are harder for
                your child lets Satori align environmental intelligence with
                your child's physiological windows, timing alerts around the
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
            id="what-usually-triggers-their-breathing-symptoms"
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
                Satori uses an internal <b>causal model</b> of how pollution,
                weather, allergens, and meteorology interact with specific
                triggers. When Satori understands your child's triggers, it can
                detect the exact environmental patterns that activate them and
                offer targeted, high-impact guidance instead of generic advice.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <MultiSelect
            label="What symptoms do you see when their asthma acts up?"
            labelClassName="text-white!"
            id="what-symptoms-do-you-see-when-their-asthma-acts-up"
            multiSelectClassName="px-5! py-3! h-auto! min-h-14.25! rounded-2xl! text-base!"
            data={[
              {
                label: "Cough",
                value: "cough",
              },
              {
                label: "Wheeze",
                value: "wheeze",
              },
              {
                label: "Shortness of Breath",
                value: "shortness of breath",
              },
              {
                label: "Chest Tightness",
                value: "chest tightness",
              },
              {
                label: "Nighttime Cough",
                value: "nighttime cough",
              },
              {
                label: "Fast Breathing",
                value: "fast breathing",
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
            Different symptoms signal different kinds of stress on the lungs.
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
                A child who coughs at night and a child who wheezes during
                sports often need different environmental guidance. This helps
                Satori tailor its explanations and suggestions so they match
                what you actually observe.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <Combobox
            label="How much time do they spend outdoors?"
            labelClassName="text-white!"
            id="how-much-time-do-they-spend-outdoors"
            comboBoxClassName="px-5! py-4! h-14.25! rounded-2xl! text-base!"
            data={[
              {
                label: "Mostly Indoors",
                value: "mostly indoors",
              },
              {
                label: "Mixed",
                value: "mixed",
              },
              {
                label: "Outdoors A Lot",
                value: "outdoors a lot",
              },
            ]}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Outdoor time changes how strongly environmental conditions affect
            your child.
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
                Kids who spend many hours outside are “inside the air” Satori
                interprets, while indoor-heavy routines shift focus to dust,
                humidity, and household triggers. This determines how Satori
                balances outdoor vs. indoor guidance.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <Combobox
            label="When are they usually most active?"
            labelClassName="text-white!"
            id="when-are-they-usually-most-active"
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
                label: "Varies",
                value: "varies",
              },
            ]}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Activity increases airflow — and exposure to whatever is in the air.
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
                If their most intense activity coincides with ozone, cold-dry
                air, or pollution peaks, Satori can recommend small timing
                shifts that reduce stress on their breathing without limiting
                the joy of movement.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Label id="do-they-play-sports-or-run-hard-regularly" className="text-white!">
          Do they play sports or run hard regularly?
        </Label>
        <RadioGroup defaultValue="yes" id="do-they-play-sports-or-run-hard-regularly" className="flex flex-row gap-3">
          <Label
            htmlFor="do-they-play-sports-or-run-hard-regularly-yes"
            className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
          >
            <RadioGroupItem value="yes" id="do-they-play-sports-or-run-hard-regularly-yes" />
            <span className="text-radio-text text-lg leading-7 font-normal">
              Yes
            </span>
          </Label>
          <Label
            htmlFor="do-they-play-sports-or-run-hard-regularly-no"
            className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
          >
            <RadioGroupItem value="no" id="do-they-play-sports-or-run-hard-regularly-no" />
            <span className="text-radio-text text-lg leading-7 font-normal">
              No
            </span>
          </Label>
        </RadioGroup>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Exercise affects how environmental conditions interact with
            sensitive lungs.
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
                Sports are wonderful — but exercise plus harsh air can amplify
                irritation. This lets Satori protect your child without asking
                you to remove them from activities they love.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <MultiSelect
            label="When are you usually away from your child?"
            labelClassName="text-white!"
            id="when-are-you-usually-away-from-your-child"
            multiSelectClassName="px-5! py-3! h-auto! min-h-14.25! rounded-2xl! text-base!"
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
                label: "Varies",
                value: "varies",
              },
            ]}
            onValueChange={(value) => {
              console.log(value);
            }}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Many parents worry most when they’re not physically present.
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
                Knowing when you’re typically away lets Satori time its most
                protective guidance around the hours when your child may be more
                exposed — and you’re less able to observe them directly. This
                creates a safety net that works even when you can’t be there.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepHowTheirBreathingBehavesPage;
