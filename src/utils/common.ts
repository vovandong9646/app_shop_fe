export function getBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result?.toString() || '')
    }
    reader.onerror = reject
  })
}

export function toFullName(firstName: string, middleName: string, lastName: string, languge: string) {
  if (languge === 'vi') {
    return `${lastName || ''} ${middleName || ''} ${firstName || ''}`
  }
  return `${firstName || ''} ${middleName || ''} ${lastName || ''}`
}

export function splitFullName(fullName: string, languge: string) {
  const fullNameArr = fullName.split(' ').filter(Boolean)
  let result = {
    firstName: '',
    middleName: '',
    lastName: ''
  }

  if (fullNameArr.length === 1) {
    if (languge === 'vi') {
      result.lastName = fullNameArr[0]
    } else {
      result.firstName = fullNameArr[0]
    }
  } else if (fullNameArr.length === 2) {
    if (languge === 'vi') {
      result.lastName = fullNameArr[0]
      result.middleName = fullNameArr[1]
    } else {
      result.firstName = fullNameArr[0]
      result.middleName = fullNameArr[1]
    }
  } else if (fullNameArr.length >= 3) {
    if (languge === 'vi') {
      result.lastName = fullNameArr[0]
      result.middleName = fullNameArr.slice(1, fullNameArr.length - 1).join(' ')
      result.firstName = fullNameArr[fullNameArr.length - 1]
    } else {
      result.firstName = fullNameArr[0]
      result.middleName = fullNameArr.slice(1, fullNameArr.length - 1).join(' ')
      result.lastName = fullNameArr[fullNameArr.length - 1]
    }
  }
  return result
}
