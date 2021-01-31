import React from 'react';
import { Session } from '../models/Schedule';
import { Speaker } from '../models/Speaker';
import { IonCard, IonCardHeader, IonItem } from '@ionic/react';


interface SpeakerItemProps {
  speaker: Speaker;
  sessions: Session[];
}

const SpeakerItem: React.FC<SpeakerItemProps> = ({ speaker, sessions }) => {
  return (
    <>
      <IonCard className="speaker-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="speaker-item" routerLink={`/tabs/store/${speaker.id}`}>
              <img src={process.env.PUBLIC_URL + speaker.profilePic} alt="Speaker profile pic" />
          </IonItem>
        </IonCardHeader>
      </IonCard>
    </>
  );
};

export default SpeakerItem;