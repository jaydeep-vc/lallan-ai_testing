export default function Message({ children }: React.PropsWithChildren) {
  return (
    <div className="mt-2">
      <p className="text-sm text-gray-500">{children}</p>
    </div>
  );
}
