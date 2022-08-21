import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Approval,
  ApprovalForAll,
  Transfer,
  TripDeclared
} from "../generated/Contract/Contract"
import { Trip, User } from "../generated/schema"

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleTransfer(event: Transfer): void {}

export function handleTripDeclared(event: TripDeclared): void {
  let trip = new Trip(event.params.tokenId.toString())
  trip.city= event.params.city
  trip.end = event.params.endTime
  trip.start = event.params.startTime
  trip.user = event.params.user.toHexString()
  
  let user = User.load(trip.user)
  if(!user)user = new User(trip.user)
  user.save()
  trip.save()
  
}
