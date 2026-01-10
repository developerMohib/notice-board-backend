import { Request, Response } from "express";

export const healthController = async(req:Request, res:Response)=>{
res.status(200).json({
    success:true,
    message:'Health cheaking true'
})
}