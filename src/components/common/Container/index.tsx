import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div
      className={cn(
        "max-w-[1350px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 xxlg:px-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
