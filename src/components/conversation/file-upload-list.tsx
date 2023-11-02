import Image from "next/image";

import FileItem from "./file-item";

import type { UserDocument } from "@/actions/user-docs";

export interface DocumentProps {
  docs: UserDocument[];
  onRemove: (id: string) => void;
}

export default function FileUploadList({ docs, onRemove }: DocumentProps) {
  if (docs.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-3/4">
        <Image src="/assets/no-files.png" height={100} width={100} alt="No files are uploaded" />
        <h1 className="text-lg text-center mt-8">No Document Uploaded !</h1>
        <p className="text-center text-sm">Upload a doucment and starting your query.</p>
      </div>
    );

  return (
    <ul className="space-y-2 font-medium">
      {docs.map((file) => (
        <FileItem
          key={file.id}
          name={file.document_name}
          onRemove={() => onRemove(file.id)}
          href={file.document_location ?? "#"}
        />
      ))}
    </ul>
  );
}
