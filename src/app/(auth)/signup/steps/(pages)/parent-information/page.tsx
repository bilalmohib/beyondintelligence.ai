import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "@/components/icons";
import { Paragraph } from "@/components/common/Typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SignupStepParentInformationPage = () => {
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
            We’ll use your name to speak with care, clarity, and respect —
            always as your child’s partner in protection.
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
                Using your name ensures Satori speaks directly to you as the
                parent, especially during moments when guidance needs to feel
                steady, personal, and relevant to your family — not generic or
                broadcast to others.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Input
          label="Email Address*"
          required
          id="email-address"
          type="email"
          placeholder="Email Address"
          className="rounded-2xl"
          labelClassName="text-white!"
          inputClassName="px-5! py-4! h-14.25! rounded-2xl! text-base!"
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Email lets Satori send longer-form insights that don’t fit into SMS
            — like seasonal guides and important updates.
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
                Some of the most meaningful support for families — seasonal
                asthma–allergy planning, environmental insight summaries, safety
                updates, and improvements to your child’s personalized model —
                simply cannot fit in a text message. Email provides a reliable
                way for Satori to help you stay one step ahead throughout the
                year. Your email is never sold or shared.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Input
          label="Parent Phone*"
          required
          id="parent-phone"
          type="tel"
          placeholder="Parent Phone"
          className="rounded-2xl"
          labelClassName="text-white!"
          inputClassName="px-5! py-4! h-14.25! rounded-2xl! text-base!"
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Your phone is your secure login and the channel Satori uses to
            protect your child in real time.
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
                Satori is a no-app, text-first, voice-ready asthma–allergy
                guardian. Your phone becomes your identity, security key, and
                conversation link. This is what enables instant guidance —
                without apps, passwords, or friction — especially during moments
                when the environment shifts quickly.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Label id="consent-to-receive-sms-alerts" className="text-white!">
          Consent to Receive SMS Alerts
        </Label>
        <RadioGroup defaultValue="allow" className="flex flex-row gap-3">
          <Label
            htmlFor="allow"
            className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
          >
            <RadioGroupItem value="allow" id="allow" />
            <span className="text-radio-text dark:text-radio-text text-lg leading-7 font-normal">
              Allow
            </span>
          </Label>
          {/* <Label
            htmlFor="no-for-now"
            className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
          >
            <RadioGroupItem value="no-for-now" id="no-for-now" />
            <span className="text-radio-text text-lg leading-7 font-normal">
              No for now
            </span>
          </Label> */}
        </RadioGroup>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Satori sends life-simplifying guidance when environmental or
            meteorological conditions may affect your child’s breathing.
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
                Satori monitors real-time environmental, weather, and
                atmospheric patterns — including pollution spikes, heat-ozone
                surges, cold-dry air, and air-trapping events. SMS consent
                allows Satori to reach you instantly so you can make small but
                powerful adjustments at the exact moments they matter most.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepParentInformationPage;
