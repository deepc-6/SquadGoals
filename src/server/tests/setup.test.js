// check if node environment is set to test
test('should fail when env not test ', () => {
  expect(process.env.NODE_ENV).toEqual('test');
});
