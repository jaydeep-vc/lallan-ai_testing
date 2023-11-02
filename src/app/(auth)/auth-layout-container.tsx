import Image from "next/image";

import LOGO from "@/components/icons/logo.svg";

interface AuthLayoutContainerProps extends React.PropsWithChildren {
  heading: string;
  headingLabel?: string;
  formContainerClassName?: string;
}

const AuthLayoutContainer: React.FC<AuthLayoutContainerProps> = ({
  heading,
  headingLabel,
  formContainerClassName = "mt-10 sm:mx-auto sm:w-full sm:max-w-[40em]",
  children,
}) => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="relative h-20 w-full flex justify-center">
          <Image className="mx-auto h-10 w-auto align-middle" src={LOGO} alt="Your Company" fill />
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {heading}
        </h2>
        {headingLabel && <p className="text-base text-center text-black/60 mt-1">{headingLabel}</p>}
      </div>

      <div className={formContainerClassName}>
        {/* Children is going here */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayoutContainer;
