"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/supabase";

const supabase = createClientComponentClient<Database>();

/**
 *  This function is used to upload file from user machicne to our storage
 *
 * @param file file to be upload
 * @param path path where we want to upload
 * @returns public url of the uploaded file
 */

export async function upload(file: File, path: string): Promise<string> {
  const { data, error } = await supabase.storage.from("user").upload(path, file);
  //   throw if there is any error
  if (error) throw error;
  //   return public url of the file
  const {
    data: { publicUrl },
  } = supabase.storage.from("user").getPublicUrl(data.path);

  return publicUrl;
}

export async function removeFiles(locations: string[]) {
  const { data } = await supabase.storage.from("user").remove(locations);
}
