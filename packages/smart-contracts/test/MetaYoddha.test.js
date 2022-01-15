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

    expect(yoddha.balanceOf(signers[0].address)).to.eventually.equal(0);
    expect(yoddha.address).to.properAddress;
  });

  describe('updateFee', async () => {
    it('should confirm the initial fee', async () => {
      const fee = ethers.utils.parseEther('0.01').toString();
      expect(yoddha.fee()).to.eventually.equal(fee);
    });

    it('should update the fee', async () => {
      const newFee = ethers.utils.parseEther('1').toString();
      await yoddha.updateFee(newFee);
      expect(yoddha.fee()).to.eventually.equal(newFee);
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
      const newYoddhaId = 1;

      expect(yoddha.totalSupply()).to.eventually.equal(1);
      expect(yoddha.tokenURI(newYoddhaId)).to.eventually.equal(tokenURI);

      const signers = await ethers.getSigners();
      expect(yoddha.balanceOf(signers[0].address)).to.eventually.equal(1);
      expect(yoddha.balanceOf(signers[1].address)).to.eventually.not.equal(1);
      expect(yoddha.balanceOf(signers[1].address)).to.eventually.equal(0);

      expect(yoddha.ownerOf(newYoddhaId)).to.eventually.equal(
        signers[0].address
      );
      expect(yoddha.ownerOf(newYoddhaId)).to.eventually.not.equal(
        signers[1].address
      );

      const newYoddha = await yoddha.getYoddhaById(1);
      expect(newYoddha.id).to.equal(newYoddhaId);
      expect(newYoddha.level).to.equal(1);
      expect(newYoddha.uri).to.equal(tokenURI);

      // const ownersYoddhas = await yoddha.getYoddhasByOwner(signers[0]);
      // expect(ownersYoddhas).to.equal([newYoddha]);
    });
  });

  describe('upgradeYoddhaById', async () => {
    const tokenURI = 'https://ipfs.io/ipfs/my-file';
    let fee;
    let newYoddhaId;

    beforeEach(async () => {
      fee = await yoddha.fee();
      newYoddhaId = 1;
      await yoddha.mint(tokenURI, { value: fee });
    });

    it('should allow deployer address to upgrade a Yoddha', async () => {
      await yoddha.upgradeYoddhaById(newYoddhaId, { value: fee });
      expect(yoddha.yoddhaLevel(newYoddhaId)).to.eventually.equal(2);
    });

    it("should't allow any other address to upgrade a Yoddha", async () => {
      const signers = await ethers.getSigners();

      expect(
        yoddha
          .connect(signers[1])
          .upgradeYoddhaById(newYoddhaId, { value: fee })
      ).to.eventually.throw('Ownable: caller is not the owner');
    });
  });
});
