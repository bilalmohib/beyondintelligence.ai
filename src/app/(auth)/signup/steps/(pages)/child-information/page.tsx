import { Input } from "@/components/ui/input";
import { Paragraph } from "@/components/common/Typography";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "@/components/icons";
import { Combobox } from "@/components/ui/combo-box";

const SignupStepChildInformationPage = () => {
  return (
    <form className="flex flex-col gap-10">
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
              inputClassName="px-5! py-4! h-14.25! rounded-2xl! text-base!"
            />
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
              inputClassName="px-5! py-4! h-14.25! rounded-2xl! text-base!"
            />
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
                Using your child’s name helps Satori frame guidance around their
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
          inputClassName="px-5! py-4! h-14.25! rounded-2xl! text-base!"
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Age affects how sensitive a child’s breathing is to cold, heat,
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
        <Combobox
          label="How would you describe their asthma right now?"
          labelClassName="text-white!"
          required={true}
          id="how-would-you-describe-their-asthma-right-now"
          comboBoxClassName="px-5! py-4! h-14.25! rounded-2xl! text-base!"
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
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            This helps Satori understand how fragile or stable your child’s
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
