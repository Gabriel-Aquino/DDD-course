import Address from './address';

export default class Customer {
  private _id: string;

  private _name: string;

  private _address!: Address;

  private _active: boolean = false;

  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get active() {
    return this._active;
  }

  get Address() {
    return this._address;
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }

    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  changeName(name: string) {
    this._name = name;
  }

  isActive() {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }
}
