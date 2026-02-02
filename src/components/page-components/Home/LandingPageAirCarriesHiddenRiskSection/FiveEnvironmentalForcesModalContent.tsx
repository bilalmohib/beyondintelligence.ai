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
    }
}

const FiveEnvironmentalForcesModalContent = ({ title, description, bottomText, image }: IFiveEnvironmentalForcesModalContentProps) => {
    return (
        <>
            <div
                className="flex h-full w-full flex-col justify-between bg-white p-8 md:w-[55%] md:p-10 lg:p-12 rounded-l-[20px] rounded-r-none"
            >
                <Heading2 className=" text-input-text! leading-[120%]! -tracking-[0.92px]!">
                    {title}
                </Heading2>
                <div className="flex flex-col gap-4">
                    <Paragraph className="text-secondary-gray! text-2xl! leading-8 !tracking-[0.48px]!">
                        {description}
                    </Paragraph>
                    <Paragraph className="text-2xl! leading-8 !tracking-[0.48px]! text-input-text!">
                        {bottomText}
                    </Paragraph>
                </div>
            </div>

            <div
                className="relative h-[280px] w-full md:h-full md:w-[45%]"
                style={{ borderRadius: '0 20px 20px 0' }}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center"
                    style={{ borderRadius: '0 20px 20px 0' }}
                    sizes="(max-width: 768px) 100vw, 45vw"
                />
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0) 82.41%, rgba(0, 0, 0, 0.6) 100%)',
                        borderRadius: '0 20px 20px 0',
                    }}
                    aria-hidden
                />
            </div>
        </>
    );
};
export default FiveEnvironmentalForcesModalContent;