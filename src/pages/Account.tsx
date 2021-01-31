import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonAlert, IonLabel, IonIcon } from '@ionic/react';
import './Account.scss';
import { setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  username?: string;
}

interface DispatchProps {
  setUsername: typeof setUsername;
}

interface AccountProps extends OwnProps, StateProps, DispatchProps { }

const Account: React.FC<AccountProps> = ({ setUsername, username }) => {

  const [showAlert, setShowAlert] = useState(false);

  const clicked = (text: string) => {
    console.log(`Clicked ${text}`);
  }

  username = "Carl Stevens"

  return (
    <IonPage id="account-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {username &&
          (<div className="ion-padding-top ion-text-center" style={{ marginTop: '24px' }}>
            <img src="/assets/img/carl_stevens.png" alt="avatar" />
            <h1>{ username }</h1>
            <IonList inset>
              <IonItem  className='list-md.list-inset ion-item:first-child' onClick={() => clicked('Update Picture')}>Update Picture</IonItem>
              <IonItem onClick={() => setShowAlert(true)}>Change Username</IonItem>
              <IonItem onClick={() => clicked('Change Password')}>Change Password</IonItem>
            </IonList>
          </div>)
        }
        <IonTitle style={{ marginTop: '38px' }}>Shopping History</IonTitle>
        <IonList inset style={{ marginTop: '0px' }}>
          <IonItem>
            <IonLabel>
              <article style={{ position: 'relative', float: 'left', width: '50%' }}><br/>
                <h2><b>{`Longo's`}</b></h2>
                <p style={{ color: 'grey' }}>{`Jan 1, 2021 (2:28 P.M. - 3:14 P.M.)`}</p>
              </article>
              <article style={{ position: 'relative', float: 'right', paddingTop: '18px' }} >
                <IonIcon color="primary" style={{ height: '32px', width: '32px' }} src="/assets/icon/storefront.svg"/>
              </article>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <article style={{ position: 'relative', float: 'left', width: '50%' }}><br/>
                <h2><b>{`BestBuy`}</b></h2>
                <p style={{ color: 'grey' }}>{`Jan 1, 2021 (3:25 P.M.)`}</p>
              </article>
              <article style={{ position: 'relative', float: 'right', paddingTop: '18px' }} >
              <IonIcon color="primary" style={{ height: '32px', width: '32px' }} src="/assets/icon/bag.svg"/>
              </article>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <article style={{ position: 'relative', float: 'left', width: '50%' }}><br/>
                <h2><b>{`Walmart`}</b></h2>
                <p style={{ color: 'grey' }}>{`Jan 2, 2021 (9:00 A.M. - 9:45 A.M.)`}</p>
              </article>
              <article style={{ position: 'relative', float: 'right', paddingTop: '18px' }} >
                <IonIcon color="primary" style={{ height: '32px', width: '32px' }} src="/assets/icon/storefront.svg"/>
              </article>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <article style={{ position: 'relative', float: 'left', width: '50%' }}><br/>
                <h2><b>{`The Pickle Barrel`}</b></h2>
                <p style={{ color: 'grey' }}>{`Jan 3, 2021 (7:30 P.M. - 8:45 P.M.)`}</p>
              </article>
              <article style={{ position: 'relative', float: 'right', paddingTop: '18px' }} >
                <IonIcon color="primary" style={{ height: '32px', width: '32px' }} src="/assets/icon/storefront.svg"/>
              </article>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        header="Change Username"
        buttons={[
          'Cancel',
          {
            text: 'Ok',
            handler: (data) => {
              setUsername(data.username);
            }
          }
        ]}
        inputs={[
          {
            type: 'text',
            name: 'username',
            value: username,
            placeholder: 'username'
          }
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    username: state.user.username
  }),
  mapDispatchToProps: {
    setUsername,
  },
  component: Account
})