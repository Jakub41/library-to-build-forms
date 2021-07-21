import HttpUtil from './httpUtil';

const StorageUtil = {
  upload: async (data) => {
    const url = `${window.UPLOAD_SERVICE_URL}/upload`;
    return await HttpUtil.uploadFile(url, data);
  },
  download: async (fileId) => {
    const query = `${window.UPLOAD_SERVICE_URL}/download/?fileId=${fileId}`;
    return await HttpUtil.get(query);
  },
};

export default StorageUtil;
