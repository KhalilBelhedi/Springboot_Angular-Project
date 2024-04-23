import {Commentaire} from "../CommentaireModule/Commentaire.Module";

export interface Post {
  idPost: number;
  contenu_Post: string;
  sujet_Post: string;
  isAnonymous: boolean;
  date_Post: string; // You can use Date type if you prefer
  commentaireSet?: Commentaire[]; // Optional, depending on whether you want to include comments in the Post interface
  showComments?: boolean; // Add this line to your Post model
  profileImage: string;
  likes?: number; // Make sure to include these
  dislikes?: number; // Make sure to include these
  isLikedByCurrentUser?: boolean;
  isDislikedByCurrentUser?: boolean;


}
