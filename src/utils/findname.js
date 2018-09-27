export function findname(data,serac) {
  let fina=[];
  serac.split(',').map((item,i)=> {
    data.map((item1, i) => {
      if (item1.key === item) {
        fina.push(item1.value)
      }
      if (item1.children) {
        item1.children.map((item2, i) => {
          if (item2.key === item)
            fina.push(item2.value)
        })
      }
    });
  })

  return fina
}


export function findkey(data,serac) {
  let fina=[];
  serac.map((item,i)=> {
    data.map((item1, i) => {
      if (item1.value === item) {
        fina.push(item1.key)
      }
      if (item1.children) {
        item1.children.map((item2, i) => {
          if (item2.value === item)
            fina.push(item2.key)
        })
      }
    });
  })

  return fina
}
