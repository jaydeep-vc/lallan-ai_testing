export default function Bottom({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex sm:flex-row-reverse sm:px-6 gap-3">
      {children}
    </div>
  );
}
