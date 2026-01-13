import { Input } from "@/components/ui/input";
import { Paragraph } from "@/components/common/Typography";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "@/components/icons";

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
                Your child is a living, breathing person — not a data point.
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
                Age affects how sensitive a child's breathing is to cold, heat,
                activity, and environmental shifts.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Input
          label="How would you describe their asthma right now?"
          required
          id="asthma-description"
          placeholder="How would you describe their asthma right now?"
          className="rounded-2xl"
          labelClassName="text-white!"
          inputClassName="px-5! py-4! h-14.25! rounded-2xl! text-base!"
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
                This helps Satori understand how fragile or stable your child's
                breathing feels day to day.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepChildInformationPage;
