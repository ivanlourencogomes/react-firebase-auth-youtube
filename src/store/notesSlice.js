import { createSlice } from '@reduxjs/toolkit';

export const notesSlice = createSlice({
  name: 'notes',
  initialState: [
    {
      id: 1,
      book_id: 1,
      title:"Page 18 - On Europe's Decline",
      text: "The leading states of the European Union, and in particular of the eurozone, were dogged by a growing sense of decline. Their production systems and their societies that were said to be in decline, rather than Europe as a whole."
    },
    {
      id: 2,
      book_id: 1,
      title:"Page 55 - Treaty on Friendship and Cooperation",
      text: "The Portuguese and Spanish Governments signed the Treaty on Friendship and Cooperation at the 32nd Luso-Spanish Summit held in Trujillo in October 2021. This followed on from the commitment undertaken at the Guarda Summit in October 2020."
    },
    {
      id: 3,
      book_id: 2,
      title:"Page 61 - On Mesopotamia",
      text: "Jane R. McIntosh wrote the first general introduction to Mesopotamia that covers all four of the area's major ancient civilizations―Sumer, Akkad, Assyria, and Babylonia."
    }
    
    ],
  reducers: {
    addNote: (notes, action) => {
      let newNote = action.payload;
      newNote.id = notes.length ? Math.max(...notes.map(note=> note.id)) + 1 : 1;
      notes.push(newNote);
    },
    eraseNote: (notes, action) => {
        return notes.filter(note => note.id != action.payload);
    },
    eraseBookNotes: (notes, action) => {
        return notes.filter(note => note.book_id != action.payload);
    }
  }
})

export const { addNote, eraseNote, eraseBookNotes } = notesSlice.actions;

export const selectNotes = state => state.notes;

export default notesSlice.reducer;