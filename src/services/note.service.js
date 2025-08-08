import { StatusCodes } from 'http-status-codes';
import Note from '../models/notes.models';

export const createNote = async (noteBody) => {
  try {
    const note = await Note.create(noteBody);
    return {
      code: StatusCodes.CREATED,
      data: note,
      message: 'note created'
    };
  } catch (error) {
    console.error('Error creating note', error);
    return {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [],
      message: 'Error creating note'
    };
  }
};

export const getAllNotes = async () => {
  try {
    const note = await Note.find();
    return {
      code: StatusCodes.OK,
      data: note,
      message: 'Notes fetched succesfully'
    };
  } catch (error) {
    return {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [],
      message: 'Error fetching notes'
    };
  }
};

