export type Notes = {
  notes: Note[];
};

export type Note = {
  content: string;
  isArchived: boolean;
  lastEdited: string;
  lastEditedDate?: string;
  tags: Array<string>;
  tagString?: string;
  title: string;
};
