import 'jsdom-global/register';
import { expect } from 'chai';

import {
  validateEmail,
  uuid,
  getRandomInt,
  getRandomKey,
  shuffleArray,
  isEmailAddress
} from '../src/static/scripts/functions';

describe('functions.spec.js \n', () => {

  describe('validateEmail', () => {
    it('valid email address should return true', () => {
      expect(isEmailAddress('jonathon@mosquito-digital.co.uk')).to.equal(true);
    });

    it('invalid email address should return false', () => {
      expect(isEmailAddress('jonathon@mosquito')).to.equal(false);
    });

    it('empty value should return false', () => {
      expect(isEmailAddress()).to.equal(false);
    });
  });

  describe('uuid', () => {
    it('should return a string', () => {
      expect(generateUUID()).to.be.a('string');
    });

    it('should equal 36 characters', () => {
      expect(generateUUID()).to.have.length(36);
    });
  });

  describe('getRandomInt', () => {
    const input = getRandomInt(1, 100);

    it('should return a number', () => {
      expect(input).to.be.a('number');
    });

    it('should be greater or equal to the min value', () => {
      expect(input).to.be.at.least(1);
    });

    it('should be lower than or equal to the max value', () => {
      expect(input).to.be.at.most(100);
    });
  });


  describe('getRandomKey', () => {
    const arr = [1, 2, 3, 4, 5];
    const key = getRandomKey(arr);

    it('should return a random key from target', () => {
      expect(arr).to.include(key);
    });
  });


  describe('shuffleArray', () => {
    const arr = [1, 2, 3, 4, 5];
    const mix = shuffleArray(arr);

    it('should still have the same keys', () => {
      expect(mix).to.have.members(arr);
    });
  });
});
