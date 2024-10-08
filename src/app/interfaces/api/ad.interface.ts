import { LANGUAGE } from "@app/core/constants";
import { ITranslationDynamic } from "../language.interface";

export enum AdType {
  COUNTDOWN = 'COUNTDOWN',
  FOOTER = 'FOOTER'
}

export interface IAd {
  type: AdType,
  title: ITranslationDynamic,
  content: ITranslationDynamic,
  endDate?: number,
  link?: string
}

export interface ISubscribeAdEmailsReq {
  email: string,
  lang: LANGUAGE
}
