import * as constants from './constants';

export default {
  [constants.ENTITY_BACK]: '/assetManager/category/getCategory',
  [constants.ENTITY_LIST]: '/assetManager/asset/getAssetList',
  [constants.ENTITY_ADD]: '/assetManager/asset/add',
  [constants.ENTITY_EDIT]: '/assetManager/asset/mod',
  [constants.ENTITY_SORT]: '/assetManager/asset/reorderAssetList',
  [constants.ENTITY_LOG]: '/assetManager/asset/assetOperateLog',
  [constants.ENTITY_PRE]: '/assetManager/asset/assetPreview',
  [constants.ENTITY_POSITION]: '/assetManager/suite/getSuite',

};
