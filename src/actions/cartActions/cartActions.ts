import {
	deleteCart,
	updateCart,
	deletePlan
} from '../../utils/dataFunctions/cartFunctions';
import { CartType, IndividualPhone, Plan } from '../../utils/dataTypes';
import {
	CartActionType,
	ActionGetCartItem,
	ActionSetCartItem,
	ActionUpdateCartItem,
	ActionDeleteCartItem,
	ActionRequireReload,
	ActionDeletePlanItem
} from './cartInterface';

/* this file contains all the actions for the cart page */

export const getCartItems = (value: CartType): ActionGetCartItem => ({
	type: CartActionType.GETCARTITEMS,
	value
});

export const setCartItems = (
	phones: IndividualPhone[],
	plans: Plan[]
): ActionSetCartItem => ({
	type: CartActionType.SETCARTITEMS,
	phones,
	plans
});

export const updateCartItem = (
	id: string,
	quantity: number,
	cart: CartType
): ActionUpdateCartItem => ({
	type: CartActionType.UPDATECARTITEM,
	value: updateCart(id, quantity, cart)
});

export const deleteCartItem = (
	slug: string,
	plans: IndividualPhone[],
	cart: CartType
): ActionDeleteCartItem => ({
	type: CartActionType.DELETECARTITEM,
	newPlan: deletePlan(slug, plans),
	newCart: deleteCart(slug, cart)
});

export const deletePlanItem = (
	slug: string,
	plans: Plan[],
	cart: CartType
): ActionDeletePlanItem => ({
	type: CartActionType.DELETEPLANITEM,
	newPlan: deletePlan(slug, plans),
	newCart: deleteCart(slug, cart)
});

export const requireReload = (): ActionRequireReload => ({
	type: CartActionType.REQUIRERELOAD
});
