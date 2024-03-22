const generateKey = (len: number) => {
  const alp = '01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let key = ''

  for (let i = 0; i < len; i++) {
    const random = Math.floor(Math.random() * alp.length)
    key += alp[random]
  }

  return key
}

export default generateKey