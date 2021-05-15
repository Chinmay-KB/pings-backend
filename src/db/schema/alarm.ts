import { defaultVal, property } from 'class-converter';

export class AlarmModel {
  @property()
  time!: string;

  @property()
  title!: string;

  @property()
  users!: string[];

  @property()
  alarm_tone!: number;

  @property()
  creator!: string;

  @defaultVal([])
  @property()
  trusted!: string[];
}
