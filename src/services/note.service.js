import { StatusCodes } from 'http-status-codes';
import Note from '../models/notes.models';
// import { updateNotes } from './note.service';

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
export const updateNotes = async (id, noteBody, userId) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, createdBy: userId },
      noteBody,
      { new: true, runValidators: true }
    );

    return updatedNote
      ? { code: StatusCodes.OK, message: 'Note updated successfully', data: updatedNote }
      : { code: StatusCodes.NOT_FOUND, message: 'Note not found or no permission', data: null };

  } catch (error) {
    console.error('\n Error Updating note: ', error);
    return {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [],
      message: 'Error updating note'
    };
  }
};
