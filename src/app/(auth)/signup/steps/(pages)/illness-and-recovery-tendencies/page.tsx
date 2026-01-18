import { Label } from "@/components/ui/label";
import { InfoIcon } from "@/components/icons";
import { Paragraph } from "@/components/common/Typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SignupStepIllnessAndRecoveryTendenciesPage = () => {
  return (
    <form className="flex flex-col gap-10">
      <section className="flex flex-col gap-3 w-full">
        <Label id="does-your-child-tend-to-catch-colds-or-respiratory-infections-often" className="text-white!">
          Does your child tend to catch colds or respiratory infections often?
        </Label>
        <RadioGroup defaultValue="yes" id="does-your-child-tend-to-catch-colds-or-respiratory-infections-often" className="flex flex-row gap-3">
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
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Some children recover quickly, while others stay sensitive longer after illness.
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
                If your child gets sick frequently, Satori treats their lungs as more likely to be in a “sensitive state” throughout the year. This influences how protective guidance is timed around difficult weather or air events.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Label id="do-you-primarily-cook-with-a-gas-stove" className="text-white!">
          Do you primarily cook with a gas stove?
        </Label>
        <RadioGroup defaultValue="yes" id="do-you-primarily-cook-with-a-gas-stove" className="flex flex-row gap-3">
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
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Gas stoves release irritants that can influence indoor breathing quality.
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
                Gas stoves produce NO₂ and particulates. If Satori knows you use one, it can recommend helpful moments to ventilate or keep your child out of the kitchen during certain times — especially when indoor and outdoor conditions combine to create extra stress.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepIllnessAndRecoveryTendenciesPage;
