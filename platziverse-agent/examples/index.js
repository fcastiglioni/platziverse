const PlatziverseAgent = require('../')

const agent = new PlatziverseAgent({
  name: 'myapp',
  username: 'admin',
  interval: 2000
})

agent.addMetric('rss', function getRss () {
  return process.memoryUsage().rss
})

agent.addMetric('promiseMetric', function getRandomPromise () {
  return Promise.resolve(Math.random())
})

agent.addMetric('callbackMetric', function getRandomCallback (callback) {
  setTimeout(() => {
    callback(null, Math.random())
  }, 1000)
})

agent.connect()

// This agent only , son eventos del agente que esta conectado
agent.on('connected', handler)
agent.on('disconnected', handler)
agent.on('message', handler)

// representan los eventos q vienen del servidor mqtt (other agents)
agent.on('agent/connected', handler)
agent.on('agent/disconnected', handler)
agent.on('agent/message', handler)

function handler (payload) {
  console.log(payload)
}

//setTimeout(() => agent.disconnect(), 10000)

// This agent only , son eventos del agente que esta conectado
// representan los eventos q vienen del servidor mqtt (distintos aag)
