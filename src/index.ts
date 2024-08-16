import 'module-alias/register';
import express, { Express, Request, Response } from 'express';
import App from './app';
import { UserController } from './controllers/user.controller';
import { container } from './inversify/inversify.config';
import { TYPES } from './inversify/types';

const PORT = process.env.PORT || 3000;
const app: App = new App([container.get<UserController>(TYPES.UserController)], PORT);

app.listen();
