export interface ModalContentProps {
  children: React.ReactNode;
}

export default function Content({ children }: ModalContentProps) {
  return <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">{children}</div>;
}
