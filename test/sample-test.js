const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const Ballot = require("../src/artifacts/contracts/Ballot.sol/Ballot.json");

let ballotFactory;
let ballot;
let owner;
let addr1;
let addr2;
let addr3;
let addrs;

beforeEach(async () => {
  [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

  const BallotFactory = await ethers.getContractFactory("BallotFactory");
  ballotFactory = await BallotFactory.deploy();
  await ballotFactory.deployed();

  await ballotFactory.createBallot("Crypto", "There is small step here");
  const ballotAddresses = await ballotFactory.getDeployedBallot();

  [ballotAddress] = ballotAddresses;

  ballot = await ethers.getContractAt(
    "Ballot",
    "0xACb407074aAd1C8F84329302334d8083fA1766A1",
    owner
  );
});

describe("Ballot Factory", () => {
  it("Should deploy a ballot", async function () {
    console.log(ballot);
    assert.ok(ballotFactory.address);
    assert.ok(ballot.address);
  });
});

// describe("Ballot", () => {
//   it("Marks caller as the ballotOfficialAddress", async function () {
//     expect(await ballot.ballotOfficialAddress()).to.equal(owner.address);
//   });

//   it("Should allow to add voter", async () => {
//     await ballot.addVoter(addr1.address, "Ram");
//     [voterName] = await ballot.voterRegister(addr1.address);
//     expect(voterName).to.equal("Ram");
//   });

//   it("Should allow to vote for registered voter", async () => {
//     await ballot.addVoter(addr1.address, "Ram");
//     await ballot.startVote();

//     try {
//       await ballot.connect(addr1).doVote(true);
//       assert(true);
//     } catch (error) {
//       assert(!error, error.message)
//     }
//   });
// });
