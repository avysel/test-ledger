# Tezos Ledger connection

Example of how to connect Ledger wallet to a Tezos app.

## Features

- Connect with Ledger first account
- Customize derivation path to connect with other Ledger accounts
- Switch network from Mainnet to Ghostnet
- Disable Ledger connection for non-compatible browser
- Send a self-transaction of 1 tez using connected account

Try it: https://tezos-ledger-connect.netlify.app/

## Technical stack

Made with:
- Typescript
- React
- react-app-rewired
- Taquito
- Ledger transport Web HID
- Bulma

## References

Using Ledger:
- https://www.npmjs.com/package/@ledgerhq/hw-app-tezos
- https://developers.ledger.com/docs/transport/web-hid-usb/
- https://tezostaquito.io/docs/ledger_signer/
- https://github.com/LedgerHQ/ledger-live/tree/develop/libs/ledgerjs/packages/hw-transport-webhid
- https://github.com/LedgerHQ/ledgerjs/blob/master/docs/migrate_webusb.md

Using CRA + react-app-rewired:
- https://web3auth.io/docs/troubleshooting/webpack-issues
