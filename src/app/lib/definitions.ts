export type Notes = {
  notes: Note[];
};

export type Note = {
  title: string;
  tags: Array<string>;
  content: string;
  lastEdited: string;
  isArchived: boolean;
  lastEditedDate?: string;
  tagString?: string;
};
