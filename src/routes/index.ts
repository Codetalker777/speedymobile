import Home from '../pages/Home';
import TOS from '../pages/TOS';
import Privacy from '../pages/Privacy';
import AboutUs from '../pages/AboutUs';
import Phones from '../pages/Phones';
import Plans from '../pages/Plans';
import PrepaidPlanDetails from '../pages/PrepaidPlanDetails';
import FAQ from '../pages/FAQ';
import UnSubscribe from '../pages/UnSubscribe';
import AccountSettings from '../pages/AccountSettings';
import CreateAccount from '../pages/CreateAccount';
import VerifyEmail from '../pages/VerifyEmail';
import ResetPassword from '../pages/ResetPassword';
import VerifyPasswordReset from '../pages/VerifyResetPassword';
import News from '../pages/News';
import NewsArticle from '../pages/NewsArticle';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmed from '../pages/OrderConfirmed';
import ComparePlans from '../pages/ComparePlans';
import ComparePhones from '../pages/ComparePhones';
import Contact from '../pages/Contact';
import PhonePage from '../pages/PhonePage';
import Carrier from '../pages/Carrier';

export default [
	{
		path: '/',
		component: Home
	},
	{
		path: '/TOS',
		component: TOS
	},
	{
		path: '/Privacy',
		component: Privacy
	},
	{
		path: '/AboutUs',
		component: AboutUs
	},
	{
		path: '/Phones',
		component: Phones
	},
	{
		path: '/Plans',
		component: Plans
	},
	{
		path: '/Plans/:planSlug',
		component: PrepaidPlanDetails
	},

	{
		path: '/Phones/:phoneSlug',
		component: PhonePage
	},
	{
		path: '/FAQ',
		component: FAQ
	},
	{
		path: '/UnSubscribe',
		component: UnSubscribe
	},
	{
		path: '/AccountSettings',
		component: AccountSettings
	},
	{
		path: '/CreateAccount',
		component: CreateAccount
	},
	{
		path: '/verify',
		component: VerifyEmail
	},
	{
		path: '/ResetPassword',
		component: ResetPassword
	},
	{
		path: '/verifyPasswordReset',
		component: VerifyPasswordReset
	},
	{
		path: '/News',
		component: News
	},
	{
		path: '/Article/:slug',
		component: NewsArticle
	},
	{
		path: '/Cart',
		component: Cart
	},
	{
		path: '/Checkout',
		component: Checkout
	},
	{
		path: '/OrderConfirmed',
		component: OrderConfirmed
	},
	{
		path: '/Contact',
		component: Contact
	},
	{
		path: '/ComparePlans',
		component: ComparePlans
	},
	{
		path: '/ComparePhones',
		component: ComparePhones
	},
	

	{
		path: '/Carrier/:carrierSlug',
		component: Carrier
	}
];
