export interface Commentaire {
  idCommentaire?: number; // Make it optional if the backend generates it
  content: string;
  date_commentaire: string; // You can use Date type if you prefer
  postId?: number; // Optional, depending on whether you want to include the post ID in the Commentaire interface

}
