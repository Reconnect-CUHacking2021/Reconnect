import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { person } from 'ionicons/icons';
import SchedulePage from './SchedulePage';
import SpeakerList from './SpeakerList';
import SpeakerDetail from './SpeakerDetail';
import SessionDetail from './SessionDetail';
import Account from './Account';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/updates" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/updates" render={() => <SchedulePage />} exact={true} />
        <Route path="/tabs/updates/:id" component={SessionDetail} />

        <Route path="/tabs/store" render={() => <SpeakerList />} exact={true} />
        <Route path="/tabs/store/:id" component={SpeakerDetail} exact={true} />
        <Route path="/tabs/store/sessions/:id" component={SessionDetail} />

        {/* <Route path="/tabs/account" render={() => <MapView />} exact={true} /> */}
        <Route path="/tabs/account" component={Account} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="updates" href="/tabs/updates">
          <IonIcon src="/assets/icon/updates.svg" />
          <IonLabel>Updates</IonLabel>
        </IonTabButton>
        <IonTabButton tab="store" href="/tabs/store">
          <IonIcon src="/assets/icon/storefront.svg" />
          <IonLabel>Stores</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Account" href="/tabs/account">
          <IonIcon icon={person} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
