import * as constants from './constants';

export default {
  [constants.ENTITY_MONTH]: '/api/accounting/monthlyBill',
  [constants.ENTITY_DETAIL]: '/api/accounting/dailyDetails',
  [constants.ENTITY_MERCHANTS]: merchants =>`/api/accounting/merchants/${merchants}`,
  [constants.ENTITY_APPS]: '/api/accounting/apps',
  [constants.ENTITY_BANKS]: '/api/account/all',
  [constants.ENTITY_BILL]: account =>`/api/account/${account}/detail`,
  [constants.ENTITY_SERIAL]: `/api/account/serialDetail`,
  [constants.ENTITY_DDETAIL]: '/api/accounting/export/detail',
  [constants.ENTITY_DSETTLE]: '/api/accounting/export/settlement',
};
