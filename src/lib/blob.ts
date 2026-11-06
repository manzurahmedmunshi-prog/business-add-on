import { put, del, list } from '@vercel/blob';

/**
 * Upload a file to Vercel Blob.
 * Returns the public URL of the uploaded file.
 */
export async function uploadToBlob(
  file: File | Buffer,
  filename: string,
  options?: { access?: 'public' | 'private'; folder?: string }
) {
  const access = options?.access ?? 'public';
  const folder = options?.folder ? `${options.folder}/` : '';
  const pathname = `${folder}${filename}`;

  const blob = await put(pathname, file, {
    access,
    addRandomSuffix: true,
  });

  return {
    url: blob.url,
    pathname: blob.pathname,
    contentType: blob.contentType,
  };
}

/**
 * Delete a file from Vercel Blob by URL.
 */
export async function deleteFromBlob(url: string) {
  await del(url);
}

/**
 * List blobs (optional helper for admin media library later).
 */
export async function listBlobs(prefix?: string) {
  const result = await list({ prefix });
  return result.blobs;
}
