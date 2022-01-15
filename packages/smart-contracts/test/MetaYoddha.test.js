const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { solidity } = require('ethereum-waffle');
const { ethers } = require('hardhat');

chai.use(chaiAsPromised);
chai.use(solidity);
const { expect } = chai;

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

    expect(await yoddha.balanceOf(signers[0].address)).to.equal(0);
    expect(yoddha.address).to.properAddress;
  });

  describe('updateFee', async () => {
    it('should confirm the initial fee', async () => {
      const fee = ethers.utils.parseEther('0.01');
      expect(await yoddha.fee()).to.equal(fee);
    });

    it('should update the fee', async () => {
      const newFee = ethers.utils.parseEther('1');
      await yoddha.updateFee(newFee);
      expect(await yoddha.fee()).to.equal(newFee);
    });

    it('should emit a FeeUpdate event', async () => {
      const newFee = ethers.utils.parseEther('0.5');
      expect(await yoddha.fee()).to.not.equal(newFee);
      expect(yoddha.updateFee(newFee))
        .to.emit(yoddha, 'FeeUpdate')
        .withArgs(newFee);
    });
  });

  describe('mint', async () => {
    it('should create a new Yoddha', async () => {
      const tokenURI = 'https://ipfs.io/ipfs/my-file';
      const fee = await yoddha.fee();

      await yoddha.mint(tokenURI, { value: fee });

      expect(await yoddha.totalSupply()).to.equal(1);
      expect(await yoddha.tokenURI(1)).to.equal(tokenURI);

      const signers = await ethers.getSigners();
      expect(await yoddha.balanceOf(signers[0].address)).to.equal(1);
      expect(await yoddha.balanceOf(signers[1].address)).to.not.equal(1);
      expect(await yoddha.balanceOf(signers[1].address)).to.equal(0);

      expect(await yoddha.ownerOf(1)).to.equal(signers[0].address);
      expect(await yoddha.ownerOf(1)).to.not.equal(signers[1].address);
    });
  });

  // describe('count down', async () => {
  //   // 5
  //   it('should fail due to underflow exception', () =>
  //     expect(counter.countDown()).to.eventually.be.rejectedWith(
  //       Error,
  //       'Uint256 underflow'
  //     ));

  //   it('should count down', async () => {
  //     await counter.countUp();

  //     await counter.countDown();
  //     const count = await counter.getCount();
  //     expect(count).to.eq(0);
  //   });
  // });
});
