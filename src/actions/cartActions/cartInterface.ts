import { CartType, IndividualPhone, Plan } from '../../utils/dataTypes';

export enum CartActionType {
	GETCARTITEMS = 'CART/GETCARTITEMS',
	SETCARTITEMS = 'CART/SETCARTITEMS',
	UPDATECARTITEM = 'CART/UPDATECARTITEM',
	DELETECARTITEM = 'CART/DELETECARTITEM',
	REQUIRERELOAD = 'CART/REQUIRERELOAD',
	DELETEPLANITEM = 'CART/DELETEPLANITEM'
}

export interface ActionGetCartItem {
	type: CartActionType.GETCARTITEMS;
	value: CartType;
}

export interface ActionSetCartItem {
	type: CartActionType.SETCARTITEMS;
	phones: IndividualPhone[];
	plans: Plan[];
}

export interface ActionUpdateCartItem {
	type: CartActionType.UPDATECARTITEM;
	value: CartType;
}

export interface ActionDeleteCartItem {
	type: CartActionType.DELETECARTITEM;
	newPlan: IndividualPhone[];
	newCart: CartType;
}

export interface ActionRequireReload {
	type: CartActionType.REQUIRERELOAD;
}

export interface ActionDeletePlanItem {
	type: CartActionType.DELETEPLANITEM;
	newPlan: Plan[];
	newCart: CartType;
}

export type AllCartActions =
	| ActionSetCartItem
	| ActionGetCartItem
	| ActionUpdateCartItem
	| ActionDeleteCartItem
	| ActionRequireReload
	| ActionDeletePlanItem;
