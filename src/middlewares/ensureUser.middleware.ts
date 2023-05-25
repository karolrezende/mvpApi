import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../errors";

export const ensureUser = async (req:Request, res:Response, next: NextFunction): Promise<Response|void>=>{
    const querySelectString = `
        SELECT id
        FROM
            users
        WHERE 
            id = $1;
    `
    const querySelectConfig:QueryConfig = {
        text: querySelectString,
        values: [req.params.id]
    }
    const querySelectResult: QueryResult = await client.query(querySelectConfig)

    if(querySelectResult.rowCount===0){
        throw new AppError ("User not found", 404)
    }

    next()
}