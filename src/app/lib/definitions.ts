export type Notes = {
  notes: Note[];
};

export type Note = {
  content: string;
  isArchived: boolean;
  lastEdited: string;
  lastEditedDate?: string;
  tags: Array<string>;
  title: string;
};
