const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the input partitionKey when it exists", () => {
    const event = { partitionKey: "abc123" };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe("abc123");
  });

  it("Generates a partitionKey from the input event when partitionKey is missing", () => {
    const event = { id: 123, data: "test" };
    const partitionKey = deterministicPartitionKey(event);
    expect(typeof partitionKey).toBe("string");
  });

  it("Generates a hash-based partitionKey when the generated key exceeds the maximum length", () => {
    const event = { id: 123, data: "test" };
    const longKey = "x".repeat(300);
    event.partitionKey = longKey;
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).not.toBe(longKey);
    expect(partitionKey.length).toBe(128);
  });
});
