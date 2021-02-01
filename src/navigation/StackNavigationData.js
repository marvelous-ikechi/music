import Onboarding from '../modules/Onboarding/Onboarding1';
import RegularUserIntro from '../modules/RegularUser/RegularUserIntro';
import LoginScreen from '../modules/auth/Login';
import RegisterScreen from '../modules/auth/Register';
import WelcomeScreen from '../modules/Onboarding/Welcome';
import ForgotPasswordScreen from '../modules/auth/ForgotPassword';
import IntroScreen from '../modules/Onboarding/IntroScreen';
import ConfirmAccount from '../modules/auth/AccountConfirmation';
import tabNavigation from './mainTabNavigation';
import Resetpassword from '../modules/auth/Resetpassword';
import Accept from '../modules/home/Accept';
import UpcomingEvent from '../modules/home/UpcomingEvent';
import {RetroParty} from './TopNavBar';
import RegularTab from './RegularTab';
import AddMusicRequest from '../modules/RegularUser/AddMusicRequest'
import MapView from '../component/Map';
import ViewRequest from '../modules/SuperUser/ViewRequest'


const SuperUserStack = [
  {
    name: 'Dashboards',
    component: tabNavigation,
  },
  {
    name: 'Accept',
    component: Accept,
  },
  {
    name: 'UpcomingEvent',
    component: UpcomingEvent,
  },
  {
    name:'View Request',
    component: ViewRequest
  },
  {
    name:'RetroParty',
    component: RetroParty,
  }
];

const AuthStackNavigation=[
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Onboarding',
    component: Onboarding,
  },
  {
    name: 'ResetPassword',
    component: Resetpassword,
  },
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,    
  },
  {
    name: 'Welcome',
    component: WelcomeScreen,
  },
  {
    name: 'Register',
    component: RegisterScreen,
  },
  {
    name: 'AccountConfirm',
    component: ConfirmAccount,
  },
]

const RegularStackNavigation = [
  {
    name: 'Intro',
    component: RegularUserIntro,
  },
  {
    name: 'UpcomingEvent',
    component: UpcomingEvent,
  },
  {
    name: 'MakeMusicRequest',
    component: AddMusicRequest,
  },
  
  {
    name:"Maps",
    component:MapView
  },
  {
    name:"Dashboards",
    component:RegularTab,
  }
]
export {SuperUserStack, RegularStackNavigation, AuthStackNavigation };
