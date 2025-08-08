import * as noteServices from '../services/note.service';

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
