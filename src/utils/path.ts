export const createImagePath = ({
  folder,
  subfolder,
  fileName
}: {
  folder: string;
  subfolder?: string;
  fileName: string;
}) => `${folder}/${subfolder && `${subfolder}/`}${new Date().getTime()}-${fileName.trim()}`
