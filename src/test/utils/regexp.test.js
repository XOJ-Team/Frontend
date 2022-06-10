import {reg} from '../../utils/regexp'
import pattern from '../../utils/regexp'
 
describe('email reg', () => {
  it("reg('email')", () => {
    expect(reg('mail').test("1234567@qq.com")).toBe(true);
  });
  
  // 这里 test 和 it 没有明显区别，it 是指: it should xxx, test 是指 test xxx
  test('pattern("email")', () => {
    expect(pattern('email').message).toBe('not a valid email address');
  });
})