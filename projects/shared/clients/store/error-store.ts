export const ErrorStore = {
  errorGetFile(uri: string) {
    throw new Error(`Can't get file: ${uri}`);
  },

  errorDeleteFile(uri: string) {
    throw new Error(`Can't delete file: ${uri}`);
  },

  errorSaveFile(uri: string) {
    throw new Error(`Can't save file: ${uri}`);
  },
};
