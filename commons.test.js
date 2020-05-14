"use strict";
import {isEmpty} from './commons.js';

describe('commons.js test suite', function () {
  it('should return true for the value undefined', function () {
    const result = isEmpty(undefined);
    expect(result).toBeTruthy();
  });

  it('should return true for the value \'undefined\'', function () {
    const result = isEmpty('undefined');
    expect(result).toBeTruthy();
  });

  it('should return true for the value \'null\'', function () {
    const result = isEmpty('null');
    expect(result).toBeTruthy();
  });

});
