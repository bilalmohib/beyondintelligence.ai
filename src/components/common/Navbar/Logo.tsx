import { useRouter } from "next/navigation";

interface LogoProps {
  onClick?: () => void;
}

const Logo = ({ onClick }: LogoProps = {}) => {
  const router = useRouter();

  return (
    <p
      className="cursor-pointer font-inter text-[21px] text-white font-bold leading-[100%] tracking-[0.09em]"
      onClick={() => {
        router.push("/");
        onClick?.();
      }}
    >
      Beyond <br /> Intelligence
    </p>
  );
};
export default Logo;