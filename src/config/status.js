
export function typeState(status){
  switch (status){
    case 'PROCESS': return '支付中';
    case 'SUCCESS': return '成功';
    case 'UNPAY': return '未支付';
  }
}


export function checkType(status){
  switch (status){
    case 1: return '支付';
    case 3: return '退款';
    case 5: return '提现';
  }
}

export function channel(status){
  switch (status){
    case 'WECHAT': return '微信';
    case 'ALIPAY': return '支付宝';
    case 'YEEPAY': return '易宝';
    case 'UNIONPAY': return '银联';
    default: return status
  }
}
