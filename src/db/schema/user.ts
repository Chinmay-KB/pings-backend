import { defaultVal, property } from 'class-converter';
import { AlarmModel } from './alarm';

export class UserModel {
  @property()
  uid!: string;

  @property()
  fcm_token!: string;

  @defaultVal([])
  @property('ongoing', AlarmModel, true)
  ongoing!: AlarmModel[];

  @defaultVal([])
  @property('completed', AlarmModel, true)
  completed!: AlarmModel[];

  @defaultVal([])
  @property('pending', AlarmModel, true)
  pending!: AlarmModel[];
}
