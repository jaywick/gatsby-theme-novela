const tsNode = require('ts-node')

tsNode.register()

exports.createPages = require('./gatsby/node/createPages').createPages
exports.createResolvers = require('./gatsby/node/createResolvers').createResolvers
exports.onCreateNode = require('./gatsby/node/onCreateNode').onCreateNode
exports.onCreateWebpackConfig = require('./gatsby/node/onCreateWebpackConfig').onCreateWebpackConfig
exports.onPreBootstrap = require('./gatsby/node/onPreBootstrap').onPreBootstrap
exports.sourceNodes = require('./gatsby/node/sourceNodes').sourceNodes
