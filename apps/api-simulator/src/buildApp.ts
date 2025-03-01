/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
import { graphql } from 'msw'
import { createServer } from '@mswjs/http-middleware'
import { logger } from '@repo/logger'
import { graphqlMock } from '../scripts/generate-mock'

export const log = logger()

const errorResponse = (path: string) => {
  return {
    message: 'Something went wrong',
    path: [path],
    extensions: {
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      timestamp: Date.now()
    }
  }
}

const buildApp = (): express.Express => {
  const app = express()
  const server = createServer(
    /**
     * Using the default `operation` API to intercept all GraphQL operations.
     */
    graphql.operation(async (req, res, ctx) => {
      const { operationName, variables } = req
      log.info(`Operation: ${operationName}, Variables: ${JSON.stringify(variables)}`)
      // Handle GraphQl Query operation
      return res(ctx.data(graphqlMock.data))
      // Uncomment the following line to simulate an error
      // return res(ctx.errors([errorResponse('fetchIssues')]), ctx.data({ fetchIssues: null }))
    })
  )

  // Apply the mock server as middleware
  app.use(server)

  return app
}

export default buildApp
