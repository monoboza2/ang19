import {HttpParams} from "@angular/common/http";

export class IgnoreNullHttpParams {
  private param: HttpParams = new HttpParams();

  constructor(private config: Config = {excludeValues: []} as Config) {
  }

  set(param: string, value: any): IgnoreNullHttpParams {
    if (value !== null && value !== undefined && !this.config.excludeValues.includes(value)) {
      this.param = this.param.set(param, value);
    }
    return this;
  }

  append(param: string, value: any): IgnoreNullHttpParams {
    if (value !== null && value !== undefined && !this.config.excludeValues.includes(value)) {
      this.param = this.param.append(param, value);
    }
    return this;
  }

  toHttpParam(): HttpParams {
    return this.param;
  }

  static fromObject(object: any): IgnoreNullHttpParams {
    let param = new IgnoreNullHttpParams();
    IgnoreNullHttpParams.appendObjectKeyToParam(object,param);
    return param
  }

  private static appendObjectKeyToParam(object: any, param: IgnoreNullHttpParams, root = '') {
    if (object === null || object === undefined || object === '') {
      return
    }
    if (typeof object === 'object' && !Array.isArray(object) && !(object instanceof Date)) {
      let keys = Object.keys(object)
      for (let key of keys) {
        IgnoreNullHttpParams.appendObjectKeyToParam(object[key], param, root === '' ? key : root + '.' + key)
      }
    } else {
      param.append(root,object)
    }
  }
}

export class Config {
  excludeValues: any[] = []
}

