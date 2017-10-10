export class Validations {
  public isMail(email) {
    let re = /([\.-]?\w)+@([\.-]?\w)+\.(\w([\.-]\w)?)+$/ // eslint-disable-line no-useless-escape
    return re.test(email)
  }

  public isName(name) {
    let re = /^[A-ZÀÁÈÉÍÓÚÇÑ][a-zàáèéíóúçñ'-]+$/
    return re.test(name)
  }

  public isAddress(address) {
    let re = /^[A-ZÀÁÈÉÍÓÚÇÑa-zàáèéíóúçñ'-,. 0-9]+$/
    return re.test(address)
  }
  public validPassword(password:string) {
  	return password.length > 3 && password.length < 13
  }
}