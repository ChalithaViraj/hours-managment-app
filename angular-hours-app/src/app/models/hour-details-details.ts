import {IUser} from "./user";
import {IProject} from "./project";
import {Schema} from "mongoose";
import {StringOrObjectId} from "../../../../src/common/util";


export interface IHour {
  user: IUser;
  project: IProject;
  hours: number;
  date: Date;
  note: string;
}

export interface DHour {
  _id?: string;
  user: StringOrObjectId;
  project: StringOrObjectId;
  hours: number;
  date: Date;
  note: string;
}
