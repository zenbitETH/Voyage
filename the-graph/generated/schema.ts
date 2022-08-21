// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Trip extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Trip entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Trip must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Trip", id.toString(), this);
    }
  }

  static load(id: string): Trip | null {
    return changetype<Trip | null>(store.get("Trip", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get city(): string {
    let value = this.get("city");
    return value!.toString();
  }

  set city(value: string) {
    this.set("city", Value.fromString(value));
  }

  get start(): BigInt {
    let value = this.get("start");
    return value!.toBigInt();
  }

  set start(value: BigInt) {
    this.set("start", Value.fromBigInt(value));
  }

  get end(): BigInt {
    let value = this.get("end");
    return value!.toBigInt();
  }

  set end(value: BigInt) {
    this.set("end", Value.fromBigInt(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get trips(): Array<string> | null {
    let value = this.get("trips");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set trips(value: Array<string> | null) {
    if (!value) {
      this.unset("trips");
    } else {
      this.set("trips", Value.fromStringArray(<Array<string>>value));
    }
  }
}