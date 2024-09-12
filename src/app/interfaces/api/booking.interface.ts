import { LANGUAGE } from '@app/core/constants';
import { IProduct } from '../product.interface';

export interface IBookingSlot {
  start: number,
  end: number
}

export interface IProductBooking {
  product: IProduct,
  dates: IBookingSlot[]
}

export interface IPreBooking {
  bookingSlots: IBookingSlot[],
  email: string,
  lang: LANGUAGE
}
