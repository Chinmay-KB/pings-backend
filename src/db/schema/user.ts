import { defaultVal, property } from 'class-converter';
import { AlarmModel } from './alarm';

export class UserModel {
  @property()
  uid!: string;

  @property()
  name!: string;

  @property()
  fcm_token!: string;

  @defaultVal([])
  ongoing!: string[];

  @defaultVal([])
  completed!: string[];

  @defaultVal([])
  pending!: string[];

  @defaultVal([])
  @property()
  trusting!: string[];

  @defaultVal([])
  @property()
  trusted_by!: string[];
}
