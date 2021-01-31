import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonSearchbar } from '@ionic/react';
import SpeakerItem from '../components/SpeakerItem';
import { Store } from '../models/Store';
import { connect } from '../data/connect';
import './SpeakerList.scss';
import { authRequest } from "../util/auth";
import { AxiosResponse } from 'axios';

interface OwnProps {  };

interface StateProps {
  // stores: Store[];
};

interface DispatchProps { };

interface SpeakerListProps extends OwnProps, StateProps, DispatchProps { };

const SpeakerList: React.FC<SpeakerListProps> = () => {
  const [stores, setStores] = React.useState([]);
  React.useEffect(() => {
    authRequest.get("/api/v1/store/").then((res: AxiosResponse) => {
      setStores(res.data)
    });
  }, []);
  return (
    <IonPage id="speaker-list">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Stores</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Stores</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar style={{ padding: '18px 20px 0px' }} />
        <IonGrid fixed>
          { stores !== [] ?
            <IonRow>
              {stores.map((store: Store) => (
                <IonCol size="6" size-md="4" key={store.pk}>
                  <SpeakerItem
                    key={store.pk}
                    store={store}
                  />
                </IonCol>
              ))}
            </IonRow>
            :
            "asd"
          }
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  component: React.memo(SpeakerList)
});
