import React from 'react';
import { Store } from '../models/Store';
import { IonCard, IonCardHeader, IonItem } from '@ionic/react';


interface SpeakerItemProps {
  store: Store;
}

const SpeakerItem: React.FC<SpeakerItemProps> = ({ store }) => {
  return (
    <>
      <IonCard className="speaker-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="speaker-item" routerLink={`/tabs/store/${store.pk}`}>
              {/* <img src={process.env.PUBLIC_URL + speaker.profilePic} alt="Speaker profile pic" /> */}
          </IonItem>
        </IonCardHeader>
      </IonCard>
    </>
  );
};

export default SpeakerItem;
