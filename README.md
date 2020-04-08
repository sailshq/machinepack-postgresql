<h1>
  <a href="http://node-machine.org" title="Node-Machine public registry"><img alt="node-machine logo" title="Node-Machine Project" src="http://node-machine.org/images/machine-anthropomorph-for-white-bg.png" width="50" /></a>
  machinepack-mssql
</h1>

[![Build Status](https://travis-ci.org/vijaykonnackal/machinepack-sqlserver.svg?branch=master)](https://travis-ci.org/vijaykonnackal/machinepack-sqlserver)

Structured Node.js bindings for MSSQL.

> See https://github.com/node-machine/driver-interface for more background information about this package.


## Installation

```sh
$ npm install machinepack-sqlserver
```

## Running Test
The repo is configured to run all the tests in Docker containers. The composition uses two containers:
1. Public sql server 2017 container published by Microsoft
2. A container for testing the package based on official Node 10 release

To run the tests in docker env

```sh
$ docker-compose up
```

The github repo is configure to run the tests in Travis-CI on code push. The status of the build can be seen at the top of
the repo

## Help

For more examples, or if you get stuck or have questions, click [here](https://github.com/vijaykonnackal/machinepack-sqlserver/issues).

## Bugs &nbsp;

To report a bug, add an [issue](https://github.com/vijaykonnackal/machinepack-sqlserver/issues) in github.

## Acknowledgements

This module is largely a port of the [machinepack-postgresql](https://github.com/sailshq/machinepack-postgresql) module.

In addition, the work done by Dave Preston [machinepack-mssql](https://github.com/intel/machinepack-mssql) has
been used in this repo.

## License

MIT

This package is free and open-source under the MIT License.
