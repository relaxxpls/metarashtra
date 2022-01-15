import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';

chai.use(chaiAsPromised);
chai.use(solidity);

describe('Yoddha', () => {
  let yoddha;

  beforeEach(async () => {
    const signers = await ethers.getSigners();

    const yoddhaFactory = await ethers.getContractFactory(
      'MetaYoddha',
      signers[0]
    );
    yoddha = await yoddhaFactory.deploy();
    await yoddha.deployed();

    expect(yoddha.address).to.properAddress;
  });

  describe('mint a Yoddha', async () => {
    it('should create a new Yoddha', async () => {
      const tokenURI = 'https://ipfs.io/ipfs/my-file';
      await yoddha.mint(tokenURI);

      expect(await yoddha.totalSupply()).to.equal(1);
      expect(await yoddha.totalSupply()).to.equal(1);
      expect(await yoddha.tokenURI(1)).to.equal(tokenURI);
      // const auctionPrice = ethers.utils.parseUnits('0.01', 'ether');
      // const count = await counter.getCount();
      // expect(count).to.eq(1);
    });
  });
});
