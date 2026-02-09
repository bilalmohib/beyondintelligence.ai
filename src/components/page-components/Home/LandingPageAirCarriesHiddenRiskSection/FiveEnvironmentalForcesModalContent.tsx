import Image from "next/image";
import { Heading2 } from "@/components/common/Typography";
import { Paragraph } from "@/components/common/Typography";

export interface IFiveEnvironmentalForcesModalContentProps {
  title: string;
  description: string;
  bottomText: string;
  image: {
    src: string;
    alt: string;
  };
}

const FiveEnvironmentalForcesModalContent = ({
  title,
  description,
  bottomText,
  image,
}: IFiveEnvironmentalForcesModalContentProps) => {
  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col justify-between gap-1 overflow-auto bg-white p-6 pt-6 pr-14 sm:p-7 sm:pt-14 sm:pr-14 md:w-[55%] md:flex-initial md:gap-4 md:p-8 md:pt-8 md:pr-8 lg:p-10 xl:p-12 rounded-t-[20px] md:rounded-l-[20px] md:rounded-tr-none md:rounded-br-none md:rounded-t-none">
        <Heading2 className="text-input-text! shrink-0 leading-[120%]! -tracking-[0.92px]! text-2xl! sm:text-3xl! lg:text-[46px]!">
          {title}
        </Heading2>
        <div className="flex min-h-0 flex-col gap-2 md:gap-4">
          <Paragraph className="text-secondary-gray! text-base! leading-6! tracking-[0.48px]! sm:text-lg! sm:leading-7! md:text-xl! md:leading-8! lg:text-2xl! lg:leading-8!">
            {description}
          </Paragraph>
          <Paragraph className="text-base! font-bold! leading-6! tracking-[0.48px]! text-input-text! sm:text-lg! sm:leading-7! md:text-xl! md:leading-8! lg:text-2xl! lg:leading-8!">
            {bottomText}
          </Paragraph>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 w-full md:flex-initial md:h-full md:w-[45%] rounded-b-[20px] md:rounded-b-none md:rounded-r-[20px] md:rounded-l-none">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-center rounded-b-[20px] md:rounded-b-none md:rounded-r-[20px] md:rounded-l-none"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-b-[20px] md:rounded-b-none md:rounded-r-[20px] md:rounded-l-none"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0) 82.41%, rgba(0, 0, 0, 0.6) 100%)",
          }}
          aria-hidden
        />
      </div>
    </>
  );
};
export default FiveEnvironmentalForcesModalContent;
