import { Injectable } from '@nestjs/common';

@Injectable()
export class Serialize {
  static serialize<T, D>(data: T | T[], dtoClass: D): D | D[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.serialize(item, dtoClass)) as D[];
    } else {
      return new (dtoClass as new (data: T) => D)(data);
    }
  }
}
