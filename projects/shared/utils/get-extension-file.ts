interface ExtensionFile {
  extension: string;
  name: string;
}
const FILE_NAME_IDX = 0;
const FILE_EXTENSION_IDX = 1;

export function getExtensionFile(filename: string): ExtensionFile {
  const matchs = filename.match(/[^\\]*\.(\w+)$/);
  const name = matchs?.[FILE_NAME_IDX] ?? '';
  const extension = matchs?.[FILE_EXTENSION_IDX] ?? '';
  return {
    name,
    extension,
  };
}
