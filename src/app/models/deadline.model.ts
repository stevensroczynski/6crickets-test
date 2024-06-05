import { ObjectHelperBaseObject } from 'typescript-object-helper';

export class DeadlineModel extends ObjectHelperBaseObject {
  secondsLeft?: number = undefined; // Set to undefined so the property will exist even if not returned by API
}
