/** Google Drive-only folder operations. */

function createFolders() {
  const properties = PropertiesService.getScriptProperties();
  const storedRootId = properties.getProperty(CMS_CONFIG.properties.rootFolderId);
  let rootFolder = storedRootId ? getFolderByIdOrNull(storedRootId) : null;

  if (!rootFolder) {
    rootFolder = DriveApp.createFolder(CMS_CONFIG.rootFolderName);
    properties.setProperty(CMS_CONFIG.properties.rootFolderId, rootFolder.getId());
  }

  const folderIds = { root_folder_id: rootFolder.getId() };
  CMS_CONFIG.folders.forEach(function (name) {
    const folder = getOrCreateChildFolder(rootFolder, name);
    folderIds[name.toLowerCase() + '_folder_id'] = folder.getId();
  });
  return folderIds;
}

function getFolderByIdOrNull(id) {
  try {
    return DriveApp.getFolderById(id);
  } catch (error) {
    return null;
  }
}

function getOrCreateChildFolder(parentFolder, name) {
  const matches = parentFolder.getFoldersByName(name);
  return matches.hasNext() ? matches.next() : parentFolder.createFolder(name);
}
