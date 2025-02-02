import { describe, expect, it } from 'vitest'

import {
  customSolidityErrorsAbi,
  ensAbi,
  ensRegistryWithFallbackAbi,
  nestedTupleArrayAbi,
  nounsAuctionHouseAbi,
  wagmiMintExampleAbi,
  wethAbi,
  writingEditionsFactoryAbi,
} from '../test/index.js'
import { Abi, AbiConstructor, AbiFallback, AbiFunction } from './zod.js'

describe('AbiSchema', () => {
  it('returns valid schema', () => {
    expect(
      Abi.parse([
        {
          inputs: [{ type: 'address' }],
          name: 'love',
          outputs: [{ type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ]),
    ).toMatchInlineSnapshot(`
      [
        {
          "inputs": [
            {
              "type": "address",
            },
          ],
          "name": "love",
          "outputs": [
            {
              "type": "uint256",
            },
          ],
          "stateMutability": "view",
          "type": "function",
        },
      ]
    `)
  })
  it('throws error for invalid schema', async () => {
    await expect(
      Abi.parseAsync([
        {
          inputs: [{ type: 'notAValidType' }],
          name: 'love',
          outputs: [{ type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ]),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "[
        {
          \\"validation\\": \\"regex\\",
          \\"code\\": \\"invalid_string\\",
          \\"message\\": \\"Invalid\\",
          \\"path\\": [
            0,
            \\"inputs\\",
            0,
            \\"type\\"
          ]
        }
      ]"
    `)
  })

  describe('behavior', () => {
    it("deprecated 'constant' field", () => {
      expect(
        Abi.parse([
          {
            constant: true,
            inputs: [{ name: 'node', type: 'bytes32' }],
            name: 'resolver',
            outputs: [{ name: '', type: 'address' }],
            payable: false,
            type: 'function',
          },
        ]),
      ).toMatchInlineSnapshot(`
        [
          {
            "constant": true,
            "inputs": [
              {
                "name": "node",
                "type": "bytes32",
              },
            ],
            "name": "resolver",
            "outputs": [
              {
                "name": "",
                "type": "address",
              },
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
          },
        ]
      `)
    })

    it("deprecated 'payable' field", () => {
      expect(
        Abi.parse([
          {
            constant: false,
            inputs: [
              { name: 'node', type: 'bytes32' },
              { name: 'owner', type: 'address' },
            ],
            name: 'setOwner',
            outputs: [],
            payable: false,
            type: 'function',
          },
        ]),
      ).toMatchInlineSnapshot(`
        [
          {
            "constant": false,
            "inputs": [
              {
                "name": "node",
                "type": "bytes32",
              },
              {
                "name": "owner",
                "type": "address",
              },
            ],
            "name": "setOwner",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function",
          },
        ]
      `)
      expect(
        Abi.parse([
          {
            constant: false,
            inputs: [
              { name: 'node', type: 'bytes32' },
              { name: 'owner', type: 'address' },
            ],
            name: 'setOwner',
            outputs: [],
            payable: true,
            type: 'function',
          },
        ]),
      ).toMatchInlineSnapshot(`
        [
          {
            "constant": false,
            "inputs": [
              {
                "name": "node",
                "type": "bytes32",
              },
              {
                "name": "owner",
                "type": "address",
              },
            ],
            "name": "setOwner",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function",
          },
        ]
      `)
    })
  })
})

describe('Abi', () => {
  it('ensRegistryWithFallbackAbi', () => {
    Abi.parse(ensRegistryWithFallbackAbi)
  })
  it('nestedTupleArrayAbi', () => {
    Abi.parse(nestedTupleArrayAbi)
  })
  it('nounsAuctionHouseAbi', () => {
    Abi.parse(nounsAuctionHouseAbi)
  })
  it('wagmiMintExampleAbi', () => {
    Abi.parse(wagmiMintExampleAbi)
  })
  it('ensAbi', () => {
    Abi.parse(ensAbi)
  })
  it('wethAbi', () => {
    Abi.parse(wethAbi)
  })
  it('writingEditionsFactoryAbi', () => {
    Abi.parse(writingEditionsFactoryAbi)
  })
  it('customSolidityErrorsAbi', () => {
    Abi.parse(customSolidityErrorsAbi)
  })
})

describe('AbiFunction', () => {
  it('returns valid schema', () => {
    expect(
      AbiFunction.parse({
        inputs: [{ type: 'address' }],
        name: 'love',
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      }),
    ).toMatchInlineSnapshot(`
      {
        "inputs": [
          {
            "type": "address",
          },
        ],
        "name": "love",
        "outputs": [
          {
            "type": "uint256",
          },
        ],
        "stateMutability": "view",
        "type": "function",
      }
    `)
  })
  it('throws error for invalid schema', async () => {
    await expect(
      AbiFunction.parseAsync({
        inputs: [{ type: 'notAValidType' }],
        name: 'love',
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "[
        {
          \\"validation\\": \\"regex\\",
          \\"code\\": \\"invalid_string\\",
          \\"message\\": \\"Invalid\\",
          \\"path\\": [
            \\"inputs\\",
            0,
            \\"type\\"
          ]
        }
      ]"
    `)
  })

  describe('behavior', () => {
    it("deprecated 'constant' field", () => {
      expect(
        AbiFunction.parse({
          constant: true,
          inputs: [{ name: 'node', type: 'bytes32' }],
          name: 'resolver',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          type: 'function',
        }),
      ).toMatchInlineSnapshot(`
        {
          "constant": true,
          "inputs": [
            {
              "name": "node",
              "type": "bytes32",
            },
          ],
          "name": "resolver",
          "outputs": [
            {
              "name": "",
              "type": "address",
            },
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function",
        }
      `)
    })

    it("deprecated 'payable' field", () => {
      expect(
        AbiFunction.parse({
          constant: false,
          inputs: [
            { name: 'node', type: 'bytes32' },
            { name: 'owner', type: 'address' },
          ],
          name: 'setOwner',
          outputs: [],
          payable: false,
          type: 'function',
        }),
      ).toMatchInlineSnapshot(`
        {
          "constant": false,
          "inputs": [
            {
              "name": "node",
              "type": "bytes32",
            },
            {
              "name": "owner",
              "type": "address",
            },
          ],
          "name": "setOwner",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function",
        }
      `)
      expect(
        AbiFunction.parse({
          constant: false,
          inputs: [
            { name: 'node', type: 'bytes32' },
            { name: 'owner', type: 'address' },
          ],
          name: 'setOwner',
          outputs: [],
          payable: true,
          type: 'function',
        }),
      ).toMatchInlineSnapshot(`
        {
          "constant": false,
          "inputs": [
            {
              "name": "node",
              "type": "bytes32",
            },
            {
              "name": "owner",
              "type": "address",
            },
          ],
          "name": "setOwner",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function",
        }
      `)
    })
  })
})

describe('AbiConstructor', () => {
  it('returns valid schema', () => {
    expect(
      AbiConstructor.parse({
        inputs: [{ type: 'address' }],
        type: 'constructor',
        stateMutability: 'nonpayable',
      }),
    ).toMatchInlineSnapshot(`
      {
        "inputs": [
          {
            "type": "address",
          },
        ],
        "stateMutability": "nonpayable",
        "type": "constructor",
      }
    `)
  })

  describe('behavior', () => {
    it("deprecated 'payable' field", () => {
      expect(
        AbiConstructor.parse({
          inputs: [{ type: 'address' }],
          type: 'constructor',
          payable: false,
        }),
      ).toMatchInlineSnapshot(`
        {
          "inputs": [
            {
              "type": "address",
            },
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor",
        }
      `)
      expect(
        AbiConstructor.parse({
          inputs: [{ type: 'address' }],
          type: 'constructor',
          payable: true,
        }),
      ).toMatchInlineSnapshot(`
        {
          "inputs": [
            {
              "type": "address",
            },
          ],
          "payable": true,
          "stateMutability": "payable",
          "type": "constructor",
        }
      `)
    })
  })
})

describe('AbiFallback', () => {
  it('returns valid schema', () => {
    expect(
      AbiFallback.parse({
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'fallback',
      }),
    ).toMatchInlineSnapshot(`
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "fallback",
      }
    `)
  })

  describe('behavior', () => {
    it("deprecated 'payable' field", () => {
      expect(
        AbiFallback.parse({
          inputs: [],
          type: 'fallback',
          payable: false,
        }),
      ).toMatchInlineSnapshot(`
        {
          "inputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "fallback",
        }
      `)
      expect(
        AbiFallback.parse({
          inputs: [],
          type: 'fallback',
          payable: true,
        }),
      ).toMatchInlineSnapshot(`
        {
          "inputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "fallback",
        }
      `)
    })
  })
})
