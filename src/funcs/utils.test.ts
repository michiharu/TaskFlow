import { uuid4 } from './utils';

describe('uuid4', () => {
  const count = 100_000;
  const ids: Set<string> = new Set();
  for (let i = 0; i < count; i += 1) ids.add(uuid4());

  test('id should be unique.', () => {
    expect(ids.size).toBe(count);
  });

  test('id has a formal defined format.', () => {
    //          xxxxxxxx   - xxxx      -4xxx        -yxxx             -xxxxxxxxxxxx
    const re = /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/;
    expect(re.test('12345678-9abc-4def-9000-000000000000')).toBe(true);
    expect(re.test('12345678-9abc-0def-9000-000000000000')).toBe(false);
    expect(re.test('12345678-9abc-4def-0000-000000000000')).toBe(false);
    expect(re.test('12345678-9abc-4def-f000-000000000000')).toBe(false);
    ids.forEach((id) => expect(re.test(id)).toBe(true));
  });
});
