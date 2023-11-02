"use client";

import { ChangeEvent, useContext, useRef, useState } from "react";

import { SidebarContext } from "@/context/sidebar-context";
import useToast from "@/hooks/use-toast";

import Button from "@/components/ui/button";
import FileUploadHeader from "@/components/conversation/file-upload-header";
import FileUploadList from "@/components/conversation/file-upload-list";

import ChannelTypeService from "@/services/channelType.service";
import chatterService from "@/services/chatter.service";
import docService from "@/services/document.service";

import channelActions from "@/actions/channels";
import userDocActions, { type UserDocument } from "@/actions/user-docs";

import { extractFileNameFromUrl } from "@/lib/url-parser";
import getFileExtension from "@/lib/get-file-extension";

interface FileSidebarProps {
  serverDocuments: UserDocument[];
  channelTypeId: number;
  channelId: string;
  userId: string;
  embeddingModelId: number;
}

export default function FileSidebar({
  serverDocuments,
  channelId,
  channelTypeId,
  userId,
  embeddingModelId,
}: FileSidebarProps) {
  const { open } = useContext(SidebarContext);

  const [userDocuments, setUserDocuments] = useState<UserDocument[]>(serverDocuments);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setToastAlert } = useToast();

  const removeFile = async (fileId: string) => {
    const oldDocuments = [...userDocuments];
    setUserDocuments(userDocuments.filter((d) => d.id !== fileId));

    try {
      // removed file from table
      const doc = await userDocActions.fetchById(fileId);
      // remove file from storage
      if (doc === null) return;
      // if there is any file
      if (!doc.document_location) return;
      const fileName = extractFileNameFromUrl(doc.document_location, {
        replaceWhiteSpaceEncodding: true,
      });
      await userDocActions.removeFiles([`${userId}/${channelId}/${fileName}`]);
    } catch (error: any) {
      console.log(error);
      // restore old doc
      setUserDocuments(oldDocuments);
      // toast error
      setToastAlert({
        title: "Something went wrong !",
        message: error.message,
        type: "error",
      });
    }
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    // validating file input
    if (!e.target.files || e.target.files.length < 1) return;
    const file = e.target.files[0];

    // start loading
    setIsFileUploading(true);

    // 1. updload file
    // 2. insert file url to table
    // 3. send it to server to generate embedding
    // 4. update channel with retured id

    try {
      // 1. upload file
      const newFile = new File(
        [file],
        `${file.name}_${Date.now()}.${getFileExtension(file.name)}`,
        { type: file.type }
      );

      const publicUrl = await userDocActions.upload(
        newFile,
        `${userId}/${channelId}/${newFile.name}`
      );
      // 2. insert file url to table
      const doc = await userDocActions.create({
        channel_id: channelId,
        document_name: file.name.toString(),
        document_location: publicUrl,
      });
      // generate embeddings in the frontend side
      // await chatterService.generateAndStoreEmbedding(publicUrl, channelId);
      // insert inside the server
      const result = await docService.uploadAndGenerateEmbedding({
        doc_name: [publicUrl],
        channel_id: channelId,
        channel_type_id: channelTypeId,
        embedding_model_id: embeddingModelId,
      });
      // 4 .update if it is not finance data
      if (channelTypeId !== ChannelTypeService.FINANCE) {
        await channelActions.update(channelId, {
          langchain_pg_collection_id: result.data.collection_uuid,
        });
      }
      // update the file data
      setUserDocuments([...userDocuments, doc!]);
    } catch (error: any) {
      console.error(error);
      setToastAlert({
        title: "Something went wrong !",
        message: error.message ?? "Unable to handle the request. Please try again",
        type: "error",
      });
    } finally {
      setIsFileUploading(false);
      // remove file from the ref
      if (fileInputRef.current) {
        fileInputRef.current.files = null;
        fileInputRef.current.value = "";
      }
    }
  };

  if (!open) return false;

  return (
    <aside
      className={`
      md:w-3/12 h-screen p-5 transition-all bg-white border-l 
      border-gray-200 flex justify-between flex-col
      fixed w-full md:relative 
      ${open ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="h-full overflow-y-auto bg-white">
        <FileUploadHeader numOfDocs={userDocuments.length} />
        <FileUploadList docs={userDocuments} onRemove={removeFile} />
      </div>
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          onChange={handleUpload}
          className="opacity-0 absolute w-full h-full cursor-pointer"
        />
        <Button
          loading={isFileUploading}
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          Upload File
        </Button>
      </div>
    </aside>
  );
}
