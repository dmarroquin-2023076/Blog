'use strict'

import express from 'express' 
import morgan from 'morgan' 
import helmet from 'helmet' 
import cors from 'cors' 
import publicactionRouter from "../src/publication/publication.routes.js"
import commentRouter from '../src/comment/comment.routes.js'
import publicationCommentsRouter from '../src/publicationComments/publicationComments.routes.js'
import { limiter } from '../middlewares/rate.limit.js'

const configs = (app)=>{
    app.use(express.json()) 
    app.use(express.urlencoded({extended: false})) 
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter) 
}

const routes = (app)=>{
    app.use('/publication',publicactionRouter)
    app.use('/comment',commentRouter)
    app.use('/publicationComments', publicationCommentsRouter)
}



export const initServer = ()=>{
    const app = express() 
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}