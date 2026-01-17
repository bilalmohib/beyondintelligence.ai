import { Label } from "@/components/ui/label";
import { InfoIcon } from "@/components/icons";
import { Combobox } from "@/components/ui/combo-box";
import { MultiSelect } from "@/components/ui/multi-select";
import { Paragraph } from "@/components/common/Typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

const SignupStepHomeAndSchoolEnvironmentPage = () => {
  return (
    <form className="flex flex-col gap-10">
      <section className="flex flex-col gap-3 w-full">
        <Label id="do-you-use-an-air-purifier" className="text-white!">
          Do you use an air purifier?
        </Label>
        <RadioGroup defaultValue="yes" id="do-you-use-an-air-purifier" className="flex flex-row gap-3">
          <Label
            htmlFor="yes"
            className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
          >
            <RadioGroupItem value="yes" id="yes" />
            <span className="text-radio-text text-lg leading-7 font-normal">
              Yes
            </span>
          </Label>
          <Label
            htmlFor="no"
            className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
          >
            <RadioGroupItem value="no" id="no" />
            <span className="text-radio-text text-lg leading-7 font-normal">
              No
            </span>
          </Label>
        </RadioGroup>
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
              placeholder="Home Address"
              className="rounded-2xl"
              labelClassName="text-white!"
              inputClassName="px-5! py-4! h-14.25! rounded-2xl! text-base!"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Your child’s environment changes street by street — not just city by city.
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
              label="What is your child’s school address?"
              required
              type="text"
              id="child-school-address"
              placeholder="Child's School Address"
              className="rounded-2xl"
              labelClassName="text-white!"
              inputClassName="px-5! py-4! h-14.25! rounded-2xl! text-base!"
            />
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
