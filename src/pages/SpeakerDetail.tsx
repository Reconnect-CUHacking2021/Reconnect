import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';

import './SpeakerDetail.scss';

import { ActionSheetButton } from '@ionic/core';
import { IonActionSheet, IonChip, IonIcon, IonHeader, IonLabel, IonToolbar, IonButtons, IonContent, IonButton, IonBackButton, IonPage } from '@ionic/react'
import { callOutline, callSharp, logoTwitter, logoGithub, logoInstagram, shareOutline, shareSharp } from 'ionicons/icons';
import { time, people } from 'ionicons/icons';

import { connect } from '../data/connect';
import * as selectors from '../data/selectors';

import { Speaker } from '../models/Speaker';


interface OwnProps extends RouteComponentProps {
  speaker?: Speaker;
};

interface StateProps {};

interface DispatchProps {};

interface SpeakerDetailProps extends OwnProps, StateProps, DispatchProps {};

const SpeakerDetail: React.FC<SpeakerDetailProps> = ({ speaker }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');

  function openContact(speaker: Speaker) {
    setActionSheetButtons([
      {
        text: `Email ( ${speaker.email} )`,
        handler: () => {
          window.open('mailto:' + speaker.email);
        }
      },
      {
        text: `Call ( ${speaker.phone} )`,
        handler: () => {
          window.open('tel:' + speaker.phone);
        }
      }
    ]);
    setActionSheetHeader(`Contact ${speaker.name}`);
    setShowActionSheet(true);
  }

  if (!speaker) {
    return <div>Speaker not found</div>
  }

  return (
    <IonPage id="speaker-detail">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/store" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => openContact(speaker)}>
                <IonIcon slot="icon-only" ios={callOutline} md={callSharp}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div style={{ backgroundImage: `url(${speaker.profilePic})` }} className="speaker-background" />

        <div className="ion-padding speaker-detail">
          <h2>{speaker.name}</h2>
          <h5>{speaker.name}</h5>
          <div className="widgets_div">
            <div className="icon_div">
              <span><IonIcon icon={time}/></span>
            </div>
            <div className="text_div">
              <span><b>Mon - Fri:</b> 9:00 a.m. - 9:00 p.m.</span><br/>
              <span><b>Sat - Sun:</b> 9:00 a.m. - 5:00 p.m.</span><br/>
            </div>
          </div>
          <br/>

          <hr/>
          <div className="text_div">
              <span><b>Anonymous</b> <p style={{ float:"right", fontSize: "8pt" }}>One Day Ago</p></span><br/>
              <span>Customer service is great</span>
          </div>
          </div>
          
          <div className="ion-padding speaker-page-bottom">
            <div className="icon-div">
              <IonIcon style={{ paddingRight: '16px' }} icon={people} />
              <p>Currently at max occupancy.</p>
            </div>
            <div>
              <IonButton color="secondary">Open Maps</IonButton>
            </div>
            <div>
              <IonButton color="primary">Check-In</IonButton>
            </div>
        </div>
      </IonContent>
      <IonActionSheet
        isOpen={showActionSheet}
        header={actionSheetHeader}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />
    </IonPage>
  );
};


export default connect({
  mapStateToProps: (state, ownProps) => ({
    speaker: selectors.getSpeaker(state, ownProps)
  }),
  component: SpeakerDetail
});
