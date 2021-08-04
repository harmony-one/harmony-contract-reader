# Harmony Contract Reader

A simple contract reader for verified contracts on the harmony blockchain.

[How to use it?](https://www.youtube.com/watch?v=p55uc0jgCd4)

## Run locally

```
open http://localhost:8000
python3 -m http.server
```

Or you can use any other local server, like the [live-server](https://www.npmjs.com/package/live-server) npm package.


## Usage

Find the contract you are interested in and paste it in the input field. (To test, you can use the Viper token: 0xea589e93ff18b1a1f1e9bac7ef3e86ab62addc79)

If the contact is verified, a list of all possible functions appears and can be interacted with.

If it's not verified you will receive the error:

```
ABI not found.
```

