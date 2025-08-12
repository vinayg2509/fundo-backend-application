import * as noteServices from '../services/note.service';
import { request } from 'supertest';

export const createNote = async (req, res) => {
  try {
    const newNotes = await noteServices.createNote(req.body);

    res.status(newNotes.code).json({
      code: newNotes.code,
      messsage: newNotes.message,
      data: newNotes.data
    });
  } catch (error) {
    console.log('Error occured : ' + error);
  }
};

export const getAllNotes=async(req,res)=>{
    try{
        const result=await noteServices.getAllNotes()
        res.status(result.code).json({
            code:result.code,
            message:result.message,
            data:result.data})

    }
    catch(error)
    {
        console.error("Error occured ",error);
    }
}

export const updateNotes = async (req, res) => {
  try {
    const { id } = req.params; 
    const result = await noteServices.updateNotes(id, req.body);

    res.status(result.code).json({
      code: result.code,
      data: result.data,
      message: result.message
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({
      code: 500,
      data: [],
      message: "Internal Server Error"
    });
  }
};

export const getNoteById=async(req,res)=>{
  try {
    const {id}=req.params
    const result= await noteServices.getNoteById(id)
    res.status(result.code).json({
      code:result.code,
      data:result.data,
      message:result.message
    })
  } catch (error) {
      console.error(error);
  }
}