import express from 'express';
import cors from 'cors';

export const addMiddlewares = (app) => {
    app.use(express.json());
    app.use(cors());
};