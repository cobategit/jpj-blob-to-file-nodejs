import Fastify from 'fastify'
import dotenv from 'dotenv'
import pino from 'pino'
import express from '@fastify/express'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import xss from 'x-xss-protection'
import fastifyAccepts from '@fastify/accepts'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { ApiResponse, LoggersApp } from '@jpj-common/module'

export const app = async () => {
    dotenv.config()
    LoggersApp.configureLogger()

    const server = Fastify({
        logger: pino({ level: 'info' })
    })

    await server.register(express)
    server.register(fastifyAccepts)
    server.use(xss())
    server.register(cors, {})
    server.register(helmet, {
        contentSecurityPolicy: false,
        global: true,
    })
    server.register(fastifyStatic, {
        root: path.join(process.cwd(), 'public'),
        prefix: '/public'
    })

    server.get('/', (req: any, reply: any) => {
        if (req.accepts('html')) {
            return reply
                .status(404)
                .sendFile(path.join(__dirname, 'views', 'index.html'))
        } else if (req.accepts('json')) {
            return reply.status(404).send('welcome to FASTIFY REST-API')
        } else {
            return reply.type('txt').send('404 not found')
        }
    })

    server.setErrorHandler(ApiResponse.errorCatch)

    server.listen({ port: Number(process.env.PORT) }, function (err, address) {
        if (err) {
            server.log.error(err)
            process.exit(1)
        }
        server.log.info(`server listening on ${address}`)
    })
}

app()