export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  tag: Tag;
}

export interface NewNoteData {
  title: string;
  content?: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export type Tag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface CreateNoteValues {
  title: string;
  content?: string;
  tag: Tag;
}
