export class StringUtils {

  public static paddingZeroLeft(numb: string | number, size: number) {

    if (numb.toString().length < size) {
      while (numb.toString().length < size) {
        numb = '0' + numb;
      }
      return numb;
    }

    return numb;
  }

  public static paddingZeroRight(numb: string | number, size: number) {

    if (numb.toString().length < size) {
      while (numb.toString().length < size) {
        numb = numb + '0';
      }
      return numb;
    }
    return numb;
  }

  public static getNamePdfFile(pid: string, hcode: string): string {

    let date = new Date()
    let day: string = date.getDate().toString().padStart(2, '0')
    let year: string = (date.getFullYear() + 543).toString().slice(2)
    let month: string = (date.getMonth() + 1).toString().padStart(2, '0')
    let hour: string = date.getHours().toString()
    let minute: string = date.getMinutes().toString()
    return `${pid}_${hcode}_${year}${month}${day}_${hour}${minute}`
  }

  public static getReportFileName(): string {
    let date = new Date()
    let day: string = date.getDate().toString().padStart(2, '0')
    let year: string = (date.getFullYear() + 543).toString().slice(2)
    let month: string = (date.getMonth() + 1).toString().padStart(2, '0')
    let hour: string = date.getHours().toString()
    let minute: string = date.getMinutes().toString()
    return `${year}${month}${day}_${hour}${minute}`
  }

  public static emptyToUndefined(text: string): string {
    if (!text) {
      return "";
    } else if ("-" == text.trim()) {
      return "";
    }
    return text.trim();
  }
}
