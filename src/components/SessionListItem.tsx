import React, { useRef } from 'react';
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, AlertButton } from '@ionic/react';
import { Session } from '../models/Schedule';

interface SessionListItemProps {
  session: Session;
  listType: "all" | "favorites";
  onAddFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  isFavorite: boolean;
}

const SessionListItem: React.FC<SessionListItemProps> = ({ isFavorite, onAddFavorite, onRemoveFavorite, onShowAlert, session, listType }) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  }

  const removeFavoriteSession = () => {
    onAddFavorite(session.id);
    onShowAlert('Remove Pinned Update?', [
      {
        text: 'Cancel',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () => {
          onRemoveFavorite(session.id);
          dismissAlert();
        }
      }
    ]);
  }

  const addFavoriteSession = () => {
    if (isFavorite) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteSession();
    } else {
      // remember this session as a user favorite
      onAddFavorite(session.id);
      onShowAlert('Update Pinned', [
        {
          text: 'OK',
          handler: dismissAlert
        }
      ]);
    }
  };
  console.log(session)

  return (
    <IonItemSliding ref={ionItemSlidingRef} class={'track-' + session.tracks[0].toLowerCase()}>
      <IonItem routerLink={`/tabs/updates/${session.id}`}>
        <IonLabel>
          <h2>{session.name}</h2>
          <p>
            {session.date}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        {listType === "favorites" ?
          <IonItemOption color="danger" onClick={() => removeFavoriteSession()}>
            Remove
          </IonItemOption>
          :
          <IonItemOption color="favorite" onClick={addFavoriteSession}>
            Pin Update
          </IonItemOption>
        }
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default React.memo(SessionListItem);